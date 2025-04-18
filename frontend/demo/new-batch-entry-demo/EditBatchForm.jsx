"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiDayTimeEntry from "./MultiDayTimeEntry";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { NewBatchEntryUrl, StudentRegUrl } from "@/constants";
import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2";
import { timezone, userTimeZone } from "@/data/dataStorage";
import SubmitButton from "../button-demo/SubmitButton";

// Define form schema
const FormSchema = z.object({
  batch: z.string().optional(),
  teacher: z.string().optional(),
  startDate: z.string().optional(),
  dayTimeEntries: z
    .array(
      z.object({
        day: z.string(),
        time: z.string(),
      })
    ).optional(),
  timeZone: z.string().optional(),
  numberOfClasses: z.string().optional(),
  studentName: z.string().optional(),
  destination: z.string().optional(),
  email: z.string().optional(),
  completed: z.string(),
});

export function EditBatchForm() {
  const { id } = useParams();
  const [dayTimeEntries, setDayTimeEntries] = useState([]);

  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batch: "",
      teacher: "",
      startDate: "",
      dayTimeEntries: [],
      timeZone: userTimeZone, // Default to user's timezone
      numberOfClasses: "",
      studentName: "",
      destination: "+971",
      email: "",
      completed: "",
    },
  });

  // Fetch batch details and update form values
  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const res = await axios.get(`${NewBatchEntryUrl}/${id}`, {headers: { Authorization: Cookies.get("token") }});

        const batchDetails = res.data;
        const initialDayTimeEntries = batchDetails.dayTimeEntries || [];

        // Initialize dayTimeEntries state
        setDayTimeEntries(initialDayTimeEntries);

        form.reset({
          batch: batchDetails.batch ,
          teacher: batchDetails.teacher ,
          startDate: batchDetails.startDate ? format(new Date(batchDetails.startDate), "yyyy-MM-dd") : "",
          dayTimeEntries: initialDayTimeEntries,
          timeZone: batchDetails.timeZone || userTimeZone,
          numberOfClasses: batchDetails.numberOfClasses,
          studentName: batchDetails.studentName,
          email: batchDetails.email,
          destination: batchDetails.destination,
          completed: batchDetails.completed,
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
    form.setValue("dayTimeEntries", entries); // Update form value
  };

  const studentName = form.watch("studentName");

  // Handle populate phone and email of a selected student
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${StudentRegUrl}?name=${studentName}`);
        if (res.data) {
          const selectedStudent = res.data.find((item) => item.studentName === studentName);
          if (selectedStudent) {
            form.setValue("destination", selectedStudent.destination || '');
            form.setValue("email", selectedStudent.email || '');
          }
        }
      } catch (error) {
        console.error(error);
        form.setValue("email", '');
        form.setValue("destination", '');
      }
    };
    handleFetch();
  }, [form, studentName]);

  // Handle form status
  const {isSubmitting} = form.formState;

  // Submit handler
  async function onSubmit(data) {
    try {
      const currentDayTimeEntries = form.getValues("dayTimeEntries") || [];
      
      const transformedDateTimeEntries = dayTimeEntries.length > 0
        ? {day: dayTimeEntries.map((item)=>item.day), time: dayTimeEntries.map((item)=>item.time)}// Use new entries directly
        : currentDayTimeEntries; // Use existing entries

      const startDate = new Date(data.startDate).toISOString().split("T")[0];

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
        ...transformedDateTimeEntries, // Ensure this is included
      };      

      const res = await axios.put(`${NewBatchEntryUrl}/${id}`, payload, { headers: { Authorization: Cookies.get("token") }});
      console.log(res.data);
      
      form.reset();

      const {message} = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });

    } catch (error) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response.data;
        toast({ title: "Error", description: message || "An unknown error has occurred.", variant: "destructive" });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <MultiDayTimeEntry onEntriesChange={handleDateTimeEntriesChange} />

        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Edit Start Date
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} className="bg-white" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Batch Name */}
        <FormField
          control={form.control}
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Batch Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  required
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Number of Classes */}
        <FormField
          control={form.control}
          name="numberOfClasses"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Number of Classes</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" required disabled/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Student Name */}
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Student Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Details */}
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Contact Details</FormLabel>
              <FormControl>
                <PhoneInput
                  country={"ae"}
                  {...field}
                  inputStyle={{width: "320px"}}
                  inputProps={{ ref: field.ref, required: true }}
                   disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Address */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
             <FormLabel className="font-semibold">Email Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled
                   className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Teacher Name */}
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Teacher Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" required disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Timezone Selector */}
        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Timezone</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Edit timezone" />
                  </SelectTrigger>
                </FormControl>
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

        {/* Batch Completed */}
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Batch Completed?</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select (Yes/No)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"Yes"}>{"Yes"}</SelectItem>
                  <SelectItem value={"No"}>{"No"}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton name={isSubmitting ? 'Updating...' : 'Update'} type="submit" disabled={isSubmitting}/>
      </form>
    </Form>
  );
}