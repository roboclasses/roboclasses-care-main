"use client";
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

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { NormalClassUrl } from "@/constants";
import MultiDateTimeEntry from "./MultiDateTimeEntry";

const items = [
  {
    id: "24hours",
    label: "24 Hours",
  },
  {
    id: "1hour",
    label: "1 Hour",
  },
];



const FormSchema = z.object({
  time: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select at least one time."}),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select at least one item."}),
  teacher: z.string().min(2, { message: "Teacher name must be atleast 2 characters long." }),
  batch: z.string().min(2, { message: "Batch name must be atleast 2 characters long." }),
  userName: z.string().min(2, { message: "Student name must be atlest 2 characters long." }),
  destination: z.string().min(7, { message: "Phone number must be valid." }),
  dateTimeEntries: z.array(z.object({
    date: z.string(),
    time: z.string(),
  }))
});

export function EditNormalClassForm() {
  const {id}  = useParams();

  const [destination, setDestination] = useState("");
  const [teacher, setTeacher] = useState("");
  const [batch, setBatch] = useState("");
  const [userName, setUserName] = useState("");
  const [dateTimeEntries, setDateTimeEntries] = useState([]);



  // Handle fetch batches
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${NormalClassUrl}/${id}`, { headers: { Authorization: Cookies.get("token") }});
        console.log(res.data);
        setDestination(res.data.destination)
        setTeacher(res.data.teacher)
        setBatch(res.data.batch)
        setUserName(res.data.userName)
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [id]);


    // Handle multiple date and time add, remove and update
    const handleDateTimeEntriesChange = (entries) => {
      setDateTimeEntries(entries);
      form.setValue("dateTimeEntries", entries); // Update form value
    };


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacher: "",
      userName: "",
      destination: "+971",
      batch: "",
      items: ["1hour"],
      dateTimeEntries:{
        date:"",
        time:"",
      }
    },
  });

  async function onSubmit(data) {
    try {
      const transformedDateTimeEntries = {
        date: dateTimeEntries.map(entry => entry.date), // Extract all dates into an array
        time: dateTimeEntries.map(entry => entry.time), // Extract all times into an array
      };

      const payload = {...data, ...transformedDateTimeEntries}
      const res = await axios.put(`${NormalClassUrl}/${id}`, payload,{ headers: { Authorization: Cookies.get("token") }});
      console.log(res.data);
      form.reset();
      const {message} = res.data
      toast({
        title: "Success✅",
        description: message,
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed ",
        description: "unable to update Normal Class appointment",
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

        <MultiDateTimeEntry onEntriesChange={handleDateTimeEntriesChange} />

        <FormField
          control={form.control}
          name="userName"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Student Name</FormLabel>
              <Input  
                {...field}
                required 
                value={userName} 
                onChange={(e)=>{
                setUserName(e.target.value)
                field.onChange(e)
                 }} 
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Phone</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  value={destination} 
                  onChange={(e)=>{
                  setDestination(e.target.value)
                  field.onChange(e) }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="batch"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Batch Details</FormLabel>
              <Input  
                {...field}
                required 
                value={batch} 
                onChange={(e)=>{
                setBatch(e.target.value)
                field.onChange(e) }} 
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teacher"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Teacher Details</FormLabel>
              <Input  
                {...field}
                required 
                value={teacher} 
                onChange={(e)=>{
                setTeacher(e.target.value)
                field.onChange(e) }} 
              />
              <FormMessage />
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
