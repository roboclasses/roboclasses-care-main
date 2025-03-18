import { PRIVATE_WALLPAPER } from "@/constants/images";
import { EditCourseEntryForm } from "@/demo/new-course-entry-demo/EditCourseEntryForm";

import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="relative">
      <Image
        src={PRIVATE_WALLPAPER}
        alt="wallpaper"
        className="min-h-screen object-cover"
        fill
        priority
      />
      <div className="relative z-10 flex items-center justify-center h-full backdrop-blur-sm">
        <div className="lg:w-full lg:max-w-[600px] w-[400px] lg:mt-5 mt-64 bg-background/95 p-8 m-4 rounded-xl shadow-lg">
          <p className="lg:text-4xl text-xl font-bold mb-6 text-center">
            Edit Course
          </p>
          <EditCourseEntryForm />
        </div>
      </div>
    </div>
  );
};

export default page;
