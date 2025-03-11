import { PRIVATE_WALLPAPER } from "@/constants/images";
import { DatePickerForm } from "@/demo/demo-class/datePickerForm";

import Image from "next/image";
import React from "react";

const page = () => {
  return (
      <div className="grid grid-cols-2">
        <Image
          width={1200}
          height={1200}
          src={PRIVATE_WALLPAPER}
          alt="wallpaper"
          className="min-h-screen object-cover"
        />
        <div className="w-[600px] flex flex-col gap-5 p-20">
          <p className="text-4xl font-bold">Book Appointment for a Demo Class</p>
          <DatePickerForm />
        </div>
      </div>
  );
};

export default page;
