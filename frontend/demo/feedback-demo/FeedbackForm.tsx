"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { FeedbackUrl } from "@/constants";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FeedbackData } from "@/data/dataStorage";
import { Textarea } from "@/components/ui/textarea";
import SuccessMessageCard from "../card-demo/SuccessMessageCard";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  feedbackAnswer: z.array(
    z.enum(["A", "B", "C"], { error: "You need to select an option." })
  ),
  student: z.string().optional(),
  batch: z.string().optional(),
  teacher: z.string().optional(),
  recommendProgram: z.string().optional(),
  additionalFeedback: z.string().optional(),
});

export function FeedbackForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { feedbackAnswer: [] },
  });

  const { id } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetching admin feedback details
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${FeedbackUrl}/${id}`);
        console.log(res.data);

        const feedbackData = res.data;
        form.reset({
          batch: feedbackData.batch,
          student: feedbackData.student,
          teacher: feedbackData.teacher,
        });
      } catch (error) {
        console.error(error);
      }
    };

    handleFetch();
  }, [form, id]);

  const {isSubmitting, isSubmitSuccessful} = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    try {
      const res = await axios.put(`${FeedbackUrl}/${id}`, data);
      console.log(res.data);
      // form.reset();

      const { message, success } = res.data;
      setIsSuccess(success);
      toast.success(message)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast.error(message || 'An unknown error has occurred.')
      }
    }
  }

  return (
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (
      <SuccessMessageCard
        to="/feedbackViewer"
        content="Thank you for submitting your valuable feedback! One of our teacher will reach you soon."
      />
      ) 
    : (<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="mb-8 flex flex-col items-center">
                    <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
                      Feedback Form
                    </h1>
                    <Label className="text-gray-500 md:text-lg text-xs text-center">
                      Please check your details and fill the form, once done please
                      submit
                    </Label>
                  </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>View batch details</AccordionTrigger>
            {/* Batch */}
            <AccordionContent>
              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        disabled
                        title="Batch Name"
                        className="py-6 shadow-none rounded-xl"
                      />
                    </FormControl>
                    <FormDescription>
                      This field is for the batch name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>

            {/* Teacher */}
            <AccordionContent>
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        disabled
                        title="Teacher Name"
                        className="py-6 shadow-none rounded-xl"
                      />
                    </FormControl>
                    <FormDescription>
                      This field is for teacher name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>

            {/* Student */}
            <AccordionContent>
              <FormField
                control={form.control}
                name="student"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        disabled
                        title="Student Name"
                        className="py-6 shadow-none rounded-xl"
                      />
                    </FormControl>
                    <FormDescription>
                      This field is for student name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {FeedbackData.map((item, index) => (
          <div key={index}>
            <FormField
              control={form.control}
              name={`feedbackAnswer.${index}`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className=" font-semibold">
                    {item.id}. {item.question}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 text-gray-500"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="A" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.option.a}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="B" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.option.b}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="C" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.option.c}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        {/* Recommend Program */}
        <FormField
                control={form.control}
                name="recommendProgram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Would you recommend this coding and robotics program to other parents? Why or why not?</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Please explain in few sentence..."
                        required
                        title="Would you recommend"
                        className="h-20 shadow-none rounded-xl"
                      />
                    </FormControl>
                    <FormDescription>
                      This field is for your feedback.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Recommend Program */}
        <FormField
                control={form.control}
                name="additionalFeedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any other feedback? (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Please explain in few sentence..."
                        required
                        title="Additional note"
                        className="h-20 shadow-none rounded-xl"
                      />
                    </FormControl>
                    <FormDescription>
                      This is a optional field for your additional feedback.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </Form>)}
    </>
  );
}
