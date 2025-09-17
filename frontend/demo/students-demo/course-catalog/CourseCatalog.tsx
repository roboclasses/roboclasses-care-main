"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen, Users } from "lucide-react";
import { getUserSession } from "@/lib/session";
import { batchType } from "@/types/Types";
import axios from "axios";
import { CoursesUrl, NewBatchEntryUrl } from "@/constants";
import Cookies from "js-cookie";
import { ScrollArea } from "@/components/ui/scroll-area";
import { courseType } from "@/types/Types";
import CoursesFilterDemo from "./CoursesFilterDemo";
// import EnrolledCoursesDemo from "./EnrolledCoursesDemo"
// import AvailableCoursesDemo from "./AvailableCoursesDemo";
import CourseUpdatesDemo from "./CourseUpdatesDemo";
import CourseNotificationDemo from "./CourseNotificationDemo";

export function CourseCatalog() {
  const [user, setUser] = useState({ name: "", role: "" });
  const [courses, setCourses] = useState<courseType[] | null>(null);
  const [batches, setBatches] = useState<batchType[] | null>(null);
  const [searchQuery, setsearchQuery] = useState("");

    // Get the logged-in user session
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const session = await getUserSession();
        if (!session.role || !session.name) {
          throw new Error("No user session is found.");
        }
        setUser({ name: session.name, role: session.role });
      } catch (error) {
        console.error(error);
      }
    };

    handleFetch();
  }, []);

  // Fetch all courses
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(CoursesUrl);
        console.log(res.data);
        setCourses(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, []);

  // Filter courses
  const filteredCourses = useMemo(()=>{
    if(!courses) return [];

    return courses.filter((item)=>{
      if(searchQuery && !item.course.toLocaleLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })

  },[courses, searchQuery])


  // Fetch enrolled student's batches and classes
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(NewBatchEntryUrl, {
          headers: { Authorization: Cookies.get("token") },
        });
        console.log(res.data);
        setBatches(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, []);

  // Filter batches
  const filteredBatches = useMemo(() => {
    if (!batches) return [];

    return batches.filter((item: batchType) => {
      if (item.studentName && item.studentName !== user.name) return false;
      // if(searchQuery && !item.batch.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) return false;
      return true;
    });
  }, [batches, user.name]);
  console.log(searchQuery);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        {/* Courses filter section  */}
        <CoursesFilterDemo
          value={searchQuery}
          onChange={(e) => setsearchQuery(e.target.value)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* <EnrolledCoursesDemo /> */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Enrolled Courses</CardTitle>
                <Badge variant="secondary">4 Courses</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredBatches?.map((item: batchType) => (
                    <Card
                      className={`border-purple-200 bg-purple-50`}
                      key={item._id}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center`}
                          >
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <Badge
                            variant="secondary"
                            className={`bg-purple-100 text-purple-700`}
                          >
                            75% Complete
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-2">{item.batch}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Learn the fundamentals of OOP concepts
                        </p>
                        <div
                          className={`w-full bg-purple-200 rounded-full h-2 mb-4`}
                        >
                          <div
                            className={`bg-purple-600 h-2 rounded-full`}
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <Book className="w-4 h-4" />
                            {item.numberOfClasses}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            45 students
                          </span>
                        </div>
                        <Button
                          className={`w-full bg-purple-600 hover:bg-purple-700`}
                        >
                          Continue Course
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* <AvailableCoursesDemo /> */}
            <ScrollArea className="h-[500px] w-full rounded-xl">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Available Courses</CardTitle>
                  <Button variant="link" className="text-purple-600">
                    View All Catalog
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea>
                    <div className="space-y-4">
                      {filteredCourses?.map((item: courseType) => (
                        <Card
                          key={item._id}
                          className="border-teal-200 hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-6">
                            <div className="lg:flex items-start justify-between mb-4">
                              <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center">
                                  <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-1">
                                    {item.course}
                                  </h3>
                                  <p className="text-sm text-gray-600 mb-2">
                                    Build native mobile apps with React Native
                                  </p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Book className="w-4 h-4" />
                                      {item.numberOfClasses}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Users className="w-4 h-4" />
                                      18 spots left
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="mb-2">Intermediate</Badge>
                                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                                  Enroll Now
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </ScrollArea>
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-8">
            <CourseUpdatesDemo />
            <CourseNotificationDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
