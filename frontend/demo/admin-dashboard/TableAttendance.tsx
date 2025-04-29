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
import { toast } from "@/hooks/use-toast"
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo"
import { EditButton } from "../button-demo/EditButton"

import { getUserSession } from "@/lib/session"
import { AttendanceUrl, CoursesUrl } from "@/constants"

import useSWR from "swr"
import axios, { AxiosError } from "axios"
import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import Cookies from "js-cookie";
import { attendanceType, courseType } from "@/types/Types"


const fetcher = (url:string) => axios.get(url).then((res) => res.data)

export function TableAttendance() {
  const [user, setUser] = useState({role:"", name:""})
  const { data, isLoading, isValidating, error, mutate } = useSWR<attendanceType[]>(AttendanceUrl, fetcher)
  const { data:coursesData, isLoading: coursesLoading } = useSWR<courseType[]>(CoursesUrl, fetcher)

  // Fetch user session
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const session = await getUserSession();
        if(!session.role || !session.name){
          throw new Error('No user session is found.')
        }
        setUser({role: session.role, name: session.name})
      } catch (error) {
        console.error(error);  
      }
    }  
    handleFetch();
  },[])

// Filter data 
const filteredData = useMemo(() => {
  if (!data || !coursesData) return [];

  return data.filter((item) => {
    if (user.role === 'teacher' && item.teacher !== user.name) return false;
    if (user.role === 'admin' && item.teacher === user.name) return false;
    
    // Apply class length filtering only if numberOfClasses exists
    // if (coursesData[0].numberOfClasses) {
    //   const classLength = item.classes.length;

    //   const hasTooManyClasses = coursesData.some(course => {
    //     return classLength >= Number(course.numberOfClasses);
    //   });

    //   if (hasTooManyClasses) {
    //     return false;
    //   }
    // }

  return true;
  });
}, [data, user, coursesData]);

  // Handle delete attendance
  const handleDelete = async (id:string) => {
    try {
      const res = await axios.delete(`${AttendanceUrl}/${id}`, {headers:{ Authorization: Cookies.get("token") }})
      console.log(res.data)

      mutate((data) => data?.filter((attendance) => attendance._id !== id))

      const { message } = res.data
      toast({ title: "Success✅", description: message, variant: "default" })
    } catch (error:unknown) {
      if(error instanceof AxiosError){
        console.log(error)
        const {message} = error.response?.data;
        toast({ title: "Failed", description: message || "An unknown error has occurred.", variant: "destructive" })
      }
    }
  }

  // Handle edge cases
  if (isLoading || coursesLoading) return <div>Loading...</div>
  if (error instanceof AxiosError){
    const {message} = error.response?.data;
    return <div>{message || "An unknown error has occurred."}</div>
  } 
  if (isValidating) return <div>Refreshing...</div>
  if (data?.length === 0) return <div>Empty list for Attendances</div>

  return (
    <div>
     <h1 className="lg:text-4xl text-xl font-semibold mb-6 text-center">Manage Attendances</h1>
    <Table className="border border-black">
      <TableCaption>A list of attendances</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Batch Name</TableHead>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Classes</TableHead>
          <TableHead>Curriculum Taught</TableHead>
          <TableHead>Number of Classes Done</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
         {filteredData.map((items:attendanceType)=>(
          <TableRow key={items._id}>
            <TableCell>{items.batchName}</TableCell>
            <TableCell>{items.teacher}</TableCell>
            <TableCell>{items.startDate ? format(items.startDate, "MMM dd, yyyy") : ""}</TableCell>
            <TableCell>{items.classes ? items.classes.map((date)=> format(date, "MMM dd, yyyy")).join(", ") : ""}</TableCell>
            <TableCell>{items.curriculumTaught ? items.curriculumTaught.map((item)=> item).join(", ") : ""}</TableCell>
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
         ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total Rows</TableCell>
          <TableCell className="text-right">{filteredData.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  )
}