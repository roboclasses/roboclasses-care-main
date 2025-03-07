"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";

import axios, { AxiosError } from "axios";
import 'react-phone-input-2/lib/style.css'
import { DemoClassUrl } from "@/constants";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserSession } from "@/lib/session";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teachers } from "@/data/dataStorage";
import PhoneInput from "react-phone-input-2";

// for mapping checkbox value and label
const items = [
  {
    id: "24hour",
    label: "24 Hours",
  },
  {
    id: "1hour",
    label: "1 Hour",
  },
];

// For detect system timezone
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const timezone = [
  {id:0, name:"Asia/Kolkata", country:"India"},
  {id:1, name:"America/New_York", country:"USA"},
  {id:2, name:"Asia/Riyadh", country:"Saudi Arab"},
  {id:3, name:"America/Toronto", country:"Canada"},
  {id:4, name:"Asia/Dubai", country:"UAE"},
  {id:5, name:userTimeZone, country:"Your Timezone"},]


const FormSchema = z.object({
  date: z.string(),
  userName: z.string().min(3, { message: "Student Name must be atleast 3 characters long"}),
  destination: z.string().min(12, { message: "Please enter a valid phone number"}),
  course: z.string().min(2, { message: "Course must be atleast 2 characters long"}),
  teacher: z.string().min(3, { message: "Teacher name must be atleast 3 characters long"}),
  time: z.string(),
  timeZone: z.string(),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select atleast one item"}),
});

export function DatePickerForm() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  
// Handle fetching logged-in users credentials from cookie storage
  useEffect(() => {
    const handleFetch = async () => {
      const user = await getUserSession();
      setRole(user.role || "");
      setName(user.name || "");
    };
    handleFetch();
  }, [pathname]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      destination: "+971",
      course: "",
      teacher: "",
      date: "",
      time: "",
      timeZone:userTimeZone,
      items: ["1hour"],
    },
  });


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formattedDate = new Date(data.date).toISOString().split("T")[0]
      const payload = {
        userName:data.userName,
        destination: data.destination,
        course:data.course,
        teacher:data.teacher,
        time:data.time,
        timeZone:data.timeZone,
        date:formattedDate,
        items:data.items,
      }
      console.log(JSON.stringify(payload));
      
      const res = await axios.post(DemoClassUrl,payload);
      console.log(res.data);
      
      form.reset();
      toast({
        title: "Success✅",
        description: "Your appointment has been submitted successfully",
        variant:"default"
      });
    } catch (error:unknown) {
      if(error instanceof AxiosError){
        const {message} = error.response?.data
        console.error(error);
        toast({
          title: "Failed",
          description: message,
          variant:"destructive"
        });
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
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Student/Parent name"
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
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Course Details</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. - AI for kids"
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
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Teacher Details</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {role === "teacher" ? 
                        <SelectItem value={name}>{name}</SelectItem> : 
                          role === "admin" ? 
                            teachers.map((item)=>(<SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>)) : 
                              '' }
                    </SelectContent>
                  </Select>
                </FormItem>
            )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold">
                Book an Appointment
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} required min={new Date().toISOString().split('T')[0]} className="bg-white" />
              </FormControl>
              <FormDescription>
                Book an appointment for demo class
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Your time slot</FormLabel>

              <FormControl>
                <Input
                  type="time"
                  placeholder="e.g. - AI for kids"
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
              name="timeZone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Timezone Details</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                       {timezone.map((item)=>(
                        <SelectItem value={item.name} key={item.id}>{item.country}</SelectItem>
                       ))
                       }
                       
                    </SelectContent>
                  </Select>
                </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="font-bold">
                  When to send the Reminder
                </FormLabel>
                <FormDescription>
                  Select the time which you want
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Book</Button>
      </form>
    </Form>
  );
}
