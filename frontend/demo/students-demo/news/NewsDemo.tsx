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
  Settings,
  Eye,
  Pin,
  Archive,
  Star,
  Clock,
  Calendar,
  User,
  School,
  Megaphone,
  Mail,
  Smartphone,
  Globe,
  CheckCircle,
  AlertTriangle,
  Info,
  MessageSquare,
  TrendingUp,
  Users,
  FileText,
  ExternalLink,
} from "lucide-react"

export default function NewsDemo() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    inApp: true,
    urgent: true,
    courseUpdates: true,
    schoolNews: false,
    events: true,
  })

  const announcements = [
    {
      id: 1,
      title: "Emergency: Campus Closure Due to Weather",
      content:
        "Due to severe weather conditions, the campus will be closed today. All classes will be conducted online. Please check your course portals for virtual meeting links.",
      type: "school",
      priority: "urgent",
      author: "Emergency Management Office",
      date: "2024-03-15",
      time: "06:00 AM",
      course: null,
      isRead: false,
      isPinned: true,
      category: "Emergency",
      tags: ["urgent", "weather", "closure", "online"],
      reactions: { likes: 45, comments: 12 },
      attachments: ["weather-update.pdf"],
    },
    {
      id: 2,
      title: "Final Exam Schedule Released - Spring 2024",
      content:
        "The final examination schedule for Spring 2024 semester is now available. Please review your exam dates and locations carefully. Contact your instructors for any conflicts.",
      type: "school",
      priority: "high",
      author: "Academic Affairs Office",
      date: "2024-03-14",
      time: "10:30 AM",
      course: null,
      isRead: false,
      isPinned: true,
      category: "Academic",
      tags: ["finals", "schedule", "important"],
      reactions: { likes: 128, comments: 34 },
      attachments: ["final-exam-schedule.pdf"],
    },
    {
      id: 3,
      title: "Database Systems - Project Deadline Extended",
      content:
        "Due to server maintenance issues last week, the final project deadline for Database Systems has been extended to March 25th. Updated rubric and submission guidelines are available.",
      type: "course",
      priority: "high",
      author: "Prof. Michael Chen",
      date: "2024-03-13",
      time: "02:15 PM",
      course: "CS 301 - Database Systems",
      isRead: true,
      isPinned: false,
      category: "Assignment",
      tags: ["extension", "project", "deadline"],
      reactions: { likes: 67, comments: 8 },
      attachments: ["updated-rubric.pdf"],
    },
    {
      id: 4,
      title: "New Student Success Center Opening",
      content:
        "We're excited to announce the opening of our new Student Success Center in Building A, Room 150. Services include tutoring, academic coaching, and career counseling.",
      type: "school",
      priority: "medium",
      author: "Student Services",
      date: "2024-03-12",
      time: "11:45 AM",
      course: null,
      isRead: true,
      isPinned: false,
      category: "Services",
      tags: ["new", "tutoring", "support"],
      reactions: { likes: 89, comments: 15 },
      attachments: [],
    },
    {
      id: 5,
      title: "Object Oriented Programming - Guest Speaker Event",
      content:
        "Join us for an exclusive talk by Sarah Johnson, Senior Software Engineer at Google, on 'Modern Design Patterns in Large-Scale Applications' this Friday at 2:00 PM.",
      type: "course",
      priority: "medium",
      author: "Dr. Emily Rodriguez",
      date: "2024-03-11",
      time: "04:20 PM",
      course: "CS 201 - Object Oriented Programming",
      isRead: false,
      isPinned: true,
      category: "Event",
      tags: ["guest speaker", "industry", "design patterns"],
      reactions: { likes: 156, comments: 23 },
      attachments: ["speaker-bio.pdf"],
    },
    {
      id: 6,
      title: "Library Extended Hours During Finals Week",
      content:
        "The library will be open 24/7 during finals week (March 18-22). Additional study spaces and computer labs will also be available. Quiet zones will be strictly enforced.",
      type: "school",
      priority: "medium",
      author: "Library Services",
      date: "2024-03-10",
      time: "09:30 AM",
      course: null,
      isRead: true,
      isPinned: false,
      category: "Services",
      tags: ["library", "finals", "extended hours"],
      reactions: { likes: 203, comments: 41 },
      attachments: [],
    },
  ]

  const trendingTopics = [
    { name: "Final Exams", mentions: 45, trend: "up" },
    { name: "Weather Closure", mentions: 38, trend: "up" },
    { name: "Project Extensions", mentions: 22, trend: "stable" },
    { name: "Guest Speakers", mentions: 18, trend: "up" },
    { name: "Library Hours", mentions: 15, trend: "down" },
  ]

  const recentActivity = [
    { action: "New announcement", item: "Campus Closure", time: "2 min ago" },
    { action: "Updated", item: "Exam Schedule", time: "1 hour ago" },
    { action: "Comment added", item: "Project Extension", time: "3 hours ago" },
    { action: "New announcement", item: "Success Center", time: "1 day ago" },
  ]

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
        <div className="bg-custom-gradient backdrop-blur-sm rounded-xl shadow-lg mb-4 sm:mb-6 p-4 sm:p-6 border border-purple-100">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Announcements & News
                </h1>
                <p className="text-sm sm:text-base text-purple-100">
                  Stay informed with the latest school-wide announcements and course updates
                </p>
              </div>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/50 border-purple-200 hover:bg-purple-50 text-xs sm:text-sm"
                >
                  <Settings className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Preferences</span>
                  <span className="xs:hidden">Settings</span>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs sm:text-sm"
                >
                  <CheckCircle className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Mark All Read</span>
                  <span className="xs:hidden">Mark Read</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-lg text-center">
                <div className="text-lg sm:text-xl font-bold">2</div>
                <div className="text-xs sm:text-sm opacity-90">Urgent</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-lg text-center">
                <div className="text-lg sm:text-xl font-bold">3</div>
                <div className="text-xs sm:text-sm opacity-90">Unread</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg text-center">
                <div className="text-lg sm:text-xl font-bold">4</div>
                <div className="text-xs sm:text-sm opacity-90">Course Updates</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg text-center">
                <div className="text-lg sm:text-xl font-bold">6</div>
                <div className="text-xs sm:text-sm opacity-90">Total Today</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-purple-100">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 sm:gap-2">
                {[
                  { id: "all", label: "All Announcements", icon: Megaphone, shortLabel: "All" },
                  { id: "urgent", label: "Urgent", icon: AlertTriangle, shortLabel: "Urgent" },
                  { id: "unread", label: "Unread", icon: BellRing, shortLabel: "Unread" },
                  { id: "course", label: "Course Updates", icon: BookOpen, shortLabel: "Courses" },
                  { id: "school", label: "School News", icon: School, shortLabel: "School" },
                ].map((tab) => (
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
                      } ${announcement.priority === "urgent" ? "border-l-4 border-l-red-500" : ""}`}
                    >
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
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { key: "email", label: "Email", icon: Mail },
                    { key: "push", label: "Push", icon: Bell },
                    { key: "sms", label: "SMS", icon: Smartphone },
                    { key: "inApp", label: "In-App", icon: Globe },
                    { key: "urgent", label: "Urgent Only", icon: AlertTriangle },
                    { key: "courseUpdates", label: "Course Updates", icon: BookOpen },
                    { key: "schoolNews", label: "School News", icon: School },
                    { key: "events", label: "Events", icon: Calendar },
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
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
                        className={`w-12 h-6 p-0 ${notificationSettings[setting.key as keyof typeof notificationSettings] ? "bg-purple-600 border-purple-600" : "bg-gray-200 border-gray-300"}`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${notificationSettings[setting.key as keyof typeof notificationSettings] ? "translate-x-3" : "translate-x-0"}`}
                        />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-purple-50/50 rounded">
                      <div className="flex items-center gap-2">
                        <TrendingUp
                          className={`h-4 w-4 ${topic.trend === "up" ? "text-green-600" : topic.trend === "down" ? "text-red-600" : "text-gray-600"}`}
                        />
                        <span className="text-sm text-gray-700">{topic.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {topic.mentions}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 hover:bg-purple-50/50 rounded">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">{activity.action}</span> {activity.item}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark All Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Old
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Settings
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Manage Subscriptions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
