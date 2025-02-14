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
import { EditButton } from "./EditButton";
import { NormalClassUrl } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { normalClassType } from "@/types/Types";

import axios from "axios";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// For mapping weekdays in time cell
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function TableNormalClass() {
  const { data, isLoading, isValidating, error, mutate } = useSWR<normalClassType[]>(NormalClassUrl, fetcher);

  
  // handle delete appointment for normal class
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${NormalClassUrl}/${id}`);
      console.log(res.data);

      mutate((data) => data?.filter((item) => item._id !== id));

      const {message} = res.data;
      toast({title: "Success✅", description: message,variant: "default",});
    } catch (error) {
      console.log(error);
      toast({title:"Failed", description:"Unable to delete Normal Class", variant:"destructive"})
    }
  };

  // Handle edge cases
  if (data?.length === 0) return <div>Empty list for Normal Class</div>;
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isValidating) return <div>Refershing data...</div>;


  // Function to format time for Normal Class appointment
  const handleTime = (timeArray: string[]) => {
    return timeArray
      .map((time, index) => (time !== "" ? `${weekdays[index]} - ${time}` : null)) 
      .filter((time) => time !== null) 
      .join(", "); 
  };


  return (
    <Table className="border border-black">
      <TableCaption>
        A list of booked appointments for Normal Class
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Batch Name</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((appointment: normalClassType) => (
          <TableRow key={appointment._id}>
            <TableCell>{appointment.teacher}</TableCell>
            <TableCell>{appointment.batch}</TableCell>
            <TableCell className="text-right"> {handleTime(appointment.time)} </TableCell>
            <TableCell>
              <Link href={`/appointment/reminder/normal-class/edit/${appointment._id}`}>
              <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <EditButton
                name="Delete"
                type="button"
                varient="destructive"
                onClick={() => handleDelete(appointment._id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total Rows</TableCell>
          <TableCell className="text-right">{data?.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
