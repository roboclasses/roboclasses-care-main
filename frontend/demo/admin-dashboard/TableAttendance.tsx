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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { toast } from "@/hooks/use-toast"
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo"
import { EditButton } from "../button-demo/EditButton"
import { getUserSession } from "@/lib/session"
import { AttendanceUrl, CoursesUrl } from "@/constants"
import { attendanceType, courseType } from "@/types/Types"

import Link from "next/link"
import useSWR from "swr"
import axios, { AxiosError } from "axios"
import React, { useEffect, useMemo, useState } from "react"
import { format } from "date-fns"
import Cookies from "js-cookie";
import { ArrowUpDown, Calendar } from "lucide-react"


const fetcher = (url:string) => axios.get(url).then((res) => res.data)

export function TableAttendance() {
  const [user, setUser] = useState({role:"", name:""})
  const { data, isLoading, isValidating, error, mutate } = useSWR<attendanceType[]>(AttendanceUrl, fetcher)
  const { data:coursesData, isLoading: coursesLoading } = useSWR<courseType[]>(CoursesUrl, fetcher)
  const [attendanceStatus, setAttendanceStatus] = useState("active");
  const [sortOrder, setSortOrder] = useState("latest")
  

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

  const filteredData = data.filter((item) => {
    if (user.role === 'teacher' && item.teacher !== user.name) return false;
    if (user.role === 'admin' && item.teacher === user.name) return false;
    if(attendanceStatus === 'active' && item.completed === 'Yes') return false;
    if(attendanceStatus === 'completed' && item.completed === 'No') return false;
  return true;
  });

  return filteredData.sort((a,b)=>{
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return sortOrder === 'latest' ? (dateB - dateA) : (dateA - dateB)
  })

}, [data, coursesData, user.role, user.name, attendanceStatus, sortOrder]);

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
     <div className="flex justify-between items-center mb-6">
          <h1 className="lg:text-4xl text-xl font-semibold text-center">
        {attendanceStatus==='active' ? "Active Attendances" : "Completed Attendances"}
          </h1>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
            
          {/* Filter by Status(Active/Completed) */}
          <Select onValueChange={(value)=>setAttendanceStatus(value)} defaultValue="active">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Attendances"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Start Date (Latest Date/Oldest Date) */}
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Sort by Date: {sortOrder === "latest" ? "Latest First" : "Oldest First"}
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]" align="end">
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                  <DropdownMenuRadioItem value="latest">Latest First</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">Oldest First</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
    <Table className="border border-black">
      <TableCaption>A list of attendances</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Batch Name</TableHead>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Classes</TableHead>
          <TableHead>Topics Covered</TableHead>
          <TableHead>Number of Classes Done</TableHead>
          <TableHead>Status</TableHead>
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
            <TableCell>{items.completed === 'Yes' ? 'Completed' : 'Active'}</TableCell>
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
          <TableCell colSpan={9}>Total Rows</TableCell>
          <TableCell className="text-right">{filteredData.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  )
}