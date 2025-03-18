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
import { Input } from "@/components/ui/input";
import { StudentRegUrl } from "@/constants";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

import { useParams } from "next/navigation";
import { useEffect} from "react";
import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";


const FormSchema = z.object({
    studentName: z.string().optional(),
    parentName: z.string().optional(),
    destination: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    grade: z.string().optional(),
    courses: z.string().optional(),
  });

  
export function EditStudentDetails() {
  const {id}  = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        studentName: "",
        parentName: "",
        destination: "",
        email:"",
        address:"",
        grade:"",
        courses: "",
    },
  });

  // Handle fetch batches
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${StudentRegUrl}/${id}`, { headers: { Authorization: Cookies.get("token") }});
        console.log(res.data);
        form.reset({
          studentName: res.data.studentName,
          parentName: res.data.parentName,
          destination: res.data.destination,
          email: res.data.email,
          address: res.data.address,
          grade: res.data.grade,
          courses: res.data.courses,
        })
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [form, id]);


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const updatedData = {
        studentName: data.studentName,
        parentName: data.parentName,
        destination: data.destination,
        email: data.email,
        address: data.address,
        grade: data.grade,
        courses: data.courses,
      };
      const res = await axios.put(`${StudentRegUrl}/${id}`, updatedData);
      console.log(res.data);

      const {message} = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });
    } catch (error:unknown) {
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
        {/* Student Full Name */}
        <FormField
          control={form.control}
          name="studentName"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Student Name</FormLabel>
              <Input  
                {...field}
                required  
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent Full Name */}
        <FormField
          control={form.control}
          name="parentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Parent Name</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}                  
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Student/Parent Mobile Number */}
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Contact Details</FormLabel>
              <FormControl>
              <PhoneInput
                  country={"ae"}
                  placeholder="Parents Contact/Whatsapp number"   
                  {...field}  
                  inputStyle={{width: "336px"}}
                  inputProps={{ ref: field.ref, required: true }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Address */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Email Address</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}                
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Full Address</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}                 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Grade */}
        <FormField
          control={form.control}
          name="grade"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Grade</FormLabel>
              <Input  
                {...field}
                required                
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Courses */}
        <FormField
          control={form.control}
          name="courses"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Courses done</FormLabel>
              <Input  
                {...field}
                required 
                disabled              
              />
              <FormMessage />
            </FormItem>
          )}
        />
         
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
