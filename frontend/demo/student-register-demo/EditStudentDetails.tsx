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

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { StudentRegUrl } from "@/constants";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'


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
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [destination, setDestination] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [grade, setGrade] = useState("");
  const [courses, setCourses] = useState("");


  // Handle fetch batches
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${StudentRegUrl}/${id}`, { headers: { Authorization: Cookies.get("token") }});
        console.log(res.data);
        setStudentName(res.data.studentName)
        setParentName(res.data.parentName)
        setDestination(res.data.destination)
        setEmail(res.data.email)
        setAddress(res.data.address)
        setGrade(res.data.grade)
        setCourses(res.data.courses)
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [id]);


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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const updatedData = {
        studentName: data.studentName || studentName,
        parentName: data.parentName || parentName,
        destination: data.destination || destination,
        email: data.email || email,
        address: data.address || address,
        grade: data.grade || grade,
        courses: data.courses || courses,
      };
      const res = await axios.put(`${StudentRegUrl}/${id}`, updatedData, { headers: { Authorization: Cookies.get("token") }});
      console.log(res.data);

      toast({ title: "Success✅", description: res.data.message, variant: "default" });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed", description: "Unable to update Student Details", variant: "destructive" });
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
          name="studentName"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Student Name</FormLabel>
              <Input  
                {...field}
                required 
                value={studentName} 
                onChange={(e)=>{
                setStudentName(e.target.value)
                field.onChange(e)
                 }} 
              />
              <FormMessage />
            </FormItem>
          )}
        />

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
                  value={parentName} 
                  onChange={(e)=>{
                  setParentName(e.target.value)
                  field.onChange(e) }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  value={destination}
                  onChange={(value) => {
                    setDestination(value);
                    field.onChange({ target: {value}});
                  }}
                  specialLabel= ""
                  inputStyle={{width: "440px"}}
                  inputProps={{ ref: field.ref, required: true }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  value={email} 
                  onChange={(e)=>{
                  setEmail(e.target.value)
                  field.onChange(e) }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  value={address} 
                  onChange={(e) => {
                    setAddress(e.target.value);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grade"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Grade</FormLabel>
              <Input  
                {...field}
                required 
                value={grade} 
                onChange={(e)=>{
                setGrade(e.target.value)
                field.onChange(e) }} 
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courses"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Courses</FormLabel>
              <Input  
                {...field}
                required 
                disabled
                value={courses} 
                onChange={(e)=>{
                setCourses(e.target.value)
                field.onChange(e) }} 
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
