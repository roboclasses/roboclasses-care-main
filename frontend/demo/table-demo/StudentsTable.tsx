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

import { studentType } from "@/types/Types";
import { StudentRegUrl } from "@/constants";
import { getUserSession } from "@/lib/session";

import useSWR from "swr";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { Card } from "@/components/ui/card";
import { AddButton } from "../button-demo/AddButton";
import { ExportAlertDemo } from "../dialog-demo/ExportAlertDemo";
import { toast } from "sonner";

const fetcher = (url: string) => axios.get(url, {headers:{Authorization: Cookies.get('token')}}).then((res) => res.data);

export function StudentsTable() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<studentType[]>(StudentRegUrl, fetcher);
  const [role, setRole] = useState("");

  // Get user session
  useEffect(() => {
    const handleFetch = async () => {
      const session = await getUserSession();
      if (!session.role) {
        throw new Error("User session not found.");
      }
      setRole(session.role);
    };
    handleFetch();
  }, []);

  // Handle delete Student
  const handleDelete = async (studentId: string) => {
    try {
      const res = await axios.delete(`${StudentRegUrl}/${studentId}`, {
        headers: { Authorization: Cookies.get("token") },
      });
      console.log(res.data);

      mutate((data) => data?.filter((Student) => Student._id !== studentId));

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

  // Handle download as CSV
  const handleDownload = () => {
    const rows = [
      ["student name", "contact details", "email address", "courses done"],
    ];
    if (!data || data.length === 0) {
      toast.error("No students to download.")
      return;
    }
    data.forEach((student) => {
      rows.push([
        student.studentName || "",
        student.destination || "",
        student.email || "",
        student.courses || "",
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
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Student data CSV is downloading.")
  };

  // Handle edge cases
  if (data?.length === 0) return <div>Empty list for Students</div>;
  if (error instanceof AxiosError) {
    const { message } = error.response?.data;
    return <div>{message || "An unknown error has occurred."}</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (isValidating) return <div>Refershing data...</div>;

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <AddButton
          name="Add Student"
          type="button"
          link={"/appointment/studentRegister"}
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <h1 className="lg:text-4xl text-xl font-semibold mb-4 text-center">
          All Students
        </h1>
        <ExportAlertDemo onExport={handleDownload} onCancel={()=>console.log('Export action cancelled.')}/>
      </div>
      <Card className="p-2">
        <Table>
          <TableCaption>A list of Students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead >Student ID</TableHead>
              <TableHead >Student Name</TableHead>
              <TableHead >Parent Name</TableHead>
              <TableHead >Contact Details</TableHead>
              <TableHead >Email Address</TableHead>
              <TableHead className="w-[100px]">Location Details</TableHead>
              <TableHead className="w-[100px]">Grade</TableHead>
              <TableHead className="w-[100px]">Courses Done</TableHead>
              <TableHead className="w-[50px]">Edit</TableHead>
              <TableHead className="w-[50px]">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((Student: studentType) => (
              <TableRow key={Student._id}>
                <TableCell className="font-medium">{Student.studentId}</TableCell>
                <TableCell className="font-medium">{Student.studentName}</TableCell>
                <TableCell className="font-medium">{Student.parentName}</TableCell>
                <TableCell className="font-medium">{role === "admin" ? Student.destination : ""}</TableCell>
                <TableCell>{role === "admin" ? Student.email : ""}</TableCell>
                <TableCell className="text-right">{Student.address}</TableCell>
                <TableCell className="text-right">{Student.grade}</TableCell>
                <TableCell className="text-right">{Student.courses}</TableCell>
                <TableCell className="text-right">
                  {role === "admin" ? (
                    <Link href={`/appointment/studentRegister/edit/${Student._id}`}>
                      <EditButton name="Edit" type="button" />
                    </Link>
                  ) : ""}
                </TableCell>
                <TableCell className="text-right">
                  {role === "admin" ? (
                    <DeleteAlertDemo
                      onCancel={() => console.log("Delete action canceled")}
                      onDelete={() => handleDelete(Student._id)}
                    />
                  ) : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={11}>Total Rows</TableCell>
              <TableCell className="text-right">{data?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </>
  );
}
