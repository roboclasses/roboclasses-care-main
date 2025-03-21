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
import { EditButton } from "../button-demo/EditButton";
import { NormalClassUrl } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { normalClassType } from "@/types/Types";

import axios, { AxiosError } from "axios";
import useSWR from "swr";
import Link from "next/link";
import {format} from "date-fns"
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
import { useEffect, useState } from "react";
import { getUserSession } from "@/lib/session";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);


export function TableNormalClass() {
const [role, setRole] = useState("");
const [name, setName] = useState("");

  // Handle fetch normal classes
  const { data, isLoading, isValidating, error, mutate } = useSWR<normalClassType[]>(NormalClassUrl, fetcher);

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
  
  // handle delete appointment for normal class
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${NormalClassUrl}/${id}`);
      console.log(res.data);

      mutate((data) => data?.filter((item) => item._id !== id));

      const {message} = res.data;
      toast({title: "Success✅", description: message ,variant: "default" });

    } catch (error:unknown) {
      if(error instanceof AxiosError){
        console.log(error);
        const {message} = error.response?.data;
        toast({title:"Failed", description: message || "An unknown error has occurred.", variant:"destructive"})
      }
    }
  };

  // Handle edge cases
  if (data?.length === 0) return <div>Empty list for Normal Class</div>;
  if (error instanceof AxiosError){
    const {message} = error.response?.data;
    return <div>{message || "An unknown error has occurred."}</div>;
  } 
  if (isLoading) return <div>Loading...</div>;
  if (isValidating) return <div>Refershing data...</div>;


  // Function to format time for Normal Class appointment
  const handleTime = (timeArray: string[], dateArray:string[]) => {
    return timeArray.map((time, index)=>{
      const date = dateArray[index];
      if(date && time){
        const desiredDate = date ? format(date, 'MMM d') : '';
        const weekday = date ? format(date, "EEEE") : '';
        return `${weekday} - ${time} - ${desiredDate}`
      }
      return null;
    }).filter((time)=>time !== null).join(', ')
  };


  return (
    <div>
    <h1 className="text-4xl font-semibold mb-6 text-center">Normal-Class Appointments</h1>
    <Table className="border border-black">
      <TableCaption>
        A list of booked appointments for Normal Class
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Batch Name</TableHead>
          <TableHead>Number of Classes</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Contact Details</TableHead>
          <TableHead className="text-center">Time</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {handleRoleBasedMapping()?.map((appointment: normalClassType) => (
          <TableRow key={appointment._id}>
            <TableCell>{appointment.teacher}</TableCell>
            <TableCell>{appointment.batch}</TableCell>
            <TableCell>{appointment.numberOfClasses}</TableCell>
            <TableCell>{appointment.userName}</TableCell>
            <TableCell>{appointment.destination}</TableCell>
            <TableCell className="text-center"> {handleTime(appointment.time, appointment.date)} </TableCell>
            <TableCell>
              <Link href={`/appointment/reminder/normal-class/edit/${appointment._id}`}>
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
          <TableCell colSpan={7}>Total Rows</TableCell>
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
}
