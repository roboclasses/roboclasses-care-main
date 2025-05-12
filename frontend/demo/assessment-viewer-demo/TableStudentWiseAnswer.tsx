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
// import { toast } from "@/hooks/use-toast";
import { AnswerType } from "@/types/Types";

import useSWR from "swr";
import axios, { AxiosError } from "axios";
// import Link from "next/link";
// import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useMemo, useState } from "react";
import { AnswerUrl } from "@/constants";
import { format } from "date-fns";
// import { Button } from "@/components/ui/button";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableStudentWiseAnswer() {
//   const [role, setRole] = useState('teacher')
  const { data: answerData= [], isLoading, isValidating, error } = useSWR<AnswerType[]>(AnswerUrl,fetcher);  

  // Handle filter data
//   const filteredData = useMemo(()=>{
//     if(!data) return [];

//      return data.filter((item)=>{
//       if(role === 'teacher' && item.role !== 'teacher') return false
//       if(role === 'admin' && item.role !== 'admin') return false;
//       return true;
//     })

//   },[data, role])

  // Handle delete a course
//   const handleDelete = async(id:string)=>{
//     try {
//       const res = await axios.delete(`${UsersUrl}/${id}`)
//       console.log(res.data);

//       mutate((data)=>data?.filter((user)=>user._id !== id))

//       const {message} = res.data;
//       toast({title: "Success✅", description: message, variant: "default"});

//           } catch (error: unknown) {
//             if(error instanceof AxiosError){
//               console.log(error);  
//               const {message} = error.response?.data
//               toast({ title:"Failed", description: message || "An unknown error has occurred.", variant:"destructive" })
//             }
//     }
//   }

 // Handle edge cases
 if (isLoading) return <div>Loading...</div>;
 if (error instanceof AxiosError){
  const {message} = error.response?.data
  return <div>{message || 'An unknown error has occurred.'}</div>;
 } 
 if (isValidating) return <div>Refreshing...</div>;
 if (answerData?.length === 0) return <div>Empty list for Users</div>;



  return (
    <div>
    {/* <div className="flex items-center justify-between mb-6">
      <h1 className="lg:text-4xl text-2xl font-semibold text-center">{role==='teacher' ? "Manage Teachers" : 'Manage Admins'}</h1>
      <Select onValueChange={(value)=>setRole(value)} defaultValue="teacher">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter Roles"/>
        </SelectTrigger>
        <SelectContent defaultValue={"teacher"}>
          <SelectItem value="teacher">View Teachers</SelectItem>
          <SelectItem value="admin">View Admins</SelectItem>
        </SelectContent>
      </Select>
    </div> */}

    <Table className="border border-black">
      <TableCaption>A list of answers given by students</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Candidate Name</TableHead>
          <TableHead className="w-[100px]">Subject</TableHead>
          <TableHead className="w-[100px]">Level</TableHead>
          <TableHead className="w-[100px]">Submission Time</TableHead>
          <TableHead>Answer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {answerData?.map((ans: AnswerType) => (
          <TableRow key={ans._id}>
            <TableCell className="font-medium">{ans.candidate}</TableCell>
            <TableCell className="font-medium">{ans.batch}</TableCell>
            <TableCell className="font-medium">{ans.assessmentLevel}</TableCell>
            <TableCell className="font-medium">{ans.submissionTime ? format(new Date(ans.submissionTime), 'PPpp') : ''}</TableCell>
            <TableCell className="font-medium">{ans.answer.map((item, index)=>(
              <div key={index} className="flex flex-row items-center gap-1">
                <p>{index+1}.</p>
                <p>{item}</p>
              </div>
            ))}</TableCell>
            {/* <TableCell className="text-right">
              <Link href={`/assessmentViewer/edit/${assessment._id}`}>
              <Button type="button">View</Button>
              </Link>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Rows</TableCell>
          <TableCell className="text-right">{answerData.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
}
