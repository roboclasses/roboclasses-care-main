import Image from "next/image";

import { PRIVATE_WALLPAPER } from "@/constants/images";
import { EditNormalClassForm } from "@/demo/normal-class/EditNormalClassForm";

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
        <div className="w-[600px] flex flex-col p-20 gap-5">
          <p className="text-4xl font-bold">Edit Appointment for Normal Class</p>
          <EditNormalClassForm />
        </div>
      </div>
  );
};

export default page;
