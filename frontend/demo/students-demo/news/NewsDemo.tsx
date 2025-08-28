"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Bell,
  BellRing,
  BookOpen,
  Filter,
  Eye,
  Pin,
  Archive,
  Star,
  Clock,
  Calendar,
  User,
  School,
  Megaphone,
  AlertTriangle,
  Info,
  MessageSquare,
  FileText,
  ExternalLink,
} from "lucide-react"
import { announcements } from "./NewsData"
import Header from "./Header"
import NotificationPreferencesDemo from "./NotificationPreferencesDemo"
import TrendingTopicsDemo from "./TrendingTopicsDemo"
import RecentActivityDemo from "./RecentActivityDemo"
import QuickActionDemo from "../assessments-and-assignments/QuickActionDemo"

const TabsData = [
                  { id: "all", label: "All Announcements", icon: Megaphone, shortLabel: "All" },
                  { id: "urgent", label: "Urgent", icon: AlertTriangle, shortLabel: "Urgent" },
                  { id: "unread", label: "Unread", icon: BellRing, shortLabel: "Unread" },
                  { id: "course", label: "Course Updates", icon: BookOpen, shortLabel: "Courses" },
                  { id: "school", label: "School News", icon: School, shortLabel: "School" },
                ]

export default function NewsDemo() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")


 
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertTriangle className="h-4 w-4" />
      case "high":
        return <Bell className="h-4 w-4" />
      case "medium":
        return <Info className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "school":
        return <School className="h-4 w-4" />
      case "course":
        return <BookOpen className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (activeTab === "unread" && announcement.isRead) return false
    if (activeTab === "course" && announcement.type !== "course") return false
    if (activeTab === "school" && announcement.type !== "school") return false
    if (activeTab === "urgent" && announcement.priority !== "urgent") return false
    if (
      searchQuery &&
      !announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
       <Header />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-purple-100">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 sm:gap-2">
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
                    <span className="text-xs sm:text-sm font-medium truncate sm:hidden">{tab.shortLabel}</span>
                    <span className="text-xs sm:text-sm font-medium truncate hidden sm:inline">{tab.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <CardTitle className="text-xl sm:text-2xl text-gray-800">
                    {activeTab === "all" && "All Announcements"}
                    {activeTab === "urgent" && "Urgent Announcements"}
                    {activeTab === "unread" && "Unread Announcements"}
                    {activeTab === "course" && "Course Updates"}
                    {activeTab === "school" && "School News"}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs sm:text-sm"
                    >
                      <Filter className="h-4 w-4 mr-1 sm:mr-2" />
                      Filter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs sm:text-sm"
                    >
                      <Archive className="h-4 w-4 mr-1 sm:mr-2" />
                      Archive
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search announcements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {filteredAnnouncements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className={`p-3 sm:p-4 border rounded-lg hover:bg-purple-50/50 transition-colors ${
                        announcement.isRead ? "border-purple-100 bg-white" : "border-purple-200 bg-purple-50/30"
                      } ${announcement.priority === "urgent" ? "border-l-4 border-l-red-500" : ""}`} >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                {announcement.isPinned && <Pin className="h-4 w-4 text-purple-600 flex-shrink-0" />}
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  {getTypeIcon(announcement.type)}
                                </div>
                                <h3
                                  className={`font-semibold text-sm sm:text-base text-gray-800 truncate ${
                                    !announcement.isRead ? "font-bold" : ""
                                  }`}
                                >
                                  {announcement.title}
                                </h3>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Badge
                                  className={`text-xs flex items-center gap-1 ${getPriorityColor(announcement.priority)}`}
                                >
                                  {getPriorityIcon(announcement.priority)}
                                  {announcement.priority}
                                </Badge>
                                {!announcement.isRead && <div className="w-2 h-2 bg-purple-600 rounded-full"></div>}
                              </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2">{announcement.content}</p>

                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 sm:gap-4 text-xs text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span className="truncate">{announcement.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {announcement.date} at {announcement.time}
                                </span>
                              </div>
                              {announcement.course && (
                                <div className="flex items-center gap-1 xs:col-span-2">
                                  <BookOpen className="h-3 w-3" />
                                  <span className="truncate">{announcement.course}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 mb-2">
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  <span>{announcement.reactions.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  <span>{announcement.reactions.comments}</span>
                                </div>
                                {announcement.attachments.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span>
                                      {announcement.attachments.length} attachment
                                      {announcement.attachments.length > 1 ? "s" : ""}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {announcement.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                                    {tag}
                                  </Badge>
                                ))}
                                {announcement.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                                    +{announcement.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-row xs:flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs flex-1 xs:flex-none"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs flex-1 xs:flex-none"
                            >
                              <Star className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                            {announcement.attachments.length > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs flex-1 xs:flex-none"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Files
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <NotificationPreferencesDemo />

            <TrendingTopicsDemo />

            <RecentActivityDemo />

           <QuickActionDemo />
          </div>
        </div>
      </div>
    </div>
  )
}
