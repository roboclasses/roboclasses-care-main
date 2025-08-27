"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Video, FolderOpen } from "lucide-react";
import Header from "./Header";
import ConvoListDemo from "./ConvoListDemo";
import ChatInterface from "./ChatInterface";
import ForumsTab from "./ForumsTab";
import ProjectsTab from "./ProjectsTab";
import MeetingsTab from "./MeetingsTab";
import OnlineFaculty from "./OnlineFaculty";
import RecentActivityDemo from "../assessments-and-assignments/RecentActivityDemo";
import QuickActionDemo from "../assessments-and-assignments/QuickActionDemo";

const TabsData = [
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "forums", label: "Forums", icon: Users },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "meetings", label: "Meetings", icon: Video },
];

export default function FacultiesDemo() {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedConversation, setSelectedConversation] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6 p-1">
              <div className="flex flex-wrap gap-1">
                {TabsData.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 sm:flex-none ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                        : ""
                    }`}
                  >
                    <tab.icon className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">{tab.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Conversations List */}
                <ConvoListDemo
                  setSelectedConversation={setSelectedConversation}
                  selectedConversation={selectedConversation}
                />

                {/* Chat Interface */}
                <ChatInterface selectedConversation={selectedConversation} />
              </div>
            )}

            {/* Forums Tab */}
            {activeTab === "forums" && <ForumsTab />}

            {/* Projects Tab */}
            {activeTab === "projects" && <ProjectsTab />}

            {/* Meetings Tab */}
            {activeTab === "meetings" && <MeetingsTab />}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Online Faculty */}
            <OnlineFaculty />

            {/* Recent Activity */}
            <RecentActivityDemo />

            {/* Quick Actions */}
            <QuickActionDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
