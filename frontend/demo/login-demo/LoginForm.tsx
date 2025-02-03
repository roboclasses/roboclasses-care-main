/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import { toast } from "@/hooks/use-toast";
import { LoginUrl } from "@/constants";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be 6 characters long" })
});

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // handle user login
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.post(LoginUrl, data);
      console.log(res.data);
      const { message, status, success, jwtToken, _id, name, email } = res.data;

      if (success) {
        localStorage.setItem("token", jwtToken),
        localStorage.setItem("_id", _id),
        localStorage.setItem("email", email),
        localStorage.setItem("name", name),
        router.push("/");
        toast({ title: "Success✅", description: message, variant: "default" });
      }
      else{
        if(status === 404)
        {
          toast({title:"Failed", description: message, variant:"destructive"})
        }
        else if(status === 403)
        {
          toast({title:"Failed", description: message, variant:"destructive"})

        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        description: "Unable to login",
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-20">
        <div className="grid items-center gap-4">
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
                      placeholder="Eg. devstidax@gmail.com"
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

          <SubmitButton name="Login" type="submit" />
        </div>
      </form>
    </Form>
  );
}
