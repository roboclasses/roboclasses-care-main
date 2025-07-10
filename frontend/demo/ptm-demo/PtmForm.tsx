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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

import { CoursesUrl, NewBatchEntryUrl } from "@/constants";
import SubmitButton from "../button-demo/SubmitButton";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import SuccessMessageCard from "@/components/reusabels/SuccessMessageCard";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import useSWR from "swr";
import { batchType } from "@/types/Types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const fetcher = (url: string) =>
  axios
    .get(url, { headers: { Authorization: Cookies.get("token") } })
    .then((res) => res.data);

const FormSchema = z.object({
  batch: z.string().min(2, "Batch Number must be atleast 2 characters long"),
  studentName: z
    .string()
    .min(3, "Student Name must be atlest 3 characters long"),
  email: z.string().trim().email("Please enter a valid email"),
  destination: z
    .string()
    .min(10, "Mobile number is too short")
    .refine((val) => {
      const digits = val.replace(/\D/g, ""); // Remove non-digit characters
      return digits.length === 12 && digits.startsWith("971");
    }, "Please enter a valid UAE mobile number (e.g., +971XXXXXXX)"),
  teacher: z
    .string()
    .nonempty("Please select a teacher")
    .min(3, "Teacher Name must be atleast 3 characters long"),
  timeZone: z.string().nonempty("Please select a timezone"),
  date: z.string(),
  time: z.string(),
  topic: z.string().min(3, "Topic must be atleast 3 characters long"),
  type: z.string().nonempty("Please select a type"),
  duration: z
    .string()
    .min(1, "Duration must contains minimum of 1 digit")
    .max(3, "Duration must contains maximum of 3 digit"),
  agenda: z.string().min(3, "Agenda must be atleast 3 characters long"),
  participants: z.array(z.string().email("Please enter a valid email")),
  isMeetingSetting: z.boolean(),
  meetingReminder: z
    .string()
    .nonempty("Plaese select a meeting reminder")
    .min(1, "Reminder must contains minimum of 1 digit")
    .max(3, "Reminder must contains maximum of 3 digit"),
});

export function PtmForm() {
  const { data: batchDetails = [] } = useSWR<batchType[]>(
    NewBatchEntryUrl,
    fetcher
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batch: "",
      studentName: "",
      email: "",
      destination: "+91",
      teacher: "",
      timeZone: "",
      date: "",
      time: "",
      topic: "",
      type: "",
      duration: "",
      agenda: "",
      participants: [],
      isMeetingSetting: false,
      meetingReminder: "",
    },
  });

  const batchName = form.watch("batch");

  // Handle fetch batch details
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${NewBatchEntryUrl}?name=${batchName}`, {
          headers: { Authorization: Cookies.get("token") },
        });
        console.log(res.data);

        if (res.data) {
          const selectedBatch = res.data.find(
            (item: batchType) => item.batch === batchName
          );
          console.log("Selected batch: ", selectedBatch);

          if (selectedBatch) {
            form.setValue("studentName", selectedBatch.studentName || "");
            form.setValue("email", selectedBatch.email || "");
            form.setValue("destination", selectedBatch.destination || "");
            form.setValue("timeZone", selectedBatch.timeZone || "");
            form.setValue("teacher", selectedBatch.teacher || "");
          }
        }
      } catch (error) {
        console.error(error);
        form.setValue("studentName", "");
      }
    };

    handleFetch();
  }, [batchName, form]);

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.post(CoursesUrl, data);
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
        <SuccessMessageCard content="Thank you for creating a Course." />
      ) : (
        <Form {...form}>
          <div className="mb-8 flex flex-col items-center">
            <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
              Create a Parent Teacher Meeting
            </h1>
            <Label className="text-gray-500 lg:text-sm text-xs text-center">
              This form is for PTM
            </Label>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Select Batch and Course Name */}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch Name</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="shadow-none rounded-xl h-12">
                          <SelectValue placeholder="Select a batch" />
                        </SelectTrigger>
                      </FormControl>
                      <FormDescription>
                        This drop-down is for selecting a batch
                      </FormDescription>
                      <SelectContent>
                        {batchDetails?.map((item: batchType) => (
                          <SelectItem value={item.batch} key={item._id}>
                            {item.batch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        disabled
                        type="text"
                        title="Student Name"
                        className="h-12 shadow-none rounded-xl"
                      />
                    </FormControl>
                    <FormDescription>
                      Provided student name. This will be displayed to users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Details and Email Address */}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
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
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        Provided contact details. This will displayed to users.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        disabled
                        type="email"
                        title="Email Address"
                        className="h-12 rounded-xl shadow-none"
                      />
                    </FormControl>
                    <FormDescription>
                      Provided email address. This will displayed to users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Teacher name and Timezone */}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        disabled
                        type="text"
                        title="Teacher"
                        className="h-12 rounded-xl shadow-none"
                      />
                    </FormControl>
                    <FormDescription>
                      Provided teacher name. This will diplayed to users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeZone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        disabled
                        type="text"
                        title="Timezone"
                        className="h-12 rounded-xl shadow-none"
                      />
                    </FormControl>
                    <FormDescription>
                      Provided timezone. This will diplayed to users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SubmitButton
              name={isSubmitting ? "Creating..." : "Create"}
              type="submit"
              disabled={isSubmitting}
            />
          </form>
        </Form>
      )}
    </>
  );
}
