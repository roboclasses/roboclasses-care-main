"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { TimeOffUrl } from "@/constants";
import { teachers, timeOffTypes } from "@/data/dataStorage";
import { getUserSession } from "@/lib/session";
import SubmitButton from "../button-demo/SubmitButton";
import { CalendarIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  teacherName: z.string().min(2, { message: "Tecaher Name must be at least 2 characters." }),
  timeOffType: z.string().optional(),
  dateRange: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  notes: z.string().optional()
});

export function LeaveForm({ defaultValue }: { defaultValue: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacherName: "",
      timeOffType: defaultValue,
      dateRange: { from: new Date(), to: addDays(new Date(), 7) },
      notes: "",
    },
  });

  const [user, setUser] = useState({ role: "", name: "" });
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

/**
 * Fetches the user session and updates the form based on the user's role.
 * For teachers, pre-populates the form's teacherName field with their name.
 * For admins, a dropdown of teacher names is displayed (implemented elsewhere).
 * @throws {Error} If no valid user session or role is found.
 * @remarks
 * - Uses `getUserSession` to retrieve session data.
 * - Assumes `form` is a valid Formik or React Hook Form instance.
 * - Runs on component mount and when `form`, `user.role`, or `user.name` change.
 * @example
 * // Teacher role: form.teacherName is set to "John Doe".
 * // Admin role: Dropdown is shown (logic not in this snippet).
 */
useEffect(() => {
  const fetchUserSession = async () => {
    try {
      const session = await getUserSession();
      if (!session.role || !session.name) {
        throw new Error("No user session is found.");
      }
      setUser({ role: session.role, name: session.name });

      if (session.role === "teacher") {
        form.setValue("teacherName", session.name); // Update only teacherName
      }
      // Note: Admin dropdown logic is handled in a separate component.
    } catch (error) {
      console.error("Failed to fetch user session:", error);
      // TODO: Handle error (e.g., redirect to login or show error message).
    }
  };
  fetchUserSession();
}, [form, user.role, user.name]);

  // Handle form status
  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formattedFromDate = data.dateRange.from.toISOString().split("T")[0];
      const formattedToDate =
        data.dateRange.to?.toISOString().split("T")[0] || formattedFromDate;

      const payload = {
        teacherName: data.teacherName,
        timeOffType: data.timeOffType,
        dateRange: { from: formattedFromDate, to: formattedToDate },
        notes: data.notes,
      };
      console.log(JSON.stringify(payload));

      const res = await axios.post(TimeOffUrl, payload, { headers: { Authorization: Cookies.get("token") }});
      console.log(res.data);

      form.reset();

      const { message } = res.data;
      toast.success(message)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data;
        console.error(error);
        toast.error(message || 'An unknown error has occurred.')
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* Teacher Full Name */}
        <FormField
          control={form.control}
          name="teacherName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {user.role === "admin" ? (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow-none rounded-xl py-6 w-full">
                      <SelectValue placeholder="Select a Teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((item) => (
                        <SelectItem value={item.name} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : user.role === "teacher" ? (
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="shadow-none rounded-xl py-6"
                  />
                ) : (
                  false
                )}
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
                  <SelectTrigger className="shadow-none rounded-xl py-6 w-full">
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
                    className="w-full justify-start text-left font-normal shadow-none rounded-xl py-6"
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

        {/* Note taking area (Optional) */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Add note here"
                  {...field}
                  className="h-20 rounded-xl shadow-none"
                />
              </FormControl>
              <FormDescription>This is note taking area.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton name={isSubmitting ? "Applying..." : "Apply"} type="submit" disabled={isSubmitting} />
      </form>
    </Form>
  );
}
