import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle, Timer } from "lucide-react";

const UpcomingDeadlinesDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="font-medium text-sm">OOP Assignment 3</span>
            </div>
            <p className="text-xs text-gray-600">Due in 2 days - Dec 18</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <Timer className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-sm">DB Lab Report 4</span>
            </div>
            <p className="text-xs text-gray-600">Due in 5 days - Dec 21</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-sm">Web Dev Quiz 2</span>
            </div>
            <p className="text-xs text-gray-600">Available now - Due Dec 20</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlinesDemo;
