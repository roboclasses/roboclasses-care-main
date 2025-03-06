import { PRIVATE_WALLPAPER } from "@/constants/images";
import { MultiDatePickerForm } from "@/demo/normal-class/multiDatePickerForm";

import Image from "next/image";
import React from "react";

const page = () => {
  return (
      <div className="relative flex-1">
        <Image
          src={PRIVATE_WALLPAPER}
          alt="wallpaper"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex items-center justify-center h-full backdrop-blur-sm">
          <div className="w-full max-w-[600px] bg-background/95 p-8 m-4 rounded-xl shadow-lg">
            <p className="text-4xl font-bold mb-6 text-center">Create Normal Class</p>
            <MultiDatePickerForm />
          </div>
        </div>
      </div>
  );
};

export default page;
