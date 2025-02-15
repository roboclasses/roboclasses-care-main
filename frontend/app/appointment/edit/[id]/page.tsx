"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { toast } from "@/hooks/use-toast";
import EditAppointmentForm from "@/demo/reschedule-demo/EditAppointmentForm";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DemoClassUrl } from "@/constants";
import { PRIVATE_WALLPAPER } from "@/constants/images";

const Page = ({ params }: { params: { id: string } }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString().substring(11, 16));
  const [name, setName] = useState("");
  const { id } = params;

  // handle get single appointment
  useEffect(() => {
    const handleFetchOne = async () => {
      try {
        const res = await axios.get(`${DemoClassUrl}/${id}`);

        setDate(res.data.date);
        setTime(res.data.time);
        setName(res.data.userName);
        console.log(res.data.date);
        console.log(res.data.time);
        console.log(res.data.userName);
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed",
          description: "data fetching error!",
          variant: "destructive",
        });
      }
    };
    handleFetchOne();
  }, [id]);

  // handle update appointment
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${DemoClassUrl}/${id}`,{date, time });
      console.log(res.data);
      toast({title: "Success✅",description: "Your appointment is now updated successfully",variant: "default",});

    } catch (error) {
      console.log(error);
      toast({title: "Failed ",description: "Unable to update",variant: "destructive",});
    }
  };

  // handle delete appointment
  const handleCancelAppointment = async () => {
    try {
      const res = await axios.patch(`${DemoClassUrl}/${id}`);  
      console.log(res.data);
      toast({title: "Success✅",description: "Your appointment got cancelled",variant: "default",});

    } catch (error) {
      console.log(error);
      toast({title: "Failed",description: "Unable to cancel",variant: "destructive",});
    }
  };

  return (
    <SidebarInset className="w-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/adminDashboard">
                  Admin Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{`${name}'s Appointment`}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="grid grid-cols-2">
        <Image
          width={1200}
          height={1200}
          src={PRIVATE_WALLPAPER}
          alt="wallpaper"
          className="min-h-screen object-cover"
        />
        <div className="w-[700px] flex flex-col justify-center p-20 gap-5">
          <p className="text-4xl font-bold">Edit your Appointment</p>
          <EditAppointmentForm
            date={date}
            time={time}
            handleDateChange={(e: {target: { value: string | number | Date }}) => setDate(new Date(e.target.value))}
            handleTimeChange={(e: {target: { value: React.SetStateAction<string> }}) => setTime(e.target.value)}
            handleSubmit={handleUpdate}
            handleDelete={handleCancelAppointment}
          />
        </div>
      </div>
    </SidebarInset>
  );
};

export default Page;
