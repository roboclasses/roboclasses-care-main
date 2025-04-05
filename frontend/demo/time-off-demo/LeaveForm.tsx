"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

import { TimeOffUrl } from "@/constants"
import { timeOffTypes } from "@/data/dataStorage"
import SubmitButton from "../button-demo/SubmitButton"
import { CalendarIcon } from "lucide-react"

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import axios, { AxiosError } from "axios"
import Cookies from "js-cookie";



const FormSchema = z.object({
  teacherName: z.string().min(2, {message: "Tecaher Name must be at least 2 characters."}),
  timeOffType: z.string().optional(),
  dateRange: z.object({
    from: z.date({ required_error: "Start date is required."}),
    to: z.date().optional()
  }),
  notes: z.string().min(5, {message: "Note must be atleast 5 characters."})
})

export function LeaveForm({defaultValue}:{defaultValue:string}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacherName: "",
      timeOffType: defaultValue,
      dateRange: { from: new Date(), to: addDays(new Date(), 7)},
      notes:""
    },
  })

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  })

    // Handle form status
    const {isSubmitting} = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formattedFromDate = data.dateRange.from.toISOString().split("T")[0]
      const formattedToDate = data.dateRange.to?.toISOString().split("T")[0] || formattedFromDate

      const payload = {
        teacherName: data.teacherName,
        timeOffType: data.timeOffType,
        dateRange: { from: formattedFromDate, to: formattedToDate },
        notes: data.notes,
      }
      console.log(JSON.stringify(payload));
      
      const res = await axios.post(TimeOffUrl, payload, {headers:{Authorization: Cookies.get("token")}})
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
              <Select onValueChange={field.onChange} value={field.value} >
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

        {/* Date Range Picker */}
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal h-12 rounded-xl shadow-none"
                  >
                    <CalendarIcon className="mr-2" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range)
                      field.onChange(range)
                    }}
                    numberOfMonths={1}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the date range for your time off.
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
                <Input placeholder="Add note here" {...field} className="h-16 rounded-xl shadow-none"/>
              </FormControl>
              <FormDescription>
                This is note taking area.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton name={isSubmitting ? 'Applying...' : 'Apply'} type="submit" disabled={isSubmitting} />
      </form>
    </Form>
  )
}
