"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StudentSearch from "./StudentSearch";
import MultiDateTimeEntry from "./MultiDateTimeEntry";
import { toast } from "@/hooks/use-toast";

import { NewBatchEntryUrl, NormalClassUrl, StudentRegUrl } from "@/constants";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'


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
  items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select at least one item."}),
  batch: z.string().min(2, { message: "Batch name must be atleast 2 characters long." }),
  userName: z.string().min(2, { message:"Student name must be atlest 2 characters long." }),
  destination:z.string().optional(),
  email:z.string().optional(),
  teacher: z.string().optional(),
  dateTimeEntries: z.array(z.object({
    date: z.string(),
    time: z.string(),
  }))
});

export function MultiDatePickerForm() {

  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [dateTimeEntries, setDateTimeEntries] = useState([]);
  

// Handle fetch batches
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const res = await axios.get(NewBatchEntryUrl,{headers:{ Authorization: Cookies.get("token") }})
        console.log(res.data);
        setData(res.data)
        
      } catch (error) {
        console.log(error);  
      }
    }
    handleFetch();
  },[])

// Handle select student
  const handleStudentSelect = (student)=>{
    setSelectedStudent(student)
    form.setValue("userName",student.studentName)
  }

  // Handle multiple date and time add, remove and update
  const handleDateTimeEntriesChange = (entries) => {
    setDateTimeEntries(entries);
    form.setValue("dateTimeEntries", entries); // Update form value
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacher: "",
      userName:"",
      destination:"",
      email:"",
      batch: "",
      items: ["1hour"],
      dateTimeEntries:{
        date:"",
        time:"",
      }
      
    },
  });

  const studentName = form.watch("userName");
  const batchName = form.watch("batch");
  

  // Fetch student details (Phone & Address)
  useEffect(()=>{
    const handleFetch=async()=>{
      try {
        const res = await axios.get(`${StudentRegUrl}?name=${studentName}`)
        
        if(res.data){
          const selectedStudent = res.data.find((item)=>item.studentName === studentName)
          if(selectedStudent){
            form.setValue("destination", selectedStudent.destination || '')
            form.setValue("email",selectedStudent.email || '')
          }
        }
        
      } catch (error) {
      console.error(error);
      form.setValue("destination", "")
      form.setValue("email","")  
      }
    }
    if(studentName){
      handleFetch();
    }
  },[studentName, form])

  // Fetch batch details (teacher name)
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const res = await axios.get(`${NewBatchEntryUrl}?name=${batchName}`,{headers: { Authorization: Cookies.get("token") }})

        if(res.data){
          const selectedBatch = res.data.find((item)=>item.batch === batchName)
          if(selectedBatch){
            console.log(selectedBatch.teacher);
            form.setValue("teacher",selectedBatch.teacher || '') 
          }
        }
        
      } catch (error) {
        console.error(error);
        form.setValue("teacher", "") 
      }
    }
    if(batchName){
      handleFetch()
    }

  },[batchName, form])

  
  async function onSubmit(data) {
    try {
      const transformedDateTimeEntries = {
        date: dateTimeEntries.map(entry => new Date(entry.date)), // Extract all dates into an array
        time: dateTimeEntries.map(entry => entry.time), // Extract all times into an array
      };

      const payload = {...data, ...transformedDateTimeEntries}
      const res = await axios.post(NormalClassUrl,payload, { headers: { Authorization: Cookies.get("token") }});
      console.log(res.data);
      form.reset();
      toast({
        title: "Success✅",
        description: "Your appointment for normal class has been submitted successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error booking appointment", error);
      toast({
        title: "Failed ",
        description: "unable to submit Normal Class appointment",
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
          render={() => (
            <FormItem>
              <FormLabel className="font-semibold">Student Name</FormLabel>
              <StudentSearch onSelect={handleStudentSelect} selectedStudent={selectedStudent}/>
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
                  {...field}  
                  disabled       
                  inputStyle={{ width: "540px" }}
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
                  {...field}
                  required
                  disabled
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Batch Details</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select batch"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.map((item)=>(
                        <SelectItem value={item.batch} key={item._id}>{item.batch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Teacher Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled
                  className="bg-white"
                />
              </FormControl>
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
