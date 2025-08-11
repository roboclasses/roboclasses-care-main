'use client'

import { imageIcons } from "@/data/dataStorage";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getUserSession } from "@/lib/session";


interface ILayoutType {
  children: ReactNode;
}

export default function StudentDashboardLayout({ children }: ILayoutType) {
const path = usePathname();
const [user, setUser] = useState({name:"", role:""})

 // Handle fetch logged-in user session
useEffect(()=>{
    const handleFetch = async()=>{
        try {
            const session = await getUserSession();
            if(!session.name || !session.role) throw new Error('No user session is found.')
            setUser({name: session.name, role: session.role})
        } catch (error) {
            console.error(error);
        }
    }
    handleFetch();
},[])

  return (
    <div className="flex flex-col justify-center items-center lg:gap-10 gap-20">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Student" />
                <AvatarFallback>{<User size={16}/>}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 text-sm">Ready to continue your learning journey?</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge variant="destructive" className="ml-2">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>

     <div className="grid lg:grid-cols-6 grid-cols-2 gap-5 lg:w-full w-[400px] px-5 py-5 bg-muted/50">
        {imageIcons.map((item) => (
          <Link href={`/students/dashboard/${item.slug}`} key={item.slug} prefetch>
            <Image
              src={item.img}
              height={400}
              width={450}
              alt={item.alt}
              loading="lazy"
              className={cn("rounded-xl shadow-sm hover:shadow-2xl transition-all duration-100 delay-75" , 
              (path.includes(item.slug)) ? "filter grayscale blur-sm transition-all duration-150 delay-75 hover:shadow-none" : "")}
            />
          </Link>
        ))}
      </div>

      <div className="lg:w-full w-[400px] min-h-dvh lg:px-20 px-5">
        {children}
      </div>
    </div>
  );
}
