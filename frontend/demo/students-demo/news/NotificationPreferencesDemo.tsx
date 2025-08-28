"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bell,
  BookOpen,
  Calendar,
  School,
  Mail,
  Smartphone,
  Globe,
  AlertTriangle,
} from "lucide-react";

const NotificationData = [
  { key: "email", label: "Email", icon: Mail },
  { key: "push", label: "Push", icon: Bell },
  { key: "sms", label: "SMS", icon: Smartphone },
  { key: "inApp", label: "In-App", icon: Globe },
  { key: "urgent", label: "Urgent Only", icon: AlertTriangle },
  { key: "courseUpdates", label: "Course Updates", icon: BookOpen },
  { key: "schoolNews", label: "School News", icon: School },
  { key: "events", label: "Events", icon: Calendar },
];

const NotificationPreferencesDemo = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    inApp: true,
    urgent: true,
    courseUpdates: true,
    schoolNews: false,
    events: true,
  });
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {NotificationData.map((setting) => (
            <div
              key={setting.key}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <setting.icon className="h-4 w-4 text-gray-600" />
                <span className="text-sm">{setting.label}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    [setting.key]: !prev[setting.key as keyof typeof prev],
                  }))
                }
                className={`w-12 h-6 p-0 ${
                  notificationSettings[
                    setting.key as keyof typeof notificationSettings
                  ]
                    ? "bg-purple-600 border-purple-600"
                    : "bg-gray-200 border-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    notificationSettings[
                      setting.key as keyof typeof notificationSettings
                    ]
                      ? "translate-x-3"
                      : "translate-x-0"
                  }`}
                />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPreferencesDemo;
