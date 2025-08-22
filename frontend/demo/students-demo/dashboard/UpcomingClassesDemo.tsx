import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, FileText } from "lucide-react";

const UpcomingClassesDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Classes & Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Database Systems Lab</h4>
              <p className="text-sm text-gray-600">Today, 2:00 PM - Room 301</p>
            </div>
            <Badge variant="destructive">Due Today</Badge>
          </div>

          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">OOP Assignment #3</h4>
              <p className="text-sm text-gray-600">Due: December 18, 2024</p>
            </div>
            <Badge variant="secondary">3 days left</Badge>
          </div>

          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Data Structures Lecture</h4>
              <p className="text-sm text-gray-600">
                Tomorrow, 10:00 AM - Room 205
              </p>
            </div>
            <Badge variant="outline">Tomorrow</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingClassesDemo;
