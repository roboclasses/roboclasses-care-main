import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, BookOpen, Users } from "lucide-react";

const CourseNotificationDemo = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Course Notifications</CardTitle>
        <Badge variant="destructive">3</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
            <Bell className="w-4 h-4 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Assignment Due Soon</h4>
              <p className="text-xs text-gray-600 mt-1">
                OOP Assignment #3 due in 2 days
              </p>
              <Button
                variant="link"
                className="text-xs p-0 h-auto text-red-600"
              >
                View Assignment
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <BookOpen className="w-4 h-4 text-orange-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">New Course Available</h4>
              <p className="text-xs text-gray-600 mt-1">
                AI Ethics course now open for enrollment
              </p>
              <Button
                variant="link"
                className="text-xs p-0 h-auto text-orange-600"
              >
                View Course
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Users className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Study Group Invitation</h4>
              <p className="text-xs text-gray-600 mt-1">
                Join Database Systems study group
              </p>
              <Button
                variant="link"
                className="text-xs p-0 h-auto text-blue-600"
              >
                Join Group
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseNotificationDemo;
