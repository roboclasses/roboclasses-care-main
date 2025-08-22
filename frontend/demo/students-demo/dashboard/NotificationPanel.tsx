import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, MessageSquare } from "lucide-react";

const NotificationPanel = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notifications Panel</CardTitle>
        <Badge variant="destructive">3</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
            <Bell className="w-4 h-4 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Payment Reminder</h4>
              <p className="text-xs text-gray-600 mt-1">
                Tuition payment due in 5 days
              </p>
              <Button
                variant="link"
                className="text-xs p-0 h-auto text-red-600"
              >
                View Details
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <Calendar className="w-4 h-4 text-orange-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Exam Schedule</h4>
              <p className="text-xs text-gray-600 mt-1">
                Final exams start December 22nd
              </p>
              <Button
                variant="link"
                className="text-xs p-0 h-auto text-orange-600"
              >
                View Schedule
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">New Message</h4>
              <p className="text-xs text-gray-600 mt-1">
                Message from Prof. Smith about assignment
              </p>
              <Button
                variant="link"
                className="text-xs p-0 h-auto text-blue-600"
              >
                Read Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;
