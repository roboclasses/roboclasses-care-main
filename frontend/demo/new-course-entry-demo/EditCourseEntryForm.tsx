"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { CoursesUrl } from "@/constants";
import SubmitButton from "../button-demo/SubmitButton";

import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useParams } from "next/navigation";


const FormSchema = z.object({
  course: z.string().optional(),
  numberOfClasses: z.string().optional(),
});

export function EditCourseEntryForm() {
    const {id} = useParams();

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
    const {isSubmitting} = form.formState;


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        course:data.course,
        numberOfClasses:data.numberOfClasses,
      }
      const res = await axios.put(`${CoursesUrl}/${id}`, payload);
      console.log(res.data);
      form.reset();
      
      const {message} = res.data;
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
    <Form {...form}>
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
              <FormLabel className="font-semibold">Course Name</FormLabel>
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

        {/* Number of Classes */}
        <FormField
          control={form.control}
          name="numberOfClasses"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Number of Classes</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  className="bg-white"
                />
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
