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
import { AssessmentType } from "@/types/Types";

import useSWR from "swr";
import axios, { AxiosError } from "axios";
import Link from "next/link";
// import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useMemo, useState } from "react";
import { AssessmentUrl } from "@/constants";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableBatchWiseAssessment() {
  //   const [role, setRole] = useState('teacher')
  const {
    data: assessmentData = [],
    isLoading,
    isValidating,
    error,
  } = useSWR<AssessmentType[]>(AssessmentUrl, fetcher);

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
  if (error instanceof AxiosError) {
    const { message } = error.response?.data;
    return <div>{message || "An unknown error has occurred."}</div>;
  }
  if (isValidating) return <div>Refreshing...</div>;
  if (assessmentData?.length === 0) return <div>Empty list for Users</div>;

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
        <TableCaption>A list of Batch wise Assessment</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Batch Name</TableHead>
            <TableHead className="w-[100px]">Assessment Level</TableHead>
            <TableHead>Assessment Form</TableHead>
            <TableHead>Assessment Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessmentData?.map((assessment: AssessmentType) => (
            <TableRow key={assessment._id}>
              <TableCell className="font-medium">{assessment.batch}</TableCell>
              <TableCell className="font-medium">
                {assessment.assessmentLevel}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/assessmentViewer/edit/${assessment._id}`}>
                  <Button type="button">View</Button>
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    const link = `${window.location.origin}/assessmentViewer/edit/${assessment._id}`;
                    navigator.clipboard
                      .writeText(link)
                      .then(() => {
                        toast({
                          title: "Success ✅",
                          description: "Assessment link copied to clipboard",
                          color: "green",
                          duration: 3000,
                        });
                      })
                      .catch(() => {
                        toast({
                          title: "Error",
                          description: "Failed to copy link to clipboard",
                          variant: "destructive",
                          duration: 3000,
                        });
                      });
                  }}
                  title="Copy assessment link"
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Rows</TableCell>
            <TableCell className="text-right">
              {assessmentData.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
