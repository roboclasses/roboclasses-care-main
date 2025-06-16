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
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import { AssessmentUrl } from "@/constants";
import { AssessmentType } from "@/types/Types";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";

import useSWR from "swr";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { Copy } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { getUserSession } from "@/lib/session";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableBatchWiseAssessment() {
  const [user, setUser] = useState({name:"", role:""})

  // Handle fetch user session
  useEffect(()=>{
    const handleFetch = async()=>{
      const session = await getUserSession();
      if(!session.role || !session.name){
        throw new Error('No user session is found')
      }
      setUser({name:session.name, role:session.role})
    }
    handleFetch();

  },[])

  const {
    data: assessmentData = [],
    isLoading,
    isValidating,
    error,
    mutate
  } = useSWR<AssessmentType[]>(AssessmentUrl, fetcher);

  // Handle filter assessment
  const filteredData = useMemo(()=>{
    if(!assessmentData) return[];
    return assessmentData.filter((item:AssessmentType)=>{
      if(user.role === 'teacher' && user.name !== item.teacher) return false;
      if(user.role === 'admin' && user.name === item.teacher) return false;
      return true;
    })

  },[assessmentData, user])

  // Handle delete question
  const handleDelete = async(id: string)=>{
    try {
      const res = await axios.delete(`${AssessmentUrl}/${id}`, {headers: {Authorization: Cookies.get('token')}})
      console.log(res.data);

      mutate();

      const {message} = res.data;
      toast({title:'Success✅', description: message, variant: 'default'})
      
    } catch (error:unknown) {
      if(error instanceof AxiosError){
         console.error(error);

         const {message} = error.response?.data;
         toast({title:'Failed', description: message || 'An unknown error has occurred.', variant: 'destructive'})
      }
    }
  }

  // Handle edge cases
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof AxiosError) {
    const { message } = error.response?.data;
    return <div>{message || "An unknown error has occurred."}</div>;
  }
  if (isValidating) return <div>Refreshing...</div>;
  if (assessmentData?.length === 0) return <div>Empty list for assessments</div>;

  return (
    <div>
      <Table className="border border-black">
        <TableCaption>A list of Batch wise Assessment</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Batch Name</TableHead>
             <TableHead className="w-[100px]">Teacher Name</TableHead>
            <TableHead className="w-[100px]">Assessment Level</TableHead>
            <TableHead>Assessment Form</TableHead>
            <TableHead>Assessment Link</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((assessment: AssessmentType) => (
            <TableRow key={assessment._id}>
              <TableCell className="font-medium">{assessment.batch}</TableCell>
              <TableCell className="font-medium">{assessment.teacher}</TableCell>
              <TableCell className="font-medium">
                {assessment.assessmentLevel}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/assessmentViewer/create/${assessment._id}`}>
                  <Button type="button">View</Button>
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    const link = `${window.location.origin}/assessmentViewer/create/${assessment._id}`;
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
              <TableCell>
                <DeleteAlertDemo onDelete={()=>handleDelete(assessment._id)} onCancel={()=>console.log('Delete action cancelled')}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Total Rows</TableCell>
            <TableCell className="text-right">
              {filteredData.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
