"use client";
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
import { CoursesUrl } from "@/constants";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";


const FormSchema = z.object({
  course: z.string().min(3, { message: "Course name must be 3 characters long." })
});

export function EditCourseEntryForm() {
    const [course, setCourse] = useState("");
    const {id} = useParams();

    // Handle fetch course
    useEffect(()=>{
        const handleFetch = async()=>{
            try {
                const res = await axios.get(`${CoursesUrl}/${id}`)
                console.log(res.data);
                setCourse(res.data.course)
  
            } catch (error) {
                console.log(error);
 
            }
        }
handleFetch();
    },[id])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { course: "Scratch L1" }
  });


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.put(`${CoursesUrl}/${id}`, data, { headers:{ Authorization: Cookies.get("token") }});
      console.log(res.data);
      form.reset();
      
      const {message} = res.data;
      toast({
        title: "Success✅",
        description: message,
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed",
        description: "Unable to update course",
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
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Course Name</FormLabel>
              <FormControl>
                <Input
                //   placeholder=""
                  {...field}
                  required
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value); // Update the state
                    field.onChange(e); // Update the form field
                }}
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
