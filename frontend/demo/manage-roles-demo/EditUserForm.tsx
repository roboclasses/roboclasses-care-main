"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SubmitButton from "../button-demo/SubmitButton";
import { UsersUrl } from "@/constants";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SuccessMessageCard from "@/components/reusabels/SuccessMessageCard";
import { Label } from "@/components/ui/label";

// Roles data
const validRoles = ['admin', 'teacher', 'contractor'];

const FormSchema = z.object({
  name: z.string().min(3, {message: "User name must be atleast 3 character long."}),
  email: z.string().email({message: "Please enter a valid email."}),
  role: z.string().min(1, {message: "Role must be at least 1 character long"}).refine((val)=>validRoles.includes(val),{message: "Invalid role selected."}),
  workingHours: z.string().min(3, {message: "Working hours must be atleast 3 character long."}),
  workingDays: z.string().min(3, {message: "Working days must be atleast 3 character long."}),
  zoomApi: z.string().optional(),
});

export function EditUserForm() {
  const { id } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      workingHours: "",
      workingDays: "",
      zoomApi:"",
    },
  });

  // Handle fetch users
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${UsersUrl}/${id}`);
        console.log(res.data);

        form.reset({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          workingHours: res.data.workingHours,
          workingDays: res.data.workingDays,
          zoomApi: res.data.zoomApi,
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, [form, id]);

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        role: data.role,
        workingHours: data.workingHours,
        workingDays: data.workingDays,
        zoomApi: data.zoomApi,
      };
      const res = await axios.put(`${UsersUrl}/${id}`, payload);
      console.log(res.data);
      // form.reset();

      const { message, success } = res.data;
      setIsSuccess(success);

      toast({ title: "Success✅", description: message, variant: "default" });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
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
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard content="Thank you for updating role!"/>) 
    : (<Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="mb-8 flex flex-col items-center text-center">
                    <h1 className="lg:text-4xl text-2xl mb-4 font-serif">
                      Edit Role Form
                    </h1>
                    <Label className="text-gray-500 lg:text-lg text-sm">
                      Edit role here
                    </Label>
                  </div>
        {/* User Full Name and Email Address */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    type="text"
                    title="Full Name"
                    className="shadow-none rounded-xl h-12"
                  />
                </FormControl>
                <FormDescription>
                  This disabled field is for full name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    className="shadow-none rounded-xl h-12"
                  />
                </FormControl>
                <FormDescription>
                  This disabled field is for email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Update Working Hours and Days */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="workingHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hours Work</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="text"
                    title="Working Hours"
                    className="shadow-none rounded-xl h-12 bg-accent-foreground"
                  />
                </FormControl>
                <FormDescription>Enter hours worked. This value will be displayed to roles table.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workingDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Days Work</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="text"
                    title="Working Days"
                    className="shadow-none rounded-xl h-12 bg-accent-foreground"
                  />
                </FormControl>
                <FormDescription>Enter days worked. This value will be displayed to roles table.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Meeting ID  */}
         <FormField
            control={form.control}
            name="zoomApi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zoom Api</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    title="Meeting ID"
                    className="shadow-none rounded-xl h-12 bg-accent-foreground"
                  />
                </FormControl>
                <FormDescription>Provided zoom api details. This will be displayed to admin only.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        {/* Edit User role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edit Role</FormLabel>
              <Select value={field.value} onValueChange={field.onChange} required >
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl shadow-none">
                    <SelectValue title="Roles"/>
                  </SelectTrigger>
                </FormControl>
                <FormDescription>This drop down is for edit roles. This will be displayed in roles table.</FormDescription>
                <SelectContent>
                  <SelectItem value={"teacher"}>Teacher</SelectItem>
                  <SelectItem value={"admin"}>Admin</SelectItem>
                  <SelectItem value={"contractor"}>Contractor</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <SubmitButton
          name={isSubmitting ? "Updating..." : "Update"}
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </Form>)}
    </>
  );
}
