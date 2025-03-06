import { PRIVATE_WALLPAPER } from "@/constants/images";
import { NewCourseEntryForm } from "@/demo/new-course-entry-demo/NewCourseEntryForm";

import Image from "next/image";
import React from "react";

const page = () => {
  return (
      <div className="grid grid-cols-2">
        <Image
          width={1200}
          height={1200}
          src={PRIVATE_WALLPAPER}
          alt="private-wallpaper"
          className="min-h-screen object-cover"
        />
        <div className="w-[600px] flex flex-col justify-center gap-5 p-20">
          <p className="text-4xl font-bold">Create a Course</p>
          <NewCourseEntryForm />
        </div>
      </div>
  );
};

export default page;
