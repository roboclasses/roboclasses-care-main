import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Share2, UploadIcon } from "lucide-react";
import SubmitButton from "../button-demo/SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { AssessmentUrl, NewBatchEntryUrl } from "@/constants";
import Cookies from "js-cookie";
import { batchType } from "@/types/Types";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";


const FormSchema = z.object({
  batch: z.string({ required_error: "Please select a batch" }),
  assessmentLevel: z.string({
    required_error: "Please select assesment level",
  }),
  questions: z.any().refine((file) => {
    if (typeof window === "undefined") return true; // Skip check on server
    return file instanceof File && file.name.endsWith(".csv");
  }, {
    message: "Please upload a valid CSV file",
  }),
});


const fetcher = (url: string) =>
  axios
    .get(url, { headers: { Authorization: Cookies.get("token") } })
    .then((res) => res.data);

export function UploadAssessmentButton() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // defaultValues: { batch: "", assessmentLevel: "" },
  });
  const { data: batchDetails = [] } = useSWR<batchType[]>(
    NewBatchEntryUrl,
    fetcher
  );
  const [file, setFile] = useState("");

  // Handle form status
  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data is: ", data);
    try {
      const formData = new FormData();
      formData.append('batch', data.batch)
      formData.append('assessmentLevel', data.assessmentLevel)
      formData.append('questions', data.questions)

      const res = await axios.post(AssessmentUrl, formData, { headers:{"Content-Type":"multipart/form-data"}});
      console.log(res.data);
      
      form.reset();

      const { message } = res.data;
      toast({
        title: "Success✅",
        description: message,
        variant: "default",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast({
          title: "Failed",
          description: message || "An Unknown error is occurred",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Upload and Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Upload Assessment Form</DialogTitle>
          <DialogDescription>
            Please fill neccessary fields. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Select Batch */}
              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Batch Name</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {batchDetails?.map((item: batchType) => (
                          <SelectItem value={item.batch} key={item._id}>
                            {item.batch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Select Assessment Level */}
              <FormField
                control={form.control}
                name="assessmentLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Assessment Level
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assessment level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"Level 1"}>Level 1</SelectItem>
                        <SelectItem value={"Level 2"}>Level 2</SelectItem>
                        <SelectItem value={"Level 3"}>Level 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Upload Assessment file (only .csv format accepted) */}
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Upload Assessment File</CardTitle>
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
                        name="questions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              Assessment File
                            </FormLabel>
                            <FormControl>
                              <input
                                id="dropzone-file"
                                type="file"
                                accept=".csv"
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
                name={isSubmitting ? "Submitting..." : "Submit"}
                type="submit"
                disabled={isSubmitting}
              />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
