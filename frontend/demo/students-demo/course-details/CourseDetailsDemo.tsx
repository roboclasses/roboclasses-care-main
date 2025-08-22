import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Play,
  Download,
  MessageSquare,
  Star,
  Clock,
  Mail,
  Phone,
  Calendar,
  FileText,
  Video,
  Upload,
} from "lucide-react"

export function CourseDetailsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">


        <Card className="mb-8 bg-custom-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Course Progress</h2>
                <p className="text-purple-100 mb-4">You&apos;re doing great! Keep up the excellent work.</p>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-purple-100">Overall Progress</p>
                    <p className="text-2xl font-bold">75%</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-100">Current Grade</p>
                    <p className="text-2xl font-bold">A-</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-100">Assignments</p>
                    <p className="text-2xl font-bold">8/10</p>
                  </div>
                </div>
              </div>
              <div className="w-32 h-32 bg-white/20 rounded-full items-center justify-center lg:flex hidden">
                <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={75} className="h-2 bg-white/20" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="syllabus" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                <TabsTrigger value="lectures">Lectures</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
              </TabsList>

              <TabsContent value="syllabus">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Syllabus & Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Course Description</h3>
                      <p className="text-gray-600">
                        This course introduces students to the fundamental concepts of object-oriented programming
                        including encapsulation, inheritance, polymorphism, and abstraction. Students will learn to
                        design and implement object-oriented solutions using Java programming language.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Learning Objectives</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          Understand and apply object-oriented programming principles
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          Design and implement classes, objects, and inheritance hierarchies
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          Apply polymorphism and abstraction in software design
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          Develop debugging and testing skills for OOP applications
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Course Schedule</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Week 1-3: Introduction to OOP</p>
                            <p className="text-sm text-gray-600">Classes, Objects, and Basic Concepts</p>
                          </div>
                          <Badge variant="secondary">Completed</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div>
                            <p className="font-medium">Week 4-6: Inheritance & Polymorphism</p>
                            <p className="text-sm text-gray-600">Advanced OOP Concepts</p>
                          </div>
                          <Badge className="bg-purple-600">Current</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Week 7-9: Design Patterns</p>
                            <p className="text-sm text-gray-600">Common OOP Design Patterns</p>
                          </div>
                          <Badge variant="outline">Upcoming</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lectures">
                <Card>
                  <CardHeader>
                    <CardTitle>Lecture Videos & Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Lecture 8: Polymorphism in Practice</h3>
                          <p className="text-sm text-gray-600">Duration: 45 minutes • Uploaded 2 days ago</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Play className="w-4 h-4 mr-2" />
                            Watch
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Lecture 7: Inheritance Hierarchies</h3>
                          <p className="text-sm text-gray-600">Duration: 52 minutes • Watched</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-2" />
                            Rewatch
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Lecture Slides: Chapter 5</h3>
                          <p className="text-sm text-gray-600">PDF • 2.4 MB • Updated yesterday</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignments & Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-red-800">Assignment 3: Inheritance Project</h3>
                          <Badge variant="destructive">Due in 2 days</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Create a class hierarchy for a library management system demonstrating inheritance and
                          polymorphism.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: Dec 18, 2024
                            </span>
                            <span>Points: 100</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              <Upload className="w-4 h-4 mr-2" />
                              Submit
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-green-800">Assignment 2: Class Design</h3>
                          <Badge className="bg-green-600">Submitted</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Design and implement a banking system with proper encapsulation.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Grade: 95/100</span>
                            <span>Submitted: Dec 10, 2024</span>
                          </div>
                          <Button size="sm" variant="outline">
                            View Feedback
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-blue-800">Assignment 1: Basic OOP Concepts</h3>
                          <Badge className="bg-blue-600">Graded</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Introduction to classes and objects with a simple calculator implementation.
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Grade: 88/100</span>
                            <span>Submitted: Nov 28, 2024</span>
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussions">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Discussion Forum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-sm">Prof. Sarah Johnson</h4>
                              <Badge variant="secondary" className="text-xs">
                                Instructor
                              </Badge>
                              <span className="text-xs text-gray-500">2 hours ago</span>
                            </div>
                            <h3 className="font-medium mb-2">Assignment 3 Clarifications</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Several students have asked about the UML diagram requirements. Please remember to
                              include...
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <button className="flex items-center gap-1 hover:text-purple-600">
                                <MessageSquare className="w-3 h-3" />
                                12 replies
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>AM</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-sm">Alex Martinez</h4>
                              <span className="text-xs text-gray-500">5 hours ago</span>
                            </div>
                            <h3 className="font-medium mb-2">Help with Polymorphism Example</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Can someone explain the difference between method overriding and overloading with a
                              practical example?
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <button className="flex items-center gap-1 hover:text-purple-600">
                                <MessageSquare className="w-3 h-3" />8 replies
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>LW</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-sm">Lisa Wang</h4>
                              <span className="text-xs text-gray-500">1 day ago</span>
                            </div>
                            <h3 className="font-medium mb-2">Study Group for Final Exam</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Looking to form a study group for the final exam. Anyone interested in meeting this
                              weekend?
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <button className="flex items-center gap-1 hover:text-purple-600">
                                <MessageSquare className="w-3 h-3" />
                                15 replies
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="grades">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Grades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-4 text-center">
                            <h3 className="font-semibold text-green-800">Current Grade</h3>
                            <p className="text-3xl font-bold text-green-600 mt-2">A-</p>
                            <p className="text-sm text-green-600">91.5%</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-blue-50 border-blue-200">
                          <CardContent className="p-4 text-center">
                            <h3 className="font-semibold text-blue-800">Assignments</h3>
                            <p className="text-3xl font-bold text-blue-600 mt-2">92%</p>
                            <p className="text-sm text-blue-600">8/10 completed</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-purple-50 border-purple-200">
                          <CardContent className="p-4 text-center">
                            <h3 className="font-semibold text-purple-800">Participation</h3>
                            <p className="text-3xl font-bold text-purple-600 mt-2">95%</p>
                            <p className="text-sm text-purple-600">Excellent</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Grade Breakdown</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span>Assignment 1: Basic OOP</span>
                            <Badge variant="secondary">88/100</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span>Assignment 2: Class Design</span>
                            <Badge variant="secondary">95/100</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <span>Assignment 3: Inheritance Project</span>
                            <Badge variant="outline">Pending</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span>Midterm Exam</span>
                            <Badge variant="secondary">89/100</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <span>Final Exam</span>
                            <Badge variant="outline">Not Scheduled</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Instructor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Prof. Sarah Johnson</h3>
                    <p className="text-sm text-gray-600">Computer Science Department</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.8/5.0</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>sarah.johnson@university.edu</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Office Hours: Mon/Wed 2-4 PM</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="font-medium text-sm">Assignment 3</span>
                    </div>
                    <p className="text-xs text-gray-600">Due in 2 days</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-sm">Final Exam</span>
                    </div>
                    <p className="text-xs text-gray-600">Dec 22, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Course Textbook
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Java Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Video className="w-4 h-4 mr-2" />
                    Tutorial Videos
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Class Forum
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
