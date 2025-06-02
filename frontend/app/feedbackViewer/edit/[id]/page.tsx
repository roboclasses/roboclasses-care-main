import React from "react";
import Image from "next/image";

import { PRIVATE_WALLPAPER } from "@/constants/images";
import { Label } from "@/components/ui/label";
import { FeedbackForm } from "@/demo/feedback-demo/FeedbackForm";

const page = () => {
  return (
    <div className="relative min-h-screen">
      <Image
        src={PRIVATE_WALLPAPER}
        alt="private-wallpaper"
        fill
        style={{objectFit:"cover"}}
        priority
      />
      <div className="z-10 flex items-center justify-center backdrop-blur-sm">
        <div className="lg:mt-5 mt-10 bg-background/95 p-8 m-4 rounded-xl shadow-lg">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
          Feedback Form
          </h1>
          <Label className="text-gray-500 md:text-lg text-xs text-center">Please check your details and fill the form, once done please submit</Label>
          </div>
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
};

export default page;
