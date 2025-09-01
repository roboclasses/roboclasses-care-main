"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NewBatchEntryUrl } from "@/constants";
import { getUserSession } from "@/lib/session";
import { batchType } from "@/types/Types";
import Cookies from "js-cookie";
import { ScrollArea } from "@/components/ui/scroll-area";

const EnrolledCoursesDemo = () => {
  const [user, setUser] = useState({ role: "", name: "" });
  const [batchNames, setBatchNames] = useState<batchType[]>([]);

  // Handle fetch user session
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const session = await getUserSession();
        if (!session.name || !session.role) {
          throw new Error("No session found.");
        }
        setUser({ role: session.role, name: session.name });
      } catch (error) {
        console.error(error);
      }
    };

    handleFetch();
  }, []);

  // Handle fetch enrolled batches
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${NewBatchEntryUrl}?name=${user.name}`, {
          headers: { Authorization: Cookies.get("token") },
        });
        if (res.data) {
          const enrolledBatch = res.data
            .filter((item: batchType) => item.studentName === user.name)
            .map((item: batchType) => item);
            if(enrolledBatch){
              setBatchNames(enrolledBatch)
            }
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleFetch();
  }, [user.name]);

  return (
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
          {batchNames.map((item, index) => (
            <Card key={index} className="border-purple-200 bg-purple-50">
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
                <p className="text-sm text-gray-600 mb-4">
                  Learn the fundamentals of OOP concepts
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EnrolledCoursesDemo;
