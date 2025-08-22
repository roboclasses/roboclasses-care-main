import { Card, CardContent } from "@/components/ui/card";
import { STUDENT_PROFILE } from "@/constants/images";
import Image from "next/image";

const WelcomeBanner = () => {
  return (
    <Card className="mb-8 bg-custom-gradient text-white border-0">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back !</h1>
            <p className="text-purple-100">
              Always stay updated in your student portal
            </p>
          </div>
          <div className="w-32 h-32">
            <Image
              src={STUDENT_PROFILE}
              height={500}
              width={500}
              alt="Student illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
