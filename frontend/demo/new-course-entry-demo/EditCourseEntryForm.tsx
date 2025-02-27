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
  course: z.string().optional(),
  numberOfClasses: z.string().optional(),
});

export function EditCourseEntryForm() {
    const [course, setCourse] = useState("");
    const [numberOfClasses, setNumbeOfClasses] = useState("");
    const {id} = useParams();

    // Handle fetch course
    useEffect(()=>{
        const handleFetch = async()=>{
            try {
                const res = await axios.get(`${CoursesUrl}/${id}`)
                console.log(res.data);
                setCourse(res.data.course)
                setNumbeOfClasses(res.data.numberOfClasses)
            } catch (error) {
                console.log(error);
 
            }
        }
handleFetch();
    },[id])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { course: "", numberOfClasses:"", }
  });


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        course:data.course || course,
        numberOfClasses:data.numberOfClasses || numberOfClasses,
      }
      const res = await axios.put(`${CoursesUrl}/${id}`, payload, { headers:{ Authorization: Cookies.get("token") }});
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
                  {...field}
                  required
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value); 
                    field.onChange(e); 
                }}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfClasses"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Number of Classes</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  value={numberOfClasses}
                  onChange={(e) => {
                    setNumbeOfClasses(e.target.value); 
                    field.onChange(e); 
                }}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
