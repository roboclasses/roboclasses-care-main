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
import {
  FormField,
  FormItem,
  FormControl,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { SignupUrl } from "@/constants";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { passwordValidation } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(3, "Name must be 3 characters long"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password is too short").regex(passwordValidation, 'Your password is not valid'),
  role: z.string()
  .nonempty("This field can't be empty")
  .refine(val => ["student", "teacher", "admin", "constructor"].includes(val), {
    message: "Role must be one of: student, teacher, admin, constructor",
  })
});

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

    // Mode toggle for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role:"student",
    },
  });

  // Handle form status
  const {isSubmitting} = form.formState;

  // handle user signup
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.post(SignupUrl, data);
      console.log(res.data);
      const { message, success } = res.data;

      if (success) {
        router.push("/login");
        toast({ title: "Success✅", description: message, variant: "default" });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: unknown) {
     let errorMessage = "An error occurred during signup";

    if (axios.isAxiosError(error)) {
      if (typeof error.response?.data === "string") {
        errorMessage = error.response.data;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
      console.log(error);
      toast({ title: "Signup  Failed", description: errorMessage, variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-5">
        <div className="grid items-center gap-5">

          {/* Full Name */}
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
                      placeholder="e.g. James Bond"
                      className="h-12 rounded-xl shadow-none"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            ></FormField>
          </div>

          {/* Roles drop-down */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="roles">Roles</Label>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl shadow-none">
                        <SelectValue placeholder="Select your role" id="roles"/>
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage/>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="constructor">Constructor</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

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
                      placeholder="e.g. bond@gmail.com"
                      className="h-12 rounded-xl shadow-none"
                    />
                  </FormControl>
                  <FormMessage/>
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
                      placeholder="Enter a strong password"
                      className="h-12 rounded-xl shadow-none"
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
                  <FormMessage/>
                </FormItem>
              )}
            ></FormField>

            
          </div>

          <SubmitButton name={isSubmitting ? 'Creating account...' : 'Signup'} type="submit" disabled = {isSubmitting}/>
        </div>
      </form>
    </Form>
  );
}
