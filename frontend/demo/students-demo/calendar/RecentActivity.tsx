import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

const ActivityData = [
            {
              action: "Added",
              item: "Study Group Session",
              time: "2 hours ago",
            },
            {
              action: "Updated",
              item: "CS101 Lecture Time",
              time: "1 day ago",
            },
            {
              action: "Completed",
              item: "Math Assignment",
              time: "2 days ago",
            },
            {
              action: "Joined",
              item: "Virtual Lab Session",
              time: "3 days ago",
            },
          ]

const RecentActivity = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {ActivityData.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 hover:bg-purple-50/50 rounded"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded flex items-center justify-center flex-shrink-0">
                <Zap className="h-3 w-3 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-gray-700 block truncate">
                  {activity.action} {activity.item}
                </span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
