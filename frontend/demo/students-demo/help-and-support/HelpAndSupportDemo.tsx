"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Mail,
  Video,
  HelpCircle,
} from "lucide-react";
import Header from "./Header";
import FaqTabDemo from "./FaqTabDemo";
import SupportTicketsDemo from "./SupportTicketsDemo";
import TutorialsTabDemo from "./TutorialsTabDemo";
import ContactDemo from "./ContactDemo";
import QuickHelpDemo from "./QuickHelpDemo";
import SupportPerformanceDemo from "./SupportPerformanceDemo";
import ArticlesDemo from "./ArticlesDemo";
import ContactInfoDemo from "./ContactInfoDemo";

const TabsData = [
  { id: "faq", label: "FAQs", icon: HelpCircle, shortLabel: "FAQ" },
  {
    id: "tickets",
    label: "Support Tickets",
    icon: MessageCircle,
    shortLabel: "Tickets",
  },
  { id: "tutorials", label: "Tutorials", icon: Video, shortLabel: "Videos" },
  { id: "contact", label: "Contact", icon: Mail, shortLabel: "Contact" },
];

export default function HelpAndSupportDemo() {
  const [activeTab, setActiveTab] = useState("faq");

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

            {/* FAQ Tab */}
            {activeTab === "faq" && <FaqTabDemo />}

            {/* Support Tickets Tab */}
            {activeTab === "tickets" && <SupportTicketsDemo />}

            {/* Tutorials Tab */}
            {activeTab === "tutorials" && <TutorialsTabDemo />}

            {/* Contact Tab */}
            {activeTab === "contact" && <ContactDemo />}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <QuickHelpDemo />

            <SupportPerformanceDemo />

            <ArticlesDemo />

            <ContactInfoDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
