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
import { toast } from "@/hooks/use-toast";
import { EditButton } from "../button-demo/EditButton";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";

import { studentType } from "@/types/Types";
import { StudentRegUrl } from "@/constants";
import { getUserSession } from "@/lib/session";

import useSWR from "swr";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { Card } from "@/components/ui/card";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function StudentsTable() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<studentType[]>(StudentRegUrl,fetcher);
  const [role, setRole] = useState("")

  // Get user session
  useEffect(()=>{
    const handleFetch = async()=>{
      const session = await getUserSession();
      if(!session.role){
        throw new Error('User session not found.');
      }
      setRole(session.role)  
    }
    handleFetch();

  },[])

  // Handle delete Student
  const handleDelete = async (studentId: string) => {
    try {
      const res = await axios.delete(`${StudentRegUrl}/${studentId}`, {headers: { Authorization: Cookies.get("token") }});
      console.log(res.data);

      mutate((data) => data?.filter((Student) => Student._id !== studentId));

      const {message} = res.data;
      toast({title: "Success✅", description: message, variant: "default"});

    } catch (error: unknown) {
      if(error instanceof AxiosError){
        console.log(error);
        const {message} = error.response?.data
        toast({title:"Failed", description: message || "An unknown error has occurred.", variant:"destructive"})
      }
    }
  };

  // Handle edge cases
  if (data?.length === 0) return <div>Empty list for Students</div>;
  if (error instanceof AxiosError){
    const {message} = error.response?.data
    return <div>{message || 'An unknown error has occurred.'}</div>;
  } 
  if (isLoading) return <div>Loading...</div>;
  if (isValidating) return <div>Refershing data...</div>;

  return (
    <>
    <h1 className="lg:text-4xl text-xl font-semibold mb-6 text-center">All Students</h1>
    <Card className="p-2">
    <Table>
      <TableCaption>A list of Students</TableCaption>
      <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">Student ID</TableHead>
          <TableHead className="w-[100px]">Student Name</TableHead>
          <TableHead className="w-[100px]">Parent Name</TableHead>
          <TableHead className="w-[100px]">{role==="admin" && "Contact Details"}</TableHead>
          <TableHead>{role==="admin" && "Email Address"}</TableHead>
          <TableHead>Location Details</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Courses Done</TableHead>
          {role==='admin' && <TableHead>Edit</TableHead>}
          {role==='admin' && <TableHead>Delete</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((Student: studentType) => (
          <TableRow key={Student._id}>
            <TableCell className="font-medium">{Student.studentId}</TableCell>
            <TableCell className="font-medium">{Student.studentName}</TableCell>
            <TableCell className="font-medium">{Student.parentName}</TableCell>
            <TableCell className="font-medium">{role==="admin" && Student.destination}</TableCell>
            <TableCell>{role==="admin" && Student.email}</TableCell>
            <TableCell className="text-right">{Student.address}</TableCell>
            <TableCell className="text-right">{Student.grade}</TableCell>
            <TableCell className="text-right">{Student.courses}</TableCell>

            {role === 'admin' && 
            (<TableCell className="text-right">
              <Link href={`/appointment/studentRegister/edit/${Student._id}`}>
                <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>)}

            {role === 'admin' && 
            (<TableCell className="text-right">
              <DeleteAlertDemo 
                onCancel={()=>console.log("Delete action canceled")} 
                onDelete={()=>handleDelete(Student._id)}
              />
            </TableCell>)}
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
    </Card>
    </>
  );
}
