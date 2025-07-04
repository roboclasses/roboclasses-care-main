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
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SuccessMessageCard from "@/components/reusabels/SuccessMessageCard";
import { Label } from "@/components/ui/label";


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
      toast({ title: "Success✅", description: message, variant: "default" });
    } catch (error: unknown) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response?.data
        toast({ title: "Failed", description: message || "An unknown error has occurred.", variant: "destructive" });
      }
    }
  }

  return (
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard content="Thank you for updating Course."/>) 
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
                  className="bg-muted-foreground h-12 shadow-none rounded-xl"
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
                  className="bg-muted-foreground h-12 shadow-none rounded-xl"
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
