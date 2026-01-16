'use client'
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
// import { getUserSession } from "@/lib/session";
import axios from "axios";
import { UserProfileUrl } from "@/constants";
import Cookies from "js-cookie";

const StudentHeader = () => {
  const pathname = usePathname();
  const {slug} = useParams();
  const [user, setUser] = useState({name:"", role:""})
  const [currentDate, setCurrentDate] = useState<Date | null>(null)

  // For date formatting
  useEffect(()=>{
    setCurrentDate(new Date())
  },[])

  const formattedDate = currentDate ?  new Intl.DateTimeFormat("en-us",{
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(currentDate) : ''

  // Handle fetch student session
  useEffect(()=>{
    const doFetch = async()=>{
      try {
        const res = await axios.get(UserProfileUrl, {withCredentials: true, headers:{Authorization: Cookies.get("token")}});
        console.log(res.data);
        setUser({name: res.data.name, role: res.data.role})
      } catch (error) {
        console.error(error);
      }
    }

    if(pathname.startsWith('/students')){
      doFetch();
    }
  },[pathname])

  // Screen name based on routes data
  const routesData = [
  {id:1, path:'/students/studentDashboard', name:'Student Dashboard'},
  {id:2, path:'/students/courseCatalog', name:'My Courses And Course Catalog'},
  {id:3, path:`/students/courses/${slug}`, name:`${slug}`},
  {id:4, path:'/students/submission', name:'Assessments And Assignments'},
  {id:5, path:'/students/gradesAndProgress', name:'Grades And Progress'},
  {id:6, path:'/students/communication', name:'Communication And Collaboration'},
  {id:7, path:'/students/library', name:' Learning Resources / Library'},
  {id:8, path:'/students/calendar', name:'Calendar / Schedule'},
  {id:9, path:'/students/news', name:'Announcements / News'},
  {id:10, path:'/students/profileAndSettings', name:'Profile and Settings'},
  {id:11, path:'/students/helpAndSupport', name:'Help & Support'},
  ]


  return (
    <div className="flex items-center justify-between mb-8 lg:px-40">
      <div>
        {routesData.map((item)=>(
          <h1 className="text-2xl font-bold text-gray-900" key={item.id}>
            {item.path === pathname ? item.name : ''}
          </h1>
        ))}
        <p className="text-gray-600">{formattedDate}</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            3
          </Badge>
        </Button>
        {user.role === 'student' ? (<div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/assets/images/student-profile.png" />
            <AvatarFallback>{user?.name?.charAt(2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.role === 'student' ? user.name : ''}</p>
            <p className="text-sm text-gray-500">3rd Year</p>
          </div>
        </div>) : <></>}
      </div>
    </div>
  );
};

export default StudentHeader;
