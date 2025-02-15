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
import { EditButton } from "./EditButton";
import { courseType } from "@/types/Types";
import { CoursesUrl } from "@/constants";

import Cookies from 'js-cookie'
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";


const fetcher = (url: string) => axios.get(url, {headers:{ Authorization: Cookies.get("token")}}).then((res) => res.data);

export function TableCourseEntries() {
  const { data, isLoading, isValidating, error, mutate } = useSWR<courseType[]>(CoursesUrl,fetcher);

  // Handle delete a course
  const handleDelete = async(id:string)=>{
    try {
      const res = await axios.delete(`${CoursesUrl}/${id}`, {headers:{ Authorization:Cookies.get("token") }})
      console.log(res.data);

      mutate((data)=>data?.filter((course)=>course._id !== id))

      const {message} = res.data;
      toast({title: "Success✅", description: message,variant: "default",});
          } catch (error) {
      console.log(error);  
      toast({title:"Failed", description:"Unable to delete course entry", variant:"destructive"})
    }
  }
 // Handle edge cases
 if (isLoading) return <div>Loading...</div>;
 if (error) return <div>Failed to load</div>;
 if (isValidating) return <div>Refreshing...</div>;
 if (data?.length === 0) return <div>Empty list for Courses</div>;


  return (
    <Table className="border border-black">
      <TableCaption>A list of courses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Course Name</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((courses: courseType) => (
          <TableRow key={courses._id}>
            <TableCell className="font-medium">{courses.course}</TableCell>
            <TableCell className="text-right">
              <Link href={`/courseEntry/edit/${courses._id}`}>
              <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <EditButton name="Delete" type="button" varient="destructive" onClick={()=>handleDelete(courses._id)}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total Rows</TableCell>
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
