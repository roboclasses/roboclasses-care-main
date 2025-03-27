'use client'

import React, { useEffect, useMemo, useState } from "react";

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
import { getUserSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import Cookies from "js-cookie";


const fetcher = (url: string) => axios.get(url, {headers:{Authorization: Cookies.get("token")}}).then((res) => res.data);


const TableViewDemo = () => {
  const { data, error, isLoading, isValidating } = useSWR<leaveType[]>(TimeOffUrl,fetcher);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [filters, setFilters] = useState<{type: string; status: string; fromDate: string}>({type:"", status: "", fromDate: ""})

  // Get user session
  useEffect(()=>{
    const fetchSession = async()=>{
      const user = await getUserSession();
      if(user){
        setName(user.name || '')
        setRole(user.role || '')
      }
    }
    fetchSession();
  },[])

   // Advance Filter logic for leaves data
   const filteredData = useMemo(() => {
    if (!data) return [];
    
    return data.filter((item) => {
      if (role === "teacher" && item.teacherName !== name) return false;
      if (filters.type && item.timeOffType !== filters.type) return false;
      if (filters.status && item.status !== filters.status) return false;
      if (filters.fromDate && item.date && new Date(item.date) < new Date(filters.fromDate)) return false;
      return true;
    });
  }, [data, filters, role, name]);

// Reset applied filters
  const resetFilters = () => setFilters({ type: "", status: "", fromDate: "" });

    // Handle edge cases
    if (data?.length === 0) return <div>Empty list for Leaves</div>;
    if (error instanceof AxiosError){
      const {message} = error.response?.data;
      return <div>{message || "An unknown error has occurred."}</div>;
    } 
    if (isLoading) return <div>Loading...</div>;
    if (isValidating) return <div>Refershing data...</div>;
  
    
    return (
      <Card className="lg:w-full w-[400px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FilterTimeOffDemo onFilterLeaves={setFilters} />
            {Object.values(filters).some(Boolean) && (
              <Button variant="outline" className="rounded-full shadow-none" onClick={resetFilters}>
                <RefreshCcw />
                Reset
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="lg:w-full w-[400px] overflow-x-auto">
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
              {filteredData.map((item: leaveType) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.status}</TableCell>
                  <TableCell>{item.teacherName}</TableCell>
                  <TableCell>{item.timeOffType}</TableCell>
                  <TableCell>{item.date ? format(new Date(item.date), "MMM dd, yyyy") : ""}</TableCell>
                  <TableCell className="text-right">{item.notes}</TableCell>              
                    <TableCell className="text-right">
                      <TimeOffApprovalDemo timeOffId={item._id} />
                    </TableCell>                 
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>Total Rows</TableCell>
                <TableCell className="text-right">{filteredData.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    );
};

export default TableViewDemo;
