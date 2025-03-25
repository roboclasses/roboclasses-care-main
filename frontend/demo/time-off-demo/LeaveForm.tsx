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
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { timeOffTypes } from "@/data/dataStorage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FormSchema = z.object({
  teacherName: z.string().min(2, {message: "Tecaher Name must be at least 2 characters."}),
  timeOffType: z.string(),
  date: z.string(),
  notes: z.string().min(5, {message: "Note must be atleast 5 characters."})
})

export function LeaveForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacherName: "",
      timeOffType:"",
      date:"",
      notes:""
    },
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
        {/* Teacher Full Name */}
        <FormField
          control={form.control}
          name="teacherName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} className="h-12 rounded-xl shadow-none"/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time off type */}
        <FormField
          control={form.control}
          name="timeOffType"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl shadow-none">
                    <SelectValue placeholder="Select time off type" />
                  </SelectTrigger>
                </FormControl>
                <FormDescription>
                This is time off type drop-down.
              </FormDescription>
                <SelectContent>
                  {timeOffTypes.map((item) => (
                    <SelectItem value={item.type} key={item.id}>
                      {item.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date field */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="date" placeholder="Pick time off date" {...field} className="h-12 rounded-xl shadow-none"/>
              </FormControl>
              <FormDescription>
                Currently you can choose one date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Note taking area */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Add note here" {...field} className="h-12 rounded-xl shadow-none"/>
              </FormControl>
              <FormDescription>
                This is note taking area.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Apply</Button>
      </form>
    </Form>
  )
}
