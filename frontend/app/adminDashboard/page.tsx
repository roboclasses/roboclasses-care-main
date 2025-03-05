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
import { TableDemoClass } from "@/demo/admin-dashboard/TableDemoClass";
import { TableBatchEntries } from "@/demo/admin-dashboard/TableBatchEntries";
import { TableNormalClass } from "@/demo/admin-dashboard/TableNormalClass";
import { Separator } from "@radix-ui/react-separator";
import React, { useState } from "react";
import { TableCourseEntries } from "@/demo/admin-dashboard/TableCourseEntries";
import { StudentsTable } from "@/demo/student-register-demo/StudentsTable";
import { TableAttendance } from "@/demo/admin-dashboard/TableAttendance";
import Image from "next/image";
import { imageIcons } from "@/data/dataStorage";
import Link from "next/link";

const Page = () => {
  const [activeComponent, setActiveComponent] = useState("student")

  const renderComponnets = ()=>{
    switch(activeComponent){
      case "student":
        return <StudentsTable />
      case "democlass":
        return <TableDemoClass />
      case "normalclass":
        return <TableNormalClass/>
      case "attendance":
        return <TableAttendance />
      case "batch":
        return <TableBatchEntries />
      case "course":
        return <TableCourseEntries />
      default:
        return <StudentsTable />
    }
  }

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
          <Link href={"#"} key={items.id} onClick={()=>setActiveComponent(items.id)}>
            <Image
              src={items.img}
              height={150}
              width={180}
              alt={items.alt}
              className={`rounded-xl shadow-sm hover:shadow-2xl transition-all duration-100 delay-75 
              ${activeComponent === items.id ? "filter grayscale blur-sm transition-all duration-150 delay-75 hover:shadow-none" : ""}`}
            />
          </Link>
        ))}
      </div>
      <div className="w-[1300px] px-20 mt-10 ">
        {renderComponnets()}
      </div>

    </SidebarInset>
  );
};

export default Page;
