import React from "react";
import Image from "next/image";

import { PRIVATE_WALLPAPER } from "@/constants/images";
import { NewCourseEntryForm } from "@/demo/new-course-entry-demo/NewCourseEntryForm";

const page = () => {
  return (
    <div className="relative min-h-screen">
      <Image
        src={PRIVATE_WALLPAPER}
        alt="private-wallpaper"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="z-10 flex items-center justify-center h-full backdrop-blur-sm">
        <div className="w-[380px] lg:mt-5 mt-64 bg-background/95 p-8 m-4 rounded-xl shadow-lg">
          <p className="lg:text-4xl text-xl mb-6 text-center font-serif">
            Create a Course
          </p>
          <NewCourseEntryForm />
        </div>
      </div>
    </div>
  );
};

export default page;
