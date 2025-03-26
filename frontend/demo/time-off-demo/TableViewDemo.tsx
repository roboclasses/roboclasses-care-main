'use client'

import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableFooter,
} from "@/components/ui/table";
import { FilterTimeOffDemo } from "./FilterTimeOffDemo";
import { TimeOffApprovalDemo } from "./TimeOffApprovalDemo";
import { leaveType } from "@/types/Types";
import { format } from "date-fns";
import axios, { AxiosError } from "axios";
import useSWR from "swr";
import { TimeOffUrl } from "@/constants";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);


const TableViewDemo = () => {
  const { data, error, isLoading, isValidating } = useSWR<leaveType[]>(TimeOffUrl,fetcher);

    // Handle edge cases
    const handleEdgeCases=()=>{
      if (data?.length === 0) return <div>Empty list for Leaves</div>;
    if (error instanceof AxiosError){
      const {message} = error.response?.data;
      return <div>{message || "An unknown error has occurred."}</div>;
    } 
    if (isLoading) return <div>Loading...</div>;
    if (isValidating) return <div>Refershing data...</div>;
    }
    
  
  return (
    <Card className="lg:w-full w-[400px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <FilterTimeOffDemo />
      </CardHeader>
      <CardContent className="lg:w-full w-[400px] overflow-x-auto">
        {handleEdgeCases()}
        <Table>
          <TableCaption>A list of past leaves</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Teacher Name</TableHead>
              <TableHead>Time off type</TableHead>
              <TableHead>Time off date</TableHead>
              <TableHead className="text-right">Additional note</TableHead>
              <TableHead className="text-right">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           {data?.map((item:leaveType)=>(
            <TableRow key={item._id}>
            <TableCell className="font-medium">{item.status}</TableCell>
            <TableCell>{item.teacherName}</TableCell>
            <TableCell>{item.timeOffType}</TableCell>
            <TableCell>{item.date ? format(item.date, 'MMM dd, yyyy') : ''}</TableCell>
            <TableCell className="text-right">{item.notes}</TableCell>
            <TableCell className="text-right">
              <TimeOffApprovalDemo />
            </TableCell> 
          </TableRow>
           ))}
          </TableBody>
          <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total Rows</TableCell>
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TableViewDemo;
