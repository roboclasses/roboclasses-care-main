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
import { DemoClassUrl } from "@/constants";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { timezone } from "./datePickerForm";

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
    userName: z.string().optional(),
    destination: z.string().optional(),
    course: z.string().optional(),
    teacher: z.string().optional(),
    date: z.string(),
    time: z.string(),
    timeZone: z.string(),
    items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select at least one item.",}),
    batchNumber: z.string().optional(),
    converted: z.string(),

  });

export function EditDemoClassForm() {
  const {id}  = useParams();
  const [userName, setUserName] = useState("");
  const [destination, setDestination] = useState("");
  const [course, setCourse] = useState("");
  const [teacher, setTeacher] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [converted, setConverted] = useState("");


  // Handle fetch batches
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${DemoClassUrl}/${id}`, { headers: { Authorization: Cookies.get("token") }});
        console.log(res.data);
        setUserName(res.data.userName)
        setDestination(res.data.destination)
        setCourse(res.data.course)
        setTeacher(res.data.teacher)
        setDate(res.data.date ? format(new Date(res.data.date), "yyyy-MM-dd") : "");
        setTime(res.data.time)
        setTimeZone(res.data.timeZone)
        setBatchNumber(res.data.batchNumber)
        setConverted(res.data.converted)
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [id]);


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      destination: "",
      course:"",
      teacher: "",
      date:"",
      time:"",
      timeZone:"",
      batchNumber: "",
      converted:"",
      items: ["1hour"],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const updatedData = {
        userName: data.userName || userName,
        destination: data.destination || destination,
        course: data.course || course,
        teacher: data.teacher || teacher,
        date: data.date || date,
        time: data.time || time,
        timeZone: data.timeZone || timeZone,
        batchNumber: data.batchNumber || batchNumber,
        converted: data.converted || converted,
        items: data.items.length > 0 ? data.items : ["1hour"], // Ensure at least one item is selected
      };
  
      const res = await axios.put(`${DemoClassUrl}/${id}`, updatedData);
  
      console.log(res.data);
      toast({
        title: "Success✅",
        description: res.data.message,
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed",
        description: "Unable to update Demo Class appointment",
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
              <FormLabel className="font-semibold">Contact Details</FormLabel>
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
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Course</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  value={course} 
                  onChange={(e)=>{
                  setCourse(e.target.value)
                  field.onChange(e) }} 
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
              <FormLabel className="font-semibold">Edit Teacher</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  value={teacher} 
                  onChange={(e)=>{
                  setTeacher(e.target.value)
                  field.onChange(e) }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Date</FormLabel>
              <FormControl>
                <Input
                  required
                  type="date"
                  {...field}
                  value={date} 
                  onChange={(e) => {
                    setDate(e.target.value);
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
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Time</FormLabel>
              <FormControl>
                <Input
                  required
                  type="time"
                  {...field}
                  value={time} 
                  onChange={(e)=>{
                  setTime(e.target.value)
                  field.onChange(e) }} 
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
                          <FormLabel className="font-semibold">Edit Timezone Details</FormLabel>
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
          name="batchNumber"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Batch Number</FormLabel>
              <Input  
                {...field}
                required 
                value={batchNumber} 
                onChange={(e)=>{
                setBatchNumber(e.target.value)
                field.onChange(e) }} 
              />
              <FormMessage />
            </FormItem>
          )}

        />
          <FormField
          control={form.control}
              name="converted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={converted}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select to convert"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value={"Yes"} >Yes</SelectItem>
                        {/* <SelectItem value={"No"} >No</SelectItem> */}
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
