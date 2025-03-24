"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import SubmitButton from "../button-demo/SubmitButton";
import { NormalClassUrl } from "@/constants";
import MultiDateTimeEntry from "./MultiDateTimeEntry";

import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2";

// Define form schema
const FormSchema = z.object({
  teacher: z.string().optional(),
  batch: z.string().optional(),
  userName: z.string().optional(),
  destination: z.string().optional(),
  dateTimeEntries: z.array(z.object({
    date: z.string(),
    time: z.string(),
  })).optional(),
});

export function EditNormalClassForm() {
  const { id } = useParams();
  const [dateTimeEntries, setDateTimeEntries] = useState([]);

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
        const res = await axios.get(`${NormalClassUrl}/${id}`);

        const normalClassDetails = res.data; 

        const initialDateTimeEntries = normalClassDetails.dateTimeEntries || []

        //Initialize dayTimeEntries state
        setDateTimeEntries(initialDateTimeEntries)

        form.reset({
          teacher: normalClassDetails.teacher,
          batch: normalClassDetails.batch,
          userName: normalClassDetails.userName,
          destination: normalClassDetails.destination,
          dateTimeEntries: initialDateTimeEntries,
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

  // Handle form status
  const {isSubmitting} = form.formState;

  // Submit handler
  async function onSubmit(data) {
    try {
      const currentDateTimeEntries = form.getValues("dateTimeEntries") || []
      const transformedDateTimeEntries = dateTimeEntries.length > 0 ? {
        date: dateTimeEntries.map(entry => entry.date), // Extract all dates into an array
        time: dateTimeEntries.map(entry => entry.time), // Extract all times into an array
      } : currentDateTimeEntries

      const payload = {
        ...data,
        ...transformedDateTimeEntries
      };
      const res = await axios.put(`${NormalClassUrl}/${id}`, payload);

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
              <FormLabel className="font-semibold">Contact Details</FormLabel>
              <FormControl>
                <PhoneInput
                  country={"ae"}
                  {...field}  
                  inputStyle={{width: "320px"}}
                  inputProps={{ ref: field.ref, required: true }}
                />
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

        <SubmitButton name={isSubmitting ? 'Updating...' : 'Update'} type="submit" disabled={isSubmitting}/>
      </form>
    </Form>
  );
}