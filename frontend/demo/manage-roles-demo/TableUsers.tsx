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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState } from "react";
import { UsersUrl } from "@/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Copy, User } from "lucide-react";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableUsers() {
  const [role, setRole] = useState('teacher')
  const { data:userData, isLoading, isValidating, error, mutate } = useSWR<usersType[]>(UsersUrl,fetcher);

  // Handle filter data
  const filteredData = useMemo(()=>{
    if(!userData) return [];

     return userData.filter((item)=>{
      if(role === 'teacher' && item.role !== 'teacher') return false
      if(role === 'admin' && item.role !== 'admin') return false;
      if(role === 'contractor' && item.role !== 'contractor') return false;
      return true;
    })

  },[userData, role])

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
 if (userData?.length === 0) return <div>Empty list for Users</div>;



  return (
    <>
    <div className="flex items-center justify-between mb-4">
      <h1 className="lg:text-4xl text-2xl font-semibold text-center">{role==='teacher' ? "Manage Teachers" 
      : role==='admin' ? 'Manage Admins' 
      : role === 'contractor' ? 'Manage Contractor' 
      : ''}
      </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Sort by Roles:
                {role === "teacher" ? "Teacher" : role === "admin" ? "Admin" : role === "contractor" ? "Contractor" : ""}
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup
                value={role}
                onValueChange={setRole}
              >
                <DropdownMenuRadioItem value="teacher">
                  Teacher
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="admin">
                  Admin
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="contractor">
                  Contractor
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
      
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
          {<TableHead>Copy Zoom Api</TableHead>}
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData?.map((item: usersType) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="font-medium">{item.email}</TableCell>
            <TableCell className="font-medium">{item.role}</TableCell>
            <TableCell className="font-medium">{item.workingHours}</TableCell>
            <TableCell className="font-medium">{item.workingDays}</TableCell>
            <TableCell className="text-right">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    const api = item.zoomApi
                    navigator.clipboard
                      .writeText(api)
                      .then(() => {
                        toast({
                          title: "Success ✅",
                          description: "Zoom Api copied to clipboard",
                          color: "green",
                          duration: 3000,
                        });
                      })
                      .catch(() => {
                        toast({
                          title: "Error",
                          description: "Failed to copy Api to clipboard",
                          variant: "destructive",
                          duration: 3000,
                        });
                      });
                  }}
                  title="Copy zoom api"
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Zoom Api 
                </Button>
              </TableCell>
            <TableCell className="text-right">
              <Link href={`/manageRoles/edit/${item._id}`}>
              <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <DeleteAlertDemo onCancel={()=>console.log("Delete action canceled")} onDelete={()=>handleDelete(item._id)}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}>Total Rows</TableCell>
          <TableCell className="text-right">{filteredData?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </Card>
    </>
  );
}
