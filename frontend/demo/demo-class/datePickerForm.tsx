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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SubmitButton from "../button-demo/SubmitButton";
import { DemoClassUrl } from "@/constants";
import { getUserSession } from "@/lib/session";
import { teachers, timezone } from "@/data/dataStorage";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCircleArrowRight } from "react-icons/fa6";
import Link from "next/link";

// for mapping checkbox value and label
const items = [
  {
    id: "24hour",
    label: "24 Hours",
  },
  {
    id: "1hour",
    label: "1 Hour",
  },
];

const FormSchema = z.object({
  date: z.string(),
  userName: z.string().min(3, {
    message: "Student or Parent name must be atleast 3 character long",
  }),
  destination: z
    .string()
    .min(10, { message: "Mobile number is too short" })
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, ""); // Remove non-digit characters
        return digits.length === 12 && digits.startsWith("971");
      },
      { message: "Please enter a valid UAE mobile number (e.g., +971XXXXXXX)" }
    ),
  course: z
    .string()
    .min(2, { message: "Course name must be atleast 2 character long" }),
  teacher: z
    .string()
    .min(3, { message: "Teacher name must be atleast 3 character long" }),
  time: z.string(),
  timeZone: z.string(),
  // items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select atleast one item"}),
  items: z.array(z.string()).default([]),
  isCompensationClass: z.boolean(),
});

export function DatePickerForm() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  // Handle fetching logged-in users credentials from cookie storage
  useEffect(() => {
    const handleFetch = async () => {
      const user = await getUserSession();
      setRole(user.role || "");
      setName(user.name || "");
    };
    handleFetch();
  }, [pathname]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      destination: "+971",
      course: "",
      teacher: "",
      date: "",
      time: "",
      timeZone: "Asia/Dubai",
      items: ["1hour"],
      isCompensationClass: false,
    },
  });

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;
  console.log(form.getValues("isCompensationClass"));

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formattedDate = new Date(data.date).toISOString().split("T")[0];
      const payload = {
        userName: data.userName,
        destination: data.destination,
        course: data.course,
        teacher: data.teacher,
        time: data.time,
        timeZone: data.timeZone,
        date: formattedDate,
        items: data.items,
        isCompensationClass: data.isCompensationClass,
      };
      console.log(JSON.stringify(payload));

      const res = await axios.post(DemoClassUrl, payload);
      console.log(res.data);

      // form.reset();

      const { message, success } = res.data;
      setIsSuccess(success);
      toast({ title: "Success✅", description: message, variant: "default" });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data;
        console.error(error);
        toast({
          title: "Failed",
          description: message || "An unknown error has occurred.",
          variant: "destructive",
        });
      }
    }
  }
  return (
    <>
      {isSubmitSuccessful && isSuccess ? (
        <Card className="p-2 rounded flex flex-col items-center">
          <CardHeader className="text-2xl">✅</CardHeader>
          <CardContent className="text-pretty text-lg font-serif">
            Thank you for submitting demo class form.
          </CardContent>
          <CardFooter>
              <Link className="flex items-center gap-2" href={"/"}>
              <Button>
                Back to Home <FaCircleArrowRight size={25} />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="mb-8 flex flex-col items-center text-center">
              <h1 className="lg:text-4xl text-2xl mb-4 font-serif">
                Demo Class Form
              </h1>
              <Label className="text-gray-500 md:text-sm text-xs">
                Book Appointment for Demo Classes
              </Label>
            </div>

            {/* Student Full Name and Mobile Number */}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        type="text"
                        title="Full Name"
                        placeholder="Enter Student/Parent full name"
                        className="shadow-none rounded-xl h-12 bg-muted-foreground"
                      />
                    </FormControl>
                    <FormDescription>
                      This field is for full name. This will displayed in
                      demo-class table.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full max-w-md">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Details</FormLabel>
                      <FormControl>
                        <PhoneInput
                          country={"ae"}
                          {...field}
                          inputStyle={{ width: "100%", height: "48px" }}
                          inputProps={{ ref: field.ref, required: true }}
                        />
                      </FormControl>
                      <FormDescription>
                        This field is for mobile number. This will displayed in
                        demo-class table.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Course Name (input field) and Teacher Name (drop down)*/}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Details</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        type="text"
                        title="Course"
                        placeholder="e.g. AI for kids"
                        className="shadow-none rounded-xl h-12 bg-muted-foreground"
                      />
                    </FormControl>
                    <FormDescription>
                      This field is for course. This will displayed in
                      demo-class table.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher Details</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger className="shadow-none rounded-xl h-12">
                          <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                      </FormControl>
                      <FormDescription>
                        This field is for teacher&apos;s name. This will
                        displayed in demo-class table.
                      </FormDescription>
                      <SelectContent>
                        {role === "teacher" ? (
                          <SelectItem value={name}>{name}</SelectItem>
                        ) : role === "admin" ? (
                          teachers.map((item) => (
                            <SelectItem value={item.name} key={item.id}>
                              {item.name}
                            </SelectItem>
                          ))
                        ) : (
                          ""
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* Date and Time*/}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book an Appointment</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        title="Date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="shadow-none rounded-xl h-12 bg-muted-foreground"
                      />
                    </FormControl>
                    <FormDescription>
                      Book an date of appointment for demo class.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your time slot</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        title="Time"
                        required
                        className="shadow-none rounded-xl h-12 bg-muted-foreground"
                      />
                    </FormControl>
                    <FormDescription>
                      Book an time of appointment for demo class.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Timezone (drop down) */}
            <FormField
              control={form.control}
              name="timeZone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timezone Details</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="shadow-none rounded-xl h-12">
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <FormDescription>
                      This drop-down field is for available timezones.
                    </FormDescription>
                    <SelectContent>
                      {timezone.map((item) => (
                        <SelectItem value={item.name} key={item.id}>
                          {item.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Switch to Compensation Class */}
            <FormField
              control={form.control}
              name="isCompensationClass"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Compensation Class</FormLabel>
                    <FormDescription>
                      This field is for switching to compensation class.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title="Switch to Compensation Class"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Check box Items for reminders*/}
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>When to send the Reminder</FormLabel>
                    <FormDescription>
                      Select the time which you want!
                    </FormDescription>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton
              name={isSubmitting ? "Booking..." : "Book"}
              type="submit"
              disabled={isSubmitting}
            />
          </form>
        </Form>
      )}
    </>
  );
}
