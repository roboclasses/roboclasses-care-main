"use client";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubmitButton from "../button-demo/SubmitButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DemoClassUrl } from "@/constants";
import { timezone } from "@/data/dataStorage";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";
import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2";


//For mapping reminder times
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
    date: z.string().optional(),
    time: z.string().optional(),
    timeZone: z.string().optional(),
    batchNumber: z.string().optional(),
    converted: z.string().optional(),
    // items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select at least one item."}),
    items: z.array(z.string()).default([])
  });

export function EditDemoClassForm() {
  const {id}  = useParams();

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

  // Handle fetch batches
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${DemoClassUrl}/${id}`, { headers: { Authorization: Cookies.get("token") }});
        console.log(res.data);

        form.reset({
          userName: res.data.userName,
          destination: res.data.destination,
          course: res.data.course,
          teacher: res.data.teacher,
          date: res.data.date ? format(new Date(res.data.date), 'yyyy-MM-dd') : '',
          time: res.data.time,
          timeZone: res.data.timeZone,
          batchNumber: res.data.batchNumber,
          converted: res.data.converted,
        })
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [form, id]);

  // Handle form status
  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        userName: data.userName,
        destination: data.destination,
        course: data.course,
        teacher: data.teacher,
        date: data.date,
        time: data.time,
        timeZone: data.timeZone,
        batchNumber: data.batchNumber,
        converted: data.converted,
        items: data.items.length > 0 ? data.items : ["1hour"], // Ensure at least one item is selected
      };
  
      const res = await axios.put(`${DemoClassUrl}/${id}`, payload);
      console.log(res.data);

      const {message} = res.data;
      toast({ title: "Success✅", description: message, variant: "default"});
      
    } catch (error:unknown) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response?.data;
        toast({ title: "Failed", description: message || "An unknown error has occurred.", variant: "destructive"});
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
          name="userName"
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

        {/* Mobile Number */}
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Contact Details</FormLabel>
              <FormControl>
              <PhoneInput
                  country={"ae"}
                  {...field}  
                  inputStyle={{width: "320px"}}
                  inputProps={{ ref: field.ref, required: true }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Course */}
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Course</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled         
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Teacher Name */}
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Edit Teacher</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled                 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time */}
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Timezone */}
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

        {/* Batch Number */}
        <FormField
          control={form.control}
          name="batchNumber"
          render={({field}) => (
            <FormItem>
              <FormLabel className="font-semibold">Batch Number</FormLabel>
              <Input  
                {...field}
                required 
              />
              <FormMessage />
            </FormItem>
          )}

        />

        {/* Convert */}
        <FormField
          control={form.control}
              name="converted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Class Converted?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    required
                    defaultValue="No"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Yes to convert"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value={"Yes"} >Yes</SelectItem>
                        <SelectItem value={"No"} >NO</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
          )}
        />

        {/* Items for sending reminder */}
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

        <SubmitButton name={isSubmitting ? 'Updating...' : 'Upadte'} type="submit" disabled={isSubmitting}/>
      </form>
    </Form>
  );
}
