import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, MessageSquare, Calendar, Upload } from "lucide-react";

const QuickActionDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <Upload className="w-4 h-4 mr-2" />
            Submit Assignment
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Instructor
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Download Resources
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionDemo;
