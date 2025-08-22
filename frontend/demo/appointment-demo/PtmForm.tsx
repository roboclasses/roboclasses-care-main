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
import { Input } from "@/components/ui/input";

import { NewBatchEntryUrl, PtmUrl } from "@/constants";
import SubmitButton from "../button-demo/SubmitButton";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import useSWR from "swr";
import { batchType } from "@/types/Types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { meetingTypeData, reminderData } from "@/data/dataStorage";
import SuccessMessageCard from "../card-demo/SuccessMessageCard";
import { toast } from "sonner";

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
  const [additionalParticipants, setAdditionalParticipants] = useState<string[]>([])

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

  // Handle add participants
  const addParticipant = ()=>{
    const email = form.getValues("participants")    
    const latestEmail = Array.isArray(email) ? email[email.length -1] : email;
    if(latestEmail && !additionalParticipants.includes(latestEmail)){
      setAdditionalParticipants((prev)=>[...prev, latestEmail])
      form.setValue("participants", [])
    }
  }

  // Handle remove participants
  const removeParticipant = (email:string)=>{
    setAdditionalParticipants((prev)=>prev.filter((e)=>e!==email))
  }

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data))
    try {
      const finalParticipants = [...additionalParticipants]
      const payload = {
        batch: data.batch,
        studentName: data.batch,
        email: data.email,
        destination: data.destination,
        teacher: data.teacher,
        timeZone: data.timeZone,
        date: data.date,
        time: data.time,
        topic: data.topic,
        type: data.type,
        duration: data.duration,
        agenda: data.agenda,
        participants: finalParticipants,
        isMeetingSetting: data.isMeetingSetting,
        meetingReminder: data.meetingReminder,
      }
      const res = await axios.post(PtmUrl, payload);
      console.log(res.data);
      // form.reset();

      const { message, success } = res.data;
      setIsSuccess(success);
      toast.success(message)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast.error(message || 'An unknown error has occurred.')
      }
    }
  }

  return (
    <>
      {isSubmitSuccessful && isSuccess ? (
        <SuccessMessageCard content="Thank you for registering in PTM! One of our teachers will contact you soon." to="/adminDashboard/normalclass"/>
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
                        <SelectTrigger className="shadow-none rounded-xl py-6 w-full">
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
                        className="shadow-none rounded-xl py-6"
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
                                    className="shadow-none rounded-xl py-6"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Book a date of appointment for PTM.
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
                                    className="shadow-none rounded-xl py-6"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Book a time of appointment for PTM.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-2">
                                    {/* Zoom meeting details section */}
                                    <Card className="p-6 space-y-2 shadow-none">
                                      <CardHeader>
                                        <h1 className="lg:text-3xl text-xl font-bold">
                                          Zoom Meeting Details
                                        </h1>
                                        <p className="text-gray-500 lg:text-sm text-xs">
                                          Configure your meeting settings
                                        </p>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                                          {/* Topic */}
                                          <FormField
                                            control={form.control}
                                            name="topic"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Topic</FormLabel>
                                                <FormControl>
                                                  <Input
                                                    {...field}
                                                    required
                                                    type="text"
                                                    title="Topic"
                                                    placeholder="e.g., Team Sync-up"
                                                    className="shadow-none rounded-xl py-6"
                                                  />
                                                </FormControl>
                                                <FormDescription>
                                                  This field is for meeting topic. This will be
                                                  displayed to users.
                                                </FormDescription>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                        
                                          {/* Type */}
                                          <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Meeting Types</FormLabel>
                                                <Select
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                  required
                                                >
                                                  <FormControl>
                                                    <SelectTrigger className="shadow-none rounded-xl py-6 w-full">
                                                      <SelectValue placeholder="Select a meeting type" />
                                                    </SelectTrigger>
                                                  </FormControl>
                                                  <FormDescription>
                                                    This drop-down field is for meeting type.
                                                  </FormDescription>
                                                  <SelectContent>
                                                    {meetingTypeData.map((item) => (
                                                      <SelectItem value={item.id} key={item.id}>
                                                        {item.type}
                                                      </SelectItem>
                                                    ))}
                                                  </SelectContent>
                                                </Select>
                                              </FormItem>
                                            )}
                                          />
                                        </div>
                        
                                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                                          {/* Duration and Agenda */}
                                          <FormField
                                            control={form.control}
                                            name="duration"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Duration</FormLabel>
                                                <FormControl>
                                                  <Input
                                                    {...field}
                                                    required
                                                    type="number"
                                                    title="Duration"
                                                    placeholder="e.g., 60"
                                                    className="shadow-none rounded-xl py-6"
                                                  />
                                                </FormControl>
                                                <FormDescription>
                                                  This field is for meeting duration. This will be
                                                  displayed to users.
                                                </FormDescription>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                        
                                          <FormField
                                            control={form.control}
                                            name="agenda"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Agenda (Optional)</FormLabel>
                                                <FormControl>
                                                  <Textarea
                                                    {...field}
                                                    title="Agenda"
                                                    placeholder="e.g., Weekly team progress discussion"
                                                    className="shadow-none rounded-xl h-16"
                                                  />
                                                </FormControl>
                                                <FormDescription>
                                                  This field is for meeting agenda/description. This
                                                  will be displayed to users.
                                                </FormDescription>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </div>
                                      </CardContent>
                                    </Card>
                        
                                    {/* Zoom meeting participants section */}
                                    <Card className="p-6 space-y-2 shadow-none">
                                      <CardHeader>
                                        <h1 className="lg:text-3xl text-xl font-bold">Participants</h1>
                                        <p className="text-gray-500 lg:text-sm text-xs">
                                          Add extra participants beyond the batch students
                                        </p>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                        <div className="lg:flex items-center gap-2">
                                          <FormField
                                            control={form.control}
                                            name="participants"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Add Participants</FormLabel>
                                                <FormControl>
                                                  <Input
                                                    {...field}
                                                    type="email"
                                                    title="Email"
                                                    placeholder="e.g., dev@gmail.com"
                                                    // className="shadow-none rounded-xl py-6"
                                                  />
                                                </FormControl>
                                                <FormDescription>
                                                  This field is for participants. This will be displayed
                                                  to users.
                                                </FormDescription>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                          <Button type="button" onClick={addParticipant} size="icon">
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                        </div>
                        
                                        {additionalParticipants.length > 0 && (
                                          <div className="space-y-2">
                                            <Label>Participants</Label>
                                            <div className="flex flex-wrap gap-2">
                                              {additionalParticipants.map((email) => (
                                                <Badge
                                                  key={email}
                                                  variant="outline"
                                                  className="flex items-center gap-1"
                                                >
                                                  {email}
                                                  <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-4 w-4 p-0"
                                                    onClick={() => removeParticipant(email)}
                                                  >
                                                    <X className="h-3 w-3" />
                                                  </Button>
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>
                        
                                    {/* Zoom meeting settings section */}
                                    <Card className="p-6 space-y-2 shadow-none">
                                      <CardHeader>
                                        <h1 className="lg:text-3xl text-xl font-bold">
                                          Meeting Settings
                                        </h1>
                                        <p className="text-gray-500 lg:text-sm text-xs">
                                          Configure meeting preferences
                                        </p>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                        <div className="space-y-4 pt-4 ">
                                          <div className="flex items-center space-x-2">
                                            <FormField
                                              control={form.control}
                                              name="isMeetingSetting"
                                              render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                  <FormControl>
                                                    <Checkbox
                                                      checked={field.value}
                                                      onCheckedChange={field.onChange}
                                                      title="Switch to Compensation Class"
                                                    />
                                                  </FormControl>
                                                </FormItem>
                                              )}
                                            />
                                            <Label htmlFor="sendReminder">
                                              Send Automatic Reminders
                                            </Label>
                                          </div>
                        
                                          {form.watch("isMeetingSetting") && (
                                            <div className="ml-6 space-y-2">
                                              <FormField
                                                control={form.control}
                                                name="meetingReminder"
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormLabel>Reminder details</FormLabel>
                                                    <Select
                                                      onValueChange={field.onChange}
                                                      defaultValue={field.value}
                                                      required
                                                    >
                                                      <FormControl>
                                                        <SelectTrigger className="shadow-none rounded-xl py-6 w-full">
                                                          <SelectValue placeholder="Select a Zoom meeting reminder" />
                                                        </SelectTrigger>
                                                      </FormControl>
                                                      <FormDescription>
                                                        This drop-down field is for available reminders.
                                                      </FormDescription>
                                                      <SelectContent>
                                                        {reminderData.map((item) => (
                                                          <SelectItem
                                                            value={item.reminder}
                                                            key={item.id}
                                                          >
                                                            {item.content}
                                                          </SelectItem>
                                                        ))}
                                                      </SelectContent>
                                                    </Select>
                                                  </FormItem>
                                                )}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </CardContent>
                                    </Card>
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
