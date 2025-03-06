'use client'
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
import { toast } from "@/hooks/use-toast";
import { EditButton } from "./EditButton";
import { batchType } from "@/types/Types";
import { NewBatchEntryUrl } from "@/constants";

import Cookies from 'js-cookie'
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
import { getUserSession } from "@/lib/session";
import { useEffect, useState } from "react";


const fetcher = (url: string) => axios.get(url, {headers:{ Authorization: Cookies.get("token")}}).then((res) => res.data);

export function TableBatchEntries() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { data, isLoading, isValidating, error, mutate } = useSWR<batchType[]>(NewBatchEntryUrl,fetcher);

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
      if(role === "teacher"){
        const filteredData = data?.filter((items)=>items.teacher === name)
        return filteredData;
      }
      else if(role === "admin"){
        return data;
      }
    }

  // Handle delete a batch
  const handleDelete = async(id:string)=>{
    try {
      const res = await axios.delete(`${NewBatchEntryUrl}/${id}`, {headers:{ Authorization:Cookies.get("token") }})
      console.log(res.data);

      mutate((data)=>data?.filter((batch)=>batch._id !== id))

      const {message} = res.data;
      toast({title: "Success✅", description: message,variant: "default",});
          } catch (error) {
      console.log(error);  
      toast({title:"Failed", description:"Unable to delete batch entry", variant:"destructive"})
    }
  }

  // Handle edge cases
 if (isLoading) return <div>Loading...</div>;
 if (error) return <div>Failed to load</div>;
 if (isValidating) return <div>Refreshing...</div>;
 if (data?.length === 0) return <div>Empty list for Batches</div>;

 // Calculating the batch time
 const handleTime = (timeArray:string[], dayArray:string[])=>{
return timeArray.map((time, index)=>{
      const day = dayArray[index];
      if(day && time){
        return `${day} - ${time}`
      }
      return null;
    }).filter((time)=>time !== null).join(', ')
 }

  return (
    <div>
    <h1 className="text-4xl font-semibold mb-6 text-center">Available Batches</h1>
    <Table className="border border-black">
      <TableCaption>A list of batches</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Batch Name</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Contact Details</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Times</TableHead>
          <TableHead>Timezone</TableHead>
          <TableHead>Number of Classes</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {handleRoleBasedMapping()?.map((batch: batchType) => (
          <TableRow key={batch._id}>
            <TableCell className="font-medium">{batch.teacher}</TableCell>
            <TableCell>{batch.batch}</TableCell>
            <TableCell>{batch.studentName}</TableCell>
            <TableCell>{batch.destination}</TableCell>
            <TableCell>{batch.email}</TableCell>
            <TableCell>{batch.startDate ? format(batch.startDate, 'MMM dd, yyyy') : ""}</TableCell>
            <TableCell className="text-right"> {handleTime(batch.day, batch.time)} </TableCell>
            <TableCell className="text-right">{batch.timeZone}</TableCell>
            <TableCell className="text-right">{batch.numberOfClasses}</TableCell>
            <TableCell className="text-right">{batch.completed === "Yes" ? "Completed" : batch.completed === "No" ? "Active" : ""}</TableCell>
            <TableCell className="text-right">
              <Link href={`/newBatchEntry/edit/${batch._id}`}>
              <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <DeleteAlertDemo onCancel={()=>console.log("Delete action canceled")} onDelete={()=>handleDelete(batch._id)}/>
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
    </div>
  );
}
