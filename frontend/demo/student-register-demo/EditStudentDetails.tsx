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
import { Input } from "@/components/ui/input";
import { StudentRegUrl } from "@/constants";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import SubmitButton from "../button-demo/SubmitButton";
import SuccessMessageCard from "@/components/reusabels/SuccessMessageCard";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  studentName: z.string().min(3, {message: "Student name must be atleast 3 character long"}),
  parentName: z.string().min(3, {message: "Parent name must be atleast 3 character long"}),
  destination: z
  .string()
  .min(10, { message: "Mobile number is too short" })
  .refine((val) => {
    const digits = val.replace(/\D/g, ""); // Remove non-digit characters
    return digits.length === 12 && digits.startsWith("971");
  }, {
    message: "Please enter a valid UAE mobile number"
  }),
  email: z.string().trim().email({message: "Please enter a valid email"}),
  address: z.string().min(3, {message: "Address must be atleast 3 character long"}),
  grade: z.string().min(1, {message: "Grade must have minimum 1 value"}).max(2, {message: "Grade must have maximum 2 value"}),
  courses: z.string().optional(),
});

export function EditStudentDetails() {
  const { id } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      studentName: "",
      parentName: "",
      destination: "",
      email: "",
      address: "",
      grade: "",
      courses: "",
    },
  });

  // Handle fetch batches
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${StudentRegUrl}/${id}`, {
          headers: { Authorization: Cookies.get("token") },
        });
        console.log(res.data);
        form.reset({
          studentName: res.data.studentName,
          parentName: res.data.parentName,
          destination: res.data.destination,
          email: res.data.email,
          address: res.data.address,
          grade: res.data.grade,
          courses: res.data.courses,
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [form, id]);

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {    
    try {
      const payload = {
        studentName: data.studentName,
        parentName: data.parentName,
        destination: data.destination,
        email: data.email,
        address: data.address,
        grade: data.grade,
        courses: data.courses,
      };
      const res = await axios.put(`${StudentRegUrl}/${id}`, payload, {headers: { Authorization: Cookies.get("token") }});
      console.log(res.data);

      const { message, success } = res.data;
      setIsSuccess(success)
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
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard content="Thank you for update. One of our teacher will reach you soon."/>) 
    : (<Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="lg:text-4xl text-2xl mb-4 font-serif">
              Edit registration Form
            </h1>
            <Label className="text-gray-500 md:text-sm text-xs">
              Edit student details
            </Label>
          </div>
        {/* Student Full Name and Parent Full Name */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="text"
                    title="Edit Student Full Name"
                    className="shadow-none rounded-xl h-12 bg-muted-foreground"
                  />
                </FormControl>
                <FormDescription>
                  Edit student name. This will be displayed to student table.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="text"
                    title="Edit Parent Full Name"
                    className="shadow-none rounded-xl h-12 bg-muted-foreground"
                  />
                </FormControl>
                <FormDescription>
                  Edit parent name. This will be displayed to student table.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Student/Parent Mobile Number and Email Address */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <div className="w-full max-w-md">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edit Contact Details</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country={"ae"}
                      placeholder="Parents Contact/Whatsapp number"
                      {...field}
                      inputStyle={{ width: "100%", height: "45px" }}
                      inputProps={{ ref: field.ref, required: true }}
                    />
                  </FormControl>
                  <FormDescription>
                    Edit mobile number. This will be displayed to student table.
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
                <FormLabel>Edit Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="email"
                    title="Edit Email Address"
                    className="shadow-none rounded-xl h-12 bg-muted-foreground"
                  />
                </FormControl>
                <FormDescription>
                  Edit email address. This will be displayed to student table.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Grade and Course Persued */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edit Grade</FormLabel>
                <FormControl>
                  <Input
                    required
                    {...field}
                    type="number"
                    title="Edit Grade"
                    className="shadow-none rounded-xl h-12 bg-muted-foreground"
                  />
                </FormControl>
                <FormDescription>
                  Edit student grade. This will be displayed to student table.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="courses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Courses done</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    {...field}
                    type="text"
                    title="Courses Done"
                    className="shadow-none rounded-xl h-12"
                  />
                </FormControl>
                <FormDescription>
                  This disabled field is for Courses which student persued.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Full Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edit Full Address</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  type="text"
                  title="Edit Full Address"
                  className="shadow-none rounded-xl h-12 bg-muted-foreground"
                />
              </FormControl>
              <FormDescription>
                Edit student address. This will be displayed to student table.
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
