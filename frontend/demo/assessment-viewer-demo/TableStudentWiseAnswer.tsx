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
import { AnswerType, AssessmentType } from "@/types/Types";
import useSWR from "swr";
import axios, { AxiosError } from "axios";
import { AnswerUrl, AssessmentUrl } from "@/constants";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DeleteAlertDemo } from "../dialog-demo/DeleteAlertDemo";
import { toast } from "@/hooks/use-toast";
import Cookies from 'js-cookie';


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function TableStudentWiseAnswer() {
  const { data: answerData= [], isLoading, isValidating, error, mutate } = useSWR<AnswerType[]>(AnswerUrl,fetcher);  
  const [assessmentData, setAssessmentData] = useState<AssessmentType[]>([])

  // Fetching answer set from assessment module
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const res = await axios.get(AssessmentUrl)
        setAssessmentData(res.data)
        
      } catch (error) {
        console.error(error);
      }
    }
    handleFetch();
    
  },[])


  // handle asseessment score
  const calculateAssessmentScore = (answerItem: AnswerType): number =>{
    const matchingAssesment = assessmentData.find((a)=> a.batch === answerItem.batch && a.assessmentLevel === answerItem.assessmentLevel)

    if(!matchingAssesment) return 0;

    const {questions} = matchingAssesment;

    let score = 0
    for(let i=0; i< questions.length; i++){
      const correctAnswer = questions[i].answer.toUpperCase();
      const studentAnswer = answerItem.answer[i]?.toUpperCase();

      if(correctAnswer === studentAnswer){
        score += 1;
      }
    }
    return score; 

  }

    // Handle delete question
    const handleDelete = async(id: string)=>{
      try {
        const res = await axios.delete(`${AnswerUrl}/${id}`, {headers: {Authorization: Cookies.get('token')}})
        console.log(res.data);
  
        mutate();
  
        const {message} = res.data;
        toast({title:'Success✅', description: message, variant: 'default'})
        
      } catch (error:unknown) {
        if(error instanceof AxiosError){
           console.error(error);
  
           const {message} = error.response?.data;
           toast({title:'Failed', description: message || 'An unknown error has occurred.', variant: 'destructive'})
        }
      }
    }

 // Handle edge cases
 if (isLoading) return <div>Loading...</div>;
 if (error instanceof AxiosError){
  const {message} = error.response?.data
  return <div>{message || 'An unknown error has occurred.'}</div>;
 } 
 if (isValidating) return <div>Refreshing...</div>;
 if (answerData?.length === 0) return <div>Empty list for answers</div>;


  return (
    <div>
    <Table className="border border-black">
      <TableCaption>A list of marks given to students</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Batch Name</TableHead>
          <TableHead className="w-[100px]">Candidate Name</TableHead>
          <TableHead className="w-[100px]">Level</TableHead>
          <TableHead className="w-[100px]">Submission Time</TableHead>
          <TableHead>Out Of</TableHead>
          <TableHead>Assessment Score</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {answerData?.map((ans: AnswerType) => (
          <TableRow key={ans._id}>
            <TableCell className="font-medium">{ans.batch}</TableCell>
            <TableCell className="font-medium">{ans.candidate}</TableCell>
            <TableCell className="font-medium">{ans.assessmentLevel}</TableCell>
            <TableCell className="font-medium">{ans.submissionTime ? format(new Date(ans.submissionTime), 'PPpp') : ''}</TableCell>
            <TableCell className="font-medium">{ assessmentData.find(
                    (a) => a.batch === ans.batch && a.assessmentLevel === ans.assessmentLevel
                  )?.questions.length || "-"}</TableCell>
            <TableCell className="font-medium">{calculateAssessmentScore(ans)}</TableCell>
            <TableCell>
              <DeleteAlertDemo onDelete={()=>handleDelete(ans._id)} onCancel={()=>console.log('Delete action cancelled')}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total Rows</TableCell>
          <TableCell className="text-right">{answerData.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  );
}
