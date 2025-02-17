/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { NewBatchEntryUrl } from "@/constants";

import axios from "axios";
import Cookies from 'js-cookie'
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserSession } from "@/lib/session";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teachers } from "@/data/dataStorage";

const weekdays = [
  {
    id: "sun",
    label: "Sunday",
  },
  {
    id: "mon",
    label: "Monday",
  },
  {
    id: "tue",
    label: "Tuesday",
  },
  {
    id: "wed",
    label: "Wednesday",
  },
  {
    id: "thu",
    label: "Thursday",
  },
  {
    id: "fri",
    label: "Friday",
  },
  {
    id: "sat",
    label: "Saturday",
  },
];

const times = [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}]


const FormSchema = z.object({
  batch: z.string().min(2, { message: "Batch number must be atleast 2 characters long." }),
  teacher: z.string().min(2, { message: "Teacher name must be atleast 2 characters long." }),
  time: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select at least one time."}),
});

export function EditBatchForm() {
  const pathname = usePathname();
  const {id} = useParams();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [batch, setBatch] = useState("");
  
  // Handle fetching logged-in users credentials from cookie storage
  useEffect(() => {
    const handleFetch = async () => {
      const user = await getUserSession();
      setRole(user.role || "");
      setName(user.name || "");
    };
    handleFetch();
  }, [pathname]);

  // Handle fetch a batch
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const res = await axios.get(`${NewBatchEntryUrl}/${id}`, {headers: {Authorization: Cookies.get("token")}})
        console.log(res.data);
        setBatch(res.data.batch)
      } catch (error) {
        console.log(error);  
      }
    }
    handleFetch();
  },[id])



  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacher: "",
      batch: "",
      time: ["", "", "", "", "", "", ""],
    },
  });


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.put(`${NewBatchEntryUrl}/${id}`,data, {headers:{ Authorization:Cookies.get("token") }});
      console.log(res.data);
      form.reset();
      const {message} = res.data;
      toast({
        title: "Success✅",
        description: message,
        variant:"default"
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed ",
        description: "Unable to update batch!",
        variant:"destructive"
      });
    }
   
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Table>
          <TableCaption>A list of weekdays with time slot</TableCaption>
          <TableHeader>
            <TableRow>
              {weekdays.map((item, index) => (
                <TableHead className="w-[100px]" key={index}>
                  {item.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {times.map((item) => (
                <TableCell className="font-medium" key={item.id}>
                  <FormField
                    control={form.control}
                    name={`time.${item.id}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="time" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>

        <FormField
          control={form.control}
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Batch Number</FormLabel>

              <FormControl>
                <Input
                  // placeholder="e.g. Python B12 L1"
                  {...field}
                  value={batch}
                  onChange={(e)=>{
                    setBatch(e.target.value)
                    field.onChange(e)}}
                  required
                  className="bg-white"
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
                    <SelectContent>
                      {role === "teacher" ? 
                        <SelectItem value={name}>{name}</SelectItem> : 
                          role === "admin" ? 
                            teachers.map((item)=>(<SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>)) : '' }
                    </SelectContent>
                  </Select>
                </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
