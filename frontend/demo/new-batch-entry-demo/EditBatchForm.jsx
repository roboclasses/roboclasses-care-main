"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
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
import { NewBatchEntryUrl } from "@/constants";

// Get user's timezone
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const timezoneOptions = [
  { id: 0, name: "Asia/Kolkata", country: "India" },
  { id: 1, name: "America/New_York", country: "USA" },
  { id: 2, name: "Asia/Riyadh", country: "Saudi Arabia" },
  { id: 3, name: "America/Toronto", country: "Canada" },
  { id: 4, name: "Asia/Dubai", country: "UAE" },
  { id: 5, name: userTimeZone, country: "Your Timezone" },
];

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
    )
    .optional(),
  timeZone: z.string().optional(),
  numberOfClasses: z.string().optional(),
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

        form.reset({
          batch: batchDetails.batch || "",
          teacher: batchDetails.teacher || "",
          startDate: batchDetails.startDate ? format(new Date(batchDetails.startDate), "yyyy-MM-dd") : "",
          dayTimeEntries: {...batchDetails.dayTimeEntries} || [],
          timeZone: batchDetails.timeZone || userTimeZone,
          numberOfClasses: batchDetails.numberOfClasses || "",
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


  // Submit handler
  async function onSubmit(data) {
    try {
      const transformedDateTimeEntries = {
        day: dayTimeEntries.map(entry => entry.day), // Extract all dates into an array
        time: dayTimeEntries.map(entry => entry.time), // Extract all times into an array
      };
      const startDate = new Date(data.startDate).toISOString().split("T")[0];

      const payload = {
        batch:data.batch, 
        startDate,
        teacher: data.teacher,
        timeZone:data.timeZone,
        numberOfClasses:data.numberOfClasses,
        ...transformedDateTimeEntries
      };

      const res = await axios.put(`${NewBatchEntryUrl}/${id}`, payload, {
        headers: { Authorization: Cookies.get("token") },
      });

      form.reset();
      toast({
        title: "Success✅",
        description: res.data.message,
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Unable to update batch",
        variant: "destructive",
      });
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
                Select a Start Date
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
                  placeholder="Batch Number"
                  {...field}
                  className="bg-white"
                  required
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
              <FormLabel className="font-semibold">Number of Classes</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" required />
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
                <Input {...field} className="bg-white" required />
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
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timezoneOptions.map((item) => (
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
