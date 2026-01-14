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
import { EditButton } from "../button-demo/EditButton";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";

import { courseType } from "@/types/Types";
import { CoursesUrl } from "@/constants";

import useSWR from "swr";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { Card } from "@/components/ui/card";
import { AddButton } from "../button-demo/AddButton";
import { toast } from "sonner";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableCourseEntries() {
  const { data, isLoading, isValidating, error, mutate } = useSWR<courseType[]>(
    CoursesUrl,
    fetcher
  );

  // Handle delete a course
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${CoursesUrl}/${id}`, {withCredentials: true,
        headers: { Authorization: Cookies.get("token") },
      });
      console.log(res.data);

      mutate((data) => data?.filter((course) => course._id !== id));

      const { message } = res.data;
      toast.success(message)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        const { message } = error.response?.data;
        toast.error(message || 'An unknown error has occurred.')
      }
    }
  };

  // Handle edge cases
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof AxiosError) {
    const { message } = error.response?.data;
    return <div>{message || "An unknown error has occurred."}</div>;
  }
  if (isValidating) return <div>Refreshing...</div>;
  if (data?.length === 0) return <div>Empty list for Courses</div>;

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <AddButton name="Add Course" type="button" link={'/courseEntry'}/>
      </div>
      <h1 className="lg:text-4xl text-xl font-semibold mb-4 text-center">
        Current Courses
      </h1>
      <Card className="p-2">
        <Table>
          <TableCaption>A list of courses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Course Name</TableHead>
              <TableHead className="w-[100px]">Courses Syllabus</TableHead>
              <TableHead className="w-[100px]">Number of Classes</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((courses: courseType) => (
              <TableRow key={courses._id}>
                <TableCell className="font-medium">{courses.course}</TableCell>
                <TableCell className="font-medium">
                  <div className="w-[300px] text-wrap text-center">
                  { courses.syllabus ? 
                      courses.syllabus.map((item)=>item.topic).join(', ') : 
                        [] }
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {courses.numberOfClasses}
                </TableCell>

                <TableCell className="text-right w-[100px]">
                  <Link href={`/courseEntry/edit/${courses._id}`}>
                    <EditButton name="Edit" type="button" />
                  </Link>
                </TableCell>

                <TableCell className="text-right w-[100px]">
                  <DeleteAlertDemo
                    onCancel={() => console.log("Delete action canceled")}
                    onDelete={() => handleDelete(courses._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Rows</TableCell>
              <TableCell className="text-right">{data?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </>
  );
}
