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
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";

import { NormalClassUrl, UserProfileUrl } from "@/constants";
import { normalClassType } from "@/types/Types";

import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import useSWR from "swr";
import Link from "next/link";
import {format} from "date-fns"
import Cookies from "js-cookie";
import { Card } from "@/components/ui/card";
import { AddButton } from "../button-demo/AddButton";
import { toast } from "sonner";
import { usePathname } from "next/navigation";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableNormalClass() {
  const pathname = usePathname();
  const [user, setUser] = useState({role:"", name:""});

  const { data, isLoading, isValidating, error, mutate } = useSWR<normalClassType[]>(NormalClassUrl, fetcher);

  // Fetch logged-in teacher session
    useEffect(()=>{
    const doFetch = async()=>{
      try {
        const res = await axios.get(UserProfileUrl, {withCredentials: true, headers:{ Authorization:Cookies.get("token") }});
        console.log(res.data);

        setUser({role: res.data.role, name: res.data.name})
        
      } catch (error) {
        console.error(error);
      }
    }

    if(pathname.startsWith('/adminDashboard')){
      doFetch();
    }

  },[pathname])

  // Handle role and name based rows filering 
  const filteredData = useMemo(()=>{
    if(!data) return [];

    return data.filter((item)=>{
      if(user.role === 'teacher' && item.teacher !== user.name) return false;
      if(user.role === 'admin' && item.teacher === user.name) return false;
      return true
    })

  },[data, user,])
  
  // handle delete appointment for normal class
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${NormalClassUrl}/${id}`, {headers: { Authorization: Cookies.get("token") }});
      console.log(res.data);

      mutate((data) => data?.filter((item) => item._id !== id));

      const {message} = res.data;
      toast.success(message)

    } catch (error:unknown) {
      if(error instanceof AxiosError){
        console.log(error);
        const {message} = error.response?.data;
        toast.error(message || 'An unknown error has occurred.')
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
    <>
    <div className="flex items-center justify-center mb-4">
      <AddButton name="Add Normal Class" type="button" link={'/appointment/normal-class'}/>
    </div> 
    <h1 className="lg:text-4xl text-xl font-semibold mb-4 text-center">Normal Classes</h1>
    <Card className="p-2">
    <Table>
      <TableCaption>
        A list of booked appointments for Normal Class
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Teacher Name</TableHead>
          <TableHead>Batch Name</TableHead>
          <TableHead>Number of Classes</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>{user.role === 'admin' && "Contact Details"}</TableHead>
          <TableHead className="text-center">Time</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((appointment: normalClassType) => (
          <TableRow key={appointment._id}>
            <TableCell>{appointment.teacher}</TableCell>
            <TableCell>{appointment.batch}</TableCell>
            <TableCell>{appointment.numberOfClasses}</TableCell>
            <TableCell>{appointment.userName}</TableCell>
            <TableCell>{user.role === 'admin' && appointment.destination}</TableCell>
            <TableCell className="text-center"> {handleTime(appointment.time, appointment.date)} </TableCell>
            <TableCell>
              <Link href={`/appointment/normal-class/edit/${appointment._id}`}>
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
          <TableCell colSpan={8}>Total Rows</TableCell>
          <TableCell className="text-right">{filteredData.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </Card>
    </>
  );
}
