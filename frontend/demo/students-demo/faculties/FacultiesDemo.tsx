"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  MessageCircle,
  Users,
  Video,
  FolderOpen,
  Send,
  Search,
  Bell,
  Settings,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  Plus,
  Calendar,
  Clock,
  User,
  BookOpen,
  Filter,
} from "lucide-react"

export default function FacultiesDemo() {
  const [activeTab, setActiveTab] = useState("messages")
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Professor",
      lastMessage: "Assignment feedback is ready",
      time: "2 min ago",
      unread: 2,
      avatar: "/assets/images/student-profile.png?height=40&width=40",
    },
    {
      id: 2,
      name: "Study Group - CS101",
      role: "Group Chat",
      lastMessage: "Meeting tomorrow at 3 PM",
      time: "15 min ago",
      unread: 5,
      avatar: "/assets/images/student-profile.png?height=40&width=40",
    },
    {
      id: 3,
      name: "Alex Chen",
      role: "Classmate",
      lastMessage: "Can you share your notes?",
      time: "1 hour ago",
      unread: 0,
      avatar: "/assets/images/student-profile.png?height=40&width=40",
    },
    {
      id: 4,
      name: "Project Team Alpha",
      role: "Project Group",
      lastMessage: "Updated the presentation",
      time: "3 hours ago",
      unread: 1,
      avatar: "/assets/images/student-profile.png?height=40&width=40",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content: "Your latest assignment shows great improvement in understanding OOP concepts.",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you for the feedback! I found the polymorphism section challenging.",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content: "That's completely normal. Would you like to schedule office hours to discuss it further?",
      time: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "Yes, that would be very helpful. When are you available?",
      time: "10:37 AM",
      isOwn: true,
    },
  ]

  const forumTopics = [
    {
      id: 1,
      title: "Database Design Best Practices",
      author: "Prof. Martinez",
      replies: 23,
      lastActivity: "2 hours ago",
      category: "CS Database",
      status: "active",
    },
    {
      id: 2,
      title: "Help with React Hooks Implementation",
      author: "Emma Wilson",
      replies: 8,
      lastActivity: "4 hours ago",
      category: "Web Development",
      status: "answered",
    },
    {
      id: 3,
      title: "Study Group for Midterm Exam",
      author: "Mike Johnson",
      replies: 15,
      lastActivity: "1 day ago",
      category: "General",
      status: "active",
    },
    {
      id: 4,
      title: "Career Advice for CS Graduates",
      author: "Dr. Thompson",
      replies: 45,
      lastActivity: "2 days ago",
      category: "Career",
      status: "pinned",
    },
  ]

  const projects = [
    {
      id: 1,
      name: "E-commerce Website",
      course: "Web Development",
      members: 4,
      progress: 75,
      deadline: "2024-03-15",
      status: "on-track",
    },
    {
      id: 2,
      name: "Machine Learning Model",
      course: "AI Fundamentals",
      members: 3,
      progress: 45,
      deadline: "2024-03-20",
      status: "behind",
    },
    {
      id: 3,
      name: "Mobile App Prototype",
      course: "Mobile Development",
      members: 5,
      progress: 90,
      deadline: "2024-03-10",
      status: "ahead",
    },
  ]

  const virtualMeetings = [
    {
      id: 1,
      title: "CS101 Lecture - Data Structures",
      instructor: "Dr. Johnson",
      time: "2:00 PM - 3:30 PM",
      status: "live",
      participants: 45,
    },
    {
      id: 2,
      title: "Project Team Meeting",
      instructor: "Team Alpha",
      time: "4:00 PM - 5:00 PM",
      status: "scheduled",
      participants: 4,
    },
    {
      id: 3,
      title: "Office Hours - Database Design",
      instructor: "Prof. Martinez",
      time: "6:00 PM - 7:00 PM",
      status: "scheduled",
      participants: 12,
    },
  ]

  const onlineFaculty = [
    { name: "Dr. Sarah Johnson", status: "available", department: "Computer Science" },
    { name: "Prof. Martinez", status: "busy", department: "Database Systems" },
    { name: "Dr. Thompson", status: "available", department: "Career Services" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-custom-gradient rounded-lg shadow-sm mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Communication & Collaboration
              </h1>
              <p className="text-sm sm:text-base text-purple-100 mt-1">Connect with peers and faculty</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-white">
                <Bell className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-white">
                <Settings className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6 p-1">
              <div className="flex flex-wrap gap-1">
                {[
                  { id: "messages", label: "Messages", icon: MessageCircle },
                  { id: "forums", label: "Forums", icon: Users },
                  { id: "projects", label: "Projects", icon: FolderOpen },
                  { id: "meetings", label: "Meetings", icon: Video },
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 sm:flex-none ${activeTab === tab.id ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}`}
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
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base sm:text-lg">Conversations</CardTitle>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search conversations..." className="pl-10 text-sm" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-1">
                        {conversations.map((conv, index) => (
                          <div
                            key={conv.id}
                            onClick={() => setSelectedConversation(index)}
                            className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                              selectedConversation === index ? "bg-purple-50 border-r-2 border-purple-600" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                                <AvatarImage src={conv.avatar || "/assets/images/student-profile.png"} />
                                <AvatarFallback>
                                  {conv.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm truncate">{conv.name}</h4>
                                  <span className="text-xs text-gray-500">{conv.time}</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">{conv.role}</p>
                                <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                              </div>
                              {conv.unread > 0 && (
                                <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
                                  {conv.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Chat Interface */}
                <div className="lg:col-span-2">
                  <Card className="h-[500px] sm:h-[600px] flex flex-col">
                    <CardHeader className="pb-3 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                            <AvatarImage src={conversations[selectedConversation]?.avatar || "/assets/images/student-profile.png"} />
                            <AvatarFallback>
                              {conversations[selectedConversation]?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-sm sm:text-base">
                              {conversations[selectedConversation]?.name}
                            </h3>
                            <p className="text-xs text-gray-500">{conversations[selectedConversation]?.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4">
                      <div className="space-y-3 sm:space-y-4">
                        {messages.map((message) => (
                          <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[80%] sm:max-w-[70%] ${
                                message.isOwn
                                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                                  : "bg-gray-100 text-gray-900"
                              } rounded-lg p-2 sm:p-3`}
                            >
                              <p className="text-xs sm:text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${message.isOwn ? "text-purple-100" : "text-gray-500"}`}>
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <div className="border-t p-3 sm:p-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 text-sm"
                        />
                        <Button size="sm" variant="outline">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Forums Tab */}
            {activeTab === "forums" && (
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Discussion Forums</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-transparent">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 sm:flex-none">
                        <Plus className="h-4 w-4 mr-2" />
                        New Topic
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {forumTopics.map((topic) => (
                      <div key={topic.id} className="border rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-2 mb-2">
                              <h3 className="font-medium text-sm sm:text-base hover:text-purple-600 cursor-pointer">
                                {topic.title}
                              </h3>
                              {topic.status === "pinned" && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                                  Pinned
                                </Badge>
                              )}
                              {topic.status === "answered" && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                  Answered
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                              <span>by {topic.author}</span>
                              <span>•</span>
                              <span>{topic.category}</span>
                              <span>•</span>
                              <span>{topic.replies} replies</span>
                              <span>•</span>
                              <span>{topic.lastActivity}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="self-start bg-transparent">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Group Projects</CardTitle>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="border-l-4 border-l-purple-600">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-sm sm:text-base">{project.name}</h3>
                              <p className="text-xs sm:text-sm text-gray-600">{project.course}</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                project.status === "on-track"
                                  ? "bg-green-100 text-green-800"
                                  : project.status === "behind"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {project.status === "on-track"
                                ? "On Track"
                                : project.status === "behind"
                                  ? "Behind"
                                  : "Ahead"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-xs sm:text-sm mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span>{project.members} members</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>{project.deadline}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                View Details
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1">
                                Open Project
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Meetings Tab */}
            {activeTab === "meetings" && (
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Virtual Meetings</CardTitle>
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {virtualMeetings.map((meeting) => (
                      <Card key={meeting.id} className="border">
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-medium text-sm sm:text-base">{meeting.title}</h3>
                                {meeting.status === "live" && (
                                  <Badge className="bg-red-500 text-white text-xs animate-pulse">LIVE</Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <User className="h-4 w-4" />
                                <span>{meeting.instructor}</span>
                                <span>•</span>
                                <Clock className="h-4 w-4" />
                                <span>{meeting.time}</span>
                                <span>•</span>
                                <Users className="h-4 w-4" />
                                <span>{meeting.participants} participants</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {meeting.status === "live" ? (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none">
                                  <Video className="h-4 w-4 mr-2" />
                                  Join Now
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" className="flex-1 sm:flex-none bg-transparent">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Add to Calendar
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Online Faculty */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Online Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {onlineFaculty.map((faculty, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/assets/images/student-profile.png?height=32&width=32&query=faculty-${index}`} />
                          <AvatarFallback>
                            {faculty.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                            faculty.status === "available" ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs sm:text-sm truncate">{faculty.name}</p>
                        <p className="text-xs text-gray-500 truncate">{faculty.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-xs sm:text-sm">New message from Dr. Johnson</p>
                      <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-xs sm:text-sm">Project milestone completed</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-xs sm:text-sm">New forum post in CS101</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs sm:text-sm bg-transparent"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start New Chat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs sm:text-sm bg-transparent"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Join Study Group
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs sm:text-sm bg-transparent"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs sm:text-sm bg-transparent"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Forums
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
