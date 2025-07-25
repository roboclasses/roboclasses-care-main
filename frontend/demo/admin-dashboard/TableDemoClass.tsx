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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { toast } from "@/hooks/use-toast";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
import { EditButton } from "../button-demo/EditButton";
import { getUserSession } from "@/lib/session";
import { appointmentTypes } from "@/types/Types";
import { DemoClassUrl } from "@/constants";

import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { ArrowUpDown, Book, BookA, LucideChevronsUpDown } from "lucide-react";
import { FaCircle } from "react-icons/fa6";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type TCompensationClassesType = 'demo' | 'compensation'

// Table caption data
const tableCaptions:Record<TCompensationClassesType, string> = {
  demo: "A list of booked appointments for Demo Class",
  compensation: "A list of booked appointments for Compensation Class"
}

export function TableDemoClass() {
  const [user, setUser] = useState({ role: "", name: "" });
  const { data, error, isLoading, isValidating, mutate } = useSWR<appointmentTypes[]>(DemoClassUrl, fetcher);
  const [demoClasses, setDemoClasses] = useState("upcoming");
  const [compensationClasses, setCompensationClasses] = useState<TCompensationClassesType>("demo");
  const [sortOrder, setSortOrder] = useState("ALL");

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

  // Handle role and name based rows filering
  const filteredData = useMemo(() => {
    if (!data) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0); // For accurate comparison

    return data.filter((item) => {
      const itemDate = new Date(item.date);

      if (demoClasses === "upcoming" && itemDate < today) return false;

      if (demoClasses === "old" && itemDate >= today) return false;

      if (user.role === "teacher" && item.teacher !== user.name) return false;

      if (compensationClasses === "demo" && item.isCompensationClass === true) return false;
      if (compensationClasses === "compensation" && item.isCompensationClass === false) return false;

      if (sortOrder === "No" && item.converted === "Yes") return false;
      if (sortOrder === "Yes" && item.converted === "No") return false;

      return true;
    });
  }, [compensationClasses, data, demoClasses, sortOrder, user.name, user.role]);

  // Handle delete appointment
  const handleDelete = async (appointmentId: string) => {
    try {
      const res = await axios.delete(`${DemoClassUrl}/${appointmentId}`, {
        headers: { Authorization: Cookies.get("token") },
      });
      console.log(res.data);

      mutate((data) =>
        data?.filter((appointment) => appointment._id !== appointmentId)
      );

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
  if (data?.length === 0) return <div>Empty list for Demo Classes</div>;
  if (error instanceof AxiosError) {
    const { message } = error.response?.data;
    return <div>{message || "An unknown error has occurred."}</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (isValidating) return <div>Refershing data...</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-4 gap-2">
        <h1 className="lg:text-4xl text-xl font-semibold text-center">
          {compensationClasses === "demo"
            ? "Demo Classes"
            : compensationClasses === "compensation"
            ? "Compensation Classes"
            : null}
        </h1>
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-2">
          {/* Select upcoming/old classes */}
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <BookA className="w-4 h-4" />
                Sort by Classes:
                {demoClasses === "upcoming" ? "Upcoming" : "Old"}
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup
                value={demoClasses}
                onValueChange={setDemoClasses}
              >
                <DropdownMenuRadioItem value="upcoming">
                  Upcoming Classes
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="old">
                  Old Classes
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Select compensation/demo classes */}
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Book className="w-4 h-4" />
                Sort by Classes:
                {compensationClasses === "demo" ? "Demo" : "Compensation"}
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup
                value={compensationClasses}
                onValueChange={(value)=>setCompensationClasses(value as TCompensationClassesType)}
              >
                <DropdownMenuRadioItem value="demo">
                  Demo Classes
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="compensation">
                  Compensation Classes
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="p-2">
        <Table>
          <TableCaption>
            {tableCaptions[compensationClasses] || null}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Student Name</TableHead>
              <TableHead className="w-[100px]">
                {user.role === "admin" && "Contact Details"}
              </TableHead>
              <TableHead className="w-[100px]">Course Name</TableHead>
              <TableHead className="w-[100px]">Teacher Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Timezone</TableHead>
              <TableHead className="flex items-center gap-2">
                Converted
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <LucideChevronsUpDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]" align="end">
                      <DropdownMenuRadioGroup
                        value={sortOrder}
                        onValueChange={setSortOrder}
                      >
                        <DropdownMenuRadioItem value="ALL">
                          All 
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="No">
                          Not Converted
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Yes">
                          Converted
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableHead>
              <TableHead>Batch Number</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((appointment: appointmentTypes) => (
              <TableRow key={appointment._id}>
                <TableCell className="font-medium"> {appointment.userName} </TableCell>
                <TableCell className="font-medium"> {user.role === "admin" && appointment.destination} </TableCell>
                <TableCell className="font-medium"> {appointment.course} </TableCell>
                <TableCell className="font-medium"> {appointment.teacher} </TableCell>
                <TableCell className="text-right"> {appointment.date ? format(appointment.date, "MMM dd, yyyy") : ""} </TableCell>
                <TableCell className="text-right">{appointment.time}</TableCell>
                <TableCell className="text-right"> {appointment.timeZone} </TableCell>
                <TableCell className="text-right">
                  {appointment.converted === 'No' ? (
                  <Button variant={'outline'} className="rounded-full">
                    <FaCircle style={{ color: "red" }} /> Not Converted
                   </Button>) 
                   : appointment.converted === 'Yes' ? (
                   <Button variant={'outline'} className="rounded-full">
                    <FaCircle style={{ color: "green" }} /> Converted
                   </Button>) 
                   : null}
                </TableCell>
                <TableCell className="text-right"> {appointment.batchNumber} </TableCell>
                <TableCell className="text-right">
                  <Link href={`/appointment/reminder/demo-class/edit/${appointment._id}`}>
                    <EditButton name="Edit" type="button" />
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <DeleteAlertDemo
                    onCancel={() => console.log("Delete action canceled")}
                    onDelete={() => handleDelete(appointment._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={11}>Total Rows</TableCell>
              <TableCell className="text-right">
                {filteredData?.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </>
  );
}
