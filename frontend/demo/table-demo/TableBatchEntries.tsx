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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { EditButton } from "../button-demo/EditButton";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";

import { getUserSession } from "@/lib/session";
import { batchType } from "@/types/Types";
import { NewBatchEntryUrl } from "@/constants";

import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import useSWR from "swr";
import Link from "next/link";
import { ArrowUpDown, Search } from "lucide-react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdClass } from "react-icons/md";
import { AddButton } from "../button-demo/AddButton";
import { toast } from "sonner";
import { FaCircle } from "react-icons/fa6";

const fetcher = (url: string) =>
  axios
    .get(url, { headers: { Authorization: Cookies.get("token") } })
    .then((res) => res.data);

export function TableBatchEntries() {
  const [user, setUser] = useState({ role: "", name: "" });

  const [batchStatus, setBatchStatus] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isValidating, error, mutate } = useSWR<batchType[]>(
    NewBatchEntryUrl,
    fetcher
  );

  // Fetch logged-in teacher session
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const session = await getUserSession();
        if (!session.role || !session.name) {
          throw new Error("No user session is found.");
        }
        setUser({ role: session.role, name: session.name });
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, []);

  // Filter batches
  const filteredBatches = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      if (user.role === "teacher" && item.teacher !== user.name) return false;
      if (user.role === "admin" && item.teacher === user.name) return false;
      if (batchStatus === "active" && item.completed === "Yes") return false;
      if (batchStatus === "completed" && item.completed === "No") return false;
      if (
        searchQuery &&
        !item.teacher.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [batchStatus, data, user, searchQuery]);

  // Handle delete a batch
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${NewBatchEntryUrl}/${id}`, {
        headers: { Authorization: Cookies.get("token") },
      });
      console.log(res.data);

      mutate((data) => data?.filter((batch) => batch._id !== id));

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
    <>
    <div className="flex items-center justify-center mb-4">
      <AddButton name="Add Batch" type="button" link={'/newBatchEntry'}/>
    </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="lg:text-4xl text-xl font-semibold text-center">
            {batchStatus === "active" ? "Active Batches" : "Completed Batches"}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <MdClass className="w-4 h-4" />
                Sort by Batches:
                {batchStatus === "active" ? "Active" : "Completed"}
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup
                value={batchStatus}
                onValueChange={setBatchStatus}
              >
                <DropdownMenuRadioItem value="active">
                  Active Batches
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="completed">
                  Completed Batches
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {user.role === "admin" && (
          <div className="flex gap-2 lg:w-full w-[360px] mb-4 items-center border border-gray-300 rounded-full px-2 py-1">
            <Search className="h-4 w-4 mr-2.5" />
            <Input
              type="search"
              placeholder="Search Teacher..."
              className="w-full border-0 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      <Card className="p-2">
        <Table>
          <TableCaption>A list of batches</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Color Code</TableHead>
              <TableHead className="w-[100px]">Teacher Name</TableHead>
              <TableHead>Batch Name</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>
                {user.role === "admin" && "Contact Details"}
              </TableHead>
              <TableHead>{user.role === "admin" && "Email Address"}</TableHead>
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
                <TableCell className="text-right">
                  <div
                    className="rounded-full w-8 h-8 border-2 border-accent"
                    style={{ backgroundColor: batch.colorCode }}
                  ></div>
                </TableCell>
                <TableCell className="font-medium">{batch.teacher}</TableCell>
                <TableCell>{batch.batch}</TableCell>
                <TableCell>{batch.studentName}</TableCell>
                <TableCell>
                  {user.role === "admin" && batch.destination}
                </TableCell>
                <TableCell>{user.role === "admin" && batch.email}</TableCell>
                <TableCell>
                  {batch.startDate
                    ? format(batch.startDate, "MMM dd, yyyy")
                    : ""}
                </TableCell>
                <TableCell className="text-right">
                  <div className="text-center text-wrap w-[100px]">
                    {handleTime(batch.day, batch.time)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                   <div className="text-center text-wrap w-[100px]">
                    {batch.timeZone}
                  </div>
                  </TableCell>
                <TableCell className="text-right">
                  {batch.numberOfClasses}
                </TableCell>

                <TableCell>
                  {batch.completed === "Yes"
                    ?
                   (<Button variant={"outline"} className="rounded-full text-green-600 hover:text-green-600 bg-green-50 hover:bg-green-100">
                      <FaCircle /> Completed
                    </Button>) :
                    batch.completed === "No"
                    ?
                    (<Button variant={"outline"} className="rounded-full text-red-600 hover:text-red-600 bg-red-50 hover:bg-red-100">
                      <FaCircle /> Active
                    </Button>)
                    : null}
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
              <TableCell colSpan={13}>Total Rows</TableCell>
              <TableCell className="text-right">
                {filteredBatches.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </>
  );
}
