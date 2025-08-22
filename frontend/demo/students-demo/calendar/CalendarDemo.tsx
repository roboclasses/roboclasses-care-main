"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  GraduationCap,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Download,
  Share,
  Bell,
  Video,
  ExternalLink,
  FolderSyncIcon as Sync,
  Settings,
  Eye,
  List,
  CalendarDays,
  CalendarCheck,
  Zap,
} from "lucide-react"

export default function CalendarDemo() {
  const [activeTab, setActiveTab] = useState("today")
//   const [viewMode, setViewMode] = useState("month")
  const [searchQuery, setSearchQuery] = useState("")
//   const [currentDate, setCurrentDate] = useState(new Date())

  const todayEvents = [
    {
      id: 1,
      title: "Object Oriented Programming",
      type: "lecture",
      time: "09:00 AM - 10:30 AM",
      location: "Room 204, CS Building",
      instructor: "Dr. Sarah Johnson",
      status: "upcoming",
      color: "blue",
      description: "Introduction to Classes and Objects",
    },
    {
      id: 2,
      title: "Database Systems Assignment",
      type: "deadline",
      time: "11:59 PM",
      location: "Online Submission",
      instructor: "Prof. Michael Chen",
      status: "urgent",
      color: "red",
      description: "ER Diagram Design Project",
    },
    {
      id: 3,
      title: "Mathematics Study Group",
      type: "event",
      time: "02:00 PM - 04:00 PM",
      location: "Library Study Room 3",
      instructor: "Student Led",
      status: "optional",
      color: "green",
      description: "Calculus II Review Session",
    },
    {
      id: 4,
      title: "Web Development Lab",
      type: "lecture",
      time: "03:30 PM - 05:00 PM",
      location: "Computer Lab A",
      instructor: "Dr. Emily Rodriguez",
      status: "upcoming",
      color: "purple",
      description: "React Components Workshop",
    },
  ]

  const upcomingEvents = [
    {
      date: "Tomorrow",
      events: [
        {
          id: 5,
          title: "Data Structures Midterm",
          type: "exam",
          time: "10:00 AM - 12:00 PM",
          location: "Main Auditorium",
          instructor: "Prof. David Kim",
          status: "important",
          color: "orange",
        },
        {
          id: 6,
          title: "Software Engineering Project",
          type: "deadline",
          time: "11:59 PM",
          location: "Online Submission",
          instructor: "Dr. Lisa Wang",
          status: "urgent",
          color: "red",
        },
      ],
    },
    {
      date: "This Week",
      events: [
        {
          id: 7,
          title: "Computer Networks",
          type: "lecture",
          time: "Wed 2:00 PM",
          location: "Room 301",
          instructor: "Prof. James Wilson",
          status: "upcoming",
          color: "blue",
        },
        {
          id: 8,
          title: "AI Research Presentation",
          type: "event",
          time: "Fri 4:00 PM",
          location: "Conference Room",
          instructor: "Dr. Anna Martinez",
          status: "optional",
          color: "green",
        },
      ],
    },
  ]

  const calendarEvents = [
    { date: 15, events: 2, type: "lecture" },
    { date: 16, events: 1, type: "exam" },
    { date: 17, events: 3, type: "mixed" },
    { date: 18, events: 1, type: "deadline" },
    { date: 19, events: 2, type: "lecture" },
    { date: 22, events: 1, type: "event" },
    { date: 23, events: 2, type: "mixed" },
    { date: 24, events: 1, type: "exam" },
    { date: 25, events: 3, type: "lecture" },
  ]

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "lecture":
        return <BookOpen className="h-4 w-4" />
      case "exam":
        return <GraduationCap className="h-4 w-4" />
      case "deadline":
        return <AlertCircle className="h-4 w-4" />
      case "event":
        return <Users className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-700 border-red-200"
      case "important":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "optional":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-custom-gradient backdrop-blur-sm rounded-xl shadow-lg mb-4 sm:mb-6 p-4 sm:p-6 border border-purple-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Calendar & Schedule
              </h1>
              <p className="text-sm sm:text-base text-purple-100">
                Keep track of classes, deadlines, exams, and important events
              </p>
            </div>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/50 border-purple-200 hover:bg-purple-50 text-xs sm:text-sm"
              >
                <Sync className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Sync Calendar</span>
                <span className="xs:hidden">Sync</span>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs sm:text-sm"
              >
                <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Add Event</span>
                <span className="xs:hidden">Add</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 border border-purple-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                {[
                  { id: "today", label: "Today", icon: CalendarCheck, shortLabel: "Today" },
                  { id: "week", label: "This Week", icon: CalendarDays, shortLabel: "Week" },
                  { id: "month", label: "Month View", icon: Calendar, shortLabel: "Month" },
                  { id: "agenda", label: "Agenda", icon: List, shortLabel: "Agenda" },
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

            {/* Today Tab */}
            {activeTab === "today" && (
              <div className="space-y-4 sm:space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <CardTitle className="text-xl sm:text-2xl text-gray-800">Today&apos;s Schedule</CardTitle>
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
                          <Eye className="h-4 w-4 mr-1 sm:mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      {todayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-3 sm:p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors"
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-8 h-8 bg-${event.color}-100 rounded-lg flex items-center justify-center`}
                                    >
                                      {getEventTypeIcon(event.type)}
                                    </div>
                                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                                      {event.title}
                                    </h3>
                                  </div>
                                  <Badge className={`text-xs ${getStatusColor(event.status)}`}>{event.status}</Badge>
                                </div>
                                <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{event.time}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span className="truncate">{event.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1 xs:col-span-2">
                                    <Users className="h-3 w-3" />
                                    <span>{event.instructor}</span>
                                  </div>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600">{event.description}</p>
                              </div>
                              <div className="flex flex-row xs:flex-col gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs flex-1 xs:flex-none"
                                >
                                  <Video className="h-3 w-3 mr-1" />
                                  Join
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs flex-1 xs:flex-none"
                                >
                                  <Bell className="h-3 w-3 mr-1" />
                                  Remind
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Week Tab */}
            {activeTab === "week" && (
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-xl text-gray-800">This Week&apos;s Events</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50 bg-transparent"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium text-gray-700 px-3">March 15-21, 2024</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50 bg-transparent"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 sm:space-y-6">
                    {upcomingEvents.map((day, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-3">{day.date}</h3>
                        <div className="space-y-2 sm:space-y-3">
                          {day.events.map((event) => (
                            <div
                              key={event.id}
                              className="p-3 sm:p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <div
                                    className={`w-8 h-8 bg-${event.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}
                                  >
                                    {getEventTypeIcon(event.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                                      {event.title}
                                    </h4>
                                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs sm:text-sm text-gray-600">
                                      <span>{event.time}</span>
                                      <span className="truncate">{event.location}</span>
                                      <span>{event.instructor}</span>
                                    </div>
                                  </div>
                                </div>
                                <Badge className={`text-xs ${getStatusColor(event.status)} flex-shrink-0`}>
                                  {event.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Month Tab */}
            {activeTab === "month" && (
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-xl text-gray-800">March 2024</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50 bg-transparent"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50 bg-transparent"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 ml-2">
                        Today
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="p-2 text-center text-xs sm:text-sm font-semibold text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {Array.from({ length: 35 }, (_, i) => {
                      const date = i - 6 + 1
                      const hasEvents = calendarEvents.find((e) => e.date === date)
                      const isToday = date === 15
                      const isCurrentMonth = date > 0 && date <= 31

                      return (
                        <div
                          key={i}
                          className={`aspect-square p-1 sm:p-2 border border-purple-100 rounded-lg text-center cursor-pointer transition-colors ${
                            isCurrentMonth
                              ? isToday
                                ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
                                : hasEvents
                                  ? "bg-purple-50 hover:bg-purple-100"
                                  : "hover:bg-purple-50"
                              : "text-gray-300"
                          }`}
                        >
                          <div className="text-xs sm:text-sm font-medium">{isCurrentMonth ? date : ""}</div>
                          {hasEvents && isCurrentMonth && (
                            <div className="flex justify-center mt-1">
                              <div
                                className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${
                                  hasEvents.type === "exam"
                                    ? "bg-orange-500"
                                    : hasEvents.type === "deadline"
                                      ? "bg-red-500"
                                      : hasEvents.type === "lecture"
                                        ? "bg-blue-500"
                                        : "bg-green-500"
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Agenda Tab */}
            {activeTab === "agenda" && (
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Upcoming Events Agenda</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search agenda..."
                        className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50 bg-transparent"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50 bg-transparent"
                      >
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...todayEvents, ...upcomingEvents.flatMap((day) => day.events)].map((event) => (
                      <div
                        key={event.id}
                        className="flex flex-col sm:flex-row gap-3 p-3 sm:p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div
                            className={`w-10 h-10 bg-${event.color || "purple"}-100 rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            {getEventTypeIcon(event.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm sm:text-base text-gray-800 truncate">{event.title}</h4>
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs sm:text-sm text-gray-600">
                              <span>{event.time}</span>
                              <span className="truncate">{event.location}</span>
                              <span>{event.instructor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getStatusColor(event.status)}`}>{event.status}</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs"
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Calendar Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-3" />
                    Google Calendar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-3" />
                    Outlook Calendar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Download className="h-4 w-4 mr-3" />
                    Export .ics
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Sync Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Urgent Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 text-sm mb-1">Database Assignment</h4>
                    <p className="text-xs text-red-700">Due today at 11:59 PM</p>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-orange-800 text-sm mb-1">Midterm Exam</h4>
                    <p className="text-xs text-orange-700">Tomorrow at 10:00 AM</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 text-sm mb-1">Project Proposal</h4>
                    <p className="text-xs text-yellow-700">Due in 3 days</p>
                  </div>
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
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Join Online Class
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Set Reminder
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">This Week Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-gray-600">Total Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-gray-600">Lectures</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <div className="text-sm text-gray-600">Deadlines</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">1</div>
                    <div className="text-sm text-gray-600">Exams</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Added", item: "Study Group Session", time: "2 hours ago" },
                    { action: "Updated", item: "CS101 Lecture Time", time: "1 day ago" },
                    { action: "Completed", item: "Math Assignment", time: "2 days ago" },
                    { action: "Joined", item: "Virtual Lab Session", time: "3 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-purple-50/50 rounded">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded flex items-center justify-center flex-shrink-0">
                        <Zap className="h-3 w-3 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-gray-700 block truncate">
                          {activity.action} {activity.item}
                        </span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
