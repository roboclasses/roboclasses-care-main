import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Target } from "lucide-react";

const AcademicGoalsDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-green-600" />
              <span className="font-medium text-sm">Semester GPA Goal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Target: 3.8</span>
              <span className="text-sm font-medium text-green-600">
                Current: 3.8
              </span>
            </div>
            <Progress value={100} className="h-2 mt-2" />
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-sm">Dean&apos;s List</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Need: 3.75</span>
              <span className="text-sm font-medium text-blue-600">
                On Track
              </span>
            </div>
            <Progress value={95} className="h-2 mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicGoalsDemo;
