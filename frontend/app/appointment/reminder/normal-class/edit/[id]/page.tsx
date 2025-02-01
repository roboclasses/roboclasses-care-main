"use client";
import Image from "next/image";

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
import { EditNormalClassForm } from "@/demo/normal-class/EditNormalClassForm";

const Page = () => {
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

              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/adminDashboard">
                  Admin Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="hidden md:block" />

              <BreadcrumbItem>
                <BreadcrumbPage>Edit Appointment</BreadcrumbPage>
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
        <div className="w-[700px] flex flex-col justify-center p-20 gap-5">
          <p className="text-4xl font-bold">Edit Appointment for Normal Class</p>
          <EditNormalClassForm />
        </div>

      </div>
    </SidebarInset>
  );
};

export default Page;
