"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Video,
  Download,
  Search,
  Filter,
  FileText,
  Play,
  ExternalLink,
  Star,
  Eye,
  Bookmark,
  Share,
  Settings,
  Bell,
  Grid,
  List,
  Calendar,
  Tag,
} from "lucide-react"
import Image from "next/image"

export default function LibraryDemo() {
  const [activeTab, setActiveTab] = useState("ebooks")
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const ebooks = [
    {
      id: 1,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      subject: "Computer Science",
      pages: 1312,
      format: "PDF",
      size: "15.2 MB",
      rating: 4.8,
      downloads: 2341,
      thumbnail: "/assets/images/student-profile.png",
    },
    {
      id: 2,
      title: "Clean Code: A Handbook",
      author: "Robert C. Martin",
      subject: "Software Engineering",
      pages: 464,
      format: "PDF",
      size: "8.7 MB",
      rating: 4.7,
      downloads: 1876,
      thumbnail: "/assets/images/student-profile.png",
    },
    {
      id: 3,
      title: "Database System Concepts",
      author: "Abraham Silberschatz",
      subject: "Database Systems",
      pages: 1376,
      format: "PDF",
      size: "22.1 MB",
      rating: 4.6,
      downloads: 1543,
      thumbnail: "/assets/images/student-profile.png",
    },
    {
      id: 4,
      title: "Machine Learning Yearning",
      author: "Andrew Ng",
      subject: "Machine Learning",
      pages: 118,
      format: "PDF",
      size: "3.2 MB",
      rating: 4.9,
      downloads: 3210,
      thumbnail: "/assets/images/student-profile.png",
    },
  ]

  const lectures = [
    {
      id: 1,
      title: "Object-Oriented Programming Fundamentals",
      instructor: "Dr. Sarah Johnson",
      course: "CS101",
      duration: "1h 45m",
      views: 1234,
      date: "2024-02-15",
      thumbnail: "/assets/images/student-profile.png",
    },
    {
      id: 2,
      title: "Database Normalization Techniques",
      instructor: "Prof. Martinez",
      course: "DB201",
      duration: "2h 15m",
      views: 987,
      date: "2024-02-10",
      thumbnail: "/assets/images/student-profile.png",
    },
    {
      id: 3,
      title: "Introduction to Machine Learning",
      instructor: "Dr. Chen",
      course: "ML301",
      duration: "1h 30m",
      views: 2156,
      date: "2024-02-08",
      thumbnail: "/assets/images/student-profile.png",
    },
    {
      id: 4,
      title: "Web Development Best Practices",
      instructor: "Prof. Wilson",
      course: "WEB202",
      duration: "1h 20m",
      views: 1654,
      date: "2024-02-05",
      thumbnail: "/assets/images/student-profile.png",
    },
  ]

  const databases = [
    {
      id: 1,
      name: "IEEE Xplore Digital Library",
      description: "Access to IEEE journals and conference papers",
      category: "Academic Papers",
      access: "Full Access",
      url: "https://ieeexplore.ieee.org",
    },
    {
      id: 2,
      name: "ACM Digital Library",
      description: "Computing and information technology research",
      category: "Research Papers",
      access: "Full Access",
      url: "https://dl.acm.org",
    },
    {
      id: 3,
      name: "SpringerLink",
      description: "Scientific, technical and medical content",
      category: "Academic Resources",
      access: "Limited Access",
      url: "https://link.springer.com",
    },
    {
      id: 4,
      name: "Google Scholar",
      description: "Scholarly literature across disciplines",
      category: "General Research",
      access: "Free Access",
      url: "https://scholar.google.com",
    },
  ]

  const templates = [
    {
      id: 1,
      name: "Research Paper Template",
      description: "IEEE format template for academic papers",
      category: "Academic Writing",
      format: "DOCX",
      size: "245 KB",
      downloads: 1876,
    },
    {
      id: 2,
      name: "Project Report Template",
      description: "Standard format for course project reports",
      category: "Project Documentation",
      format: "DOCX",
      size: "189 KB",
      downloads: 2341,
    },
    {
      id: 3,
      name: "Presentation Template",
      description: "Professional slides template for presentations",
      category: "Presentations",
      format: "PPTX",
      size: "1.2 MB",
      downloads: 1654,
    },
    {
      id: 4,
      name: "Lab Report Template",
      description: "Structured template for laboratory reports",
      category: "Lab Work",
      format: "DOCX",
      size: "156 KB",
      downloads: 987,
    },
  ]

  const recentActivity = [
    { action: "Downloaded", item: "Clean Code Handbook", time: "2 hours ago" },
    { action: "Watched", item: "OOP Fundamentals Lecture", time: "1 day ago" },
    { action: "Bookmarked", item: "ML Research Paper", time: "2 days ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-custom-gradient rounded-lg shadow-sm mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Learning Resources & Library
              </h1>
              <p className="text-sm sm:text-base mt-1 text-purple-100">Access supplementary materials and resources</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Bell className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
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
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1">
                {[
                  { id: "ebooks", label: "E-Books", icon: BookOpen },
                  { id: "lectures", label: "Lectures", icon: Video },
                  { id: "databases", label: "Databases", icon: ExternalLink },
                  { id: "templates", label: "Templates", icon: FileText },
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 sm:flex-none min-h-[44px] ${activeTab === tab.id ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}`}
                  >
                    <tab.icon className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm truncate">{tab.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6 p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent flex-1 sm:flex-none min-h-[40px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <span className="hidden xs:inline">Filter</span>
                  </Button>
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`min-h-[40px] px-3 ${viewMode === "grid" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}`}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`min-h-[40px] px-3 ${viewMode === "list" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : ""}`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* E-Books Tab */}
            {activeTab === "ebooks" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">E-Books & PDFs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
                        : "space-y-3 sm:space-y-4"
                    }
                  >
                    {ebooks.map((book) => (
                      <Card key={book.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-4">
                          {viewMode === "grid" ? (
                            <div className="text-center">
                              <Image 
                                height={100}
                                width={200}
                                src={book.thumbnail || "/placeholder.svg"}
                                alt={book.title}
                                className="w-full h-28 xs:h-32 sm:h-40 object-cover rounded-md mb-3"
                              />
                              <h3 className="font-medium text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                                {book.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">{book.author}</p>
                              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 text-xs sm:text-sm">
                                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                                <span>{book.rating}</span>
                                <span className="text-gray-500 hidden xs:inline">({book.downloads})</span>
                              </div>
                              <div className="flex flex-col xs:flex-row gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 bg-transparent text-xs sm:text-sm"
                                >
                                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  Preview
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 text-xs sm:text-sm"
                                >
                                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start gap-3 sm:gap-4">
                              <Image
                                height={100}
                                width={200}
                                src={book.thumbnail || "/placeholder.svg"}
                                alt={book.title}
                                className="w-12 h-16 xs:w-16 xs:h-20 sm:w-16 sm:h-20 object-cover rounded-md flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">{book.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{book.author}</p>
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {book.subject}
                                  </Badge>
                                  <span className="text-xs text-gray-500 hidden xs:inline">{book.pages} pages</span>
                                  <span className="text-xs text-gray-500">{book.size}</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                                  <span className="text-xs sm:text-sm">{book.rating}</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 flex-shrink-0">
                                <Button size="sm" variant="outline" className="bg-transparent text-xs px-2 sm:px-3">
                                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  <span className="hidden xs:inline">Preview</span>
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-xs px-2 sm:px-3"
                                >
                                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  <span className="hidden xs:inline">Download</span>
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lectures Tab */}
            {activeTab === "lectures" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Recorded Lectures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
                        : "space-y-3 sm:space-y-4"
                    }
                  >
                    {lectures.map((lecture) => (
                      <Card key={lecture.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-4">
                          {viewMode === "grid" ? (
                            <div>
                              <div className="relative mb-3">
                                <Image
                                  height={100}
                                  width={200}
                                  src={lecture.thumbnail || "/placeholder.svg"}
                                  alt={lecture.title}
                                  className="w-full h-28 xs:h-32 sm:h-40 object-cover rounded-md"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Button
                                    size="sm"
                                    className="bg-black/50 hover:bg-black/70 text-white text-xs sm:text-sm"
                                  >
                                    <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    Play
                                  </Button>
                                </div>
                                <Badge className="absolute top-2 right-2 bg-black/70 text-white text-xs">
                                  {lecture.duration}
                                </Badge>
                              </div>
                              <h3 className="font-medium text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                                {lecture.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">{lecture.instructor}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                <span className="truncate">{lecture.course}</span>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <Eye className="h-3 w-3" />
                                  <span>{lecture.views}</span>
                                </div>
                              </div>
                              <div className="flex flex-col xs:flex-row gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 bg-transparent text-xs sm:text-sm"
                                >
                                  <Bookmark className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 text-xs sm:text-sm"
                                >
                                  <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  Watch
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="relative flex-shrink-0">
                                <Image
                                  height={100}
                                  width={200}
                                  src={lecture.thumbnail || "/placeholder.svg"}
                                  alt={lecture.title}
                                  className="w-20 h-12 xs:w-24 xs:h-16 sm:w-24 sm:h-16 object-cover rounded-md"
                                />
                                <Play className="absolute inset-0 m-auto h-4 w-4 sm:h-6 sm:w-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">{lecture.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{lecture.instructor}</p>
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {lecture.course}
                                  </Badge>
                                  <span className="text-xs text-gray-500">{lecture.duration}</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500">
                                  <Eye className="h-3 w-3" />
                                  <span>{lecture.views} views</span>
                                  <span className="hidden xs:inline">•</span>
                                  <span className="hidden xs:inline">{lecture.date}</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 flex-shrink-0">
                                <Button size="sm" variant="outline" className="bg-transparent text-xs px-2 sm:px-3">
                                  <Bookmark className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  <span className="hidden xs:inline">Save</span>
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-xs px-2 sm:px-3"
                                >
                                  <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  <span className="hidden xs:inline">Watch</span>
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Databases Tab */}
            {activeTab === "databases" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Research Database Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {databases.map((db) => (
                      <Card key={db.id} className="border hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex flex-col gap-3">
                            <div className="flex-1">
                              <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-2">
                                <h3 className="font-medium text-sm sm:text-base flex-1 min-w-0">{db.name}</h3>
                                <Badge
                                  variant="secondary"
                                  className={`text-xs self-start xs:self-center flex-shrink-0 ${
                                    db.access === "Full Access"
                                      ? "bg-green-100 text-green-800"
                                      : db.access === "Limited Access"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {db.access}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{db.description}</p>
                              <Badge variant="outline" className="text-xs">
                                {db.category}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-transparent flex-1 xs:flex-none text-xs sm:text-sm"
                              >
                                <Share className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                <span className="hidden xs:inline">Share</span>
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 xs:flex-none text-xs sm:text-sm"
                              >
                                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                Access
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

            {/* Templates Tab */}
            {activeTab === "templates" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Downloadable Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
                        : "space-y-3 sm:space-y-4"
                    }
                  >
                    {templates.map((template) => (
                      <Card key={template.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-4">
                          {viewMode === "grid" ? (
                            <div className="text-center">
                              <div className="w-full h-28 xs:h-32 sm:h-32 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-md mb-3 flex items-center justify-center">
                                <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600" />
                              </div>
                              <h3 className="font-medium text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                                {template.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                                {template.description}
                              </p>
                              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                                <Badge variant="secondary" className="text-xs">
                                  {template.format}
                                </Badge>
                                <span className="text-xs text-gray-500">{template.size}</span>
                              </div>
                              <p className="text-xs text-gray-500 mb-3">{template.downloads} downloads</p>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 w-full text-xs sm:text-sm"
                              >
                                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-md flex items-center justify-center flex-shrink-0">
                                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">{template.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                                  {template.description}
                                </p>
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {template.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {template.format}
                                  </Badge>
                                  <span className="text-xs text-gray-500">{template.size}</span>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-xs text-gray-500 mb-2">{template.downloads} downloads</p>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-xs px-2 sm:px-3"
                                >
                                  <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  <span className="hidden xs:inline">Download</span>
                                </Button>
                              </div>
                            </div>
                          )}
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
            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Library Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Books Downloaded</span>
                    <span className="font-medium text-sm sm:text-base">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Lectures Watched</span>
                    <span className="font-medium text-sm sm:text-base">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Templates Used</span>
                    <span className="font-medium text-sm sm:text-base">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Bookmarks</span>
                    <span className="font-medium text-sm sm:text-base">8</span>
                  </div>
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
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm">
                          <span className="font-medium">{activity.action}</span>{" "}
                          <span className="truncate">{activity.item}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Popular Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Computer Science",
                    "Mathematics",
                    "Software Engineering",
                    "Database Systems",
                    "Machine Learning",
                    "Web Development",
                  ].map((category, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs sm:text-sm bg-transparent min-h-[36px] px-3"
                    >
                      <Tag className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{category}</span>
                    </Button>
                  ))}
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
                    className="w-full justify-start text-xs sm:text-sm bg-transparent min-h-[36px] px-3"
                  >
                    <Bookmark className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">View Bookmarks</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs sm:text-sm bg-transparent min-h-[36px] px-3"
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Download History</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs sm:text-sm bg-transparent min-h-[36px] px-3"
                  >
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Reading Schedule</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs sm:text-sm bg-transparent min-h-[36px] px-3"
                  >
                    <Share className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Share Resources</span>
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
