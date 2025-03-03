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
import { EditButton } from "./EditButton";

import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { appointmentTypes } from "@/types/Types";
import { DemoClassUrl } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
import { useEffect, useState } from "react";
import { getUserSession } from "@/lib/session";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableDemoClass() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { data, error, isLoading, isValidating, mutate } = useSWR<appointmentTypes[]>(DemoClassUrl,fetcher);

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
  function handleRoleBasedMapping(){
    if(role === 'teacher'){
      const filteredData = data?.filter((items)=>items.teacher === name)
      return filteredData;
    }
    else if(role === "admin")
      return data;
  }

  // Handle delete appointment
  const handleDelete = async (appointmentId: string) => {
    try {
      const res = await axios.delete(`${DemoClassUrl}/${appointmentId}`);
      console.log(res.data);

      mutate((data) => data?.filter((appointment) => appointment._id !== appointmentId));

      const {message} = res.data;
      toast({title: "Success✅", description: message, variant: "default",});
    } catch (error) {
      console.log(error);
      toast({title:"Failed", description:"Unable to delete Demo Class", variant:"destructive"})
    }
  };

  // Handle edge cases
  if (data?.length === 0) return <div>Empty list for Demo Classes</div>;
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isValidating) return <div>Refershing data...</div>;

  return (
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
        {handleRoleBasedMapping()?.map((appointment: appointmentTypes) => (
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
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
