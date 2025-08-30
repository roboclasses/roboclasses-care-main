"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Smartphone, Mail } from "lucide-react";
import { useState } from "react";

const NotificationsTabDemo = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    assignmentReminders: true,
    gradeUpdates: true,
    courseAnnouncements: true,
    discussionReplies: false,
    systemUpdates: true,
    weeklyDigest: true,
    eventReminders: true,
  });

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">
          Notification Preferences
        </CardTitle>
        <p className="text-sm text-gray-600">
          Choose how you want to receive notifications
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Communication Methods */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Communication Methods
          </h3>
          <div className="space-y-4">
            {[
              {
                key: "emailNotifications",
                icon: Mail,
                label: "Email Notifications",
                desc: "Receive notifications via email",
              },
              {
                key: "pushNotifications",
                icon: Bell,
                label: "Push Notifications",
                desc: "Browser and mobile push notifications",
              },
              {
                key: "smsNotifications",
                icon: Smartphone,
                label: "SMS Notifications",
                desc: "Text message notifications for urgent items",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 border border-purple-100 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  <div>
                    <Label className="font-medium text-gray-800">
                      {item.label}
                    </Label>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={
                    notifications[item.key as keyof typeof notifications]
                  }
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, [item.key]: checked })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Notifications */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Content Notifications
          </h3>
          <div className="space-y-4">
            {[
              {
                key: "assignmentReminders",
                label: "Assignment Reminders",
                desc: "Deadlines and due dates",
              },
              {
                key: "gradeUpdates",
                label: "Grade Updates",
                desc: "When grades are posted or updated",
              },
              {
                key: "courseAnnouncements",
                label: "Course Announcements",
                desc: "Important course updates and news",
              },
              {
                key: "discussionReplies",
                label: "Discussion Replies",
                desc: "Replies to your forum posts",
              },
              {
                key: "systemUpdates",
                label: "System Updates",
                desc: "Platform maintenance and feature updates",
              },
              {
                key: "weeklyDigest",
                label: "Weekly Digest",
                desc: "Summary of weekly activities",
              },
              {
                key: "eventReminders",
                label: "Event Reminders",
                desc: "Upcoming events and deadlines",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 border border-purple-100 rounded-lg"
              >
                <div>
                  <Label className="font-medium text-gray-800">
                    {item.label}
                  </Label>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <Switch
                  checked={
                    notifications[item.key as keyof typeof notifications]
                  }
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, [item.key]: checked })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTabDemo;
