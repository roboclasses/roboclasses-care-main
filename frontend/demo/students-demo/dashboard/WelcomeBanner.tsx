"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StudentRegUrl, UserProfileUrl } from "@/constants";
import { STUDENT_PROFILE } from "@/constants/images";
import { studentType } from "@/types/Types";
import axios from "axios";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const WelcomeBanner = ({value, onValueChange}:{value:string, onValueChange:(val:string)=>void}) => {
  const [user, setUser] = useState({ name: "", role: "" });
  const [students, setStudents] = useState([]);
  const pathname = usePathname();

  // Handle logged-in user session
    useEffect(()=>{
    const doFetch = async()=>{
      try {
        const res = await axios.get(UserProfileUrl, {withCredentials: true, headers:{ Authorization:Cookies.get("token") }});
        console.log(res.data);

        setUser({role: res.data.role, name: res.data.name})
        
      } catch (error) {
        console.error(error);
      }
    }

    if(pathname.startsWith('/students')){
      doFetch();
    }

  },[pathname])

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
              <h1 className="lg:text-3xl font-bold mb-2">Welcome back </h1>
              {/* Admin only dropdown for selecting students */}
              {user.role === "admin" ? (
                <div>
                  <Select value={value} onValueChange={onValueChange}>
                    <SelectTrigger className="w-[180px] bg-white text-black" >
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
                <p className="lg:text-3xl font-semibold mb-2">{user.name} !</p>
              )}
            </div>
            <p className="text-purple-100 ">
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
