  "use client";

  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { toast } from "@/hooks/use-toast";

  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Label } from "@/components/ui/label";

  import SubmitButton from "../button-demo/SubmitButton";
  import { AttendanceUrl} from "@/constants";
  import { handleNumber } from "@/lib/utils";

  import { useEffect, useState } from "react";
  import { useParams } from "next/navigation";
  import axios, { AxiosError } from "axios";
  import Cookies from "js-cookie";
  import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


  const FormSchema = z.object({
    batchName: z.string().min(2, { message: "Batch Name must be at least 2 characters long" }).optional(),
    startDate: z.string().optional(),
    classes: z.array(z.string()).optional(),
    curriculumTaught: z.array(z.string().optional()),
    completed: z.string(),
  });

  export function EditAttendanceForm() {
    const {id} = useParams();
    const [numberOfClasses, setNumberOfClasses] = useState(0);

    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        batchName: "",
        startDate: "",
        classes: [],
        curriculumTaught:[""],
        completed:"",
      },
    });

    // Fetch the existing attendance data
    useEffect(() => {
      const handleFetch = async () => {
        try {
          const res = await axios.get(`${AttendanceUrl}/${id}`, { headers: { Authorization: Cookies.get("token") }});
          const attendanceData = res.data;

          // Pre-populate the form with fetched data
          form.reset({
            batchName: attendanceData.batchName,
            startDate: attendanceData.startDate ? format(new Date(attendanceData.startDate), 'yyyy-MM-dd') : '',
            classes: attendanceData.classes.map((cls) => format(new Date(cls), 'yyyy-MM-dd')),
            curriculumTaught: attendanceData.curriculumTaught.map((c) => c),
            completed: attendanceData.completed,
          });

          setNumberOfClasses(attendanceData.classes.length);
        } catch (error) {
          console.error(error);
        }
      };
      handleFetch();
    }, [form, id]);

    // Handle adding a new class
    const handleAddClass = () => {
      if (numberOfClasses < 60) {
        setNumberOfClasses((prev) => handleNumber(prev) + 1);
        const currentClasses = [...form.getValues("classes")];
        form.setValue("classes", [...currentClasses, ""]);
      }
    };


    // Handle form status
    const {isSubmitting} = form.formState;

    // Handle form submission
    async function onSubmit(data) {
      try {
        const startDate = data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '';
        const classes = data.classes ? data.classes.map((item) => new Date(item).toISOString().split('T')[0]) : '';
        const curriculumTaught = data.curriculumTaught ? data.curriculumTaught.map((item) => item) : '';


        const payload = {
          batchName: data.batchName,
          startDate: startDate,
          classes: classes,
          curriculumTaught: curriculumTaught,
          completed: data.completed,
        };

        const res = await axios.put(`${AttendanceUrl}/${id}`, payload, { headers: { Authorization: Cookies.get("token") }});
        console.log(res.data);

        const {message} = res.data;
        toast({ title: "Success✅", description: message, variant: "default" });
        
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
          const { message } = error.response?.data;
          toast({ title: "Failed", description: message || 'An unknown error occurred.', variant: "destructive" });
        }
      }
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 gap-2 flex flex-col ">

        {/* Batch Name */}
          <FormField
            control={form.control}
            name="batchName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Batch Name</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Button type="button" onClick={handleAddClass} disabled={handleNumber(numberOfClasses) >= 60} style={{background: "green"}}>Add Classes</Button>
            </div>
            <SubmitButton name={isSubmitting ? 'Updating...' : 'Update'} type="submit" disabled={isSubmitting}/>
          </div>

          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Start Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Classes */}
          <Label className="font-semibold">Classes - Curriculum Taught</Label>
          {Array.from({ length: handleNumber(numberOfClasses) }).map((_, index) => (
            <div className="flex flex-row items-center gap-2" key={index}>
            <FormField
              control={form.control}
              name={`classes.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 

            {/* Curriculum Name */}
            <FormField
              control={form.control}
              name={`curriculumTaught.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="curriculum taught"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
            </div> 
          ))}

          {/* All classes are covered? */}
                  <FormField
                    control={form.control}
                    name="completed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Attendance Completed?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          required
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value}/>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"Yes"}>Yes</SelectItem>
                            <SelectItem value={"No"}>No</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

        </form>
      </Form>
    );
  }