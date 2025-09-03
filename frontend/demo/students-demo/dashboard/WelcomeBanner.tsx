"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StudentRegUrl } from "@/constants";
import { STUDENT_PROFILE } from "@/constants/images";
import { getUserSession } from "@/lib/session";
import { studentType } from "@/types/Types";
import axios from "axios";

import Image from "next/image";
import { useEffect, useState } from "react";

const WelcomeBanner = () => {
  const [user, setUser] = useState({ name: "", role: "" });
  const [students, setStudents] = useState([]);

  // Handle logged-in user session
  useEffect(() => {
    const handleFetch = async () => {
      const session = await getUserSession();
      if (!session.name || !session.role) {
        throw new Error("User session not found.");
      }
      setUser({ name: session.name, role: session.role });
    };

    handleFetch();
  }, []);

  // Handle fetch students
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const res = await axios.get(StudentRegUrl)
        console.log(res.data);
        setStudents(res.data)
      } catch (error) {
        console.error(error);
      }
    }
    handleFetch();
  },[])

  return (
    <Card className="mb-8 bg-custom-gradient text-white border-0">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold mb-2">Welcome back </h1>
              {/* Admin only dropdown for selecting students */}
              {user.role === "admin" ? (
                <div>
                  <Select>
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Students</SelectLabel>
                        {students.map((item:studentType)=>(
                          <SelectItem key={item._id} value={item.studentName}>{item.studentName}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                "!"
              )}
            </div>
            <p className="text-purple-100">
              Always stay updated in your student portal
            </p>
          </div>
          <div className="w-32 h-32">
            <Image
              src={STUDENT_PROFILE}
              height={500}
              width={500}
              alt="Student illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
