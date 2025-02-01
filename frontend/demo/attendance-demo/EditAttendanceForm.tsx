/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { format } from "date-fns";
import axios from "axios";
import { useParams } from "next/navigation";

const FormSchema = z.object({
  batch: z
    .string()
    .min(1, { message: "Batch number must contain atleast 1 character" }),

  date: z.string({ required_error: "this field is required." }),

  score: z
    .string()
    .min(2, { message: "Assessment score must contain at least one digit" }),

  studentsPresent: z
    .string()
    .min(1, { message: "This field must contains atleast 1 digit." }),
});

export function EditAttendanceForm() {
  const { id } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batch: "",
      date: format(new Date(), "yyyy-MM-dd"),
      score: "",
      studentsPresent: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/attendances/${id}`,
        data
      );
      console.log(res.data);
      toast({
        title: "Success✅",
        description: "The attendance has been updated successfully.✅",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed ",
        description: "unable to update attendance!",
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
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Select Current Date
              </FormLabel>

              <FormControl>
                <Input type="date" {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Batch Number</FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. Python B12 L1"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentsPresent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Students Present</FormLabel>

              <FormControl>
                <Input
                  placeholder="give attendance"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Assessment Score</FormLabel>

              <FormControl>
                <Input
                  placeholder="e.g. 94%"
                  {...field}
                  required
                  className="bg-white"
                />
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
