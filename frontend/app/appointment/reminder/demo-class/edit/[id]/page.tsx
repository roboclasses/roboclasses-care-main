import Image from "next/image";

import { PRIVATE_WALLPAPER } from "@/constants/images";
import { EditDemoClassForm } from "@/demo/demo-class/EditDemoClassForm";

const page = () => {
  return (
    <div className="relative min-h-screen">
      <Image
        src={PRIVATE_WALLPAPER}
        alt="wallpaper"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="z-10 flex items-center justify-center min-h-screen backdrop-blur-sm">
        <div className="w-[380px] bg-background/95 p-8 m-4 rounded-xl shadow-lg">
          <p className="lg:text-4xl text-xl font-bold mb-6 text-center">
            Edit Appointment for Demo Class
          </p>
          <EditDemoClassForm />
        </div>
      </div>
    </div>
  );
};

export default page;
