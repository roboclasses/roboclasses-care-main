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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AttendanceUrl, NewBatchEntryUrl, UserProfileUrl } from "@/constants";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";
import SuccessMessageCard from "../card-demo/SuccessMessageCard";
import { toast } from "sonner";
import { handleNumber } from "@/lib/helpers";


const FormSchema = z.object({
  batchName: z.string().nonempty('Batch is required').min(3, { message: "Batch name must be atleast 3 character long" }),
  startDate: z.string().optional(),
  classes: z.array(z.string().optional())
  .refine((arr)=>arr.some((cls)=>(cls && cls.trim().length > 0)), {message: "At least one class must be provided", path: ['classes']}),
  teacher:z.string().optional(),
});

export function AttendanceForm() {
  const pathname = usePathname();
  const [batches, setBatches] = useState([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [numberOfClasses, setNumberOfClasses] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batchName: "",
      startDate: "",
      classes: [],
      teacher: "",
    },
  });

  // Getting logged-in user's role and name
    useEffect(()=>{
      const doFetch = async()=>{
        try {
          const res= await axios.get(UserProfileUrl, {withCredentials: true, headers:{ Authorization:Cookies.get("token") }});
          console.log(res.data);
                    
          const userName = res.data.name;
          const userRole = res.data.role;
          console.log("user role is: ", userRole);
          console.log("user name is: ", userName);

          setRole(userRole);
          setName(userName);

        if(userRole === "teacher"){
          form.setValue("teacher", userName)
        }
        } catch (error) {
          console.error(error);
        }
      }
  
      if(pathname.startsWith('/manageAttendance')){
        doFetch();
      }
  
    },[pathname])

  // Fetching batches from newBatchEntry api based on role and teacher name
    useEffect(()=>{
      const handleFetch = async()=>{
        try {
          const res= await axios.get(NewBatchEntryUrl, {withCredentials: true, headers:{Authorization: Cookies.get("token")}})
          console.log(res.data);
          if(role === "teacher"){
            const filteredBatch = res.data.filter((item)=>item.teacher === name)
            console.log("filtered batches are"+JSON.stringify(filteredBatch));
            
              setBatches(filteredBatch)
          }
          else if(role === "admin"){
            setBatches(res.data)
          }
        } catch (error) {
          console.error(error);
        }
      }
    handleFetch();
    },[name, role])

  // Pre-populate start date and classes from newBatchEntry api
    const batchName = form.watch("batchName")

    useEffect(()=>{
      const handleFetch = async()=>{
        try {
          const res= await axios.get(`${NewBatchEntryUrl}?name=${batchName}`, {withCredentials: true, headers: {Authorization : Cookies.get("token")}})
          console.log(res.data);
          if(res.data){
            const selectedBatch = res.data.find((items)=> items.batch === batchName)

            if(selectedBatch){
              form.setValue("startDate", selectedBatch.startDate ? format(selectedBatch.startDate, 'yyyy-MM-dd') : '')
              if(role === "admin"){
                form.setValue("teacher", selectedBatch.teacher)
              }
              setNumberOfClasses(selectedBatch.numberOfClasses)
              form.setValue("classes", Array(selectedBatch.numberOfClasses).fill(""))
            }
          }
        } catch (error) {
          console.error(error);
          form.setValue("startDate", "")
          form.setValue("classes" ,[])
          if(role === "admin"){
            form.setValue("teacher", "")
          }
        }
      }
      handleFetch();
    },[batchName, form, role])

    // For adding class
    const handleAddClass = () => {
      if (numberOfClasses < 60) {
        setNumberOfClasses((prev) => handleNumber(prev) + 1);
        const currentClasses = [...form.getValues("classes")]; 
        form.setValue("classes", [...currentClasses,""]);
      }
      };

    // Handle form status
    const { isSubmitting, isSubmitSuccessful } = form.formState;


  async function onSubmit(data) {
    console.log("Classes are", data.classes)
    try {
      const startDate = new Date(data.startDate).toISOString().split('T')[0];
      const classes = data.classes.map((item)=> item ? new Date(item).toISOString().split('T')[0] : "").filter((item)=>item !== "")
      const payload={
        batchName: data.batchName,
        startDate: startDate,
        classes:classes,
        teacher: data.teacher
      }
      console.log("payload is"+JSON.stringify(payload));
      
      const res= await axios.post(AttendanceUrl ,payload)
      console.log(res.data);
      
      const {message, success} = res.data;
      setIsSuccess(success);
      toast.success(message)

    } catch (error) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response?.data
        toast.error(message || 'An unknown error has occurred')
      }
    }
  }

  return (
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard content="Thank you for taking attendance!" to="/adminDashboard/attendance"/>) 
    : (<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
      <h1 className="lg:text-4xl text-xl mb-4 font-serif">Manage Attendance</h1>
        {/* Batch Name */}
        <FormField
          control={form.control}
          name="batchName"
          render={({ field }) => (
            <FormItem>
               <FormLabel className="font-semibold"> Batches </FormLabel>
              <Select onValueChange={field.onChange} value={field.value} required>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Batch"/>
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
                <SelectContent>
                  {batches.map((item) => (
                    <SelectItem value={item.batch} key={item._id}>
                      {item.batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-between">
          <Button 
            type="button" 
            onClick={handleAddClass} 
            disabled={handleNumber(numberOfClasses) >= 60 } 
           className="bg-green-500 hover:bg-green-600"> Add Class
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>

        </div>

        {/* Teacher Name */}
          <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Teacher Name</FormLabel>
            <FormControl>
              <Input {...field} readOnly required/>
            </FormControl>
            <FormMessage />
          </FormItem>
            )}
        /> 

        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Start Date</FormLabel>
            <FormControl>
              <Input {...field} type="date" readOnly required/>
            </FormControl>
            <FormMessage />
          </FormItem>
            )}
        />

      <Label className="font-semibold">Classes</Label>
      {Array.from({length: handleNumber(numberOfClasses)}).map((_, index)=>(
        <FormField
          key={`classes-${index}`}
          control={form.control}
          name={`classes.${index}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={`Add Class ${index+1}`} {...field}  value={field.value || ""} type="date"/>
              </FormControl>
              <FormMessage />
            </FormItem>
              )}
          />
    ))}

      </form>
    </Form>)}
    </>
  )
}
