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
import { Button } from "@/components/ui/button";

import { toast } from "@/hooks/use-toast";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
import { EditButton } from "../button-demo/EditButton";
// import { getUserSession } from "@/lib/session";
import { attendanceType, courseType } from "@/types/Types";

import Link from "next/link";
import useSWR from "swr";
import axios, { AxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { formatDate } from "date-fns";
import Cookies from "js-cookie";
import { ArrowUpDown, Calendar, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MdOutlineClass } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { AddButton } from "../button-demo/AddButton";
import { AttendanceUrl, CoursesUrl, UserProfileUrl } from "@/constants";
import { usePathname } from "next/navigation";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableAttendance() {
  const pathname = usePathname();
  const [user, setUser] = useState({ role: "", name: "" });
  const { data, isLoading, isValidating, error, mutate } = useSWR<
    attendanceType[]
  >(AttendanceUrl, fetcher);
  const { data: coursesData, isLoading: coursesLoading } = useSWR<courseType[]>(
    CoursesUrl,
    fetcher
  );
  const [attendanceStatus, setAttendanceStatus] = useState("active");
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch user session
  // useEffect(() => {
  //   const handleFetch = async () => {
  //     try {
  //       const session = await getUserSession();
  //       if (!session.role || !session.name) {
  //         throw new Error("No user session is found.");
  //       }
  //       setUser({ role: session.role, name: session.name });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   handleFetch();
  // }, []);

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

  // Filter data
  const filteredData = useMemo(() => {
    if (!data || !coursesData) return [];

    const filteredData = data.filter((item) => {
      if (user.role === "teacher" && item.teacher !== user.name) return false;
      if (user.role === "admin" && item.teacher === user.name) return false;
      if (attendanceStatus === "active" && item.completed === "Yes")
        return false;
      if (attendanceStatus === "completed" && item.completed === "No")
        return false;
      if(searchQuery && !item.teacher.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true;
    });

    return filteredData.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });
  }, [data, coursesData, user.role, user.name, attendanceStatus, searchQuery, sortOrder]);

  // Handle delete attendance
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${AttendanceUrl}/${id}`, { withCredentials: true,
        headers: { Authorization: Cookies.get("token") },
      });
      console.log(res.data);

      mutate((data) => data?.filter((attendance) => attendance._id !== id));

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
  if (isLoading || coursesLoading) return <div>Loading...</div>;
  if (error instanceof AxiosError) {
    const { message } = error.response?.data;
    return <div>{message || "An unknown error has occurred."}</div>;
  }
  if (isValidating) return <div>Refreshing...</div>;
  if (data?.length === 0) return <div>Empty list for Attendances</div>;

  return (
    <>
    <div className="flex item-center justify-center mb-4">
        <AddButton name="Add Attendance" type="button" link={'/manageAttendance'}/>
    </div>

    <div>
      <div className="flex justify-between item-center gap-2 mb-4">
        <h1 className="lg:text-4xl text-xl font-semibold text-center">
          {attendanceStatus === "active"
            ? "Active Attendances"
            : "Completed Attendances"}
        </h1>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 w-full">
          {/* Filter by Status(Active/Completed) */}
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex item-center gap-1">
                <MdOutlineClass className="w-4 h-4" />
                Sort by Attendances:
                {attendanceStatus === "active" ? "Active" : "Completed"}
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup
                value={attendanceStatus}
                onValueChange={setAttendanceStatus}
              >
                <DropdownMenuRadioItem value="active">
                  Active Attendances
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="completed">
                  Completed Attendances
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter by Start Date (Latest Date/Oldest Date) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex item-center gap-1">
                <Calendar className="w-4 h-4" />
                Sort by Date:
                {sortOrder === "latest" ? "Latest First" : "Oldest First"}
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup
                value={sortOrder}
                onValueChange={setSortOrder}
              >
                <DropdownMenuRadioItem value="latest">
                  Latest First
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">
                  Oldest First
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {user.role === "admin" && (
          <div className="flex gap-2 lg:w-full w-[300px] mb-4 item-center border border-gray-300 rounded-full px-2 py-1">
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
          <TableCaption>A list of attendances</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Batch Name</TableHead>
              <TableHead className="w-[100px]">Teacher Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Classes</TableHead>
              <TableHead>Topics Covered</TableHead>
              <TableHead>Number of Classes Done</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Holiday (From)</TableHead>
              <TableHead>Holiday (To)</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item: attendanceType) => (
              <TableRow key={item._id}>
                <TableCell>{item.batchName}</TableCell>
                <TableCell>{item.teacher}</TableCell>
                <TableCell>
                  {item.startDate
                    ? formatDate(item.startDate, "MMM dd, yyyy")
                    : ""}
                </TableCell>
                <TableCell>
                  {item.classes
                    ? item.classes
                        .map((date) => formatDate(date, "MMM dd, yyyy"))
                        .join(", ")
                    : ""}
                </TableCell>
                <TableCell>
                  {item.curriculumTaught
                    ? item.curriculumTaught.map((item) => item).join(", ")
                    : ""}
                </TableCell>
                <TableCell>{item.classes.length}</TableCell>
                <TableCell>
                  {item.completed === "Yes" ? "Completed" : "Active"}
                </TableCell>
                 <TableCell>
                    {item.dateRange?.from ? formatDate(item.dateRange?.from, "MMM dd, yyyy") : ""}
                  </TableCell>
                  <TableCell>
                    {item.dateRange?.to ? formatDate(item.dateRange?.to, "MMM dd, yyyy") : ""}
                  </TableCell>
                <TableCell className="text-right">
                  <Link href={`/manageAttendance/edit/${item._id}`}>
                    <EditButton name="Edit" type="button" />
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <DeleteAlertDemo
                    onCancel={() => console.log("Delete action canceled")}
                    onDelete={() => handleDelete(item._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={9}>Total Rows</TableCell>
              <TableCell className="text-right">
                {filteredData.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </>
  );
}
