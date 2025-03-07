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
import axios from "axios"
import React from "react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { AttendanceUrl } from "@/constants"
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo"
import { format } from "date-fns"


const fetcher = (url) => axios.get(url).then((res) => res.data)

export function TableAttendance() {
  const { data, isLoading, isValidating, error, mutate } = useSWR(AttendanceUrl, fetcher)

  // Handle delete attendance
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${AttendanceUrl}/${id}`)
      console.log(res.data)

      mutate((data) => data.filter((attendance) => attendance._id !== id))

      const { message } = res.data
      toast({ title: "Success✅", description: message, variant: "default" })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed",
        description: "Unable to delete attendance",
        variant: "destructive",
      })
    }
  }

  // Handle edge cases
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load</div>
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
          <TableHead>Start Date</TableHead>
          <TableHead>Classes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
         {data.map((items)=>(
          <TableRow key={items._id}>
            <TableCell>{items.batchName}</TableCell>
            <TableCell>{items.startDate ? format(items.startDate, "MMM dd, yyyy") : ""}</TableCell>
            <TableCell>{items.classes ? items.classes.map((date)=> format(date, "MMM dd, yyyy")).join(", ") : ""}</TableCell>
            <TableCell className="text-right">
              <Link href={`/teacherView/edit/${items._id}`}>
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