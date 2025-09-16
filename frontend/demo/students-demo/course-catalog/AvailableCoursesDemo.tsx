"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { courseType } from "@/types/Types";
import axios from "axios";
import { CoursesUrl } from "@/constants";

const AvailableCoursesDemo = () => {
  const [courses, setCourses] = useState<courseType[] | null>(null);

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

  return (
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
          {courses?.map((item: courseType) => (
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
                      <h3 className="font-semibold mb-1">{item.course}</h3>
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
  );
};

export default AvailableCoursesDemo;
