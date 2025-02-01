"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DatePickerForm } from "@/demo/demo-class/datePickerForm";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Page = () => {
  const pathname = usePathname();
  return (
    <SidebarInset className="w-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Scheduler</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {pathname == "/appointment/reminder/demo-class" &&
                    "Demo Class"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="grid grid-cols-2">
        <Image
          width={1200}
          height={1200}
          src={"/assests/images/spikeprime.webp"}
          alt="wallpaper"
          className="min-h-screen object-cover"
        />

        <div className="w-[600px] flex flex-col gap-5 p-20">
          <p className="text-4xl font-bold mb-2">Book Appointment</p>
          <DatePickerForm />
        </div>
      </div>
    </SidebarInset>
  );
};

export default Page;
