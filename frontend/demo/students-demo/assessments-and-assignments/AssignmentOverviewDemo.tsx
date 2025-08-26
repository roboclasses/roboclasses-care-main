import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText } from "lucide-react";

const AssignmentOverviewDemo = () => {
  return (
    <Card className="mb-8 bg-custom-gradient text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Assignment Overview</h2>
            <p className="text-purple-100 mb-4 lg:text-base text-sm">
              Stay on top of your assignments and deadlines
            </p>
            <div className="grid lg:grid-cols-4 grid-cols-2">
              <div>
                <p className="text-sm text-purple-100">Total Assignments</p>
                <p className="lg:text-2xl font-bold">15</p>
              </div>
              <div>
                <p className="text-sm text-purple-100">Completed</p>
                <p className="lg:text-2xl font-bold">12</p>
              </div>
              <div>
                <p className="text-sm text-purple-100">Pending</p>
                <p className="lg:text-2xl font-bold">3</p>
              </div>
              <div>
                <p className="text-sm text-purple-100">Average Grade</p>
                <p className="lg:text-2xl font-bold">91%</p>
              </div>
            </div>
          </div>
          <div className="w-32 h-32 bg-white/20 rounded-full lg:flex hidden items-center justify-center">
            <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center">
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={80} className="h-2 bg-white/20" />
          <p className="text-sm text-purple-100 mt-2">80% completion rate</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentOverviewDemo;
