"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import SubmitButton from "../button-demo/SubmitButton";
import { NewBatchEntryUrl, StudentRegUrl } from "@/constants";
import { timezone } from "@/data/dataStorage";

import Cookies from "js-cookie";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import MultiDayTimeEntry from "./MultiDayTimeEntry";
import SuccessMessageCard from "../card-demo/SuccessMessageCard";
import { toast } from "sonner";

// Define form schema
const FormSchema = z.object({
  batch: z.string().min(2, "Batch Number must be atleast 2 characters long"),
  teacher: z
    .string()
    .nonempty("Please select a teacher")
    .min(3, "Teacher Name must be atleast 3 characters long"),
  startDate: z.string().optional(),
  dayTimeEntries: z
    .array(
      z.object({
        day: z.string(),
        time: z.string(),
      })
    )
    .optional(),
  timeZone: z.string().nonempty("Please select a timezone"),
  numberOfClasses: z
    .string()
    .trim()
    .max(3, "Number of classes must have maximum 3 digits"),
  studentName: z
    .string()
    .min(3, "Student Name must be atlest 3 characters long"),
  destination: z
    .string()
    .min(10, "Mobile number is too short")
    .refine((val) => {
      const digits = val.replace(/\D/g, ""); // Remove non-digit characters
      return digits.length === 12 && digits.startsWith("971");
    }, "Please enter a valid UAE mobile number (e.g., +971XXXXXXX)"),
  email: z.email("Please enter a valid email"),
  completed: z.string().nonempty("Please select (YES/NO)").optional(),
  isColorCoding: z.boolean().optional(),
});

