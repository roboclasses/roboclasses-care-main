import Image from "next/image";

import { PRIVATE_WALLPAPER } from "@/constants/images";
import { EditDemoClassForm } from "@/demo/demo-class/EditDemoClassForm";
import { Label } from "@/components/ui/label";

const page = () => {
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
          <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="lg:text-4xl text-2xl mb-2 font-serif">
              Edit Demo Class Form
            </h1>
            <Label className="text-gray-500 lg:text-sm text-xs">
              Edit appointment for Demo Class
            </Label>
          </div>
          <EditDemoClassForm />
        </div>
      </div>
    </div>
  );
};

export default page;
