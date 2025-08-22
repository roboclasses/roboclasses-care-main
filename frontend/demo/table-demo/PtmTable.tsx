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

import { getUserSession } from "@/lib/session";
import { TPtmType } from "@/types/Types";

import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import useSWR from "swr";
import Link from "next/link";
import {format} from "date-fns"
import { Card } from "@/components/ui/card";
import { PtmUrl } from "@/constants";
import { AddButton } from "../button-demo/AddButton";
import { toast } from "sonner";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function PtmTable() {
  const [user, setUser] = useState({role:"", name:""})

  const { data:PtmData, isLoading, isValidating, error, mutate } = useSWR<TPtmType[]>(PtmUrl, fetcher);

  // Fetch logged-in teacher session
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const session = await getUserSession();
        if(!session.role || !session.name){
          throw new Error('No user session is found.')
        }
        setUser({role:session.role, name:session.name})
      } catch (error) {
        console.error(error);
      }
    }
    handleFetch();  
  },[])

  // Handle role and name based rows filering 
  const filteredData = useMemo(()=>{
    if(!PtmData) return [];

    return PtmData.filter((item)=>{
      if(user.role === 'teacher' && item.teacher !== user.name) return false;
      if(user.role === 'admin' && item.teacher === user.name) return false;
      return true
    })

  },[PtmData, user.name, user.role])
  
  // handle delete ptm for normal class
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${PtmUrl}/${id}`);
      console.log(res.data);
      mutate();
      const {message} = res.data;
      toast.success(message);

    } catch (error:unknown) {
      if(error instanceof AxiosError){
        console.log(error);
        const {message} = error.response?.data;
        toast.error(message || 'An unknown error has occurred')
      }
    }
  };

  // Handle edge cases
  if (PtmData?.length === 0) return <div>Empty list for PTM</div>;
  if (error instanceof AxiosError){
    const {message} = error.response?.data;
    return <div>{message || "An unknown error has occurred."}</div>;
  } 
  if (isLoading) return <div>Loading...</div>;
  if (isValidating) return <div>Refershing data...</div>;


  return (
    <>
     <div className="flex items-center justify-center mb-4">
        <AddButton name="Add PTM" type="button" link={'/appointment/PTM'}/>
      </div>
    <h1 className="lg:text-4xl text-xl font-semibold mb-4 text-center">PTM Table</h1>
    <Card className="p-2 ">
    <Table>
      <TableCaption>
        A list of parent-teacher meeting
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Batch</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Student Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Teacher</TableHead>
          <TableHead>Timezone</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Topic</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Agenda</TableHead>
          <TableHead>Participants Email</TableHead>
          <TableHead>Meeting Reminder</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((ptm: TPtmType) => (
          <TableRow key={ptm._id}>
            <TableCell>{ptm.batch}</TableCell>
            <TableCell>{ptm.studentName}</TableCell>
            <TableCell>{ptm.email}</TableCell>
            <TableCell>{ptm.destination}</TableCell>
            <TableCell>{ptm.teacher}</TableCell>
            <TableCell>{ptm.timeZone}</TableCell>
            <TableCell>{ptm.date ? format(ptm.date, "MMM dd, yyyy") : ""}</TableCell>
            <TableCell>{ptm.time}</TableCell>
            <TableCell>{ptm.topic}</TableCell>
            <TableCell>{ptm.type}</TableCell>
            <TableCell>{ptm.duration}</TableCell>
            <TableCell>{ptm.agenda}</TableCell>
            <TableCell>{ptm.participants.map((item)=>item.trim()).join(', ')}</TableCell>
            <TableCell>{ptm.meetingReminder}</TableCell>
            <TableCell>
              <Link href={`/ptm/reminder/normal-class/edit/${ptm._id}`}>
              <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <DeleteAlertDemo onCancel={()=>console.log("Delete action canceled")} onDelete={()=>handleDelete(ptm._id)}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={16}>Total Rows</TableCell>
          <TableCell className="text-right">{filteredData.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </Card>
    </>
  );
}
