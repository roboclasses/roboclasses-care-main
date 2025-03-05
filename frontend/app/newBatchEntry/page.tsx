import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { PRIVATE_WALLPAPER } from "@/constants/images";
import { NewBatchEntryForm } from "@/demo/new-batch-entry-demo/NewBatchEntry";
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
              <BreadcrumbLink href="/">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{'New Batch Entry'}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
    <div className="grid grid-cols-2">
      <Image width={1200} height={1200} src={PRIVATE_WALLPAPER} alt="wallpaper" className="min-h-screen object-cover"/>
    <div className="w-[600px] flex flex-col justify-center gap-5 p-20">
      <p className="text-4xl font-bold">Create a Batch</p>
      <NewBatchEntryForm />
    </div>
    </div>
    </SidebarInset>
  );
};

export default page;
