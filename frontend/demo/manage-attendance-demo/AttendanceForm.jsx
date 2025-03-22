"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
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

import SubmitButton from "../button-demo/SubmitButton";
import { AttendanceUrl, NewBatchEntryUrl } from "@/constants";
import { handleNumber } from "@/lib/utils";
import { getUserSession } from "@/lib/session";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";


const FormSchema = z.object({
  batchName: z.string().min(2, { message: "Batch Name must be at least 2 characters long" }),
  startDate: z.string().optional(),
  classes: z.array(z.string().optional()),
  teacher:z.string(),
});

export function AttendanceForm() {
  const pathname = usePathname();
  const [batches, setBatches] = useState([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [numberOfClasses, setNumberOfClasses] = useState(0);


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
    const handleFetch = async()=>{
       const user = await getUserSession();
       setRole(user.role);
       setName(user.name);
    if(user.role === "teacher"){
      form.reset({teacher: name})
    }
    }
    handleFetch();
  },[form, name, pathname])

  // Fetching batches from newBatchEntry api based on role and teacher name
    useEffect(()=>{
      const handleFetch = async()=>{
        try {
          const res = await axios.get(NewBatchEntryUrl, {headers:{Authorization: Cookies.get("token")}})
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
          const res = await axios.get(`${NewBatchEntryUrl}?name=${batchName}`, {headers: {Authorization : Cookies.get("token")}})
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
    const { isSubmitting } = form.formState;


  async function onSubmit(data) {
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
      
      const res = await axios.post(AttendanceUrl ,payload)
      console.log(res.data);
      
      const {message} = res.data;
      toast({title:"Success✅", description: message, variant:"default"})

    } catch (error) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response?.data
        toast({title:"Failed", description:message || 'An unknown error is occurred.', variant:"destructive"})
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2">

        {/* Batch Name */}
        <FormField
          control={form.control}
          name="batchName"
          render={({ field }) => (
            <FormItem>
               <FormLabel className="font-semibold"> Batches </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} required >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Batch" />
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
          <Button type="button" onClick={handleAddClass} disabled={handleNumber(numberOfClasses) >= 60 } style={{background : "maroon"}}>Add Class</Button>
          <SubmitButton name={isSubmitting ? 'Submitting...' : 'Submit'} type="submit" disabled={isSubmitting}/>
        </div>

        {/* Teacher Name */}
        {role === "teacher" ? (<FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
          <FormItem>
            <FormLabel>Teacher Name</FormLabel>
            <FormControl>
              <Input {...field} disabled required/>
            </FormControl>
            <FormMessage />
          </FormItem>
            )}
        />) : 
        ( <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Teacher Name</FormLabel>
            <FormControl>
              <Input {...field} disabled required/>
            </FormControl>
            <FormMessage />
          </FormItem>
            )}
        /> 
      )}

        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold">Start Date</FormLabel>
            <FormControl>
              <Input {...field} type="date" disabled required/>
            </FormControl>
            <FormMessage />
          </FormItem>
            )}
        />

      <Label className="font-semibold">Classes</Label>
      {Array.from({length: handleNumber(numberOfClasses)}).map((_, index)=>(
        <FormField
          key={index}
          control={form.control}
          name={`classes.${index}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={`Add Class ${index+1}`} {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
              )}
          />
    ))}

      </form>
    </Form>
  );
}
