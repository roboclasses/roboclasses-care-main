"use client";
import * as React from "react";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../button-demo/SubmitButton";
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { SignupUrl } from "@/constants";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
  name: z.string().min(3, { message: "Name must be 3 characters long" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 characters long" }),
});

export function SignupForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  // handle user signup
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.post(SignupUrl, data);
      console.log(res.data);
      const { message, status, success } = res.data;

      if (success) {
        router.push("/login");
        toast({ title: "Success✅", description: message, variant: "default" });
      }
      else{
        if(status === 409)
        {
          toast({title:"Failed", description: message, variant:"destructive"})
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        description: "Unable to signup",
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-20">
        <div className="grid items-center gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full Name</Label>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      type="text"
                      placeholder="Eg. Guest"
                      className="h-12"
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email Address</Label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      type="email"
                      placeholder="Eg. guest@gmail.com"
                      className="h-12"
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      name="password"
                      required
                      autoComplete="password"
                      type="password"
                      placeholder="Enter a strong password"
                      className="h-12"
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </div>

          <SubmitButton name="Signup" type="submit" />
        </div>
      </form>
    </Form>
  );
}
