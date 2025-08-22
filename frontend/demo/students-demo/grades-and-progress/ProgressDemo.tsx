import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  MessageSquare,
  Calendar,
  FileText,
  TrendingUp,
  Award,
  BarChart3,
  Target,
  BookOpen,
  Star,
} from "lucide-react"

export function ProgressDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6 sm:mb-8 bg-custom-gradient text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="w-full lg:flex-1">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">Academic Performance Overview</h2>
                <p className="text-purple-100 mb-4 text-sm sm:text-base">
                  Your current semester progress and achievements
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div>
                    <p className="text-xs sm:text-sm text-purple-100">Current GPA</p>
                    <p className="text-xl sm:text-2xl font-bold">3.7</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-purple-100">Credits Completed</p>
                    <p className="text-xl sm:text-2xl font-bold">45/60</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-purple-100">Courses Passed</p>
                    <p className="text-xl sm:text-2xl font-bold">15/18</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-purple-100">Class Rank</p>
                    <p className="text-xl sm:text-2xl font-bold">12/150</p>
                  </div>
                </div>
              </div>
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto lg:mx-0">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/30 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={75} className="h-2 bg-white/20" />
              <p className="text-xs sm:text-sm text-purple-100 mt-2">75% progress towards degree completion</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 text-xs sm:text-sm">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <BarChart3 className="w-5 h-5 text-purple-500" />
                        Grade Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                          <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <h3 className="font-semibold text-green-800">Cumulative GPA</h3>
                          <p className="text-2xl font-bold text-green-600 mt-1">3.7</p>
                          <p className="text-sm text-gray-600">Out of 4.0</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                          <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <h3 className="font-semibold text-blue-800">Semester GPA</h3>
                          <p className="text-2xl font-bold text-blue-600 mt-1">3.8</p>
                          <p className="text-sm text-gray-600">Current semester</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                          <h3 className="font-semibold text-purple-800">Grade Trend</h3>
                          <p className="text-2xl font-bold text-purple-600 mt-1">+0.2</p>
                          <p className="text-sm text-gray-600">Improvement</p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-4">Grade Distribution</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">A (90-100%)</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                              </div>
                              <span className="text-sm text-gray-600">6 courses</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">B (80-89%)</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "53%" }}></div>
                              </div>
                              <span className="text-sm text-gray-600">8 courses</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">C (70-79%)</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "7%" }}></div>
                              </div>
                              <span className="text-sm text-gray-600">1 course</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="courses">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                        Course-wise Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
                          <div>
                            <h3 className="font-semibold text-green-800">Object-Oriented Programming</h3>
                            <p className="text-sm text-gray-600 mt-1">CS 301 • Prof. Sarah Johnson • 4 Credits</p>
                          </div>
                          <Badge className="bg-green-600 self-start sm:self-center">A- (88%)</Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Assignments</p>
                            <p className="font-medium">85%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Quizzes</p>
                            <p className="font-medium">92%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Midterm</p>
                            <p className="font-medium">87%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Participation</p>
                            <p className="font-medium">95%</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={88} className="h-2" />
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
                          <div>
                            <h3 className="font-semibold text-green-800">Database Systems</h3>
                            <p className="text-sm text-gray-600 mt-1">CS 350 • Prof. Michael Chen • 3 Credits</p>
                          </div>
                          <Badge className="bg-green-600 self-start sm:self-center">A (95%)</Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Lab Reports</p>
                            <p className="font-medium">98%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Quizzes</p>
                            <p className="font-medium">94%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Project</p>
                            <p className="font-medium">92%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Participation</p>
                            <p className="font-medium">100%</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={95} className="h-2" />
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
                          <div>
                            <h3 className="font-semibold text-blue-800">Web Development</h3>
                            <p className="text-sm text-gray-600 mt-1">CS 280 • Prof. Emily Rodriguez • 3 Credits</p>
                          </div>
                          <Badge className="bg-blue-600 self-start sm:self-center">B+ (87%)</Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Projects</p>
                            <p className="font-medium">89%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Quizzes</p>
                            <p className="font-medium">85%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Final Project</p>
                            <p className="font-medium">Pending</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Participation</p>
                            <p className="font-medium">90%</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={87} className="h-2" />
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
                          <div>
                            <h3 className="font-semibold text-yellow-800">Data Structures & Algorithms</h3>
                            <p className="text-sm text-gray-600 mt-1">CS 250 • Prof. David Kim • 4 Credits</p>
                          </div>
                          <Badge className="bg-yellow-600 self-start sm:self-center">B (82%)</Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Assignments</p>
                            <p className="font-medium">78%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Quizzes</p>
                            <p className="font-medium">85%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Midterm</p>
                            <p className="font-medium">80%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Participation</p>
                            <p className="font-medium">88%</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={82} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="progress">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        Progress Charts & Completion
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-4">Semester Progress</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Overall Course Completion</span>
                              <span className="font-medium">75%</span>
                            </div>
                            <Progress value={75} className="h-3" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Assignment Completion</span>
                              <span className="font-medium">88%</span>
                            </div>
                            <Progress value={88} className="h-3" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Quiz Performance</span>
                              <span className="font-medium">91%</span>
                            </div>
                            <Progress value={91} className="h-3" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-3">Strengths</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-green-600" />
                              <span>Database Design & SQL</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-green-600" />
                              <span>Object-Oriented Concepts</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-green-600" />
                              <span>Class Participation</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-orange-800 mb-3">Areas for Improvement</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-orange-600" />
                              <span>Algorithm Optimization</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-orange-600" />
                              <span>Time Management</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-orange-600" />
                              <span>Code Documentation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="feedback">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <MessageSquare className="w-5 h-5 text-blue-500" />
                        Instructor Feedback
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-green-800">Prof. Sarah Johnson</h4>
                            <p className="text-sm text-gray-600">Object-Oriented Programming</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          John demonstrates excellent understanding of OOP principles. His code structure is clean and
                          well-organized. I recommend focusing on error handling and edge cases in future assignments.
                        </p>
                        <p className="text-xs text-gray-500">December 10, 2024</p>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>MC</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-blue-800">Prof. Michael Chen</h4>
                            <p className="text-sm text-gray-600">Database Systems</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Outstanding work on complex SQL queries and database optimization. John shows deep
                          understanding of normalization principles and consistently delivers high-quality lab reports.
                        </p>
                        <p className="text-xs text-gray-500">December 8, 2024</p>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>ER</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-yellow-800">Prof. Emily Rodriguez</h4>
                            <p className="text-sm text-gray-600">Web Development</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          Good progress on responsive design concepts. I&aops;d like to see more attention to accessibility
                          features and cross-browser compatibility in upcoming projects.
                        </p>
                        <p className="text-xs text-gray-500">December 5, 2024</p>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>DK</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-orange-800">Prof. David Kim</h4>
                            <p className="text-sm text-gray-600">Data Structures & Algorithms</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          John grasps fundamental concepts well but needs to work on algorithm efficiency. I recommend
                          practicing more complex problems and focusing on time complexity analysis.
                        </p>
                        <p className="text-xs text-gray-500">December 3, 2024</p>
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
                <CardTitle>Academic Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-sm">Semester GPA Goal</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Target: 3.8</span>
                      <span className="text-sm font-medium text-green-600">Current: 3.8</span>
                    </div>
                    <Progress value={100} className="h-2 mt-2" />
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-sm">Dean&apos;s List</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Need: 3.75</span>
                      <span className="text-sm font-medium text-blue-600">On Track</span>
                    </div>
                    <Progress value={95} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-sm">New Grade Posted</span>
                    </div>
                    <p className="text-xs text-gray-600">OOP Assignment 1 - A- (88%)</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-sm">Feedback Available</span>
                    </div>
                    <p className="text-xs text-gray-600">DB Lab Report 2 - Detailed comments</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-sm">GPA Update</span>
                    </div>
                    <p className="text-xs text-gray-600">Semester GPA improved to 3.8</p>
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
                    <Download className="w-4 h-4 mr-2" />
                    Download Transcript
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Request Grade Review
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Advising
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    View Grade History
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Grade improvement</p>
                      <p className="text-gray-600 text-xs">Semester GPA up by 0.2 points</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">New feedback received</p>
                      <p className="text-gray-600 text-xs">Prof. Johnson commented on Assignment 1</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Goal achieved</p>
                      <p className="text-gray-600 text-xs">Reached semester GPA target of 3.8</p>
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
