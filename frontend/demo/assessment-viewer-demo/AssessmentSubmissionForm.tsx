"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { Input } from "@/components/ui/input"
import { getUserSession } from "@/lib/session"


const FormSchema = z.object({
//   answer: z.enum(["A", "B", "C", "D"], { required_error: "You need to select a option." }),
answer: z.array( z.enum(["A", "B", "C", "D"], { required_error: "You need to select a option." })),
candidate: z.string().optional(),
})

export function AssessmentSubmissionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {answer: []}
  })

  const {id} = useParams();
  const [data, setData] = useState<QuestionType[]>([])
  const [user, setUser] = useState({role:"", name:""})

  // Fetching logged-in user's credentials
  useEffect(()=>{
    try {
      const handleFetch = async()=>{
        const session = await getUserSession();
        if(!session.role || !session.name){
          throw new Error('No user session is found.')
        }
        setUser({role: session.role, name: session.name})
      }

      handleFetch();
      
    } catch (error) {
      console.error(error);
    }

  },[])

  // Fetching assessment quetions and options
  useEffect(()=>{
    const handleFetch = async()=>{
        try {
            const res = await axios.get(`${AssessmentUrl}/${id}`)
            console.log(res.data);

            const assessmentData = res.data;
            setData(assessmentData.questions)
            // if(user.role==='student'){
              form.reset({candidate:user.name})
            // }
        } catch (error) {
            console.error(error);
        }
    }

    handleFetch();
  },[form, id, user])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    const payload = {
      answer: data.answer,
      candidate: data.candidate,
      assessmentId: id,
    }
    
    try {
      const res = await axios.post(AnswerUrl, payload);
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
        
        {/* Candidate Name */}
        <FormField
          control={form.control}
          name="candidate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Candidate Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled
                  className="bg-muted-foreground h-12 shadow-none rounded-xl"
                />
              </FormControl>
              <FormDescription>
              This field is for who give the assessment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

       {data.map((item, index)=>(
        <div key={index}>
        <FormField
        control={form.control}
        name={`answer.${index}`}
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
