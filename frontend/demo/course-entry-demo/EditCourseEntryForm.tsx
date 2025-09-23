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
import { Input } from "@/components/ui/input";

import { CoursesUrl } from "@/constants";
import SubmitButton from "../button-demo/SubmitButton";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import SuccessMessageCard from "../card-demo/SuccessMessageCard";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadIcon } from "lucide-react";

const FormSchema = z.object({
  course: z.string(),
  numberOfClasses: z.string().trim(),
  syllabus: z.instanceof(File).refine((file)=>[
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ].includes(file.type),
{message: "Invalid file type."}),
});

export function EditCourseEntryForm() {
  const { id } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState("")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { course: "", numberOfClasses: "" },
  });

  // Handle fetch course
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${CoursesUrl}/${id}`);
        console.log(res.data);

        form.reset({
          course: res.data.course,
          numberOfClasses: res.data.numberOfClasses,
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
    console.log("courses data before update: ", data)
    try {
      const formData = new FormData();
      formData.append("course", data.course);
      formData.append("numberOfClass", data.numberOfClasses);
      formData.append("syllabus", data.syllabus);

      const res = await axios.put(`${CoursesUrl}/${id}`, formData, {headers:{"Content-Type": "multipart/form-data"}});
      console.log(res.data);

      const { message, success } = res.data;
      setIsSuccess(success);
      toast.success(message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast.error(message || "An unknown error has occurred.");
      }
    }
  }

  return (
    <>
      {isSubmitSuccessful && isSuccess ? (
        <SuccessMessageCard
          content="Thank you for updating course!"
          to="/adminDashboard/course"
        />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="mb-8 flex flex-col items-center">
              <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
                Edit Course
              </h1>
              <Label className="text-gray-500 lg:text-sm text-xs text-center">
                Courses for Kids
              </Label>
            </div>

            {/* Course Name */}
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      disabled
                      className="shadow-none rounded-xl py-6"
                    />
                  </FormControl>
                  <FormDescription>
                    This field is for edit courses name. Users can see the
                    updated value in course table.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Number of Classes */}
            <FormField
              control={form.control}
              name="numberOfClasses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edit Number of Classes</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      className="shadow-none rounded-xl py-6"
                    />
                  </FormControl>
                  <FormDescription>
                    This field is for edit number of classess. Users can see the
                    updated value.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload Syllabus file (only .csv format accepted) */}
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Upload Syllabus</CardTitle>
                  <CardDescription>
                    Select a file to upload and click the submit button, only
                    .csv file accepted here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon className="w-10 h-10 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          .CSV
                        </p>
                      </div>
                      <FormField
                        control={form.control}
                        name="syllabus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Assessment File</FormLabel>
                            <FormControl>
                              <input
                                id="dropzone-file"
                                type="file"
                                accept=".csv, .xlsx"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    field.onChange(file);
                                    console.log("File is: ", file);
                                    setFile(file.name);
                                  }
                                }}
                                className="hidden"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {file && (
                        <p className="text-center p-2 text-gray-500">{file}</p>
                      )}
                    </label>
                  </div>
                </CardContent>
              </Card>

            <SubmitButton
              name={isSubmitting ? "Updating..." : "Update"}
              type="submit"
              disabled={isSubmitting}
            />
          </form>
        </Form>
      )}
    </>
  );
}