export function EditBatchEntryForm() {
  const { id } = useParams();
  const [dayTimeEntries, setDayTimeEntries] = useState([]);
  const [color, setColor] = useState("#0055A4");
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batch: "",
      teacher: "",
      startDate: "",
      dayTimeEntries: [],
      timeZone: "Asia/Dubai", // Default to user's timezone
      numberOfClasses: "",
      studentName: "",
      destination: "+971",
      email: "",
      completed: "",
      isColorCoding: false,
    },
  });

  // Fetch batch details and update form values
  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const res = await axios.get(`${NewBatchEntryUrl}/${id}`, {
          headers: { Authorization: Cookies.get("token") },
        });

        const batchDetails = res.data;
        const initialDayTimeEntries = batchDetails.dayTimeEntries || [];

        // Initialize dayTimeEntries state
        setDayTimeEntries(initialDayTimeEntries);

        form.reset({
          batch: batchDetails.batch,
          teacher: batchDetails.teacher,
          startDate: batchDetails.startDate
            ? format(new Date(batchDetails.startDate), "yyyy-MM-dd")
            : "",
          dayTimeEntries: initialDayTimeEntries,
          timeZone: batchDetails.timeZone || "Asia/Dubai",
          numberOfClasses: batchDetails.numberOfClasses,
          studentName: batchDetails.studentName,
          email: batchDetails.email,
          destination: batchDetails.destination,
          completed: batchDetails.completed,
          isColorCoding: batchDetails.isColorCoding || false,
          // colorCode: batchDetails.colorCode || "#0055A4",
        });
      } catch (error) {
        console.error("Failed to fetch batch details:", error);
      }
    };

    fetchBatchDetails();
  }, [id, form]);

  // Handle multiple date and time add, remove and update
  const handleDateTimeEntriesChange = (entries) => {
    setDayTimeEntries(entries);
    form.setValue("dayTimeEntries", entries);
  };

  const studentName = form.watch("studentName");

  // Handle populate phone and email of a selected student
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${StudentRegUrl}?name=${studentName}`);
        if (res.data) {
          const selectedStudent = res.data.find(
            (item) => item.studentName === studentName
          );
          if (selectedStudent) {
            form.setValue("destination", selectedStudent.destination || "");
            form.setValue("email", selectedStudent.email || "");
          }
        }
      } catch (error) {
        console.error(error);
        form.setValue("email", "");
        form.setValue("destination", "");
      }
    };
    handleFetch();
  }, [form, studentName]);

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  // Submit handler
  async function onSubmit(data) {
    try {
      const currentDayTimeEntries = form.getValues("dayTimeEntries") || [];

      const transformedDateTimeEntries =
        dayTimeEntries.length > 0
          ? {
              day: dayTimeEntries.map((item) => item.day),
              time: dayTimeEntries.map((item) => item.time),
            }
          : currentDayTimeEntries;

      const startDate = new Date(data.startDate).toISOString().split("T")[0];
      const colorCode = color;

      const payload = {
        batch: data.batch,
        startDate,
        teacher: data.teacher,
        timeZone: data.timeZone,
        numberOfClasses: data.numberOfClasses,
        studentName: data.studentName,
        destination: data.destination,
        email: data.email,
        completed: data.completed,
        isColorCoding: data.isColorCoding,
        colorCode,
        ...transformedDateTimeEntries,
      };

      const res = await axios.put(`${NewBatchEntryUrl}/${id}`, payload, {
        headers: { Authorization: Cookies.get("token") },
      });
      console.log(res.data);

      const { message, success } = res.data;
      setIsSuccess(success);
      toast.success(message)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        let errorMessage = 'An unknown error has occurred';

        if(typeof error.response?.data === 'string'){
          errorMessage = error.response.data;
        }
        else if(error.response?.data?.message){
          errorMessage = error.response.data.message;
        }
        else if(error.message){
           errorMessage = error.message
        }
        toast.error(errorMessage)
      }
    }
  }

  return (
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard content="Thank you for updating this batch!" to="/adminDashboard/batch"/>) 
    : (<Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="mb-8 flex flex-col items-center">
                  <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
                    Edit Batch Form
                  </h1>
                  <Label className="text-gray-500 lg:text-sm text-xs text-center">Edit batch entries here</Label>
                  </div>
        <MultiDayTimeEntry onEntriesChange={handleDateTimeEntriesChange} />

        {/* Start Date and Timezone Selector */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="date"
                    title="Start Date"
                    className="bg-white py-6 rounded-xl shadow-none"
                  />
                </FormControl>
                <FormDescription>
                  Edit start date. This will be displayed in batch entries
                  table.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeZone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="py-6 w-full rounded-xl shadow-none">
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <FormDescription>
                    Edit timezone. This will be displayed in batch entries
                    table.
                  </FormDescription>
                  <SelectContent>
                    {timezone.map((item) => (
                      <SelectItem value={item.name} key={item.id}>
                        {item.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Batch Name and Number of Classes */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="batch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    type="text"
                    title="Batch Name"
                    className="h-12 rounded-xl shadow-none"
                  />
                </FormControl>
                <FormDescription>
                  This disabled field is for batch name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfClasses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Classes</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    type="number"
                    className="h-12 rounded-xl shadow-none"
                  />
                </FormControl>
                <FormDescription>
                  This disabled field is for number of classes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Student Name and Teacher Name */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    type="text"
                    title="Student Name"
                    className="h-12 rounded-xl shadow-none"
                  />
                </FormControl>
                <FormDescription>
                  This disabled field is for student full name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teacher Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    type="text"
                    title="Teacher"
                    className="h-12 rounded-xl shadow-none"
                  />
                </FormControl>
                <FormDescription>
                  This disabled field is for teacher name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Contact Details and Email Address */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <div className="w-full max-w-md">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Details</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country={"ae"}
                      {...field}
                      inputStyle={{ width: "100%", height: "48px" }}
                      inputProps={{ ref: field.ref, required: true }}
                      disabled
                    />
                  </FormControl>
                  <FormDescription>
                    This disabled field is for mobile number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    type="email"
                    title="Email Address"
                    className="h-12 rounded-xl shadow-none"
                  />
                </FormControl>
                <FormDescription>
                  This disabled field is for email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Switch color coding and Color code */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="isColorCoding"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Color Coding</FormLabel>
                  <FormDescription>
                    This field is for applying unique color code.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    title="Switch to Color Coding"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("isColorCoding") && (
            // <FormField
            //   control={form.control}
            //   name="colorCode"
            //   render={({ field }) => (
            //     <FormItem>
            //       <FormLabel>Color Code</FormLabel>
            //       <FormControl>
            //         <div className="flex items-center gap-2">
            //           <Input
            //             {...field}
            //             disabled
            //             title="Color Code"
            //             className="h-12 bg-accent-foreground rounded-xl shadow-none"
            //           />
            //           <div
            //             style={{ backgroundColor: field.value }}
            //             className="py-4 px-4 rounded-full border-2"
            //           ></div>
            //         </div>
            //       </FormControl>
            //       <FormDescription>This is disabled color coding field.</FormDescription>
            //       <FormMessage />
            //     </FormItem>
            //   )}
            // />
            <div className="flex flex-col items-center gap-4">
              <HexColorPicker color={color} onChange={setColor} className="max-w-md w-full" />
              <div className="flex items-center gap-2">
                <p>{color}</p>
                <div
                  style={{ backgroundColor: color}}
                  className="py-4 px-4 rounded-full border-2"
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Batch Completed (yes/no) */}
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Completed?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    className="py-6 w-full rounded-xl shadow-none"
                    title="batch Completed Drop-Down"
                  >
                    <SelectValue defaultValue={"No"} />
                  </SelectTrigger>
                </FormControl>
                <FormDescription>
                  Select YES or NO. This will be dispalyed in batch entries
                  table.
                </FormDescription>
                <SelectContent>
                  <SelectItem value={"Yes"}>{"YES"}</SelectItem>
                  <SelectItem value={"No"}>{"NO"}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          name={isSubmitting ? "Updating..." : "Update"}
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </Form>)}
    </>
  );
}
