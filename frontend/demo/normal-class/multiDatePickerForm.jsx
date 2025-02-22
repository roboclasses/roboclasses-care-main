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
// import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StudentSearch from "./StudentSearch";
import { getUserSession } from "@/lib/session";
import { NewBatchEntryUrl, NormalClassUrl } from "@/constants";
import { teachers } from "@/data/dataStorage";

import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import MultiDateTimeEntry from "./MultiDateTimeEntry";
import { Input } from "@/components/ui/input";


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

// const weekdays = [
//   {
//     id: "sun",
//     label: "Sunday",
//   },
//   {
//     id: "mon",
//     label: "Monday",
//   },
//   {
//     id: "tue",
//     label: "Tuesday",
//   },
//   {
//     id: "wed",
//     label: "Wednesday",
//   },
//   {
//     id: "thu",
//     label: "Thursday",
//   },
//   {
//     id: "fri",
//     label: "Friday",
//   },
//   {
//     id: "sat",
//     label: "Saturday",
//   },
// ];

// const times = [{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6}]


const FormSchema = z.object({
  // time: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select at least one time."}),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select at least one item."}),
  teacher: z.string().min(2, { message: "Teacher name must be atleast 2 characters long." }),
  batch: z.string().min(2, { message: "Batch name must be atleast 2 characters long." }),
  userName: z.string().min(2, { message:"Student name must be atlest 2 characters long." }),
  destination:z.string().min(7,{message:"Phone number must be valid."}),
  email:z.string().email({message: "Email must be valid."}),
  dateTimeEntries: z.array(z.object({
    date: z.string(),
    time: z.string(),
  }))
});

export function MultiDatePickerForm() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [dateTimeEntries, setDateTimeEntries] = useState([]);

  console.log("date and time"+dateTimeEntries);
  
  
// Handle fetching logged-in users credentials from cookie storage
  useEffect(() => {
    const handleFetch = async () => {
      const user = await getUserSession();
      setRole(user.role || "");
      setName(user.name || "");
    };
    handleFetch();
  }, [pathname]);

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
    form.setValue("userName",student.name)

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
        {/* <Table>
          <TableCaption>A list of weekdays with time slot</TableCaption>
          <TableHeader>
            <TableRow>
              {weekdays.map((item) => (
                <TableHead className="w-[100px]" key={item.id}>
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
        </Table> */}
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
                  placeholder="Parents Contact/Whatsapp number"   
                  {...field}         
                  inputStyle={{ width: "440px" }}
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
                  placeholder="Enter your email"
                  {...field}
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
                  <FormLabel className="font-semibold">Teachers Details</FormLabel>
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
                            teachers.map((item)=>(<SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>)) : 
                              '' }
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
