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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import SubmitButton from "../button-demo/SubmitButton";
import { countries } from "@/data/dataStorage";
import { StudentRegUrl } from "@/constants";

import axios, { AxiosError } from "axios";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { useState } from "react";
import SuccessMessageCard from "@/components/reusabels/SuccessMessageCard";
import { Label } from "@/components/ui/label";


const FormSchema = z.object({
  studentName: z.string().min(3, { message: "Student Name must be atleast 3 characters long"}),
  parentName: z.string().min(3, { message: "Parent Name must be atleast 3 characters long"}),
  destination: z
  .string()
  .min(10, { message: "Mobile number is too short" })
  .refine((val) => {
    const digits = val.replace(/\D/g, ""); // Remove non-digit characters
    return digits.length === 12 && digits.startsWith("971");
  }, {
    message: "Please enter a valid UAE mobile number (e.g., +9715XXXXXXXX)"
  }),
  email: z.string().trim().email({message:"Please enter a valid email"}),
  address: z.string().min(3, {message: "Address must be atleast 3 characters long"}),
  country: z.string().min(2, {message: "Country must be atleast 2 characters long"}),
  grade: z.string().min(1, {message: "Grade must have minimum 1 value"}).max(2, {message: "Grade must have maximum 2 value"}),
  courses: z.string().min(2, { message: "Course must be atleast 2 characters long"}),
});

export function RegistrationForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      studentName: "",
      parentName: "",
      destination: "+971",
      email:"",
      courses: "",
      address:"",
      country:"UAE",
      grade:"",
    }
  });

  // Handle form status 
  const { isSubmitting, isSubmitSuccessful }  = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        studentName:data.studentName,
        parentName: data.parentName,
        destination: data.destination,
        email:data.email,
        address:`${data.address},${data.country}`,
        courses:data.courses,
        grade:data.grade,
      }

      const res = await axios.post(StudentRegUrl,payload);
      console.log(res.data);
      // form.reset();

      const {message, success} = res.data;
      setIsSuccess(success)
      toast({ title: "Success✅", description: message, variant:"default" });
    } catch (error:unknown) {
          if(error instanceof AxiosError){
            console.log(error);
            const {message} = error.response?.data
            toast({ title: "Failed", description: message || "An unknown error has occurred.", variant: "destructive" });
          }
        }
  }

  return (
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard content="Thank you for register. One of our teacher will reach you soon."/>) 
    : (<Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
         <div className="mb-8 flex flex-col items-center text-center">
                    <h1 className="lg:text-4xl text-2xl mb-4 font-serif">
                      Student Registration Form
                    </h1>
                    <Label className="text-gray-500 md:text-sm text-xs">
                      Register student here
                    </Label>
                  </div>
        {/* Student full name and Parent full name */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter student name"
                  {...field}
                  required
                  className="shadow-none rounded-xl h-12 bg-muted-foreground"
                />
              </FormControl>
              <FormDescription>
                This field is for student full name
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
              <FormLabel>Parent Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter parent name"
                  {...field}
                  required
                  className="shadow-none rounded-xl h-12 bg-muted-foreground"
                />
              </FormControl>
              <FormDescription>
                This field is for parent full name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        {/* Mobile number and Email address */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
               <FormLabel>Contact Details</FormLabel>
                <FormControl>
                <PhoneInput
                  country={"ae"}
                  placeholder="Parents Contact/Whatsapp number"   
                  {...field}  
                  inputStyle={{width: "320px", height: "48px"}}
                  inputProps={{ ref: field.ref, required: true }}
                />
              </FormControl>
              <FormDescription>
                This field is for mobile number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

       <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  {...field}
                  required
                  type="email"
                  className="shadow-none rounded-xl h-12 bg-muted-foreground"
                />
              </FormControl>
              <FormDescription>
                This field is for email address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        {/* Full Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loaction</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your location"
                  {...field}
                  required
                  className="shadow-none rounded-xl h-12 bg-muted-foreground"
                />
              </FormControl>
               <FormDescription>
                This field is for current address
               </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="shadow-none rounded-xl h-12">
                        <SelectValue placeholder="Select your country"/>
                      </SelectTrigger>
                    </FormControl>
                    <FormDescription>
                      This field is for country
                    </FormDescription>
                    <SelectContent>
                      {countries.map((item)=>(
                        <SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
          )}
        />
        </div>

        {/* Grade and Courses done earlier */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="courses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Courses Done</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Courses done earlier"
                  {...field}
                  required
                  className="shadow-none rounded-xl h-12 bg-muted-foreground"
                />
              </FormControl>
              <FormDescription>
                This field is for course
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Grade</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your grade"
                  {...field}
                  required
                  type="number"
                  className="shadow-none rounded-xl h-12 bg-muted-foreground"
                />
              </FormControl>
              <FormDescription>
                This field is for grade
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <SubmitButton name={isSubmitting ? 'Submitting...' : 'Register'} type="submit" disabled={isSubmitting}/>
      </form>
    </Form>)}
    </>
  );
}
