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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// import axios, { AxiosError } from "axios";


const FormSchema = z.object({
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  ageGroup: z.string({ required_error: "Please select an age group." }),
  difficultyLevel: z.number().min(1).max(5),
  // numberOfQuestions: z.string().transform((val) => Number.parseInt(val, 10)),
  numberOfQuestions: z.string({ required_error: "Please select number of question." }),
  additionalInstructions: z.string().optional(),
})

export function AssessmentGeneratorForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subject: "",
      difficultyLevel: 3,
      numberOfQuestions: "10",
      additionalInstructions: "",
    },
  });

  // Handle form status
  const {isSubmitting} = form.formState;


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // const res = await axios.post(CoursesUrl, data);
      // console.log(res.data);
      console.log("Data is", data);
      
      form.reset();
      
      // const {message} = res.data;
      toast({
        title: "Success✅",
        // description: message,
        variant: "default",
      });
    } catch (error:unknown) {
      // if(error instanceof AxiosError){
      //   console.error(error);
      //   const {message} = error.response?.data;
      //   toast({ title: "Failed", description: message || "An Unknown error is occurred", variant: "destructive" })
      // }
      console.error(error);
      
    }
  }

  return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* Subject and Age Group */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input required placeholder="e.g. Math, Science, Reading" {...field} className="shadow-none rounded-xl h-12 bg-muted-foreground"/>
                    </FormControl>
                    <FormDescription>The main subject of the assessment</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ageGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Group</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="shadow-none rounded-xl h-12">
                          <SelectValue placeholder="Select age group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="6-8">Early Elementary (6-8 years)</SelectItem>
                        <SelectItem value="9-11">Late Elementary (9-11 years)</SelectItem>
                        <SelectItem value="12-14">Middle School (12-14 years)</SelectItem>
                        <SelectItem value="15-17">High School (15-17 years)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Target age range for the assessment</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Difficulty Level */}
            <FormField
              control={form.control}
              name="difficultyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level: {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="py-3"
                    />
                  </FormControl>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Very Easy</span>
                    <span>Easy</span>
                    <span>Medium</span>
                    <span>Hard</span>
                    <span>Very Hard</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Questions */}
            <FormField
              control={form.control}
              name="numberOfQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="shadow-none rounded-xl h-12">
                        <SelectValue placeholder="Select number of questions" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5">5 questions</SelectItem>
                      <SelectItem value="10">10 questions</SelectItem>
                      <SelectItem value="15">15 questions</SelectItem>
                      <SelectItem value="20">20 questions</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Instruction */}
            <FormField
              control={form.control}
              name="additionalInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific topics, formats, or requirements..."
                      className="resize-none shadow-none rounded-xl max-h-20 bg-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Provide any additional details to customize the assessment</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Assessment...
                </>
              ) : (
                "Generate Assessment"
              )}
            </Button>
          </form>
        </Form>
  );
}
