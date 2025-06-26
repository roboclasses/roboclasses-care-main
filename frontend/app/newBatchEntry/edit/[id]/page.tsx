import Image from "next/image";

import { PRIVATE_WALLPAPER } from "@/constants/images";
import { EditBatchForm } from "@/demo/new-batch-entry-demo/EditBatchForm";
import { Label } from "@/components/ui/label";

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
        <div className="mb-8 flex flex-col items-center">
          <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
            Edit Batch Form
          </h1>
          <Label className="text-gray-500 md:text-lg text-xs text-center">Edit batch entries here</Label>
          </div>
          <EditBatchForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
