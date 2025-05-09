"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { AnswerUrl, AssessmentUrl } from "@/constants"
import { useParams } from "next/navigation"
import { QuestionType } from "@/types/Types"


const FormSchema = z.object({
//   answer: z.enum(["A", "B", "C", "D"], { required_error: "You need to select a option." }),
answer: z.record(z.string(), z.enum(["A", "B", "C", "D"], { required_error: "You need to select a option." }))
})

export function AssessmentSubmissionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {answer: {}}
  })

  const {id} = useParams();
//   const [numberOfQuestion, setNumberOfQuestion] = useState(0)
  const [data, setData] = useState<QuestionType[]>([])

  // Fetching assessment quetions and options
  useEffect(()=>{
    const handleFetch = async()=>{
        try {
            const res = await axios.get(`${AssessmentUrl}/${id}`)
            console.log(res.data);

            const assessmentData = res.data;
            setData(assessmentData.questions)
            // setNumberOfQuestion(assessmentData.questions.length)

        } catch (error) {
            console.error(error);
        }
    }

    handleFetch();
  },[id])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    
    try {
      const res = await axios.post(AnswerUrl, data);
      console.log(res.data);
      form.reset();
      
      const {message} = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });

    } catch (error: unknown) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response?.data
        toast({ title: "Failed", description: message || "An unknown error has occurred.", variant: "destructive" });
      }
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
       {data.map((item, index)=>(
        <div key={index}>
        <FormField
        control={form.control}
        name={`answer.${item._id}`}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className=" font-semibold">{index+1}. {item.question}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="A" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {item.option.a}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="B" />
                  </FormControl>
                  <FormLabel className="font-normal">
                  {item.option.b}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="C" />
                  </FormControl>
                  <FormLabel className="font-normal">{item.option.c}</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="D" />
                  </FormControl>
                  <FormLabel className="font-normal">{item.option.d}</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
       ))}

        <Button type="submit" className="w-full">Submit Answers</Button>
      </form>
    </Form>
  )
}
