"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
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
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import SuccessMessageCard from "@/components/reusabels/SuccessMessageCard";
import { Label } from "@/components/ui/label";

// Define form schema
const FormSchema = z.object({
  teacher: z.string().min(3, "Teacher name must be atleast 3 characters long"),
  batch: z.string().nonempty("Please select a batch").min(2, "Batch Name must be atleast 2 characters long"),
  userName: z.string().min(3, "Student Name must be atlest 3 characters long"),
 destination: z
    .string()
    .min(10, { message: "Mobile number is too short" })
    .refine((val) => {
      const digits = val.replace(/\D/g, ""); // Remove non-digit characters
      return digits.length === 12 && digits.startsWith("971");
    }, { message: "Please enter a valid UAE mobile number (e.g., +971XXXXXXX)" }),
  dateTimeEntries: z
    .array(
      z.object({
        date: z.string(),
        time: z.string(),
      })
    ).optional(),
});

export function EditNormalClassForm() {
  const { id } = useParams();
  const [dateTimeEntries, setDateTimeEntries] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

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

        const initialDateTimeEntries = normalClassDetails.dateTimeEntries || [];

        //Initialize dayTimeEntries state
        setDateTimeEntries(initialDateTimeEntries);

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
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  // Submit handler
  async function onSubmit(data) {
    try {
      const currentDateTimeEntries = form.getValues("dateTimeEntries") || [];
      const transformedDateTimeEntries =
        dateTimeEntries.length > 0
          ? {
              date: dateTimeEntries.map((entry) => entry.date), // Extract all dates into an array
              time: dateTimeEntries.map((entry) => entry.time), // Extract all times into an array
            }
          : currentDateTimeEntries;

      const payload = {
        ...data,
        ...transformedDateTimeEntries,
      };
      const res = await axios.put(`${NormalClassUrl}/${id}`, payload);

      const { message, success } = res.data;
      setIsSuccess(success);
      toast({ title: "Success✅", description: message, variant: "default" });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response.data;
        toast({
          title: "Error",
          description: message || "An unknown error has occurred.",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard content="Thank you for updating normal class! One of our teachers will contact you soon."/>) 
    : (<Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="mb-8 flex flex-col items-center text-center">
                  <h1 className="lg:text-4xl text-2xl mb-4 font-serif">
                    Edit Normal Class Form
                  </h1>
                  <Label className="text-gray-500 md:text-sm text-xs">Edit appointment for normal class here</Label>
                  </div>
        {/* Date and Time */}
        <MultiDateTimeEntry onEntriesChange={handleDateTimeEntriesChange} />

        {/* Student Name */}
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
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
                This disabled field is for student name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <div className="w-full max-w-md">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Details</FormLabel>
                <FormControl>
                  <PhoneInput
                    disabled
                    country={"ae"}
                    {...field}
                    inputStyle={{ width: "100%", height: "48px" }}
                    inputProps={{ ref: field.ref, required: true }}
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

        {/* Batch Name */}
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

        {/* Teacher Name */}
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Teacher Name</FormLabel>
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
