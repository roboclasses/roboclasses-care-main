"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditButton } from "../button-demo/EditButton";

import useSWR from "swr";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { appointmentTypes } from "@/types/Types";
import { DemoClassUrl } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
import { useEffect, useMemo, useState } from "react";
import { getUserSession } from "@/lib/session";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableDemoClass() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { data, error, isLoading, isValidating, mutate } = useSWR<appointmentTypes[]>(DemoClassUrl,fetcher);
  const [demoClasses, setDemoClasses] = useState("upcoming");
  
  // Fetch logged-in teacher session
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const user = await getUserSession();
        if(user){
          setRole(user.role || '')
          setName(user.name || '')
        }
      } catch (error) {
        console.error(error);
      }
    }
    handleFetch();  
  },[])

  // Handle role and name based rows filering 
  const filteredData = useMemo(()=>{
    if(!data) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0); // For accurate comparison

    return data.filter((item)=>{
      const itemDate = new Date(item.date);

      if(demoClasses === "upcoming" && itemDate < today)
        return false;

      if(demoClasses === "old" && itemDate >= today)
        return false;

      if(role === "teacher" && item.teacher !== name)
        return false;

      return true;

    })
  },[data, demoClasses, name, role])

  // Handle delete appointment
  const handleDelete = async (appointmentId: string) => {
    try {
      const res = await axios.delete(`${DemoClassUrl}/${appointmentId}`);
      console.log(res.data);

      mutate((data) => data?.filter((appointment) => appointment._id !== appointmentId));

      const {message} = res.data;
      toast({title: "Success✅", description: message, variant: "default",});

    } catch (error: unknown) {
      if(error instanceof AxiosError){
        console.log(error);
        const {message} = error.response?.data;
        toast({ title:"Failed", description: message || "An unknown error has occurred.", variant:"destructive" })
      }
    }
  };

  // Handle edge cases
  if (data?.length === 0) return <div>Empty list for Demo Classes</div>;
  if (error instanceof AxiosError){
    const {message} = error.response?.data;
    return <div>{message || "An unknown error has occurred."}</div>;
  } 
  if (isLoading) return <div>Loading...</div>;
  if (isValidating) return <div>Refershing data...</div>;

  return (
    <div>
       <div className="flex justify-between items-center mb-6">
          <h1 className="lg:text-4xl text-xl font-semibold text-center">
          Demo-Class Appointments
          </h1>
          <Select onValueChange={(value)=>setDemoClasses(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Demo Classes"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="old">Old</SelectItem>
            </SelectContent>
          </Select>
        </div>

    <Table className="border border-black">
      <TableCaption>A list of booked appointments for Demo Class</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Student Name</TableHead>
          <TableHead className="w-[100px]">Contact Details</TableHead>
          <TableHead className="w-[100px]">Course Name</TableHead>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Timezone</TableHead>
          <TableHead>Converted</TableHead>
          <TableHead>Batch Number</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData?.map((appointment: appointmentTypes) => (
          <TableRow key={appointment._id}>
            <TableCell className="font-medium">{appointment.userName}</TableCell>
            <TableCell className="font-medium">{appointment.destination}</TableCell>
            <TableCell className="font-medium">{appointment.course}</TableCell>
            <TableCell className="font-medium">{appointment.teacher}</TableCell>
            <TableCell className="text-right">{appointment.date ? format(appointment.date, "MMM dd, yyyy") : ""}</TableCell>
            <TableCell className="text-right">{appointment.time}</TableCell>
            <TableCell className="text-right">{appointment.timeZone}</TableCell>
            <TableCell className="text-right">{appointment.converted}</TableCell>
            <TableCell className="text-right">{appointment.batchNumber}</TableCell>

            <TableCell className="text-right">
              <Link href={`/appointment/reminder/demo-class/edit/${appointment._id}`}>
                <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>

            <TableCell className="text-right">
              <DeleteAlertDemo onCancel={()=>console.log("Delete action canceled")} onDelete={()=>handleDelete(appointment._id)}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10}>Total Rows</TableCell>
          <TableCell className="text-right">{filteredData?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
}
