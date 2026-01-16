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

import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
import { EditButton } from "../button-demo/EditButton";
// import { getUserSession } from "@/lib/session";
import { appointmentTypes } from "@/types/Types";
import { DemoClassUrl, UserProfileUrl } from "@/constants";

import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { ArrowUpDown, Book, BookA, LucideChevronsUpDown } from "lucide-react";
import { FaCircle } from "react-icons/fa6";
import { AddButton } from "../button-demo/AddButton";
import { ExportAlertDemo } from "../dialog-demo/ExportAlertDemo";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type TCompensationClassesType = 'demo' | 'compensation'

// Table caption data
const tableCaptions:Record<TCompensationClassesType, string> = {
  demo: "A list of booked appointments for Demo Class",
  compensation: "A list of booked appointments for Compensation Class"
}

export function TableDemoClass() {
  const pathname = usePathname();
  const [user, setUser] = useState({ role: "", name: "" });
  const { data, error, isLoading, isValidating, mutate } = useSWR<appointmentTypes[]>(DemoClassUrl, fetcher);
  const [demoClasses, setDemoClasses] = useState("upcoming");
  const [compensationClasses, setCompensationClasses] = useState<TCompensationClassesType>("demo");
  const [sortOrder, setSortOrder] = useState("ALL");

  // Fetch logged-in teacher session
  useEffect(()=>{
    const doFetch = async()=>{
      try {
        const res = await axios.get(UserProfileUrl, {withCredentials: true, headers:{ Authorization:Cookies.get("token") }});
        console.log(res.data);

        setUser({role: res.data.role, name: res.data.name})
        
      } catch (error) {
        console.error(error);
      }
    }

    if(pathname.startsWith('/adminDashboard')){
      doFetch();
    }

  },[pathname])

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
      const res = await axios.delete(`${DemoClassUrl}/${appointmentId}`, { withCredentials: true,
        headers: { Authorization: Cookies.get("token") },
      });
      console.log(res.data);

      mutate((data) =>
        data?.filter((appointment) => appointment._id !== appointmentId)
      );

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

  // Handle download demo class data as CSV
    const handleDownload = () => {
    const rows = [
      ["batch number", "student name", "conatct details", "course"],
    ];
    if (!data || data.length === 0) {
      toast.error('No demo classes to download.')
      return;
    }
    data.forEach((student) => {
      rows.push([
        student.batchNumber|| "",
        student.userName || "",
        student.destination || "",
        student.course || "",
      ]);
    });
    const csvContent = rows
      .map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "democlass.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Demo class data CSV is downloading.')
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
      <div className="flex items-center justify-center mb-4">
        <AddButton name="Add Demo Class" type="button" link={'/appointment/demo-class'}/>
      </div>    
      <div className="flex justify-between items-center mb-4 gap-2">
        <h1 className="lg:text-4xl text-xl font-semibold text-center">
          {compensationClasses === "demo"
            ? "Demo Classes"
            : compensationClasses === "compensation"
            ? "Compensation Classes"
            : null}
        </h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
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

          {/* Export demo class data as CSV for backeup only*/}
          <ExportAlertDemo onExport={handleDownload} onCancel={()=>console.log('Export action cancelled.')}/>
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
                  <Button variant={'outline'} className="rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-600">
                    <FaCircle /> Not Converted
                   </Button>) 
                   : appointment.converted === 'Yes' ? (
                   <Button variant={'outline'} className="rounded-full bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-600">
                    <FaCircle className="text-green-500" /> Converted
                   </Button>) 
                   : null}
                </TableCell>
                <TableCell className="text-right"> {appointment.batchNumber} </TableCell>
                <TableCell className="text-right">
                  <Link href={`/appointment/demo-class/edit/${appointment._id}`}>
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
