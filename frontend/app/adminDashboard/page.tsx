'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { CollapsibleDemo } from "@/demo/admin-dashboard/CollapsibleDemo";
import { TableDemoClass } from "@/demo/admin-dashboard/TableDemoClass";
import { TableBatchEntries } from "@/demo/admin-dashboard/TableBatchEntries";
import { TableNormalClass } from "@/demo/admin-dashboard/TableNormalClass";
import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { TableAttendance } from "@/demo/admin-dashboard/TableAttendance";

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
                <BreadcrumbLink href="/">Scheduler</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                 {"Admin Dashboard"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="w-[1200px] grid grid-cols-1 space-y-10 px-20 mt-10">
        <p className="font-bold text-4xl">Manage Appointments</p>
        <TableDemoClass />
        <TableNormalClass />
      </div>
      <div className="w-[1200px] grid grid-cols-1 space-y-10 p-20">
        <CollapsibleDemo />
        <TableAttendance />
        <TableBatchEntries />
      </div>
    </SidebarInset>
  );
};

export default page;
