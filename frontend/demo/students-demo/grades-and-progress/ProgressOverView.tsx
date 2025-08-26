import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Star } from "lucide-react";

const ProgressOverView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Progress Charts & Completion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <h4 className="font-semibold mb-4">Semester Progress</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Course Completion</span>
                <span className="font-medium">75%</span>
              </div>
              <Progress value={75} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Assignment Completion</span>
                <span className="font-medium">88%</span>
              </div>
              <Progress value={88} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Quiz Performance</span>
                <span className="font-medium">91%</span>
              </div>
              <Progress value={91} className="h-3" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3">Strengths</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-green-600" />
                <span>Database Design & SQL</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-green-600" />
                <span>Object-Oriented Concepts</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-green-600" />
                <span>Class Participation</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-3">
              Areas for Improvement
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-600" />
                <span>Algorithm Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-600" />
                <span>Time Management</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-600" />
                <span>Code Documentation</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverView;
