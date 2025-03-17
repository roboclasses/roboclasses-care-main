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

import axios, { AxiosError } from "axios";
import { StudentRegUrl } from "@/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { Label } from "@/components/ui/label";
import { countries } from "@/data/dataStorage";


const FormSchema = z.object({
  studentName: z.string().min(3, { message: "Student Name must be atleast 3 characters long"}),
  parentName: z.string().min(3, { message: "Parent Name must be atleast 3 characters long"}),
  destination: z.string().min(12, { message: "Please enter a valid phone number"}),
  email: z.string().email({message:"Please enter a valid email"}),
  address: z.string().min(3, {message: "Address must be atleast 3 characters long"}),
  country: z.string().min(2, {message: "Country must be atleast 2 characters long"}),
  grade: z.string().min(1, {message: "Grade must be atlest 1 digit long"}),
  courses: z.string().min(2, { message: "Course must be atleast 2 characters long"}),
});

export function RegistrationForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      studentName: "",
      parentName: "",
      destination: "+971",
      email:"",
      courses: "",
      address:"",
      country:"",
      grade:"",
    }
  });

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
      form.reset();

      const {message} = res.data;
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
                  inputStyle={{width: "336px"}}
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
              <FormLabel className="font-semibold">Courses Done</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Courses done earlier"
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
