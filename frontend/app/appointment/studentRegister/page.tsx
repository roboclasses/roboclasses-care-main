import React from "react";
import Image from "next/image";
import { PRIVATE_WALLPAPER } from "@/constants/images";
import { RegistrationForm } from "@/demo/appointment-demo/RegistrationForm";

const Page = () => {
  return (
    <div className="relative min-h-screen">
      <Image
        src={PRIVATE_WALLPAPER}
        alt="wallpaper"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="z-10 flex items-center justify-center backdrop-blur-sm">
        <div className="lg:mt-5 mt-10 bg-background/95 p-8 m-4 rounded-xl shadow-lg">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
