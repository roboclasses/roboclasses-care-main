import { PRIVATE_WALLPAPER } from "@/constants/images";
import { DatePickerForm } from "@/demo/demo-class/datePickerForm";

import Image from "next/image";
import React from "react";

const page = () => {
  return (
      <div className="relative">
        <Image
          src={PRIVATE_WALLPAPER}
          alt="wallpaper"
          className="object-cover min-h-screen"
          fill
          priority
        />
         <div className="relative z-10 flex items-center justify-center h-full backdrop-blur-sm">
             <div className="lg:w-full lg:max-w-[600px] w-[400px] bg-background/95 p-8 m-4 rounded-xl shadow-lg">
                 <p className="lg:text-4xl text-xl font-bold mb-6 text-center">Book Appointment for Demo Class</p>
                 <DatePickerForm />
              </div>
        </div>
      </div>
  );
};

export default page;
