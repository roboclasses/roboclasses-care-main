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
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import { FeedbackUrl } from "@/constants";
import { FeedbackType } from "@/types/Types";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";

import useSWR from "swr";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { Copy, LucideChevronsUpDown } from "lucide-react";
import { FaCircle } from "react-icons/fa";
import { format, isValid } from "date-fns";
import { useMemo, useState } from "react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableFeedback() {
  const {
    data: feedbackData = [],
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR<FeedbackType[]>(FeedbackUrl, fetcher);
  const [sortOrder, setSortOrder] = useState("active")

  // Handle Filter table
const filteredData = useMemo(()=>{
  if(!feedbackData) return [];

   return feedbackData.filter((item:FeedbackType)=>{
    if(sortOrder === 'active' && item.isCompleted === true) return false;
    if(sortOrder === 'completed' && item.isCompleted === false) return false;
    return true;
   })

},[feedbackData, sortOrder])

  // Handle delete question
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${FeedbackUrl}/${id}`);
      console.log(res.data);

      mutate();

      const { message } = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);

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
    return <div>{message || "An unknown error has occurred."}</div>;
  }
  if (isValidating) return <div>Refreshing...</div>;
  if (feedbackData?.length === 0) return <div>Empty list for feedbacks</div>;

  return (
    <div>
      <Table className="border border-black">
        <TableCaption>A list of Batch wise Feedbacks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] flex items-center gap-2"> 
              Status
              <div>
                 <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <LucideChevronsUpDown size={16}/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]" align="end">
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                  <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
          </DropdownMenu>
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Batch Name</TableHead>
            <TableHead className="w-[100px]">Student Name</TableHead>
            <TableHead>Teacher Name</TableHead>
            <TableHead>Student Email</TableHead>
            <TableHead>Student Contact</TableHead>
            <TableHead>Feedback Answers(MCQ)</TableHead>
            <TableHead>Recommandation</TableHead>
            <TableHead>Additional Feedback</TableHead>
             <TableHead>Feedback Time</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Feedback Link</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData?.map((feedback: FeedbackType) => (
            <TableRow key={feedback._id}>
              <TableCell className="font-medium">
                {feedback.isCompleted === true ? (
                  <Button variant={'outline'} className="p-2 rounded-full font-semibold">
                    <FaCircle style={{ color: "green" }} size={16} /> Completed
                  </Button>
                ) : feedback.isCompleted === false ? (
                  <Button variant={'outline'} className="p-2 rounded-full font-semibold">
                    <FaCircle style={{ color: "blue" }} size={16} /> Active
                  </Button>
                ) : (
                  false
                )}
              </TableCell>
              <TableCell className="font-medium">{feedback.batch}</TableCell>
              <TableCell className="font-medium">{feedback.student}</TableCell>
              <TableCell className="font-medium">{feedback.teacher}</TableCell>
              <TableCell className="font-medium">
                <Link
                  href={`mailto:${feedback.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {feedback.email}
                </Link>
              </TableCell>
              <TableCell className="font-medium">{`+${feedback.destination}`}</TableCell>
              <TableCell className="font-medium">
                {feedback.feedbackAnswer.map((item) => item).join(", ")}
              </TableCell>
              <TableCell className="text-sm text-balance">
                {feedback.recommendProgram}
              </TableCell>
              <TableCell className="text-sm text-balance">
                {feedback.additionalFeedback}
              </TableCell>
              <TableCell className="text-sm text-balance">
                {(feedback.updatedAt && isValid(feedback.updatedAt)) ? format(new Date(feedback.updatedAt), 'PPpp') : null}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/feedbackViewer/edit/${feedback._id}`}>
                  <Button type="button">View</Button>
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    const link = `${window.location.origin}/feedbackViewer/edit/${feedback._id}`;
                    navigator.clipboard
                      .writeText(link)
                      .then(() => {
                        toast({
                          title: "Success ✅",
                          description: "Feedback link copied to clipboard",
                          color: "green",
                          duration: 3000,
                        });
                      })
                      .catch(() => {
                        toast({
                          title: "Error",
                          description: "Failed to copy link to clipboard",
                          variant: "destructive",
                          duration: 3000,
                        });
                      });
                  }}
                  title="Copy feedback link"
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </TableCell>
              <TableCell>
                <DeleteAlertDemo
                  onDelete={() => handleDelete(feedback._id)}
                  onCancel={() => console.log("Delete action cancelled")}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={12}>Total Rows</TableCell>
            <TableCell className="text-right">{feedbackData.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
