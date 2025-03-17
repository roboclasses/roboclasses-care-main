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
} from "@/components/ui/table"
import { EditButton } from "./EditButton"

import useSWR from "swr"
import axios, { AxiosError } from "axios"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { AttendanceUrl } from "@/constants"
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo"
import { format } from "date-fns"
import { getUserSession } from "@/lib/session"


const fetcher = (url) => axios.get(url).then((res) => res.data)

export function TableAttendance() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  // Handle fetch teacher attendances
  const { data, isLoading, isValidating, error, mutate } = useSWR(AttendanceUrl, fetcher)

  // Fetch user session
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const user = await getUserSession();
        setRole(user.role);
        setName(user.name);
        
      } catch (error) {
        console.error(error);  
      }
    }  
    handleFetch();
  },[])

  // Filter rows by their role and name
const handleTeacher = ()=>{
  if(role === "teacher"){
    const filteredAttendance = data.filter((item)=>item.teacher === name)
    return filteredAttendance;
  }
  else if(role === "admin"){
    return data;
  }
}

  // Handle delete attendance
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${AttendanceUrl}/${id}`)
      console.log(res.data)

      mutate((data) => data.filter((attendance) => attendance._id !== id))

      const { message } = res.data
      toast({ title: "Success✅", description: message, variant: "default" })
    } catch (error) {
      if(error instanceof AxiosError){
        console.log(error)
        const {message} = error.response.data;
        toast({ title: "Failed", description: message || "An unknown error has occurred.", variant: "destructive" })
      }
    }
  }

  // Handle edge cases
  if (isLoading) return <div>Loading...</div>
  if (error instanceof AxiosError){
    const {message} = error.response.data;
    return <div>{message || "An unknown error has occurred."}</div>
  } 
  if (isValidating) return <div>Refreshing...</div>
  if (data?.length === 0) return <div>Empty list for Attendances</div>

  return (
    <div>
     <h1 className="text-4xl font-semibold mb-6 text-center">Manage Attendances</h1>
    <Table className="border border-black">
      <TableCaption>A list of attendances</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Batch Name</TableHead>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Leaves</TableHead>
          <TableHead>Classes</TableHead>
          <TableHead>Number of Classes Done</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
         {handleTeacher()?.map((items)=>(
          <TableRow key={items._id}>
            <TableCell>{items.batchName}</TableCell>
            <TableCell>{items.teacher}</TableCell>
            <TableCell>{items.startDate ? format(items.startDate, "MMM dd, yyyy") : ""}</TableCell>
            <TableCell>{items.leave ? items.leave.map((item)=>format(item, "MMM dd, yyyy")).join(", ") : ""}</TableCell>
            <TableCell>{items.classes ? items.classes.map((date)=> format(date, "MMM dd, yyyy")).join(", ") : ""}</TableCell>
            <TableCell>{items.classes.length}</TableCell>
            <TableCell className="text-right">
              <Link href={`/manageAttendance/edit/${items._id}`}>
                <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <DeleteAlertDemo
                onCancel={() => console.log("Delete action canceled")}
                onDelete={() => handleDelete(items._id)}
              />
            </TableCell>
          </TableRow>
         )) }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10}>Total Rows</TableCell>
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  )
}