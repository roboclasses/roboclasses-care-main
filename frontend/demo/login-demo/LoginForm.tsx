"use client";

import * as React from "react";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../button-demo/SubmitButton";
import { FormField, FormItem, FormControl, Form, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { LoginUrl } from "@/constants";
import { createUserSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { passwordValidation } from "@/lib/helpers";

const FormSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().trim().min(8, "Password is too short").regex(passwordValidation, "Your password is not valid"),
});

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  // Mode toggle for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle login status
  const {isSubmitting } = form.formState;

  // handle user login
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.post(LoginUrl, data);
      console.log(res.data);
      const { message, success, jwtToken, _id, name, email, role } = res.data;
      
      if (success) {
        await createUserSession(jwtToken, role, _id, email, name);
        router.push("/");
        toast({ title: "Success✅", description: message, variant: "default" });
      }
      
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        let errorMessage = "An error occurred during login";

         // Handle different response formats
      if (typeof error.response?.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
        console.log(error);
        toast({
          title: "Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-5">
        <div className="grid items-center gap-5">

          {/* Email Address */}
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
                      placeholder="Enter your email address"
                      className="h-12 rounded-xl shadow-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        name="password"
                        required
                        autoComplete="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="h-12 rounded-xl shadow-none pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                        aria-label={ showPassword ? "Hide password" : "Show password" }
                      >
                        {showPassword ? (<Eye className="h-4 w-4 text-muted-foreground" />) : (<EyeOff className="h-4 w-4 text-muted-foreground" />)}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>

          <SubmitButton name={isSubmitting ? 'Signing in...' : 'Login'} type="submit" disabled={isSubmitting}/>
        </div>
      </form>
    </Form>
  );
}
