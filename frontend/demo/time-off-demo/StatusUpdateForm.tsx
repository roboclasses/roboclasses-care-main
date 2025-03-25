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
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { timeOffStatus } from "@/data/dataStorage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FormSchema = z.object({
  status: z.string(),
})

export function StatusUpdateForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status:"",
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
        console.log(JSON.stringify(data));
        toast({
            title: "Success",
            description: "Leave submitted successfully.",
            variant:"default"
          })  
        
    } catch (error) {
        console.error(error);
        toast({
            title: "Failed",
            description: "An unknown error has occurred.",
            variant:"destructive"
          })  

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
