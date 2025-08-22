"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  Video,
  Book,
  HelpCircle,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Send,
  Paperclip,
  Star,
  Download,
  Play,
  ExternalLink,
  Headphones,
  Calendar,
  Zap,
  Globe,
} from "lucide-react"
import Image from "next/image"

export default function SupportDemo() {
  const [activeTab, setActiveTab] = useState("faq")
  const [searchQuery, setSearchQuery] = useState("")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      count: 15,
      questions: [
        {
          q: "How do I log into the LMS for the first time?",
          a: "Use your student ID and the temporary password sent to your email. You'll be prompted to change it on first login.",
        },
        {
          q: "I forgot my password, how do I reset it?",
          a: "Click 'Forgot Password' on the login page, enter your email, and follow the reset instructions sent to your inbox.",
        },
        {
          q: "Where can I find my course materials and syllabus?",
          a: "Navigate to 'My Courses', select your course, and find materials in the 'Resources' or 'Content' section.",
        },
        {
          q: "How do I navigate the dashboard effectively?",
          a: "Use the main navigation menu on the left. Your dashboard shows recent activity, upcoming deadlines, and quick access links.",
        },
        {
          q: "Can I customize my dashboard layout?",
          a: "Yes, you can rearrange widgets and choose which information to display prominently in your profile settings.",
        },
      ],
    },
    {
      id: "courses",
      title: "Courses & Assignments",
      icon: Book,
      count: 22,
      questions: [
        {
          q: "How do I enroll in a new course?",
          a: "Visit the Course Catalog, search for your desired course, and click 'Enroll'. Some courses may require instructor approval.",
        },
        {
          q: "How do I submit assignments?",
          a: "Go to your course page, click on the assignment, upload your file(s), and click 'Submit'. Always check the submission confirmation.",
        },
        {
          q: "Can I save a draft of my assignment?",
          a: "Yes, you can save drafts before final submission. Look for the 'Save Draft' button in the assignment submission area.",
        },
        {
          q: "What file formats are accepted for submissions?",
          a: "We accept PDF, DOC, DOCX, PPT, PPTX, TXT, and most image formats. Maximum file size is 50MB per file.",
        },
        {
          q: "How do I access recorded lectures?",
          a: "Recorded lectures are available in the 'Lectures' section of each course. You can stream or download them for offline viewing.",
        },
        {
          q: "Can I participate in discussions from mobile?",
          a: "Yes, the discussion forums are fully mobile-responsive. You can read, post, and reply from any device.",
        },
      ],
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: AlertCircle,
      count: 18,
      questions: [
        {
          q: "The video lectures won't play, what should I do?",
          a: "Try refreshing the page, clearing your browser cache, or switching to a different browser. Ensure you have a stable internet connection.",
        },
        {
          q: "I can't upload my assignment file",
          a: "Check that your file is under 50MB and in a supported format. Try using a different browser or clearing your cache.",
        },
        {
          q: "The website is loading very slowly",
          a: "This may be due to high traffic or your internet connection. Try accessing during off-peak hours or contact IT support.",
        },
        {
          q: "I'm getting error messages when trying to access content",
          a: "Take a screenshot of the error and contact technical support. Include details about what you were trying to do when the error occurred.",
        },
        {
          q: "How do I clear my browser cache?",
          a: "Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac), select 'Cached images and files', and click Clear data.",
        },
        {
          q: "Which browsers are supported?",
          a: "We support the latest versions of Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported.",
        },
      ],
    },
    {
      id: "grades",
      title: "Grades & Progress",
      icon: CheckCircle,
      count: 12,
      questions: [
        {
          q: "When will my assignment grades be available?",
          a: "Grades are typically posted within 5-7 business days after the submission deadline, depending on the assignment complexity.",
        },
        {
          q: "How is my final grade calculated?",
          a: "Check your course syllabus for the specific grading breakdown. You can also view the grade calculation in your course's 'Grades' section.",
        },
        {
          q: "Can I request a grade review or appeal?",
          a: "Yes, contact your instructor within 7 days of grade posting to discuss any concerns or request a review of your grade.",
        },
        {
          q: "How do I track my overall progress in a course?",
          a: "Visit the 'Grades & Progress' section to see your current standing, completed assignments, and upcoming deadlines.",
        },
        {
          q: "What does 'Incomplete' mean on my transcript?",
          a: "An Incomplete grade means you haven't finished all course requirements. Contact your instructor to discuss completion options.",
        },
      ],
    },
  ]

  const supportTickets = [
    {
      id: "TK-2024-001",
      subject: "Cannot access course materials for CS101",
      status: "Open",
      priority: "High",
      created: "2 hours ago",
      lastUpdate: "1 hour ago",
      category: "Technical",
      assignedTo: "Tech Support Team",
    },
    {
      id: "TK-2024-002",
      subject: "Grade inquiry for Midterm Exam - MATH201",
      status: "In Progress",
      priority: "Medium",
      created: "1 day ago",
      lastUpdate: "4 hours ago",
      category: "Academic",
      assignedTo: "Academic Support",
    },
    {
      id: "TK-2024-003",
      subject: "Password reset email not received",
      status: "Resolved",
      priority: "Low",
      created: "3 days ago",
      lastUpdate: "2 days ago",
      category: "Account",
      assignedTo: "IT Support",
    },
    {
      id: "TK-2024-004",
      subject: "Assignment submission failed - ENG102",
      status: "Open",
      priority: "High",
      created: "5 hours ago",
      lastUpdate: "3 hours ago",
      category: "Technical",
      assignedTo: "Tech Support Team",
    },
  ]

  const tutorials = [
    {
      id: 1,
      title: "Getting Started with the LMS Platform",
      duration: "8:45",
      views: "3.2k",
      rating: 4.9,
      thumbnail: "/assets/images/student-profile.png",
      category: "Basics",
      description: "Complete walkthrough of the LMS interface and basic navigation",
    },
    {
      id: 2,
      title: "How to Submit Assignments Successfully",
      duration: "6:30",
      views: "2.8k",
      rating: 4.8,
      thumbnail: "/assets/images/student-profile.png",
      category: "Assignments",
      description: "Step-by-step guide to submitting different types of assignments",
    },
    {
      id: 3,
      title: "Participating in Discussion Forums",
      duration: "5:15",
      views: "1.9k",
      rating: 4.7,
      thumbnail: "/assets/images/student-profile.png",
      category: "Communication",
      description: "Learn how to engage effectively in course discussions",
    },
    {
      id: 4,
      title: "Understanding Your Grades and Progress",
      duration: "7:20",
      views: "2.1k",
      rating: 4.9,
      thumbnail: "/assets/images/student-profile.png",
      category: "Grades",
      description: "Navigate the grading system and track your academic progress",
    },
    {
      id: 5,
      title: "Using the Mobile App Effectively",
      duration: "4:50",
      views: "1.5k",
      rating: 4.6,
      thumbnail: "/assets/images/student-profile.png",
      category: "Mobile",
      description: "Access your courses and complete tasks on mobile devices",
    },
    {
      id: 6,
      title: "Troubleshooting Common Issues",
      duration: "9:10",
      views: "2.7k",
      rating: 4.8,
      thumbnail: "/assets/images/student-profile.png",
      category: "Technical",
      description: "Solve the most common technical problems independently",
    },
  ]

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0 || searchQuery === "")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-custom-gradient backdrop-blur-sm rounded-xl shadow-lg mb-4 sm:mb-6 p-4 sm:p-6 border border-purple-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Help & Support Center
              </h1>
              <p className="text-sm sm:text-base text-purple-100">
                Get assistance, find answers, and learn how to use the LMS effectively
              </p>
            </div>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/50 border-purple-200 hover:bg-purple-50 text-xs sm:text-sm"
              >
                <Phone className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Call Support</span>
                <span className="xs:hidden">Call</span>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs sm:text-sm"
              >
                <MessageCircle className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Live Chat</span>
                <span className="xs:hidden">Chat</span>
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
                  { id: "faq", label: "FAQs", icon: HelpCircle, shortLabel: "FAQ" },
                  { id: "tickets", label: "Support Tickets", icon: MessageCircle, shortLabel: "Tickets" },
                  { id: "tutorials", label: "Tutorials", icon: Video, shortLabel: "Videos" },
                  { id: "contact", label: "Contact", icon: Mail, shortLabel: "Contact" },
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

            {/* FAQ Tab */}
            {activeTab === "faq" && (
              <div className="space-y-4 sm:space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl sm:text-2xl text-gray-800">Frequently Asked Questions</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                      {faqCategories.map((category) => (
                        <div
                          key={category.id}
                          className="p-3 sm:p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                              <category.icon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                                {category.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600">{category.count} articles</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {filteredFAQs.map((category) => (
                        <div key={category.id}>
                          {category.questions.length > 0 && (
                            <>
                              <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-3">
                                {category.title}
                              </h3>
                              <div className="space-y-2 mb-6">
                                {category.questions.map((faq, index) => (
                                  <details key={index} className="group border border-purple-100 rounded-lg">
                                    <summary className="flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-purple-50/50">
                                      <span className="font-medium text-sm sm:text-base text-gray-800 pr-2">
                                        {faq.q}
                                      </span>
                                      <ChevronRight className="h-4 w-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                                    </summary>
                                    <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-600 border-t border-purple-100">
                                      <p className="pt-3 text-sm sm:text-base">{faq.a}</p>
                                    </div>
                                  </details>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Support Tickets Tab */}
            {activeTab === "tickets" && (
              <div className="space-y-4 sm:space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <CardTitle className="text-xl text-gray-800">My Support Tickets</CardTitle>
                      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        New Ticket
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      {supportTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="p-3 sm:p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors"
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                                    {ticket.subject}
                                  </h3>
                                  <Badge
                                    variant={
                                      ticket.status === "Open"
                                        ? "destructive"
                                        : ticket.status === "In Progress"
                                          ? "default"
                                          : "secondary"
                                    }
                                    className={`text-xs ${
                                      ticket.status === "Open"
                                        ? "bg-red-100 text-red-700 border-red-200"
                                        : ticket.status === "In Progress"
                                          ? "bg-blue-100 text-blue-700 border-blue-200"
                                          : "bg-green-100 text-green-700 border-green-200"
                                    }`}
                                  >
                                    {ticket.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                                  <span>ID: {ticket.id}</span>
                                  <span>Priority: {ticket.priority}</span>
                                  <span>Category: {ticket.category}</span>
                                  <span className="xs:col-span-2 sm:col-span-1">Assigned: {ticket.assignedTo}</span>
                                </div>
                                <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs text-gray-500">
                                  <span>Created: {ticket.created}</span>
                                  <span>Last update: {ticket.lastUpdate}</span>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs sm:text-sm w-full xs:w-auto"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Create New Support Ticket</CardTitle>
                    <p className="text-sm text-gray-600">Describe your issue and we&apos;ll help you resolve it quickly</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                          Category
                        </Label>
                        <select className="mt-1 w-full px-3 py-2 text-sm border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                          <option>Technical Issue</option>
                          <option>Account Problem</option>
                          <option>Course Content</option>
                          <option>Grade Inquiry</option>
                          <option>Assignment Submission</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                          Priority Level
                        </Label>
                        <select className="mt-1 w-full px-3 py-2 text-sm border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                          <option>Low - General inquiry</option>
                          <option>Medium - Non-urgent issue</option>
                          <option>High - Affecting coursework</option>
                          <option>Urgent - Critical issue</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Detailed Description
                      </Label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Please provide detailed information about your issue, including any error messages and steps you've already tried..."
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                        className="mt-1 w-full px-3 py-2 text-sm border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400 resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 sm:flex-none text-sm">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Ticket
                      </Button>
                      <Button
                        variant="outline"
                        className="border-purple-200 hover:bg-purple-50 flex-1 sm:flex-none bg-transparent text-sm"
                      >
                        <Paperclip className="h-4 w-4 mr-2" />
                        Attach Files
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tutorials Tab */}
            {activeTab === "tutorials" && (
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Video Tutorials & Guides</CardTitle>
                  <p className="text-sm text-gray-600">
                    Learn how to use LMS features with comprehensive step-by-step guides
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {tutorials.map((tutorial) => (
                      <div
                        key={tutorial.id}
                        className="border border-purple-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <div className="relative">
                          <Image
                          height={100}
                          width={200}
                            src={tutorial.thumbnail || "/placeholder.svg"}
                            alt={tutorial.title}
                            className="w-full h-32 sm:h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="h-6 w-6 text-purple-600 ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {tutorial.duration}
                          </div>
                        </div>
                        <div className="p-3 sm:p-4">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-2 line-clamp-2">
                            {tutorial.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{tutorial.description}</p>
                          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                              <span>{tutorial.views} views</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{tutorial.rating}</span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                              {tutorial.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="space-y-4 sm:space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Contact Support Team</CardTitle>
                    <p className="text-sm text-gray-600">
                      Multiple ways to get in touch with our dedicated support team
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <MessageCircle className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Live Chat Support</h3>
                            <p className="text-sm text-green-600">● Available 24/7</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Get instant help from our support specialists</p>
                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 w-full sm:w-auto">
                          Start Chat Now
                        </Button>
                      </div>

                      <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <Mail className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Email Support</h3>
                            <p className="text-sm text-gray-600">Response within 4-6 hours</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">support@university.edu</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-200 hover:bg-purple-50 bg-transparent w-full sm:w-auto"
                        >
                          Send Email
                        </Button>
                      </div>

                      <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <Phone className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Phone Support</h3>
                            <p className="text-sm text-gray-600">Mon-Fri 8AM-8PM EST</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">+1 (555) 123-HELP (4357)</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-200 hover:bg-purple-50 bg-transparent w-full sm:w-auto"
                        >
                          Call Now
                        </Button>
                      </div>

                      <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Schedule Consultation</h3>
                            <p className="text-sm text-gray-600">One-on-one support session</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Book a personalized help session</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-200 hover:bg-purple-50 bg-transparent w-full sm:w-auto"
                        >
                          Book Session
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">Support Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-purple-100">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-purple-600" />
                            <span className="text-sm sm:text-base text-gray-700">Live Chat</span>
                          </div>
                          <span className="text-sm text-green-600 font-medium">24/7 Available</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-purple-100">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-purple-600" />
                            <span className="text-sm sm:text-base text-gray-700">Phone Support</span>
                          </div>
                          <span className="text-sm text-gray-600">Mon-Fri 8AM-8PM EST</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-purple-100">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-purple-600" />
                            <span className="text-sm sm:text-base text-gray-700">Email Support</span>
                          </div>
                          <span className="text-sm text-gray-600">4-6 hour response</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <span className="text-sm sm:text-base text-gray-700">Emergency Support</span>
                          </div>
                          <span className="text-sm text-red-600 font-medium">24/7 Critical Issues</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">Emergency Contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-semibold text-red-800 mb-2">Critical System Issues</h4>
                          <p className="text-sm text-red-700 mb-2">
                            For urgent technical problems affecting multiple users
                          </p>
                          <Button size="sm" variant="destructive" className="w-full">
                            <Phone className="h-4 w-4 mr-2" />
                            Emergency Hotline
                          </Button>
                        </div>
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <h4 className="font-semibold text-orange-800 mb-2">Academic Emergencies</h4>
                          <p className="text-sm text-orange-700 mb-2">For urgent academic support needs</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Academic Support
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Quick Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Globe className="h-4 w-4 mr-3" />
                    System Status
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Download className="h-4 w-4 mr-3" />
                    User Manual
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <Video className="h-4 w-4 mr-3" />
                    Video Library
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-3" />
                    Knowledge Base
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Support Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">&lt; 90 sec</div>
                    <div className="text-sm text-gray-600">Avg. Chat Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.2%</div>
                    <div className="text-sm text-gray-600">Issue Resolution Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">4.9/5</div>
                    <div className="text-sm text-gray-600">Customer Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">24/7</div>
                    <div className="text-sm text-gray-600">Live Chat Available</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Most Helpful Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { title: "Password Reset Guide", views: "2.1k" },
                    { title: "Assignment Submission Help", views: "1.8k" },
                    { title: "Course Navigation Tutorial", views: "1.5k" },
                    { title: "Grade Calculation Explained", views: "1.3k" },
                    { title: "Mobile App Setup", views: "1.1k" },
                  ].map((article, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 hover:bg-purple-50/50 rounded cursor-pointer"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded flex items-center justify-center text-xs font-semibold text-purple-600 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-gray-700 block truncate">{article.title}</span>
                        <span className="text-xs text-gray-500">{article.views} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="text-gray-600 mb-1">Support Email:</p>
                    <p className="font-medium text-gray-800">support@university.edu</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600 mb-1">Phone Support:</p>
                    <p className="font-medium text-gray-800">+1 (555) 123-HELP</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600 mb-1">Emergency Line:</p>
                    <p className="font-medium text-red-600">+1 (555) 911-HELP</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600 mb-1">Live Chat:</p>
                    <p className="font-medium text-green-600">Available 24/7</p>
                  </div>
                  <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 mt-3">
                    <Headphones className="h-4 w-4 mr-2" />
                    Get Help Now
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
