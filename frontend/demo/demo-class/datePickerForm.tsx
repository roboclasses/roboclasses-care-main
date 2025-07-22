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
import { meetingTypeData, reminderData, teachers, timezone } from "@/data/dataStorage";
import SuccessMessageCard from "@/components/reusabels/SuccessMessageCard";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

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
  isZoomMeeting: z.boolean(),
  topic: z.string().optional(),
  type: z.string().optional(),
  duration: z.string().optional(),
  agenda: z.string().optional(),
  participants: z.array(z.string().email("Please enter a valid email")),
  isMeetingSetting: z.boolean().optional(),
  meetingReminder: z.string().optional(),
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
      isZoomMeeting: false,
      topic: "",
      type: "",
      duration: "",
      agenda: "",
      participants: [],
      isMeetingSetting: false,
      meetingReminder: "",
    },
  });

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  // Handle add and remove participants
  const [additionalParticipants, setAdditionalParticipants] = useState<string[]>([]);

  const addParticipant = () => {
    const email = form.getValues("participants");
    // email is an array, get the last entered value (or use a separate state for input)
    const latestEmail = Array.isArray(email) ? email[email.length - 1] : email;

    if (latestEmail && !additionalParticipants.includes(latestEmail)) {
      setAdditionalParticipants((prev) => [...prev, latestEmail]);
      // Remove the added email from the participants array
      form.setValue("participants", []);
    }
  };

  const removeParticipant = (email: string) => {
    setAdditionalParticipants((prev) => prev.filter((e) => e !== email));
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data))
    try {
      const formattedDate = new Date(data.date).toISOString().split("T")[0];
      const fullParticipants = [...additionalParticipants];

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
        isZoomMeeting: data.isZoomMeeting,
        topic: data.topic,
        type: data.type,
        duration: data.duration,
        agenda: data.agenda,
        participants: fullParticipants,
        // isMeetingSetting: data.isMeetingSetting,
        meetingReminder: data.meetingReminder,
      };
      console.log(JSON.stringify(payload));
      // console.log("Meeting setting boolean: "+payload.isMeetingSetting)

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
        <SuccessMessageCard content="Thank you for registering in demo class! One of our teachers will contact you soon." />
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
                    <FormLabel>Switch to Compensation Class</FormLabel>
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

            {/* Enable Zoom meeting */}
            <FormField
              control={form.control}
              name="isZoomMeeting"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Switch to Zoom meeting</FormLabel>
                    <FormDescription>
                      This field is for switching to zoom meeting.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      title="Switch to Zoom meeting"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

           {form.watch("isZoomMeeting") && (<div className="space-y-2">
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
                            className="shadow-none rounded-xl h-12 bg-muted-foreground"
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
                            <SelectTrigger className="shadow-none rounded-xl h-12">
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
                  {/* Duration*/}
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
                            className="shadow-none rounded-xl h-12 bg-muted-foreground"
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

                  {/* Duration*/}
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
                            className="shadow-none rounded-xl h-16 bg-muted-foreground"
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
                            // className="shadow-none rounded-xl h-12 bg-muted-foreground"
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
                                <SelectTrigger className="shadow-none rounded-xl h-12">
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
            </div>)}

            {/* Check box Items for whatsapp reminders*/}
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>When to send the Whats&apos;app Reminder</FormLabel>
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
