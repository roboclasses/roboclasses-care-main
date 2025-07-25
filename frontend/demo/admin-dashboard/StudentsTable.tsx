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
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function StudentsTable() {

  // Handle fetch students form db
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

  // Handle download as CSV
  const handleDownload = ()=>{
    const rows = [['student name', 'contact details', 'email address', 'courses done']];
    if (!data || data.length === 0) {
      toast({ title: 'No data', description: 'No students to download.', variant: 'destructive' });
      return;
    }
    data.forEach((student) => {
      rows.push([
        student.studentName || '',
        student.destination || '',
        student.email || '',
        student.courses || '',
      ]);
    });
    const csvContent = rows.map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'students.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'Download started', description: 'Student data CSV is downloading.', variant: 'default' });
  }

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
    <div className="flex justify-between items-center w-full">
    <h1 className="lg:text-4xl text-xl font-semibold mb-4 text-center">All Students</h1>
    <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download as CSV
          </Button>
    </div>
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
