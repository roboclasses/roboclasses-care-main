import Image from "next/image";

import { PRIVATE_WALLPAPER } from "@/constants/images";
import { EditStudentDetails } from "@/demo/student-register-demo/EditStudentDetails";

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
        <div className="w-[700px] flex flex-col justify-center p-20 gap-5">
          <p className="text-4xl font-bold">Edit Details for a Student</p>
          <EditStudentDetails />
        </div>

      </div>
  );
};

export default page;
