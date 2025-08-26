import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, TrendingUp, Award } from "lucide-react";

const GradeNotificationsDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-green-500" />
              <span className="font-medium text-sm">New Grade Posted</span>
            </div>
            <p className="text-xs text-gray-600">OOP Assignment 1 - A- (88%)</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-sm">Feedback Available</span>
            </div>
            <p className="text-xs text-gray-600">
              DB Lab Report 2 - Detailed comments
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-sm">GPA Update</span>
            </div>
            <p className="text-xs text-gray-600">
              Semester GPA improved to 3.8
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeNotificationsDemo;
