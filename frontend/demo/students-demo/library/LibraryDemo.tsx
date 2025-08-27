"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Video,
  FileText,
  ExternalLink,
} from "lucide-react";
import LibraryHeader from "./LibraryHeader";
import FilterBySearchDemo from "./FilterBySearchDemo";
import EBooksTab from "./EBooksTab";
import LecturesTab from "./LecturesTab";
import DatabaseTab from "./DatabaseTab";
import TemplatesTab from "./TemplatesTab";
import QuickStats from "./QuickStats";
import RecentActivityDemo from "../assessments-and-assignments/RecentActivityDemo";
import PopularCategoriesDemo from "./PopularCategoriesDemo";
import QuickActionDemo from "../assessments-and-assignments/QuickActionDemo";

const TabsData = [
  { id: "ebooks", label: "E-Books", icon: BookOpen },
  { id: "lectures", label: "Lectures", icon: Video },
  { id: "databases", label: "Databases", icon: ExternalLink },
  { id: "templates", label: "Templates", icon: FileText },
];

export default function LibraryDemo() {
  const [activeTab, setActiveTab] = useState("ebooks");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <LibraryHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6 p-1">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1">
                {TabsData.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 sm:flex-none min-h-[44px] ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                        : ""
                    }`}
                  >
                    <tab.icon className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm truncate">
                      {tab.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Search and Filter Bar */}
            <FilterBySearchDemo setViewMode={setViewMode} viewMode={viewMode}/>
           

            {/* E-Books Tab */}
            {activeTab === "ebooks" && (
              <EBooksTab viewMode={viewMode}/>
            )}

            {/* Lectures Tab */}
            {activeTab === "lectures" && (
              <LecturesTab viewMode={viewMode}/>
            )}

            {/* Databases Tab */}
            {activeTab === "databases" && (
             <DatabaseTab />
            )}

            {/* Templates Tab */}
            {activeTab === "templates" && (
              <TemplatesTab viewMode={viewMode}/>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Stats */}
            <QuickStats />

            {/* Recent Activity */}
            <RecentActivityDemo />

            {/* Popular Categories */}
            <PopularCategoriesDemo />

            {/* Quick Actions */}
            <QuickActionDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
