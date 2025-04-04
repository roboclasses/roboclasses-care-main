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

import { toast } from "@/hooks/use-toast";
import { getUserSession } from "@/lib/session";
import { batchType } from "@/types/Types";
import { NewBatchEntryUrl } from "@/constants";

import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import useSWR from "swr";
import Link from "next/link";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const fetcher = (url: string) => axios.get(url, { headers: { Authorization: Cookies.get("token") } }).then((res) => res.data);

export function TableBatchEntries() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const [batchStatus, setBatchStatus] = useState("active")
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isValidating, error, mutate } = useSWR<batchType[]>(NewBatchEntryUrl, fetcher);

  // Fetch logged-in teacher session
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const user = await getUserSession();
        if (user) {
          setRole(user.role || "");
          setName(user.name || "");
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, []);

  // Filter batches
    const filteredBatches = useMemo(()=>{
      if(!data) return [];

      return data.filter((item)=>{
          if(batchStatus === "completed" && item.completed !== "Yes" )
            return false;

          if(batchStatus === "active" && item.completed === "yes")
            return false;

          if(searchQuery && !item.teacher.toLowerCase().includes(searchQuery.toLowerCase()))
            return false;

          if(role === "teacher"){
            if(batchStatus === "active" && item.teacher !== name){
              return false;
            }

            if(batchStatus === "completed" && item.teacher !== name)
              return false;
          }

        return true;
      }
      )
    },[batchStatus, data, name, role, searchQuery])

  // Handle delete a batch
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${NewBatchEntryUrl}/${id}`, {
        headers: { Authorization: Cookies.get("token") },
      });
      console.log(res.data);

      mutate((data) => data?.filter((batch) => batch._id !== id));

      const { message } = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        const { message } = error.response?.data;
        toast({
          title: "Failed",
          description: message || "An unknown error has occurred.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle edge cases
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof AxiosError) {
    const { message } = error.response?.data;
    return <div>F{message || "An unknown error has occurred."}</div>;
  }
  if (isValidating) return <div>Refreshing...</div>;
  if (data?.length === 0) return <div>Empty list for Batches</div>;

  // Calculating the batch time
  const handleTime = (timeArray: string[], dayArray: string[]) => {
    return timeArray
      .map((time, index) => {
        const day = dayArray[index];
        if (day && time) {
          return `${day} - ${time}`;
        }
        return null;
      })
      .filter((time) => time !== null)
      .join(", ");
  };


  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="lg:text-4xl text-xl font-semibold text-center">
        Available Batches
          </h1>
          <Select onValueChange={(value)=>setBatchStatus(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Batches"/>
            </SelectTrigger>
            <SelectContent defaultValue={"active"}>
              <SelectItem value="active">Active Batches</SelectItem>
              <SelectItem value="completed">Completed batches</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex lg:w-full w-[300px] max-w-sm items-center border border-gray-300 rounded-lg px-2 py-1">
          <Search className="h-4 w-4 mr-2.5" />
          <Input type="search" placeholder="Search Teacher..." className="w-full border-0" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
        </div>
     </div>
      <Table className="border border-black">
        <TableCaption>A list of batches</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Teacher Name</TableHead>
            <TableHead>Batch Name</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Contact Details</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Times</TableHead>
            <TableHead>Timezone</TableHead>
            <TableHead>Number of Classes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBatches.map((batch: batchType) => (
            <TableRow key={batch._id}>
              <TableCell className="font-medium">{batch.teacher}</TableCell>
              <TableCell>{batch.batch}</TableCell>
              <TableCell>{batch.studentName}</TableCell>
              <TableCell>{batch.destination}</TableCell>
              <TableCell>{batch.email}</TableCell>
              <TableCell>
                {batch.startDate ? format(batch.startDate, "MMM dd, yyyy") : ""}
              </TableCell>
              <TableCell className="text-right">
                {handleTime(batch.day, batch.time)}{" "}
              </TableCell>
              <TableCell className="text-right">{batch.timeZone}</TableCell>
              <TableCell className="text-right">
                {batch.numberOfClasses}
              </TableCell>
              <TableCell className="text-right">
                {batch.completed === "Yes"
                  ? "Completed"
                  : batch.completed === "No"
                  ? "Active"
                  : ""}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/newBatchEntry/edit/${batch._id}`}>
                  <EditButton name="Edit" type="button" />
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <DeleteAlertDemo
                  onCancel={() => console.log("Delete action canceled")}
                  onDelete={() => handleDelete(batch._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={10}>Total Rows</TableCell>
            <TableCell className="text-right">{filteredBatches.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
