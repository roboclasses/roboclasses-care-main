import { PRIVATE_WALLPAPER } from "@/constants/images";
import { MultiDatePickerForm } from "@/demo/normal-class/multiDatePickerForm";

import Image from "next/image";
import React from "react";

const page = () => {
  return (
      <div className="relative">
        <Image
          src={PRIVATE_WALLPAPER}
          alt="wallpaper"
          fill
          className="object-cover lg:min-h-screen"
          priority
        />
        <div className="relative z-10 flex items-center justify-center h-full backdrop-blur-sm">
          <div className="lg:w-full lg:max-w-[600px] w-[400px] bg-background/95 p-8 m-4 rounded-xl shadow-lg">
            <p className="lg:text-4xl text-xl font-bold mb-6 text-center">Create Normal Class</p>
            <MultiDatePickerForm />
          </div>
        </div>
      </div>
  );
};

export default page;
