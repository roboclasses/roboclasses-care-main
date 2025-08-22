"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import SubmitButton from "../button-demo/SubmitButton";
import { weekDays } from "@/data/dataStorage";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { Label } from "@/components/ui/label";
import StudentSearch from "../search-demo/StudentSearch";
import SuccessMessageCard from "../card-demo/SuccessMessageCard";
import { toast } from "sonner";


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
  // items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select atleast one item"}),
  items: z.array(z.string()).default([]),
  batch: z.string().nonempty("Please select a batch").min(2, "Batch Name must be atleast 2 characters long"),
  userName: z.string().min(3, "Student Name must be atlest 3 characters long"),
  destination: z
    .string()
    .min(10, { message: "Mobile number is too short" })
    .refine((val) => {
      const digits = val.replace(/\D/g, ""); // Remove non-digit characters
      return digits.length === 12 && digits.startsWith("971");
    }, { message: "Please enter a valid UAE mobile number (e.g., +971XXXXXXX)" }),
  email:z.string().trim().email("Please enter a valid email"),
  teacher: z.string().min(3, "Teacher name must be atleast 3 characters long"),
  allDates: z.array(
    z.object({
      date: z.string(),
      time: z.string(),
      weekDay: z.string(),
    })
  ).optional(),
  timeZone:z.string().nonempty("Please select a timezone"),
  numberOfClasses:z.string().trim().max(3, "Number of classes must contains maximum of 3 digit"),
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

export function NormalClassForm() {
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  
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
        const res = await axios.get(`${NewBatchEntryUrl}?name=${batchName}`, {headers: {Authorization: Cookies.get("token")}})

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
  const {isSubmitting, isSubmitSuccessful} = form.formState;

  
  async function onSubmit(data) {
    try {
      const mappedDates = {
      date: data.allDates.map(item=>item.date),
      time: data.allDates.map(item=>item.time),
      weekDay: data.allDates.map(item=>item.weekDay)
      }   
      const payload = {...data,...mappedDates};
      
      const res = await axios.post(NormalClassUrl, payload);
  
      console.log(res.data);
      // form.reset();

      const {message, success} = res.data;
      setIsSuccess(success);
      toast.success(message)
    } catch (error) {
      if(error instanceof AxiosError){
        const {message} = error.response?.data
        console.error(error);
        toast.error(message || 'An unknown error has occurred.')  
      }
    }
  }

  return (
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard content="Thank you for registering in normal class! One of our teachers will contact you soon." to="/adminDashboard/normalclass"/>) 
    : (<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <div className="mb-8 flex flex-col items-center text-center">
                    <h1 className="lg:text-4xl text-2xl mb-4 font-serif">
                      Normal Class Form
                    </h1>
                    <Label className="text-gray-500 md:text-sm text-xs">
                      Create normal class here
                    </Label>
                  </div>

    {/* Calculated Date, Time and Weekday */}
{form.watch("allDates")?.map((_entry, index) => (
  <>
  <Label className="font-bold lg:text-md text-sm text-center">Class {index+1}</Label>
  <div key={index} className="flex gap-2 items-center">
    <FormField
      control={form.control}
      name={`allDates.${index}.date`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date</FormLabel>
          <FormControl>
            <Input
              {...field}
              required
              disabled
              type="date"
              title="Appointment Date"
              className="shadow-none rounded-xl py-6"
            />
          </FormControl>
          <FormDescription>Provided appointment date. This will be displayed in administrator table.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`allDates.${index}.time`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time</FormLabel>
          <FormControl>
            <Input
              {...field}
              required
              disabled
              type="time"
              title="Appointment Time"
              className="shadow-none rounded-xl py-6"
            />
          </FormControl>
          <FormDescription>Provided appointment time. This will be displayed in administrator table.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`allDates.${index}.weekDay`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>WeekDay</FormLabel>
          <FormControl>
            <Input
              {...field}
              required
              disabled
              type="text"
              title="Appointment Day"
              className="shadow-none rounded-xl py-6"
            />
          </FormControl>
          <FormDescription>Provided appointment day. This will be displayed in administrator table.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
  </>
))}

      {/* Search Student Name */}
        <FormField
          control={form.control}
          name="userName"
          render={() => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
              <StudentSearch onSelect={handleStudentSelect} selectedStudent={selectedStudent}/>
              </FormControl>
              <FormDescription>Select a student. This will be displayed in administrator table.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mobile Number and Email Address */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        <div className="w-full max-w-md">
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Details</FormLabel>
              <FormControl>
              <PhoneInput
                  country={"ae"}
                  {...field}  
                  disabled       
                  inputStyle={{width: "100%", height: "48px"}}
                  inputProps={{ ref: field.ref, required: true }}
                />
              </FormControl>
              <FormDescription>Provided student&apos;s mobile number. This will be displayed in administrator table.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled
                  type="email"
                  title="Email Address"
                  className="shadow-none rounded-xl py-6"
                />
              </FormControl>
              <FormDescription>Provided student&apos;s email address. This will be displayed in administrator table.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        {/* Batch Details */}
        <FormField
          control={form.control}
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch Details</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="shadow-none rounded-xl py-6 w-full" title="Batch">
                        <SelectValue placeholder="Select batch"/>
                      </SelectTrigger>
                    </FormControl>
                    <FormDescription>Select batch. This will be displayed in administrator table.</FormDescription>
                    <SelectContent>
                      {data.map((item)=>(
                        <SelectItem value={item.batch} key={item._id}>{item.batch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
          )}
        />

        {/* Teacher Name, Timezone and Number of Classes*/}
        <div className="lg:flex items-center gap-2">
        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled
                  type="text"
                  title="Teacher Name"
                  className="shadow-none rounded-xl py-6"
                />
              </FormControl>
              <FormDescription>Provided teacher name. This will be displayed in administrator table.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled
                  type="text"
                  title="Timezone"
                  className="shadow-none rounded-xl py-6"
                />
              </FormControl>
              <FormDescription>Provided timezone details. This will be displayed in administrator table.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfClasses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Classes</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled
                  type="number"
                  title="Number of Classes"
                  className="shadow-none rounded-xl py-6"
                />
              </FormControl>
              <FormDescription>Provided number of classes. This will be displayed in administrator table.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        {/* Items */}
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>
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
    </Form>)}
    </>
  );
}
