"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

import { TimeOffUrl } from "@/constants"
import SubmitButton from "../button-demo/SubmitButton"

import axios, { AxiosError } from "axios"
import Cookies from "js-cookie";


const FormSchema = z.object({
  holidays: z.array(z.string()).optional()
})

export function EditHoidayForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      holidays: [],
    },
  })


    // Handle form status
    const {isSubmitting} = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        holidays: data.holidays
      }
      console.log(JSON.stringify(payload));
      
      const res = await axios.put(TimeOffUrl, payload, {headers:{Authorization: Cookies.get("token")}})
      console.log(res.data);

      form.reset();

      const {message} = res.data;
      toast({ title: "Success✅", description: message, variant:"default" })  
        
    } catch (error:unknown) {
      if(error instanceof AxiosError){
        const {message} = error.response?.data;
        console.error(error);
        toast({ title: "Failed", description: message || "An unknown error has occurred.", variant:"destructive" })  
      }
    } 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">

        {/* Holiday */}
        <FormField
          control={form.control}
          name="holidays"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter a Holiday" {...field} className="h-12 rounded-xl shadow-none"/>
              </FormControl>
              <FormDescription>
                This is input field to add and edit holidays.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton name={isSubmitting ? 'Updating...' : 'Update'} type="submit" disabled={isSubmitting} />
      </form>
    </Form>
  )
}
