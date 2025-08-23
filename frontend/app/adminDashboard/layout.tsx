'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";


interface ILayoutType {
  children: ReactNode;
}

// For mapping image-icons
const imageIcons = [
  { slug: "student", img: "/assets/images/student.png", alt: "students-pic" },
  { slug: "democlass", img: "/assets/images/democlasses.png", alt: "demo-classes-pic" },
  { slug: "normalclass", img: "/assets/images/normalclasses.png", alt: "normal-classes-pic" },
  { slug: "attendance", img: "/assets/images/attendance.png", alt: "attendances-pic" },
  { slug: "batch", img: "/assets/images/batch.png", alt: "batches-pic" },
  { slug: "course", img: "/assets/images/course.png", alt: "courses-pic" },
];

export default function AdminDashboardLayout({ children }: ILayoutType) {
    const path = usePathname();
  return (
    <div className="flex flex-col justify-center items-center lg:gap-10 gap-20">
     <div className="grid lg:grid-cols-6 grid-cols-2 gap-5 lg:w-[1600px] w-[400px] px-5 py-5 bg-muted/50">
        {imageIcons.map((item) => (
          <Link href={`/adminDashboard/${item.slug}`} key={item.slug} prefetch>
            <Image
              src={item.img}
              height={400}
              width={450}
              alt={item.alt}
              loading="lazy"
              className={cn("rounded-xl shadow-sm hover:shadow-2xl transition-all duration-100 delay-75" , 
              (path.includes(item.slug)) ? "filter grayscale blur-sm transition-all duration-150 delay-75 hover:shadow-none" : "")}
            />
          </Link>
        ))}
      </div>
      <div className="lg:w-full w-[400px] min-h-dvh lg:px-20 px-5">
        {children}
      </div>
    </div>
  );
}
