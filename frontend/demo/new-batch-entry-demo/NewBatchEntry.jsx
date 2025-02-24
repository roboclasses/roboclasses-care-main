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
import { CoursesUrl, NewBatchEntryUrl } from "@/constants";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getUserSession } from "@/lib/session";
import { usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { teachers } from "@/data/dataStorage";
import MultiDayTimeEntry from "./MultiDayTimeEntry";
// import { format } from "date-fns";



const FormSchema = z.object({
  batch: z.string().min(2, { message: "Batch number must be atleast 2 characters long." }),
  course: z.string().min(2, { message: "Course name must be atleast 2 characters long." }),
  teacher: z.string().min(2, { message: "Teacher name must be atleast 2 characters long." }),
  startDate: z.string(),
  dayTimeEntries: z.array(z.object({
    day: z.string(),
    time: z.string(),
  }))
});

export function NewBatchEntryForm() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [courses, setCourses] = useState([]);

  const [dayTimeEntries, setDayTimeEntries] = useState([]);

  
// For fetching logged-in users name and role
  useEffect(() => {
    const handleFetch = async () => {
      const user = await getUserSession();
      setRole(user.role || "");
      setName(user.name || "");
    };
    handleFetch();
  }, [pathname]);

// Get courses
  useEffect(()=>{
  const handleFetch = async()=>{
    try {
      const res = await axios.get(CoursesUrl)
      console.log(res.data);
      setCourses(res.data)
    } catch (error) {
      console.error(error);
    }
  }
  handleFetch()

  },[])


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batch:"",
      course:"",
      teacher:"",
      startDate:"",
      dayTimeEntries:{
        day:"",
        time:"",
      }
    },
  });

// Handle multiple date and time add, remove and update
    const handleDateTimeEntriesChange = (entries) => {
      setDayTimeEntries(entries);
      form.setValue("dayTimeEntries", entries); // Update form value
    };


  async function onSubmit(data) {
    console.log(JSON.stringify(data));
  
    try {
      const batch = `${data.course} - ${data.batch}`
      const transformedDateTimeEntries = {
        day: dayTimeEntries.map(entry => entry.day), // Extract all dates into an array
        time: dayTimeEntries.map(entry => entry.time), // Extract all times into an array
      };
      const startDate = new Date(data.startDate)
      const payload = {
        startDate:startDate,
        teacher:data.teacher,
        batch:batch,
        ...transformedDateTimeEntries
      }
      const res = await axios.post(NewBatchEntryUrl, payload, {headers: { Authorization: Cookies.get("token") }});
      console.log(res.data);
      // form.reset();
      
      const {message} = res.data;
      toast({
        title: "Success✅",
        description: message || "New batch has been created",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed",
        description: "Unable to create batch",
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
      
      <MultiDayTimeEntry onEntriesChange={handleDateTimeEntriesChange} />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold">
                Select a Start Date
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} required className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-1 items-center">
        <Label className="font-semibold">Batch Name</Label>
        <FormField
          control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            required
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a course"/>
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
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Batch Number"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>

        <FormField
            control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Teacher Name</FormLabel>
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
                    <FormMessage/>
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
