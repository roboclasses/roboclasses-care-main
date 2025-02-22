"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import axios from "axios";
import 'react-phone-input-2/lib/style.css'
import { CoursesUrl, StudentRegUrl } from "@/constants";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PhoneInput from "react-phone-input-2";
import { Label } from "@/components/ui/label";
import { courseType } from "@/types/Types";



// for mapping checkbox value and label
const countries = [
  {
    id: 1,
    name: "UAE",
  },
  {
    id: 1,
    name: "INDIA",
  },
];


const FormSchema = z.object({
  studentName: z.string().min(2, { message: "student name must be atleast 2 characters long." }),
  parentName: z.string().min(2, { message: "parent name must be atleast 2 characters long." }),
  destination: z.string().min(12, { message: "mobile is incorrect." }),
  email: z.string().email({message:"email is incorrect."}),
  address: z.string().min(2, {message: "address must be atleast 2 characters long."}),
  country: z.string().min(2, {message: "country must be atleast 2 characters long."}),
  grade: z.string().min(1, {message: "grade must be atlest 1 digit long."}),
  courses: z.string().min(2, { message: "course must be atleast 2 characters long." }),
});

export function RegistrationForm() {
  const pathname = usePathname();
  const [courses, setCourses] = useState<courseType[]>([]);
  
// Handle fetching logged-in users credentials from cookie storage
  useEffect(() => {
    const handleFetch = async () => {
      const res = await axios.get(CoursesUrl)
      console.log(res.data);
      
     setCourses(res.data)
    };
    handleFetch();
  }, [pathname]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      studentName: "",
      parentName: "",
      destination: "",
      email:"",
      courses: "",
      address:"",
      country:"",
      grade:"",
    }
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      studentName:data.studentName,
      parentName: data.parentName,
      destination: data.destination,
      email:data.email,
      address:`${data.address},${data.country}`,
      courses:data.courses,
      grade:data.grade,
    }
    try {
      const res = await axios.post(StudentRegUrl,payload);
      console.log(res.data);
      
      form.reset();
      const {message} = res.data;
      toast({
        title: "Success✅",
        description: message,
        variant:"default"
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed ",
        description: "Unable to register",
        variant:"destructive"
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
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Student Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter student name"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Parent Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter parent name"
                  {...field}
                  required
                  className="bg-white"
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
               <FormLabel className="font-semibold">Contact Details</FormLabel>
                <FormControl>
                <PhoneInput
                  country={"ae"}
                  placeholder="Parents Contact/Whatsapp number"   
                  {...field}  
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
              <FormLabel className="font-semibold">Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  {...field}
                  required
                  type="email"
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
        <Label className="font-semibold">Full Address</Label>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter location"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country"/>
                      </SelectTrigger>
                    </FormControl>
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

        <FormField
          control={form.control}
              name="courses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Course Details</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((item)=>(
                        <SelectItem value={item.course} key={item._id}>{item.course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Student Grade</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your grade"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
}
