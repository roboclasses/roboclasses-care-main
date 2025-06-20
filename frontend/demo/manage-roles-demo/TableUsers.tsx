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
import { toast } from "@/hooks/use-toast";
import { EditButton } from "../button-demo/EditButton";
import { usersType } from "@/types/Types";

import useSWR from "swr";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";
import { UsersUrl } from "@/constants";
import { Card } from "@/components/ui/card";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableUsers() {
  const [role, setRole] = useState('teacher')
  const { data, isLoading, isValidating, error, mutate } = useSWR<usersType[]>(UsersUrl,fetcher);

  // Handle filter data
  const filteredData = useMemo(()=>{
    if(!data) return [];

     return data.filter((item)=>{
      if(role === 'teacher' && item.role !== 'teacher') return false
      if(role === 'admin' && item.role !== 'admin') return false;
      return true;
    })

  },[data, role])

  // Handle delete a course
  const handleDelete = async(id:string)=>{
    try {
      const res = await axios.delete(`${UsersUrl}/${id}`)
      console.log(res.data);

      mutate((data)=>data?.filter((user)=>user._id !== id))

      const {message} = res.data;
      toast({title: "Success✅", description: message, variant: "default"});

          } catch (error: unknown) {
            if(error instanceof AxiosError){
              console.log(error);  
              const {message} = error.response?.data
              toast({ title:"Failed", description: message || "An unknown error has occurred.", variant:"destructive" })
            }
    }
  }

 // Handle edge cases
 if (isLoading) return <div>Loading...</div>;
 if (error instanceof AxiosError){
  const {message} = error.response?.data
  return <div>{message || 'An unknown error has occurred.'}</div>;
 } 
 if (isValidating) return <div>Refreshing...</div>;
 if (data?.length === 0) return <div>Empty list for Users</div>;



  return (
    <div>
    <div className="flex items-center justify-between mb-6">
      <h1 className="lg:text-4xl text-2xl font-semibold text-center">{role==='teacher' ? "Manage Teachers" : 'Manage Admins'}</h1>
      <Select onValueChange={(value)=>setRole(value)} defaultValue="teacher">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter Roles"/>
        </SelectTrigger>
        <SelectContent defaultValue={"teacher"}>
          <SelectItem value="teacher">Teachers</SelectItem>
          <SelectItem value="admin">Admins</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Card className="p-2">
    <Table>
      <TableCaption>A list of roles</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User Full Name</TableHead>
          <TableHead className="w-[100px]">Email Address</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Working Hours</TableHead>
          <TableHead>Working Days</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData?.map((users: usersType) => (
          <TableRow key={users._id}>
            <TableCell className="font-medium">{users.name}</TableCell>
            <TableCell className="font-medium">{users.email}</TableCell>
            <TableCell className="font-medium">{users.role}</TableCell>
            <TableCell className="font-medium">{users.workingHours}</TableCell>
            <TableCell className="font-medium">{users.workingDays}</TableCell>
            <TableCell className="text-right">
              <Link href={`/manageRoles/edit/${users._id}`}>
              <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <DeleteAlertDemo onCancel={()=>console.log("Delete action canceled")} onDelete={()=>handleDelete(users._id)}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total Rows</TableCell>
          <TableCell className="text-right">{filteredData?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </Card>
    </div>
  );
}
