'use client'

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen, Users } from "lucide-react";
import { getUserSession } from "@/lib/session";
import { batchType } from "@/types/Types";
import axios from "axios";
import { NewBatchEntryUrl } from "@/constants";
import Cookies from "js-cookie";

// mock data for mapping enrolled courses
// const Data = [
//   {
//     id: 1,
//     percentage: "75% Complete",
//     course: "Object Oriented Programming",
//     description: "Learn the fundamentals of OOP concepts",
//     weeks: "12 weeks",
//     students: "45 students",
//     color: "purple",
//   },
//    {
//     id: 2,
//     percentage: "60% Complete",
//     course: "Database Systems",
//     description: "Fundamentals of database design and SQL",
//     weeks: "14 weeks",
//     students: "38 students",
//     color: "indigo",
//   },
//    {
//     id: 3,
//     percentage: "90% Complete",
//     course: "Data Structures",
//     description: "Advanced data structures and algorithms",
//     weeks: "16 weeks",
//     students: "52 students",
//     color: "green",
//   },
//    {
//     id: 4,
//     percentage: "30% Complete",
//     course: "Web Development",
//     description: "Modern web development with React",
//     weeks: "10 weeks",
//     students: "67 students",
//     color: "orange",
//   },
// ];

const EnrolledCoursesDemo = () => {
  const [user, setUser] = useState({name:"", role:""});
  const [batches, setBatches] = useState<batchType[] | null>(null);

  // Get the logged-in user session
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const session = await getUserSession();
        if(!session.role || !session.name){
          throw new Error("No user session is found.")
        }
        setUser({name: session.name, role: session.role})
        
      } catch (error) {
        console.error(error);
      }
    }

    handleFetch();
  },[])

  // Get enrolled students batches and classes
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const res = await axios.get(NewBatchEntryUrl, {headers:{Authorization: Cookies.get("token")}});
        console.log(res.data);
        setBatches(res.data)
        
      } catch (error) {
        console.error(error);
      }
    }
    handleFetch();
  },[])

  // Filter logged-in user details
  const filteredBatches = useMemo(()=>{
    if(!batches) return [];

   return batches.filter((item:batchType)=>{
      if(item.studentName && item.studentName !== user.name) return false;
      return true;
    })
  },[batches, user.name])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Enrolled Courses</CardTitle>
        <Badge variant="secondary">4 Courses</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBatches?.map((item:batchType)=>(
            <Card className={`border-purple-200 bg-purple-50`} key={item._id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <Badge
                  variant="secondary"
                  className={`bg-purple-100 text-purple-700`}
                >
                  75% Complete
                </Badge>
              </div>
              <h3 className="font-semibold mb-2">
                {item.batch}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
               Learn the fundamentals of OOP concepts
              </p>
              <div className={`w-full bg-purple-200 rounded-full h-2 mb-4`}>
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
              <Button className={`w-full bg-purple-600 hover:bg-purple-700`}>
                Continue Course
              </Button>
            </CardContent>
            </Card>
          ))}

        </div>
      </CardContent>
    </Card>
  );
};

export default EnrolledCoursesDemo;
