"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { AttendanceUrl} from "@/constants";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { handleNumber } from "@/lib/utils";
import { useParams } from "next/navigation";

// Make all fields optional in the Zod schema
const FormSchema = z.object({
  batchName: z.string().min(2, { message: "Batch Name must be at least 2 characters long" }).optional(),
  startDate: z.string().optional(),
  classes: z.array(z.string()).optional(),
});

export function EditAttendanceForm() {
  const {id} = useParams();
  const [numberOfClasses, setNumberOfClasses] = useState(0);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batchName: "",
      startDate: "",
      classes: [],
    },
  });

  // Fetch the existing attendance data
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${AttendanceUrl}/${id}`, {
          headers: { Authorization: Cookies.get("token") }
        });
        const attendanceData = res.data;

        // Pre-populate the form with fetched data
        form.reset({
          batchName: attendanceData.batchName,
          startDate: attendanceData.startDate ? format(new Date(attendanceData.startDate), 'yyyy-MM-dd') : '',
          classes: attendanceData.classes.map((cls) => format(new Date(cls), 'yyyy-MM-dd')),
        });

        setNumberOfClasses(attendanceData.classes.length);
      } catch (error) {
        console.error(error);
      }
    };

    handleFetch();
  }, [form, id]);


  // Handle adding a new class
  const handleAddClass = () => {
    if (numberOfClasses < 60) {
      setNumberOfClasses((prev) => handleNumber(prev) + 1);
      const currentClasses = [...form.getValues("classes")];
      form.setValue("classes", [...currentClasses, ""]);
    }
  };

  // Handle form submission
  async function onSubmit(data) {
    try {
      const startDate = data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : undefined;
      const classes = data.classes ? data.classes.map((item) => new Date(item).toISOString().split('T')[0]) : undefined;

      const payload = {
        batchName: data.batchName,
        startDate: startDate,
        classes: classes,
      };

      const res = await axios.put(`${AttendanceUrl}/${id}`, payload, {
        headers: { Authorization: Cookies.get("token") }
      });
      console.log(res.data);
      

      toast({ title: "Success✅", description: res.data.message, variant: "default" });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast({ title: "Failed", description: message || 'An unknown error occurred.', variant: "destructive" });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2 ">
        <FormField
          control={form.control}
          name="batchName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Batch Name</FormLabel>
              <FormControl>
                <Input {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Button type="button" disabled>Add Row</Button>
            <Button type="button" onClick={handleAddClass} disabled={handleNumber(numberOfClasses) >= 60}>Add Class</Button>
          </div>
          <Button type="submit">Submit</Button>
        </div>

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Start Date</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Label className="font-semibold">Classes</Label>

        {Array.from({ length: handleNumber(numberOfClasses) }).map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`classes.${index}`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={`Add Class ${index + 1}`} {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
}