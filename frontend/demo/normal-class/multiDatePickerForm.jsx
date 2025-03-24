"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
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

import { NewBatchEntryUrl, NormalClassUrl, StudentRegUrl } from "@/constants";
import StudentSearch from "./StudentSearch";
import SubmitButton from "../button-demo/SubmitButton";
import { weekDays } from "@/data/dataStorage";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'


// For mapping time value to send reminder checkbox
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
  items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select atleast one item"}),
  batch: z.string().min(2, { message: "Batch Name must be atleast 2 characters long"}),
  userName: z.string().min(3, { message:"Student Name must be atlest 3 characters long"}),
  destination:z.string().optional(),
  email:z.string().optional(),
  teacher: z.string().optional(),
  allDates: z.array(
    z.object({
      date: z.string(),
      time: z.string(),
      weekDay: z.string(),
    })
  ).optional(),
  timeZone:z.string().optional(),
  numberOfClasses:z.string().optional(),
});

// Calculating date, time and day by start date
const getNextClassDate = (startDate, daysOfWeek, times)=>{

  const start = new Date(startDate);
  const nextClassDates = [];

  daysOfWeek.forEach((day, index)=>{
    const targetDay = weekDays.indexOf(day);
    const startDay = start.getDay()

    let daysToAdd = targetDay - startDay;
    if(daysToAdd < 0){
      daysToAdd += 7;
    }

    const nextDate = new Date(start);
    nextDate.setDate(start.getDate() + daysToAdd);

    nextClassDates.push({
      date: new Date(nextDate).toISOString().split("T")[0], // YYYY-MM-DD
      // date: nextDate,
      time:times[index], // HH:mm
      weekDay: day, // Eg. Sunday
    })
  })
  return nextClassDates;
}

export function MultiDatePickerForm() {
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null)
  
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

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacher: "",
      userName:"",
      destination:"+971",
      email:"",
      batch: "",
      items: ["1hour"],
      date:"",
      time:"",
      weekDay:"",
      allDates: [],
      timeZone:"",
      numberOfClasses:"",
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

  // Fetch batch details (teachername, day, time, startDate)
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const res = await axios.get(`${NewBatchEntryUrl}?name=${batchName}`,{headers: { Authorization: Cookies.get("token") }})

        if(res.data){
          const selectedBatch = res.data.find((item)=>item.batch === batchName)
          if(selectedBatch){
            console.log(selectedBatch.teacher);
            form.setValue("teacher",selectedBatch.teacher || '') 
            form.setValue("timeZone",selectedBatch.timeZone || '')
            form.setValue("numberOfClasses", selectedBatch.numberOfClasses || '')

            const nextClassDates = getNextClassDate(
              selectedBatch.startDate,
              selectedBatch.day,
              selectedBatch.time
            );

            if(nextClassDates.length > 0){
              form.setValue("date", nextClassDates[0].date)
              form.setValue("time", nextClassDates[0].time)
              form.setValue("weekDay", nextClassDates[0].weekDay) 
              
              form.setValue("allDates", nextClassDates);
            }
          }
        }
        
      } catch (error) {
        console.error(error);
        form.setValue("teacher", "") 
        form.setValue("timeZone", "") 
        form.setValue("numberOfClasses", "")
        form.setValue("allDates", []) 
      }
    }
    if(batchName){
      handleFetch()
    }

  },[batchName, form])

  // Handle form status
  const {isSubmitting} = form.formState;

  
  async function onSubmit(data) {
    try {
      const mappedDates = {
      date: data.allDates.map(item=>item.date),
      time: data.allDates.map(item=>item.time),
      weekDay: data.allDates.map(item=>item.weekDay)
      }   
      const payload = {...data,...mappedDates};
      
      const res = await axios.post(NormalClassUrl, payload, {
        headers: { Authorization: Cookies.get("token") },
      });
  
      console.log(res.data);
      form.reset();

      const {message} = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });
    } catch (error) {
      if(error instanceof AxiosError){
        const {message} = error.response?.data
        console.error(error);
        toast({ title: "Failed ", description: message || 'An unknown error has occurred.', variant: "destructive" });  
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >

    {/* Calculated Date, Time and Weekday */}
{form.watch("allDates")?.map((entry, index) => (
  <div key={index} className="flex gap-2 items-center">
    <FormField
      control={form.control}
      name={`allDates.${index}.date`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">Date</FormLabel>
          <FormControl>
            <Input
              {...field}
              required
              disabled
              type="date"
              className="bg-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`allDates.${index}.time`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">Time</FormLabel>
          <FormControl>
            <Input
              {...field}
              required
              disabled
              type="time"
              className="bg-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`allDates.${index}.weekDay`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">WeekDay</FormLabel>
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
  </div>
))}

      {/* Search Student Name */}
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
                  disabled       
                  inputStyle={{width: "320px"}}
                  inputProps={{ ref: field.ref, required: true }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Address */}
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

        {/* Batch Details */}
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

        {/* Teacher Name */}
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

        {/* Timezone */}
        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Timezone</FormLabel>
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

        {/* Number of Classes */}
        <FormField
          control={form.control}
          name="numberOfClasses"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Number of Classes</FormLabel>
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

        {/* Items */}
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

        <SubmitButton name={isSubmitting ? 'Creating...' : 'Create'} type="submit" disabled={isSubmitting}/>
      </form>
    </Form>
  );
}
