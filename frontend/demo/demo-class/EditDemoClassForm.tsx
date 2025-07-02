"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "../button-demo/SubmitButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DemoClassUrl } from "@/constants";
import { timezone } from "@/data/dataStorage";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Switch } from "@/components/ui/switch";

//For mapping reminder times
const items = [
  {
    id: "24hours",
    label: "24 Hours",
  },
  {
    id: "1hour",
    label: "1 Hour",
  },
];

const FormSchema = z.object({
  userName: z.string().min(3, 'Username must be atleast 3 character long.'),
  destination: z
  .string()
  .min(10, { message: "Mobile number is too short" })
  .refine((val) => {
    const digits = val.replace(/\D/g, ""); // Remove non-digit characters
    return digits.length === 12 && digits.startsWith("971");
  }, { message: "Please enter a valid UAE mobile number (e.g., +971XXXXXXX)" }),
  course: z.string().min(2, "Course name must be atleast 2 character long"),
  teacher: z.string().min(3, "Teacher name must be atleast 3 character long"),
  date: z.string(),
  time: z.string(),
  timeZone: z.string(),
  batchNumber: z.string().trim().min(3, 'Batch number must be atleast 3 character long.'),
  converted: z.string(),
  // items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select at least one item."}),
  items: z.array(z.string()).default([]),
  isCompensationClass: z.boolean(),
});

export function EditDemoClassForm() {
  const { id } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      destination: "",
      course: "",
      teacher: "",
      date: "",
      time: "",
      timeZone: "",
      batchNumber: "",
      converted: "",
      items: ["1hour"],
      isCompensationClass:false,
    },
  });

  // Handle fetch batches
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${DemoClassUrl}/${id}`, {
          headers: { Authorization: Cookies.get("token") },
        });
        console.log(res.data);

        form.reset({
          userName: res.data.userName,
          destination: res.data.destination,
          course: res.data.course,
          teacher: res.data.teacher,
          date: res.data.date
            ? format(new Date(res.data.date), "yyyy-MM-dd")
            : "",
          time: res.data.time,
          timeZone: res.data.timeZone,
          batchNumber: res.data.batchNumber,
          converted: res.data.converted,
          items: res.data.items ?? [],
          isCompensationClass: res.data.isCompensationClass,
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [form, id]);

  // Handle form status
  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        userName: data.userName,
        destination: data.destination,
        course: data.course,
        teacher: data.teacher,
        date: data.date,
        time: data.time,
        timeZone: data.timeZone,
        batchNumber: data.batchNumber,
        converted: data.converted,
        items: data.items.length > 0 ? data.items : ["1hour"], // Ensure at least one item is selected
        isCompensationClass: data.isCompensationClass,
      };

      const res = await axios.put(`${DemoClassUrl}/${id}`, payload);
      console.log(res.data);

      const { message } = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast({
          title: "Failed",
          description: message || "An unknown error has occurred.",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Student Full Name and Mobile Number */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="text"
                    title="Full Name"
                    className="shadow-none rounded-xl h-12 bg-muted-foreground"
                  />
                </FormControl>
                <FormDescription>
                  Edit student name, this will be displayed in demo-class table.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    />
                  </FormControl>
                  <FormDescription>
                    Edit mobile number, this will be displayed in demo-class
                    table.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Course and Teacher Name */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    type="text"
                    title="Course"
                    className="shadow-none rounded-xl h-12"
                  />
                </FormControl>
                <FormDescription>
                  This disabled field is for course name.
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
                    title="Teacher Name"
                    className="shadow-none rounded-xl h-12"
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

        {/* Date and Time*/}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="date"
                    title="Date"
                    className="shadow-none rounded-xl h-12 bg-muted-foreground"
                  />
                </FormControl>
                <FormDescription>
                  Edit appointment date, this will be displayed in demo-class
                  table.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="time"
                    title="Date"
                    className="shadow-none rounded-xl h-12 bg-muted-foreground"
                  />
                </FormControl>
                <FormDescription>
                  Edit appointment date, this will be displayed in demo-class
                  table.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Batch Number and Class Converter drop-down (yes/no) */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        <FormField
          control={form.control}
          name="batchNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  type="text"
                  title="Batch Number"
                  placeholder="Enter batch number"
                  className="shadow-none rounded-xl h-12 bg-muted-foreground"
                />
              </FormControl>
              <FormDescription>
                Enter batch number. This will displayed to demo-class table.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="converted"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Converted?</FormLabel>
              <Select onValueChange={field.onChange} required defaultValue="No">
                <FormControl>
                  <SelectTrigger className="shadow-none rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <FormDescription>
                  Select YES or NO. This will displayed to demo-class table.
                </FormDescription>
                <SelectContent>
                  <SelectItem value={"Yes"}>YES</SelectItem>
                  <SelectItem value={"No"}>NO</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        </div>

        {/* Timezone */}
        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Edit Timezone Details
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger className="shadow-none rounded-xl h-12">
                    <SelectValue defaultValue={field.value}/>
                  </SelectTrigger>
                </FormControl>
                <FormDescription>
                  Edit timezone. This will displayed to demo-class table.
                </FormDescription>
                <SelectContent>
                  {timezone.map((item) => (
                    <SelectItem value={item.name} key={item.id}>
                      {item.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

         {/* Switch to Compensation Class */}
                <FormField
                            control={form.control}
                            name="isCompensationClass"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>Convert to Compensation Class</FormLabel>
                                  <FormDescription>
                                    This field is for converting demo class to compensation class.
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    title="Convert to Compensation Class"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

        {/* Items for sending reminder */}
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="font-bold">
                  When to send the Reminder
                </FormLabel>
                <FormDescription>
                  Select the time which you want
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          name={isSubmitting ? "Updating..." : "Upadte"}
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}
