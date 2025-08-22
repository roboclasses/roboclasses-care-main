import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Download,
  MessageSquare,
  Calendar,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Timer,
  Filter,
  Search,
} from "lucide-react"

export function SubmissionDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">

        <Card className="mb-8 bg-custom-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Assignment Overview</h2>
                <p className="text-purple-100 mb-4 lg:text-base text-sm">Stay on top of your assignments and deadlines</p>
                <div className="grid lg:grid-cols-4 grid-cols-2">
                  <div>
                    <p className="text-sm text-purple-100">Total Assignments</p>
                    <p className="lg:text-2xl font-bold">15</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-100">Completed</p>
                    <p className="lg:text-2xl font-bold">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-100">Pending</p>
                    <p className="lg:text-2xl font-bold">3</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-100">Average Grade</p>
                    <p className="lg:text-2xl font-bold">91%</p>
                  </div>
                </div>
              </div>
              <div className="w-32 h-32 bg-white/20 rounded-full lg:flex hidden items-center justify-center">
                <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center">
                  <FileText className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={80} className="h-2 bg-white/20" />
              <p className="text-sm text-purple-100 mt-2">80% completion rate</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Search and Filter Bar */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search assignments..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Assignment Tabs */}
              <Tabs defaultValue="pending" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="submitted">Submitted</TabsTrigger>
                  <TabsTrigger value="graded">Graded</TabsTrigger>
                  <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                </TabsList>

                <TabsContent value="pending">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        Pending Assignments
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-red-800">Object-Oriented Programming - Assignment 3</h3>
                            <p className="text-sm text-gray-600 mt-1">Inheritance and Polymorphism Project</p>
                          </div>
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            Due in 2 days
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Create a comprehensive library management system demonstrating inheritance hierarchies and
                          polymorphic behavior.
                        </p>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: Dec 18, 2024 11:59 PM
                            </span>
                            <span>Points: 100</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Instructions
                            </Button>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              <Upload className="w-4 h-4 mr-2" />
                              Submit Work
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-orange-800">Database Systems - Lab Report 4</h3>
                            <p className="text-sm text-gray-600 mt-1">SQL Optimization Techniques</p>
                          </div>
                          <Badge className="bg-orange-500 flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            Due in 5 days
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Analyze and optimize complex SQL queries, document performance improvements.
                        </p>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: Dec 21, 2024 11:59 PM
                            </span>
                            <span>Points: 75</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Instructions
                            </Button>
                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                              <Upload className="w-4 h-4 mr-2" />
                              Submit Work
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-yellow-800">Web Development - Final Project</h3>
                            <p className="text-sm text-gray-600 mt-1">Full-Stack Application Development</p>
                          </div>
                          <Badge className="bg-yellow-500 flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            Due in 1 week
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Build a complete web application using React, Node.js, and MongoDB with user authentication.
                        </p>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: Dec 25, 2024 11:59 PM
                            </span>
                            <span>Points: 200</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Requirements
                            </Button>
                            <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                              <Upload className="w-4 h-4 mr-2" />
                              Submit Work
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="submitted">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5 text-blue-500" />
                        Submitted Assignments
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-blue-800">Object-Oriented Programming - Assignment 2</h3>
                            <p className="text-sm text-gray-600 mt-1">Class Design and Encapsulation</p>
                          </div>
                          <Badge className="bg-blue-500">Awaiting Grade</Badge>
                        </div>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Submitted: Dec 10, 2024 10:30 PM</span>
                            <span>Points: 100</span>
                          </div>
                          <div className="lg:flex space-y-2">
                            <Button size="sm" variant="outline">
                              View Submission
                            </Button>
                            <Button size="sm" variant="outline">
                              Submission History
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-green-800">Database Systems - Lab Report 3</h3>
                            <p className="text-sm text-gray-600 mt-1">Normalization and ER Diagrams</p>
                          </div>
                          <Badge className="bg-green-500">Under Review</Badge>
                        </div>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Submitted: Dec 8, 2024 9:15 PM</span>
                            <span>Points: 75</span>
                          </div>
                          <div className="lg:flex space-y-2">
                            <Button size="sm" variant="outline">
                              View Submission
                            </Button>
                            <Button size="sm" variant="outline">
                              Submission History
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="graded">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Graded Assignments
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-green-800">Object-Oriented Programming - Assignment 1</h3>
                            <p className="text-sm text-gray-600 mt-1">Basic OOP Concepts and Calculator</p>
                          </div>
                          <Badge className="bg-green-600">A- (88/100)</Badge>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Instructor Feedback:</strong> Good understanding of basic concepts. Consider
                            improving error handling in your calculator methods.
                          </p>
                        </div>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Graded: Nov 30, 2024</span>
                            <span>Submitted: Nov 28, 2024</span>
                          </div>
                          <div className="lg:flex space-y-2">
                            <Button size="sm" variant="outline">
                              View Feedback
                            </Button>
                            <Button size="sm" variant="outline">
                              Download Graded Work
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-green-800">Database Systems - Lab Report 2</h3>
                            <p className="text-sm text-gray-600 mt-1">SQL Queries and Joins</p>
                          </div>
                          <Badge className="bg-green-600">A (95/100)</Badge>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Instructor Feedback:</strong> Excellent work on complex joins. Your query
                            optimization shows deep understanding.
                          </p>
                        </div>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Graded: Nov 25, 2024</span>
                            <span>Submitted: Nov 22, 2024</span>
                          </div>
                          <div className="lg:flex space-y-2">
                            <Button size="sm" variant="outline">
                              View Feedback
                            </Button>
                            <Button size="sm" variant="outline">
                              Download Graded Work
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-yellow-800">Web Development - Midterm Project</h3>
                            <p className="text-sm text-gray-600 mt-1">Responsive Website Design</p>
                          </div>
                          <Badge className="bg-yellow-600">B+ (87/100)</Badge>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Instructor Feedback:</strong> Good responsive design implementation. Work on
                            accessibility features for better user experience.
                          </p>
                        </div>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Graded: Nov 20, 2024</span>
                            <span>Submitted: Nov 18, 2024</span>
                          </div>
                          <div className="lg:flex space-y-2">
                            <Button size="sm" variant="outline">
                              View Feedback
                            </Button>
                            <Button size="sm" variant="outline">
                              Download Graded Work
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quizzes">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-500" />
                        Online Quizzes & Exams
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-red-800">Object-Oriented Programming - Final Exam</h3>
                            <p className="text-sm text-gray-600 mt-1">Comprehensive OOP Assessment</p>
                          </div>
                          <Badge variant="destructive">Available Dec 22</Badge>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">
                            Duration: 2 hours • Multiple choice and coding questions • Covers all course material
                          </p>
                        </div>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Available: Dec 22, 2024 9:00 AM</span>
                            <span>Points: 200</span>
                          </div>
                          <Button size="sm" variant="outline" disabled>
                            Not Available Yet
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-green-800">Database Systems - Quiz 3</h3>
                            <p className="text-sm text-gray-600 mt-1">Normalization and Indexing</p>
                          </div>
                          <Badge className="bg-green-600">Completed (92/100)</Badge>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">
                            Duration: 30 minutes • 20 multiple choice questions • Completed on Dec 5, 2024
                          </p>
                        </div>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Completed: Dec 5, 2024</span>
                            <span>Score: 92%</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Review Answers
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-blue-800">Web Development - Quiz 2</h3>
                            <p className="text-sm text-gray-600 mt-1">JavaScript and DOM Manipulation</p>
                          </div>
                          <Badge className="bg-blue-500">Available Now</Badge>
                        </div>
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">
                            Duration: 45 minutes • 15 questions • Must be completed by Dec 20, 2024
                          </p>
                        </div>
                        <div className="lg:flex items-center justify-between space-y-2">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Due: Dec 20, 2024 11:59 PM</span>
                            <span>Points: 50</span>
                          </div>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Start Quiz
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs> 
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-sm">OOP Assignment 3</span>
                    </div>
                    <p className="text-xs text-gray-600">Due in 2 days - Dec 18</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Timer className="w-4 h-4 text-orange-500" />
                      <span className="font-medium text-sm">DB Lab Report 4</span>
                    </div>
                    <p className="text-xs text-gray-600">Due in 5 days - Dec 21</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-sm">Web Dev Quiz 2</span>
                    </div>
                    <p className="text-xs text-gray-600">Available now - Due Dec 20</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800">Overall GPA</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">3.7</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Object-Oriented Programming</span>
                      <Badge variant="secondary">A-</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Systems</span>
                      <Badge variant="secondary">A</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Web Development</span>
                      <Badge variant="secondary">B+</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Assignment
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Instructor
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Calendar
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resources
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Assignment graded</p>
                      <p className="text-gray-600 text-xs">OOP Assignment 1 - 88/100</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Upload className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Assignment submitted</p>
                      <p className="text-gray-600 text-xs">DB Lab Report 3</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Bell className="w-4 h-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium">New assignment posted</p>
                      <p className="text-gray-600 text-xs">Web Dev Final Project</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
