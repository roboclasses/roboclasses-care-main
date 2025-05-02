import React from "react";
import Image from "next/image";

import { PRIVATE_WALLPAPER } from "@/constants/images";
import { Label } from "@/components/ui/label";
import { AssessmentGeneratorForm } from "@/demo/assesment-generator-demo/AssessmentGeneratorForm";

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
      <div className="md:px-0 px-5 md:max-w-7xl max-w-2xl z-10 flex items-center justify-center backdrop-blur-sm">
        <div className="md:mt-5 mt-10 mb-2 bg-background/95 p-8 rounded-xl">
        <div className="mb-8">
          <h1 className="md:text-4xl text-2xl mb-4 text-center font-serif">
            Kid-Friendly Assessment Generator
          </h1>
          <Label className="text-gray-500 md:text-lg text-xs text-balance">
            Create customized educational assessments for children in seconds using AI
          </Label>
        </div>
        <AssessmentGeneratorForm />
        </div>
      </div>
    </div>
  );
};

export default page;
