"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Lock, Bell, Globe } from "lucide-react";
import Header from "./Header";
import ProfileSectionDemo from "./ProfileSectionDemo";
import SecurityTabDemo from "./SecurityTabDemo";
import NotificationsTabDemo from "./NotificationsTabDemo";
import LanguageAndRegionDemo from "./LanguageAndRegionDemo";
import AccountStatusDemo from "./AccountStatusDemo";
import QuickActionDemo from "../assessments-and-assignments/QuickActionDemo";
import SupportDemo from "./SupportDemo";
import SessionDemo from "./SessionDemo";

const TabsData = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "preferences", label: "Preferences", icon: Globe },
];

export default function SettingsDemo() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-purple-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                {TabsData.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-h-[48px] flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "hover:bg-purple-50 text-gray-700"
                    }`}
                  >
                    <tab.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium truncate">
                      {tab.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && <ProfileSectionDemo />}

            {/* Security Tab */}
            {activeTab === "security" && <SecurityTabDemo />}

            {/* Notifications Tab */}
            {activeTab === "notifications" && <NotificationsTabDemo />}

            {/* Preferences Tab */}
            {activeTab === "preferences" && <LanguageAndRegionDemo />}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Account Status */}
            <AccountStatusDemo />

            {/* Quick Actions */}
            <QuickActionDemo />

            {/* Support */}
            <SupportDemo />

            {/* Session Info */}
            <SessionDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
