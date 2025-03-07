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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { AttendanceUrl, NewBatchEntryUrl } from "@/constants";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { getUserSession } from "@/lib/session";
import { usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";
import { handleNumber } from "@/lib/utils";


const FormSchema = z.object({
  batchName: z.string().min(2, { message: "Batch Name must be at least 2 characters long" }),
  startDate: z.string().optional(),
  classes: z.array(z.string()).optional(),
});

export function AttendanceForm() {
  const pathname = usePathname();
  const [batches, setBatches] = useState([]);

  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const [numberOfClasses, setNumberOfClasses] = useState(0);

  // const formattedNumber = parseInt(numberOfClasses ,10)



  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batchName: "",
      startDate: "",
      classes: [],
    },
  });

  // Getting logged-in user's role and name
  useEffect(()=>{
    const handleFetch = async()=>{
       const user = await getUserSession();
       setRole(user.role);
       setName(user.name);
    }
    handleFetch();
  },[pathname])

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
              setNumberOfClasses(selectedBatch.numberOfClasses)
              form.setValue("classes", Array(selectedBatch.numberOfClasses).fill(""))
            }
          }
        } catch (error) {
          console.error(error);
          form.setValue("startDate", "")
          form.setValue("classes" ,[])
        }

      }
      handleFetch();
    },[batchName, form])

    // For adding class
    const handleAddClass = () => {
      if (numberOfClasses < 60) {
        setNumberOfClasses((prev) => handleNumber(prev) + 1);
        const currentClasses = [...form.getValues("classes")]; 
        form.setValue("classes", [...currentClasses,""]);
      }
      };


  async function onSubmit(data) {
    try {
      const startDate = new Date(data.startDate).toISOString().split('T')[0];
      const classes = data.classes.map((item)=>new Date(item).toISOString().split('T')[0])
      const payload={
        batchName: data.batchName,
        startDate: startDate,
        classes:classes
      }
      console.log("payload is"+JSON.stringify(payload));
      
      const res = await axios.post(AttendanceUrl ,payload)
      console.log(res.data);

      toast({title:"Success✅", description: res.data.message, variant:"default"})

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
        <div className="flex items-center gap-2">
          <Button type="button">Add Row</Button>
          <Button type="button" onClick={handleAddClass} disabled={handleNumber(numberOfClasses) >= 60 }>Add Class</Button>
          <Button type="submit">Submit</Button>
        </div>

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            <FormControl>
              <Input {...field} type="date" disabled required/>
            </FormControl>
            <FormMessage />
          </FormItem>
            )}
        />

        <Label>Classes</Label>

      {Array.from({length: handleNumber(numberOfClasses)}).map((_, index)=>(
        <FormField
          key={index}
          control={form.control}
          name={`classes.${index}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={`Add Class ${index+1}`} {...field} type="date" min={new Date().toISOString().split('T')[0]} />
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
