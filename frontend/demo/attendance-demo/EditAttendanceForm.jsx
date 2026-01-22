"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import SubmitButton from "../button-demo/SubmitButton";
import { AttendanceUrl } from "@/constants";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { formatDate } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import SuccessMessageCard from "../card-demo/SuccessMessageCard";
import { toast } from "sonner";
import { handleNumber } from "@/lib/helpers";

const FormSchema = z.object({
  batchName: z
    .string()
    .min(2, { message: "Batch Name must be at least 2 characters long" })
    .optional(),
  startDate: z.string().optional(),
  // dateRange:z.object({
  //   from: z.date({required_error: "This field is required."}),
  //   to: z.date().optional()
  // }),
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  classes: z.array(z.string()).optional(),
  curriculumTaught: z.array(z.string().optional()),
  completed: z.string(),
});

export function EditAttendanceForm() {
  const { id } = useParams();
  const [numberOfClasses, setNumberOfClasses] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batchName: "",
      startDate: "",
      // dateRange: {from: new Date(), to: addDays(new Date(), 7)},
      dateRange: { from: undefined, to: undefined },
      classes: [],
      curriculumTaught: [""],
      completed: "",
    },
  });

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  // Fetch the existing attendance data
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${AttendanceUrl}/${id}`, {withCredentials: true, 
          headers: { Authorization: Cookies.get("token") },
        });
        const attendanceData = res.data;

        // Pre-populate the form with fetched data
        form.reset({
          batchName: attendanceData.batchName,
          startDate: attendanceData.startDate
            ? formatDate(new Date(attendanceData.startDate), "yyyy-MM-dd")
            : "",
          classes: attendanceData.classes.map((cls) =>
            formatDate(new Date(cls), "yyyy-MM-dd")
          ),
          curriculumTaught: attendanceData.curriculumTaught.map((c) => c),
          completed: attendanceData.completed,
          dateRange: attendanceData.dateRange?.from
            ? {
                from: new Date(attendanceData.dateRange.from),
                to: attendanceData.dateRange?.to
                  ? new Date(attendanceData.dateRange.to)
                  : undefined,
              }
            : { from: undefined, to: undefined },
        });

        setNumberOfClasses(attendanceData.classes.length);
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, [form, id]);

  // Handle adding a new class
  const handleAddClass = () => {
    if (numberOfClasses < 60) {
      setNumberOfClasses((prev) => handleNumber(prev) + 1);
      const currentClasses = [...form.getValues("classes")];
      form.setValue("classes", [...currentClasses, ""]);
    }
  };

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  // Handle form submission
  async function onSubmit(data) {
    try {
      const startDate = data.startDate
        ? new Date(data.startDate).toISOString().split("T")[0]
        : "";
      const classes = data.classes
        ? data.classes.map((item) => new Date(item).toISOString().split("T")[0])
        : "";
      const curriculumTaught = data.curriculumTaught
        ? data.curriculumTaught.map((item) => item)
        : "";

      const payload = {
        batchName: data.batchName,
        startDate: startDate,
        dateRange: data.dateRange,
        classes: classes,
        curriculumTaught: curriculumTaught,
        completed: data.completed,
      };

      const res = await axios.put(`${AttendanceUrl}/${id}`, payload, {withCredentials: true,
        headers: { Authorization: Cookies.get("token") },
      });
      console.log(res.data);

      const { message, success } = res.data;
      setIsSuccess(success);
      toast.success(message)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast.error(message || 'An unknown error has occurred.')
      }
    }
  }

  return (
    <>
      {isSubmitSuccessful && isSuccess ? (
        <SuccessMessageCard content="Thank you for updating attendance!" to="/adminDashboard/attendance"/>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full gap-2 flex flex-col "
          >
            <h1 className="lg:text-4xl text-xl mb-4 font-serif">
              Edit Attendances
            </h1>

            {/* Batch Name */}
            <FormField
              control={form.control}
              name="batchName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Batch Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={handleAddClass}
                  disabled={handleNumber(numberOfClasses) >= 60}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Add Classes
                </Button>
              </div>
             <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
             </Button>
            </div>

            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Start Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Classes */}
            <Label className="font-semibold">Classes - Curriculum Taught</Label>
            {Array.from({ length: handleNumber(numberOfClasses) }).map(
              (_, index) => (
                <div className="grid grid-cols-2 gap-2" key={index}>
                  <FormField
                    control={form.control}
                    name={`classes.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} value={field.value || ''} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Curriculum Name */}
                  <FormField
                    control={form.control}
                    name={`curriculumTaught.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            value={field.value || ''}
                            placeholder="curriculum taught"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )
            )}

            {/* Date Range Picker */}
            <Label>Holiday date range</Label>
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal h-12 rounded-xl shadow-none"
                      >
                        <CalendarIcon className="mr-2" />
                        {dateRange?.from ? (
                          dateRange?.to ? (
                            <>
                              {formatDate(
                                new Date(dateRange.from),
                                "LLL dd, y"
                              )}{" "}
                              -{" "}
                              {formatDate(new Date(dateRange.to), "LLL dd, y")}
                            </>
                          ) : (
                            formatDate(new Date(dateRange.from), "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={(range) => {
                          setDateRange(range);
                          field.onChange(range);
                        }}
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select the date range for holidays.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* All classes are covered? */}
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Attendance Completed?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"Yes"}>Yes</SelectItem>
                      <SelectItem value={"No"}>No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </>
  );
}
