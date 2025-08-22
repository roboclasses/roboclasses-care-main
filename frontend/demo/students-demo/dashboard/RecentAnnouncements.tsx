import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentAnnouncements = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Announcements</CardTitle>
        <Button variant="link" className="text-purple-600">
          See all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-sm">Semester Break Notice</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Winter break starts December 20th. Classes resume January 8th.
                </p>
                <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-sm">Library Hours Extended</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Library will be open 24/7 during finals week.
                </p>
                <p className="text-xs text-gray-400 mt-2">1 day ago</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-sm">New Course Registration</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Spring semester registration opens January 2nd.
                </p>
                <p className="text-xs text-gray-400 mt-2">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAnnouncements;
