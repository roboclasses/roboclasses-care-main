import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award } from "lucide-react";

const PerformanceOverview = () => {
  return (
    <Card className="mb-6 sm:mb-8 bg-custom-gradient text-white">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="w-full lg:flex-1">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Academic Performance Overview
            </h2>
            <p className="text-purple-100 mb-4 text-sm sm:text-base">
              Your current semester progress and achievements
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div>
                <p className="text-xs sm:text-sm text-purple-100">
                  Current GPA
                </p>
                <p className="text-xl sm:text-2xl font-bold">3.7</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-purple-100">
                  Credits Completed
                </p>
                <p className="text-xl sm:text-2xl font-bold">45/60</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-purple-100">
                  Courses Passed
                </p>
                <p className="text-xl sm:text-2xl font-bold">15/18</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-purple-100">Class Rank</p>
                <p className="text-xl sm:text-2xl font-bold">12/150</p>
              </div>
            </div>
          </div>
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto lg:mx-0">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/30 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={75} className="h-2 bg-white/20" />
          <p className="text-xs sm:text-sm text-purple-100 mt-2">
            75% progress towards degree completion
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
