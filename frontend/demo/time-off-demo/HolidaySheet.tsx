
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoSettingsSharp } from "react-icons/io5";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

import SubmitButton from "../button-demo/SubmitButton";
import { HolidayUrl } from "@/constants";

import axios, { AxiosError } from "axios";

const formSchema = z.object({
  holiday: z.string().min(3, { message: "Holiday must be 3 characters" }),
  duration: z.string().min(1, { message: "Duration of holiday must be 1" }),
});

export function HolidaySheet() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      holiday: "",
      duration: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    try {
      const res = await axios.post(HolidayUrl, data)
      console.log(res.data);

      const {message} = res.data;
      toast({title: "Success✅", description: message, variant: "default"})

    } catch (error:unknown) {
      if(error instanceof AxiosError){
        console.error(error);
        const {message} = error.response?.data;
        toast({title: "Failed", description: message, variant: "destructive"})
      } 
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <IoSettingsSharp />
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Enter Holiday</SheetTitle>
          <SheetDescription>
            Make changes to holidays here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
              {/* Holiday name */}
              <FormField
                control={form.control}
                name="holiday"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter holiday name" {...field} />
                    </FormControl>
                    <FormDescription>This is holiday name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Holiday duration */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter holiday duration" {...field} />
                    </FormControl>
                    <FormDescription>This is holiday duration.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton
                name={isSubmitting ? "Saving" : "Save"}
                type="submit"
              />
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
