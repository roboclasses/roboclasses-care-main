
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { TimeOffUrl } from "@/constants"

import { timeOffStatus } from "@/data/dataStorage"
import axios, { AxiosError } from "axios"
import Cookies from "js-cookie";
import useSWR from "swr"


export interface timeOffIdType{
  timeOffId: string;
}

const FormSchema = z.object({
  status: z.string(),
})

export function StatusUpdateForm({timeOffId}:timeOffIdType) {
  const {mutate} = useSWR(TimeOffUrl)
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status:"",
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.put(`${TimeOffUrl}/${timeOffId}`, data, {headers: {Authorization: Cookies.get("token")}})
      console.log(res.data);
  
      const {message} = res.data;
      toast({ title: "Success✅", description: message, variant:"default" })  

      // For revalidating updated list
      mutate();
        
    } catch (error:unknown) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response?.data;
        toast({ title: "Failed", description: message || "An unknown error has occurred.", variant:"destructive" })  
      }
    } 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">

        {/* Time off type */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-xl shadow-none">
                    <SelectValue placeholder="Edit time off status" />
                  </SelectTrigger>
                </FormControl>
                <FormDescription>
                This is time off status drop-down.
              </FormDescription>
                <SelectContent>
                  {timeOffStatus.map((item) => (
                    <SelectItem value={item.status} key={item.id}>
                      {item.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Apply</Button>
      </form>
    </Form>
  )
}
