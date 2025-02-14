/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

import axios from "axios";
import PhoneInput from "react-phone-input-2";
import { DemoClassUrl } from "@/constants";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserSession } from "@/lib/session";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const teachers = [{id:1, name:"Kritika Maheswari"},{id:2, name:"Monty"},{id:3, name:"Kiruthika PK"},{id:4, name:"Pal Gudka"}]


const FormSchema = z.object({date: z.string({ required_error: "A date is required." }),

  userName: z.string({ required_error: "A date is required." }).min(2, { message: "name must contain atleast 2 character." }),

  destination: z.string().min(12, { message: "mobile is incorrect." }),

  course: z.string({ required_error: "A date is required." }).min(1, { message: "course must contain atleast 2 chracter" }),

  teacher: z.string({ required_error: "A date is required." }).min(2, { message: "Teacher name must contain atleast 2 character." }),

  time: z.string({ required_error: "Time slot is required." }),

  items: z.array(z.string()).refine((value) => value.some((item) => item), {message: "You have to select at least one item.",}),
});

export function DatePickerForm() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  
// For fetching logged-in users name and role
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
      date: format(new Date(), "yyyy-MM-dd"),
      time: new Date().toLocaleTimeString().substring(11, 16),
      items: ["1hour"],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.post(DemoClassUrl,data);
      console.log(res.data);
      form.reset();
      toast({
        title: "Success✅",
        description: "Your appointment has been submitted successfully",
        variant:"default"
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed ",
        description: "Unable to submit appointment",
        variant:"destructive"
      });
    }
    
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Student/Parent name"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
               <FormLabel className="font-semibold">Phone</FormLabel>
              <FormControl>
                <PhoneInput
                  country={"uae"}
                  placeholder="Parents Contact/Whatsapp number"
                  {...field}               
                  inputClass="phone-input" 
                  specialLabel= ""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Course Details</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. - AI for kids"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {role === "teacher" ? 
                        <SelectItem value={name}>{name}</SelectItem> : 
                          role === "admin" ? 
                            teachers.map((item)=>(<SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>)) : 
                              '' }
                    </SelectContent>
                  </Select>
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold">
                Book an Appointment
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} required className="bg-white" />
              </FormControl>
              <FormDescription>
                Book an appointment for demo class!
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
              <FormLabel className="font-semibold">Your time slot</FormLabel>

              <FormControl>
                <Input
                  type="time"
                  placeholder="e.g. - AI for kids"
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="font-bold">
                  When to send the Reminder
                </FormLabel>
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

        <Button type="submit">Book</Button>
      </form>
    </Form>
  );
}
