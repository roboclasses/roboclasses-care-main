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
import { Button } from "@/components/ui/button";

import { AssessmentUrl } from "@/constants";
import { AssessmentType } from "@/types/Types";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";

import useSWR from "swr";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { Copy, LucideChevronsUpDown } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { getUserSession } from "@/lib/session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { teachers } from "@/data/dataStorage";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function AssessmentTable() {
  const [user, setUser] = useState({ name: "", role: "" });
  const [sortOrder, setSortOrder] = useState("All")

  // Handle fetch user session
  useEffect(() => {
    const handleFetch = async () => {
      const session = await getUserSession();
      if (!session.role || !session.name) {
        throw new Error("No user session is found");
      }
      setUser({ name: session.name, role: session.role });
    };
    handleFetch();
  }, []);

  const {
    data: assessmentData = [],
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR<AssessmentType[]>(AssessmentUrl, fetcher);

  // Handle filter assessment
  const filteredData = useMemo(() => {
  if (!assessmentData) return [];

  return assessmentData.filter((item: AssessmentType) => {
    if (user.role === "teacher") {
      return user.name === item.teacher;
    }

    if (user.role === "admin") {
      if (sortOrder === "All") return true;
      return item.teacher === sortOrder;
    }

    return true; // Fallback: allow all
  });
}, [assessmentData, sortOrder, user]);

  // Handle delete question
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${AssessmentUrl}/${id}`, {
        headers: { Authorization: Cookies.get("token") },
      });
      console.log(res.data);

      mutate();

      const { message } = res.data;
      toast.success(message)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);

        const { message } = error.response?.data;
        toast.error(message || "An unknown error has occurred.")
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
  if (assessmentData?.length === 0)
    return <div>Empty list for assessments</div>;

  return (
    <Card className="p-2">
      <Table>
        <TableCaption>A list of Batch wise Assessment</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Batch Name</TableHead>
            <TableHead className="w-[100px] flex items-center gap-2">
              Teacher Name
              {user.role === 'admin' && (<div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <LucideChevronsUpDown size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]" align="end">
                    <DropdownMenuRadioGroup
                      value={sortOrder}
                      onValueChange={setSortOrder}
                    >
                      {teachers.map((item) => (
                        <DropdownMenuRadioItem key={item.id} value={item.name}>
                          {item.name}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>)}
            </TableHead>
            <TableHead className="w-[100px]">Assessment Level</TableHead>
            <TableHead className="w-[100px]">Assessment Form</TableHead>
            <TableHead>Assessment Link</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((assessment: AssessmentType) => (
            <TableRow key={assessment._id}>
              <TableCell className="font-medium">{assessment.batch}</TableCell>
              <TableCell className="font-medium">
                {assessment.teacher}
              </TableCell>
              <TableCell className="font-medium">
                {assessment.assessmentLevel}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/assessmentViewer/create/${assessment._id}`}>
                  <Button type="button">View</Button>
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    const link = `${window.location.origin}/assessmentViewer/create/${assessment._id}`;
                    navigator.clipboard
                      .writeText(link)
                      .then(() => {
                        toast.success("Assessment link copied to clipboard")
                      })
                      .catch(() => {
                        toast.error("Failed to copy link to clipboard")
                      });
                  }}
                  title="Copy assessment link"
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </TableCell>
              <TableCell>
                <DeleteAlertDemo
                  onDelete={() => handleDelete(assessment._id)}
                  onCancel={() => console.log("Delete action cancelled")}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Total Rows</TableCell>
            <TableCell className="text-right">{filteredData.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}
