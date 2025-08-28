"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  BookOpen,
  GraduationCap,
  AlertCircle,
  List,
  CalendarDays,
  CalendarCheck,
} from "lucide-react";
import Header from "./Header";
import TodayTab from "./TodayTab";
import WeekTab from "./WeekTab";
import MonthTab from "./MonthTab";
import AgendaTab from "./AgendaTab";
import CalendarSyncDemo from "./CalendarSyncDemo";
import UrgentDeadlinesDemo from "./UrgentDeadlinesDemo";
import QuickActionDemo from "../assessments-and-assignments/QuickActionDemo";
import CurrentWeekSummary from "./CurrentWeekSummary";
import RecentActivity from "./RecentActivity";

export default function CalendarDemo() {
  const [activeTab, setActiveTab] = useState("today");

  const TabsData = [
    { id: "today", label: "Today", icon: CalendarCheck, shortLabel: "Today" },
    { id: "week", label: "This Week", icon: CalendarDays, shortLabel: "Week" },
    { id: "month", label: "Month View", icon: Calendar, shortLabel: "Month" },
    { id: "agenda", label: "Agenda", icon: List, shortLabel: "Agenda" },
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "lecture":
        return <BookOpen className="h-4 w-4" />;
      case "exam":
        return <GraduationCap className="h-4 w-4" />;
      case "deadline":
        return <AlertCircle className="h-4 w-4" />;
      case "event":
        return <Users className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-700 border-red-200";
      case "important":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "optional":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

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
                    <span className="text-xs sm:text-sm font-medium truncate sm:hidden">
                      {tab.shortLabel}
                    </span>
                    <span className="text-xs sm:text-sm font-medium truncate hidden sm:inline">
                      {tab.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Today Tab */}
            {activeTab === "today" && (
              <TodayTab
                getEventTypeIcon={getEventTypeIcon}
                getStatusColor={getStatusColor}
              />
            )}

            {/* Week Tab */}
            {activeTab === "week" && (
              <WeekTab
                getEventTypeIcon={getEventTypeIcon}
                getStatusColor={getStatusColor}
              />
            )}

            {/* Month Tab */}
            {activeTab === "month" && <MonthTab />}

            {/* Agenda Tab */}
            {activeTab === "agenda" && (
              <AgendaTab
                getEventTypeIcon={getEventTypeIcon}
                getStatusColor={getStatusColor}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <CalendarSyncDemo />

            <UrgentDeadlinesDemo />

            <QuickActionDemo />

            <CurrentWeekSummary />

            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
