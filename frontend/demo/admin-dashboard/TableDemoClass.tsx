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
import { EditButton } from "./EditButton";

import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { appointmentTypes } from "@/types/Types";
import { DemoClassUrl } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableDemoClass() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<appointmentTypes[]>(DemoClassUrl,fetcher);



  // Handle delete appointment
  const handleDelete = async (appointmentId: string) => {
    try {
      const res = await axios.delete(`${DemoClassUrl}/${appointmentId}`);
      console.log(res.data);

      mutate((data) => data?.filter((appointment) => appointment._id !== appointmentId));

      const {message} = res.data;
      toast({title: "Success✅", description: message,variant: "default",});
    } catch (error) {
      console.log(error);
      toast({title:"Failed", description:"Unable to delete Demo Class", variant:"destructive"})
    }
  };

  // Handle edge cases
  if (data?.length === 0) return <div>Empty list for Demo Classes</div>;
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isValidating) return <div>Refershing data...</div>;

  return (
    <Table className="border border-black">
      <TableCaption>A list of booked appointments for Demo Class</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Student Name</TableHead>
          <TableHead className="w-[100px]">Course Name</TableHead>
          <TableHead className="w-[100px]">Teacher Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((appointment: appointmentTypes) => (
          <TableRow key={appointment._id}>
            <TableCell className="font-medium">
              {appointment.userName}
            </TableCell>
            <TableCell className="font-medium">{appointment.course}</TableCell>
            <TableCell className="font-medium">{appointment.teacher}</TableCell>
            <TableCell className="text-right">{format(appointment.date, "MMM dd, yyyy")}</TableCell>
            <TableCell className="text-right">{appointment.time}</TableCell>
            <TableCell className="text-right">
              <EditButton
                name={appointment.status === true ? "Cancelled" : "Active"}
                type="button"
                varient="ghost"
              />
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/appointment/edit/${appointment._id}`}>
                <EditButton name="Edit" type="button" />
              </Link>
            </TableCell>

            <TableCell className="text-right">
              {appointment.status === true ? (
                <EditButton
                  name="Delete"
                  type="button"
                  varient="destructive"
                  onClick={() => handleDelete(appointment._id ?? "")}
                />) : ("")}
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
