"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import SubmitButton from "../button-demo/SubmitButton";
import { getUserSession } from "@/lib/session";
import MultiDayTimeEntry from "./MultiDayTimeEntry";
import StudentSearch from "../normal-class/StudentSearch";
import { CoursesUrl, NewBatchEntryUrl, StudentRegUrl } from "@/constants";
import { teachers, timezone, userTimeZone } from "@/data/dataStorage";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import 'react-phone-input-2/lib/style.css'
import PhoneInput from "react-phone-input-2";



const FormSchema = z.object({
  batch: z.string().min(2, { message: "Batch Number must be atleast 2 characters long"}),
  course: z.string().min(2, { message: "Course Name must be atleast 2 characters long"}),
  teacher: z.string().min(3, { message: "Teacher Name must be atleast 3 characters long"}),
  startDate: z.string(),
  dayTimeEntries: z.array(z.object({
    day: z.string(),
    time: z.string(),
  })),
  timeZone: z.string(),
  numberOfClasses: z.string().optional(),
  studentName: z.string().min(3, { message:"Student Name must be atlest 3 characters long"}),
  destination:z.string().optional(),
  email:z.string().optional(),
});

export function NewBatchEntryForm() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [courses, setCourses] = useState([]);

  const [dayTimeEntries, setDayTimeEntries] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null)


  // Handle select student
  const handleStudentSelect = (student)=>{
    setSelectedStudent(student)
    form.setValue("studentName",student.studentName)
  }

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
      },
      timeZone:userTimeZone,
      numberOfClasses:"",
      studentName:"",
      destination:"+971",
      email:"",
    },
  });

  // Handle multiple date and time add, remove and update
    const handleDateTimeEntriesChange = (entries) => {
      setDayTimeEntries(entries);
      form.setValue("dayTimeEntries", entries); // Update form value
    };

    const courseName = form.watch("course")
    const studentName = form.watch("studentName")

  // Handle populate phone and email of a selected student
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const res = await axios.get(`${StudentRegUrl}?name=${studentName}`)
        if(res.data){
          const selectedStudent = res.data.find((item)=>item.studentName === studentName)
          if(selectedStudent){
            form.setValue("destination", selectedStudent.destination || '')
            form.setValue("email", selectedStudent.email || '')
          }
        }
      } catch (error) {
        console.error(error); 
        form.setValue("email", '')
        form.setValue("email", '')
      }
    }
    handleFetch();
  },[form, studentName])

  // Handle populate numberOfClasses from batch
  useEffect(()=>{
  const handleFetch = async()=>{
    try {
      const res  = await axios.get(`${CoursesUrl}?name=${courseName}`,{headers: { Authorization: Cookies.get("token") }})
      console.log(res.data);

      if(res.data){
        const selectedCourse = res.data.find((item)=>item.course === courseName)
        if(selectedCourse){
          console.log(selectedCourse.numberOfClasses);
          form.setValue("numberOfClasses", selectedCourse.numberOfClasses || '')
        }
      } 
    } catch (error) {
      console.error(error);
      form.setValue("numberOfClasses", "")  
    }
  }

  if(courseName){
    handleFetch();
  }
  },[courseName, form])

  // Handle form status
  const { isSubmitting } = form.formState;

  async function onSubmit(data) {  
    try {
      const batch = `${data.course} - ${data.batch}`
      const transformedDateTimeEntries = {
        day: dayTimeEntries.map(entry => entry.day), // Extract all dates into an array
        time: dayTimeEntries.map(entry => entry.time), // Extract all times into an array
      };
      const startDate = new Date(data.startDate).toISOString().split("T")[0]
      const payload = {
        startDate:startDate,
        teacher:data.teacher,
        batch:batch,
        timeZone:data.timeZone,
        numberOfClasses:data.numberOfClasses,
        studentName:data.studentName,
        destination:data.destination,
        email:data.email,
        ...transformedDateTimeEntries
      }
      const res = await axios.post(NewBatchEntryUrl, payload, {headers: { Authorization: Cookies.get("token") }});
      console.log(res.data);

      form.reset();
      
      const {message} = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });

    } catch (error) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response.data;
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
        {/* Multi Day Time Entry  */}
      <MultiDayTimeEntry onEntriesChange={handleDateTimeEntriesChange} />

        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold">
                Select a Start Date
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} required className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Batch Details */}
        <div className="flex gap-4 items-center">
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
                  placeholder="Enter a Batch Number"
                  {...field}
                  required
                  className="bg-white "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>

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

        {/* Student Name */}
        <FormField
          control={form.control}
          name="studentName"
          render={() => (
            <FormItem>
              <FormLabel className="font-semibold">Find Student</FormLabel>
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
                  inputStyle={{ width: "336px" }}
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

        {/* Teacher Name */}
        <FormField
            control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Teachers</FormLabel>
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

        {/* Timezone */}
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

        <SubmitButton name={isSubmitting ? 'Creating...' : 'Create'} type="submit" disabled={isSubmitting}/>
      </form>
    </Form>
  );
}
