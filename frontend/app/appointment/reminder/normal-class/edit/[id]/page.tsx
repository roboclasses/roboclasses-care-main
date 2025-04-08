import Image from "next/image";

import { PRIVATE_WALLPAPER } from "@/constants/images";
import { EditNormalClassForm } from "@/demo/normal-class/EditNormalClassForm";

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
        <div className="w-[380px] lg:mt-0 mt-36 bg-background/95 p-8 m-4 rounded-xl shadow-lg">
          <p className="lg:text-4xl text-xl mb-6 text-center font-serif">
            Edit Appointment for Normal Class
          </p>
          <EditNormalClassForm />
        </div>
      </div>
    </div>
  );
};

export default page;
