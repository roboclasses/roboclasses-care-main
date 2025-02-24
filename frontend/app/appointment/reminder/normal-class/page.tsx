import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { PRIVATE_WALLPAPER } from "@/constants/images";
import { MultiDatePickerForm } from "@/demo/normal-class/multiDatePickerForm";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import React from "react";

const page = () => {
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
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {"Normal Class"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="relative flex-1">
        <Image
          src={PRIVATE_WALLPAPER}
          alt="wallpaper"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex items-center justify-center h-full backdrop-blur-sm">
          <div className="w-full max-w-[600px] bg-background/95 p-8 m-4 rounded-xl shadow-lg">
            <p className="text-4xl font-bold mb-6 text-center">Create Normal Class</p>
            <MultiDatePickerForm />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default page;
