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
// import { CollapsibleDemo } from "@/demo/admin-dashboard/CollapsibleDemo";
import { TableDemoClass } from "@/demo/admin-dashboard/TableDemoClass";
import { TableBatchEntries } from "@/demo/admin-dashboard/TableBatchEntries";
import { TableNormalClass } from "@/demo/admin-dashboard/TableNormalClass";
import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { TableCourseEntries } from "@/demo/admin-dashboard/TableCourseEntries";
import { StudentsTable } from "@/demo/student-register-demo/StudentsTable";
import { TableAttendance } from "@/demo/admin-dashboard/TableAttendance";
import Link from "next/link";
import Image from "next/image";
import { imageIcons } from "@/data/dataStorage";

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
                <BreadcrumbPage>{"Admin Dashboard"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex gap-5 items-center p-5">
        {imageIcons.map((items) => (
          <Link href={"#"} key={items.id}>
            <Image
              src={items.img}
              height={150}
              width={180}
              alt={items.alt}
              className="rounded-xl shadow-sm hover:shadow-2xl transition-all duration-100 delay-75 
              active:scale-95 active:opacity-75 active:brightness-75 active:sepia active:blur-sm  "
            />
          </Link>
        ))}
      </div>
      <div className="w-[1200px] grid grid-cols-1 space-y-10 px-20 mt-10">
        <p className="font-bold text-4xl">Manage Students</p>
        <StudentsTable />

        <p className="font-bold text-4xl">Demo-Class Appointments</p>
        <TableDemoClass />

        <p className="font-bold text-4xl">Normal-Class Appointments</p>
        <TableNormalClass />
      </div>
      <div className="w-[1200px] grid grid-cols-1 space-y-10 px-20 mt-10">
        {/* <CollapsibleDemo /> */}

        <p className="font-bold text-4xl">Manage Attendances</p>
        <TableAttendance />

        <p className="font-bold text-4xl">Available Batches</p>
        <TableBatchEntries />

        <p className="font-bold text-4xl">Current Courses</p>
        <TableCourseEntries />
      </div>
    </SidebarInset>
  );
};

export default page;
