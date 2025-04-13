"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SubmitButton from "../button-demo/SubmitButton";
import { UsersUrl } from "@/constants";

import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useParams } from "next/navigation";


const FormSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
  workingHours: z.string().optional(),
  workingDays: z.string().optional(),
});

export function EditUserForm() {
    const {id} = useParams();

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: { name: "", email:"", role:"", workingHours:"", workingDays:"" }
    });

    // Handle fetch users
    useEffect(()=>{
        const handleFetch = async()=>{
            try {
                const res = await axios.get(`${UsersUrl}/${id}`)
                console.log(res.data);

                form.reset({
                  name: res.data.name,
                  email: res.data.email,
                  role: res.data.role,
                  workingHours: res.data.workingHours,
                  workingDays: res.data.workingDays,
                })

            } catch (error) {
                console.log(error);
            }
        }
      handleFetch();
    },[form, id])


    // Handle form status
    const {isSubmitting} = form.formState;


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        name:data.name,
        email:data.email,
        role:data.role,
        workingHours: data.workingHours,
        workingDays: data.workingDays,
      }
      const res = await axios.put(`${UsersUrl}/${id}`, payload);
      console.log(res.data);
      form.reset();
      
      const {message} = res.data;
      toast({ title: "Success✅", description: message, variant: "default" });
    } catch (error: unknown) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response?.data
        toast({ title: "Failed", description: message || "An unknown error has occurred.", variant: "destructive" });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* User Full Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">User Full Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* User Email Address */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Email Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  disabled
                  className="bg-white"
                />
              </FormControl>
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
              <FormLabel className="font-semibold">Edit Role</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={""}
                required
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"teacher"} >Teacher</SelectItem>
                  <SelectItem value={"admin"} >Admin</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
            )}
        />

        {/* Update Working Hours */}
        <FormField
          control={form.control}
          name="workingHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Hours Work</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         {/* Update Working Days */}
         <FormField
          control={form.control}
          name="workingDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Days Work</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <SubmitButton name={isSubmitting ? 'Updating...' : 'Update'} type="submit" disabled={isSubmitting}/>
      </form>
    </Form>
  );
}
