
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import SubmitButton from "../button-demo/SubmitButton";
import { HolidayUrl } from "@/constants";

import useSWR from "swr";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { IoSettingsSharp } from "react-icons/io5";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface holidayDataT {
  _id: string;
  holiday: string;
  dateRange: { from: ""; to: "" };
}

const formSchema = z.object({
  holiday: z.string().min(3, { message: "Holiday must be 3 characters" }),
  dateRange: z.object({
    from: z.date({ required_error: "This field is required" }),
    to: z.date().optional(),
  }),
});

export function HolidaySheet() {
  const { data, mutate } = useSWR<holidayDataT[]>(HolidayUrl, fetcher);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      holiday: "",
      dateRange: { from: new Date(), to: addDays(new Date(), 7) },
    },
  });

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  // Handle form submit status
  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    try {
      const res = await axios.post(HolidayUrl, data);
      console.log(res.data);

      //Reset the form fields
      form.reset();

      // Instantly update the list
      mutate();

      const { message } = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast({ title: "Failed", description: message, variant: "destructive" });
      }
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-full shadow-none">
          <IoSettingsSharp />
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Enter Holiday</SheetTitle>
          <SheetDescription>
            Make changes to holidays here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">

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
                        className="h-12 rounded-xl"
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
                      Select the date range for your time off.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton name={isSubmitting ? "Saving" : "Save"} type="submit" />

            </form>
          </Form>
        </div>
        <div>
          <Label className="text-xl font-semibold font-serif">Holiday List</Label>
          <Table>
            <TableCaption>A list of holidays</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Holiday Name</TableHead>
                <TableHead>Form</TableHead>
                <TableHead>To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item: holidayDataT) => (
                <TableRow key={item._id}>
                  <TableCell>{item.holiday}</TableCell>
                  <TableCell>
                    {item.dateRange?.from ? format(item.dateRange?.from, "MMM dd, yyyy") : ""}
                  </TableCell>
                  <TableCell>
                    {item.dateRange?.to ? format(item.dateRange?.to, "MMM dd, yyyy") : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SheetContent>
    </Sheet>
  );
}
