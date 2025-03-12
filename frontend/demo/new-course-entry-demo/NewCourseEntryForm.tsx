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
import axios, { AxiosError } from "axios";


const FormSchema = z.object({
  course: z.string().min(3, { message: "Course Name must be atleast 3 characters long" })
});

export function NewCourseEntryForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { course: "" }
  });


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.post(CoursesUrl, data);
      console.log(res.data);
      form.reset();
      
      const {message} = res.data;
      toast({
        title: "Success✅",
        description: message,
        variant: "default",
      });
    } catch (error:unknown) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response?.data;
        toast({ title: "Failed", description: message || "An Unknown error is occurred", variant: "destructive" })
      }
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
                  placeholder="Scratch L1"
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
