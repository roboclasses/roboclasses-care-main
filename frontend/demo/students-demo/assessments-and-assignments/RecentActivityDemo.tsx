import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Upload, CheckCircle } from "lucide-react";

const RecentActivityDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Assignment graded</p>
              <p className="text-gray-600 text-xs">OOP Assignment 1 - 88/100</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Upload className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium">Assignment submitted</p>
              <p className="text-gray-600 text-xs">DB Lab Report 3</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Bell className="w-4 h-4 text-orange-500 mt-0.5" />
            <div>
              <p className="font-medium">New assignment posted</p>
              <p className="text-gray-600 text-xs">Web Dev Final Project</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityDemo;
