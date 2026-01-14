"use client";
import WelcomeBanner from "./WelcomeBanner";
import QuickLinksDemo from "./QuickLinksDemo";
import RecentAnnouncements from "./RecentAnnouncements";
import NotificationPanel from "./NotificationPanel";
import { useEffect, useMemo, useState } from "react";
import { getUserSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { appointmentTypes, batchType, User } from "@/types/Types";
import axios from "axios";
import { DemoClassUrl, NewBatchEntryUrl } from "@/constants";
import Cookies from "js-cookie";
import { format, isBefore, isToday, startOfDay } from "date-fns";
import Link from "next/link";

// Function for extracting and formatting course name
function funcFormatSlug(slug:string){
  const parts = slug.split("-");
  const courseName = parts[parts.length - 2].trim(); // extract the course name from batch

  const formattedSlug = courseName
  .toLowerCase()
  .replace(/\s+/g, "-")   // replace spaces with dashes
  .replace(/[^a-z0-9-]/g, ""); // remove special chars

  return formattedSlug;

}

export function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [batchNames, setbatchNames] = useState<batchType[]>([]);
  const [classes, setClasses] = useState<appointmentTypes[]>([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  // Handle fetch user session
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const session = await getUserSession();
        if (!session.name || !session.role) {
          throw new Error("No user session is found.");
        }
        setUser({ name: session.name, role: session.role });
      } catch (error) {
        console.error(error);
      }
    };

    handleFetch();
  }, [user?.name, user?.role]);

  // Handle fetch enrolled courses
  useEffect(() => {
    if (!user?.role || !user?.name) return;
    if (user.role !== "student" && !selectedStudent) return;
    const handleFetch = async () => {
      try {
        const studentName =
          user.role === "student" ? user.name : selectedStudent;
        const res = await axios.get(`${NewBatchEntryUrl}?name=${studentName}`, {withCredentials: true,
          headers: { Authorization: Cookies.get("token") },
        });
        console.log(res.data);
        if (res.data) {
          const filteredStudents = res.data.filter(
            (item: batchType) => item.studentName === studentName
          );
          if (filteredStudents) {
            setbatchNames(filteredStudents);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, [selectedStudent, user?.name, user?.role]);

  // Handle fetch demo classes
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${DemoClassUrl}?name=${selectedStudent}`);
        console.log(res.data);
        if (res.data) {
          const filteredClasses = res.data.filter(
            (item: appointmentTypes) => item.userName === selectedStudent
          );
          if (filteredClasses) {
            setClasses(filteredClasses);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, [selectedStudent]);

  // Handle filter classes with different badges
  const filteredClasses = useMemo(() => {
    if (!classes) return [];

    const today = startOfDay(new Date());

    return classes.map((item: appointmentTypes) => {
      const itemDate = startOfDay(new Date(item.date));
      let status: "today" | "upcoming" | "old" = "upcoming";
      if (isToday(itemDate)) status = "today";
      else if (isBefore(itemDate, today)) status = "old";
      return { ...item, status };
    });
  }, [classes]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <WelcomeBanner
        value={selectedStudent}
        onValueChange={(value) => setSelectedStudent(value)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Links Section */}
          <QuickLinksDemo />

          {/* Enrolled Courses Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Current Enrolled Courses</CardTitle>
              <Button variant="link" className="text-purple-600">
                See all
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {batchNames.map((item: batchType) => (
                    <Card
                      key={item._id}
                      className="border-purple-200 bg-purple-50"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-700"
                          >
                            In Progress
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-2">{item.batch}</h3>
                        {/* <p className="text-sm text-gray-600 mb-4">
                          Learn the fundamentals of OOP concepts
                        </p> */}
                        <Link href={`/students/courses/${funcFormatSlug(item.batch)}`}>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          View Course
                        </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Upcoming Classes & Deadlines Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Classes & Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea>
                <div className="space-y-4">
                  {filteredClasses.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200"
                    >
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.course}</h4>
                        <p className="text-sm text-gray-600">
                          {item.date
                            ? format(new Date(item.date), "MMM dd, yyyy")
                            : ""}
                        </p>
                      </div>
                      {item.status == "today" && (
                        <Badge variant="destructive">Due Today</Badge>
                      )}
                      {item.status == "upcoming" && (
                        <Badge variant="default">Upcoming</Badge>
                      )}
                      {item.status == "old" && (
                        <Badge variant="outline">Completed</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-8">
          {/* Recent Announcements Section */}
          <RecentAnnouncements />

          {/* Notifications Panel Section */}
          <NotificationPanel />
        </div>
      </div>
    </div>
  );
}
