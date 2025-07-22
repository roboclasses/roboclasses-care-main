"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { CoursesUrl } from "@/constants";
import SubmitButton from "../button-demo/SubmitButton";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import SuccessMessageCard from "@/components/reusabels/SuccessMessageCard";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  course: z
    .string()
    .min(3, { message: "Course Name must be atleast 3 characters long" }),
});

export function NewCourseEntryForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { course: "" },
  });

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.post(CoursesUrl, data);
      console.log(res.data);
      // form.reset();

      const { message, success } = res.data;
      setIsSuccess(success);
      toast({
        title: "Success✅",
        description: message,
        variant: "default",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast({
          title: "Failed",
          description: message || "An Unknown error is occurred",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard content="Thank you for creating course!"/>) 
    : (<Form {...form}>
       <div className="mb-8 flex flex-col items-center">
                  <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
                    Create a New Course
                  </h1>
                  <Label className="text-gray-500 lg:text-sm text-xs text-center">
                    Courses for Kids
                  </Label>
                </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Course Name */}
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Scratch L1"
                  {...field}
                  required
                  className="bg-muted-foreground h-12 shadow-none rounded-xl"
                />
              </FormControl>
              <FormDescription>
              Provide the name of the course you want to create. This will be displayed to users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          name={isSubmitting ? "Creating..." : "Create"}
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </Form>)}
    </>
  );
}
