"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { TableDemoClass } from "@/demo/admin-dashboard/TableDemoClass";
import { TableBatchEntries } from "@/demo/admin-dashboard/TableBatchEntries";
import { TableNormalClass } from "@/demo/admin-dashboard/TableNormalClass";
import { TableCourseEntries } from "@/demo/admin-dashboard/TableCourseEntries";
import { StudentsTable } from "@/demo/student-register-demo/StudentsTable";
import { TableAttendance } from "@/demo/admin-dashboard/TableAttendance";

import { imageIcons } from "@/data/dataStorage";


const Page = () => {
  const [activeComponent, setActiveComponent] = useState("student")

// Conditionally render table components using switch-case
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
    <div className="flex flex-col justify-center items-center lg:gap-10 gap-20">
      <div className="grid lg:grid-cols-6 grid-cols-2 gap-5 lg:w-full w-[500px] px-5 py-5 bg-muted/50">
        {imageIcons.map((items) => (
          <Link href={"#"} key={items.id} onClick={()=>setActiveComponent(items.id)}>
            <Image
              src={items.img}
              height={400}
              width={450}
              alt={items.alt}
              className={`rounded-xl shadow-sm hover:shadow-2xl transition-all duration-100 delay-75  
              ${activeComponent === items.id ? "filter grayscale blur-sm transition-all duration-150 delay-75 hover:shadow-none" : ""}`}
            />
          </Link>
        ))}
      </div>
      <div className="lg:w-full w-[500px] lg:px-20 px-5">
        {renderComponnets()}
      </div>
    </div>

  );
};

export default Page;
