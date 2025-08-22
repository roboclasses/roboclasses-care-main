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
import { Input } from "@/components/ui/input";

import { CoursesUrl } from "@/constants";
import SubmitButton from "../button-demo/SubmitButton";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import SuccessMessageCard from "../card-demo/SuccessMessageCard";
import { toast } from "sonner";


const FormSchema = z.object({
  course: z.string().optional(),
  numberOfClasses: z.string().trim().optional(),
});

export function EditCourseEntryForm() {
    const {id} = useParams();
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: { course: "", numberOfClasses:"", }
    });

    // Handle fetch course
    useEffect(()=>{
        const handleFetch = async()=>{
            try {
                const res = await axios.get(`${CoursesUrl}/${id}`)
                console.log(res.data);

                form.reset({
                  course: res.data.course,
                  numberOfClasses: res.data.numberOfClasses,
                })
               
            } catch (error) {
                console.log(error);
            }
        }
      handleFetch();
    },[form, id])

    // Handle form status
    const {isSubmitting, isSubmitSuccessful} = form.formState;


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        course:data.course,
        numberOfClasses:data.numberOfClasses,
      }
      const res = await axios.put(`${CoursesUrl}/${id}`, payload);
      console.log(res.data);
      
      const {message, success} = res.data;
      setIsSuccess(success)
      toast.success(message)
    } catch (error: unknown) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response?.data
        toast.error(message || 'An unknown error has occurred.')
      }
    }
  }

  return (
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard content="Thank you for updating course!" to="/adminDashboard/course"/>) 
    : (<Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
         <div className="mb-8 flex flex-col items-center">
                    <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
                      Edit Course
                    </h1>
                    <Label className="text-gray-500 lg:text-sm text-xs text-center">
                      Courses for Kids
                    </Label>
                  </div>
        {/* Course Name */}
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled         
                  className="shadow-none rounded-xl py-6"
                />
              </FormControl>
              <FormDescription>
                This field is for edit courses name. Users can see the updated value in course table.
              </FormDescription>
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
              <FormLabel>Edit Number of Classes</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  className="shadow-none rounded-xl py-6"
                />
              </FormControl>
              <FormDescription>
                This field is for edit number of classess. Users can see the updated value.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton name={isSubmitting ? 'Updating...' : 'Update'} type="submit" disabled={isSubmitting}/>
      </form>
    </Form>)}
    </>
  );
}
