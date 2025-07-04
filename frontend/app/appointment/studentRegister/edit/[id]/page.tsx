import Image from "next/image";
import { PRIVATE_WALLPAPER } from "@/constants/images";
import { EditStudentDetails } from "@/demo/student-register-demo/EditStudentDetails";

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
          <EditStudentDetails />
        </div>
      </div>
    </div>
  );
};

export default page;
