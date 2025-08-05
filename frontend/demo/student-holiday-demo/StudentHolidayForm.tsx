"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

import { StudentHolidayUrl } from "@/constants";
import SubmitButton from "../button-demo/SubmitButton";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import SuccessMessageCard from "@/components/reusabels/SuccessMessageCard";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  holiday: z.string().min(3, "Holiday must be atleast 3 character."),
  dateRange: z.object({
    from: z.date({ required_error: "This field is required" }),
    to: z.date().optional(),
  }),
});

export function StudentHolidayForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      holiday: "",
      dateRange: { from: new Date(), to: addDays(new Date(), 7) },
    },
  });

const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    try {
      const res = await axios.post(StudentHolidayUrl, data);
      console.log(res.data);
      // form.reset();

      const { message, success } = res.data;
      setIsSuccess(success);
      toast({
        title: "Success✅",
        description: message,
        variant: "default",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast({
          title: "Failed",
          description: message || "An Unknown error is occurred",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <>
      {isSubmitSuccessful && isSuccess ? (
        <SuccessMessageCard content="Thank you for creating holiday for students!" />
      ) : (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                      <div className="mb-8 flex flex-col items-center">
                                  <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
                                    Student Holiday Form
                                  </h1>
                                  <Label className="text-gray-500 lg:text-sm text-xs text-center">
                                    Create holidays for students.
                                  </Label>
                                </div>

              {/* Holiday name */}
              <FormField
                control={form.control}
                name="holiday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter holiday name"
                        {...field}
                        className="h-12 rounded-xl shadow-none"
                      />
                    </FormControl>
                    <FormDescription>This is holiday name.</FormDescription>
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
                            setDateRange(range);
                            field.onChange(range);
                          }}
                          numberOfMonths={1}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select the date range for student holiday.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton name={isSubmitting ? "Saving" : "Save"} type="submit" />
            </form>
          </Form>
      )}
    </>
  );
}
