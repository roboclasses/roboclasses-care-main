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
import MultiDateTimeEntry from "./MultiDateTimeEntry";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NormalClassUrl } from "@/constants";

// Define form schema
const FormSchema = z.object({
  teacher: z.string().min(2, { message: "Teacher name must be at least 2 characters long." }),
  batch: z.string().min(2, { message: "Batch name must be at least 2 characters long." }),
  userName: z.string().min(2, { message: "Student name must be at least 2 characters long." }),
  destination: z.string().min(7, { message: "Phone number must be valid." }),
  dateTimeEntries: z.array(z.object({
    date: z.string(),
    time: z.string(),
  })).optional(),
});

export function EditNormalClassForm() {
  const { id } = useParams();
  const [dateTimeEntries, setDateTimeEntries] = useState([]);

  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacher: "",
      batch: "",
      userName: "",
      destination: "+971",
      dateTimeEntries: [],
    },
  });

  // Fetch normal class details and update form values
  useEffect(() => {
    const fetchNormalClassDetails = async () => {
      try {
        const res = await axios.get(`${NormalClassUrl}/${id}`, {
          headers: { Authorization: Cookies.get("token") },
        });

        const normalClassDetails = res.data;

        form.reset({
          teacher: normalClassDetails.teacher || "",
          batch: normalClassDetails.batch || "",
          userName: normalClassDetails.userName || "",
          destination: normalClassDetails.destination || "+971",
          dateTimeEntries: normalClassDetails.dateTimeEntries || [],
        });
      } catch (error) {
        console.error("Failed to fetch normal class details:", error);
      }
    };

    fetchNormalClassDetails();
  }, [id, form]);

  // Handle multiple date and time add, remove and update
  const handleDateTimeEntriesChange = (entries) => {
    setDateTimeEntries(entries);
    form.setValue("dateTimeEntries", entries); // Update form value
  };

  // Submit handler
  async function onSubmit(data) {
    try {
      const transformedDateTimeEntries = {
        date: dateTimeEntries.map(entry => entry.date), // Extract all dates into an array
        time: dateTimeEntries.map(entry => entry.time), // Extract all times into an array
      };

      const payload = {
        ...data,
        ...transformedDateTimeEntries
      };

      const res = await axios.put(`${NormalClassUrl}/${id}`, payload, {
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
        description: "Unable to update normal class",
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
        <MultiDateTimeEntry onEntriesChange={handleDateTimeEntriesChange} />

        {/* Student Name */}
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Student Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Phone</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" required />
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
                <Input {...field} disabled className="bg-white" required />
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
                <Input {...field} disabled className="bg-white" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}