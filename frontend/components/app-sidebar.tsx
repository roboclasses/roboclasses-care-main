"use client";

import * as React from "react";
import {
  AlignEndVerticalIcon,
  AppWindowMacIcon,
  BookIcon,
  BookOpenIcon,
  Calendar,
  EyeIcon,
  LayoutDashboard,
  LifeBuoy,
  School,
  Send,
  SquareTerminal,
  User2,
  Users,
  View,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LOGO_IMG } from "@/constants/images";
import { getUserSession } from "@/lib/session";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const pathname = usePathname();
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [avatar, setAvatar] = useState("")
const [role, setRole] = useState("")

// Fetch user credentials to set user profile
useEffect(()=>{
  const fetchUserSession = async()=>{
    const user = await getUserSession();
    if(user){
      setName(user.name || 'Guest')  
      setEmail(user.email || 'guest@gmail.com')
      setRole(user.role || '')
      setAvatar(user.name?.slice(0,2) || 'G')
    }
  }
  fetchUserSession();
},[pathname])

 // Views data (side-bar)
  const data = {
    user: {
      name: name ,
      email: email ,
      avatar: avatar,
    },

    navMainAdmin: [
      {
        title: "Take Appointment",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Register a Student",
            url: "/appointment/studentRegister",
          },
          {
            title: "Demo Class",
            url: "/appointment/reminder/demo-class",
          },
          {
            title: "Normal Class",
            url: "/appointment/reminder/normal-class",
          },
           {
            title: "Parent Teacher meeting",
            url: "/appointment/PTM",
          },
        ],
      },
      {
        title:  "Admin Dashboard",
        url:  "/adminDashboard",
        icon: LayoutDashboard,
        isActive: false,
      },
      {
        title: "Manage Attendance",
        url: "/manageAttendance",
        icon: AlignEndVerticalIcon,
      },
      {
        title: "New Batch Entry",
        url: "/newBatchEntry",
        icon: School,
      },
      {
        title: "New Course Entry",
        url: "/courseEntry",
        icon: BookIcon,
      },
      {
        title: "Manage Roles",
        url: "/manageRoles",
        icon: Users,
      },
      {
        title: "Time Off",
        url: "/timeOff",
        icon: Calendar,
      },
      {
        title: "Teachers Availability",
        url: "/teachersAvailability",
        icon: User2,
      },
      {
        title: "Assessment Generator",
        url: "/assessmentGenerator",
        icon: BookOpenIcon,
      },
      {
        title: "Assessment Viewer",
        url: "/assessmentViewer",
        icon: View,
      },
      {
        title: "Feedback Admin",
        url: "/feedbackAdmin",
        icon: AppWindowMacIcon,
      },
            {
        title: "Feedback Viewer",
        url: "/feedbackViewer",
        icon: View,
      },
    ],

    navMainTeacher: [
      {
        title: "Take Appointment",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Register a Student",
            url: "/appointment/studentRegister",
          },
          {
            title: "Demo Class",
            url: "/appointment/reminder/demo-class",
          },
          {
            title: "Normal Class",
            url: "/appointment/reminder/normal-class",
          },
           {
            title: "Parent Teacher meeting",
            url: "/appointment/PTM",
          },
        ],
      },
      {
        title:  "Admin Dashboard",
        url:  "/adminDashboard",
        icon: LayoutDashboard,
        isActive: false,
      },
      {
        title: "Manage Attendance",
        url: "/manageAttendance",
        icon: View,
      },
      {
        title: "New Batch Entry",
        url: "/newBatchEntry",
        icon: School,
      },
      {
        title: "New Course Entry",
        url: "/courseEntry",
        icon: BookIcon,
      },
      {
        title: "Time Off",
        url: "/timeOff",
        icon: Calendar,
      },
      {
        title: "Teachers Availability",
        url: "/teachersAvailability",
        icon: AlignEndVerticalIcon,
      },
      {
        title: "Assessment Generator",
        url: "/assessmentGenerator",
        icon: BookOpenIcon,
      },
      {
        title: "Assessment Viewer",
        url: "/assessmentViewer",
        icon: EyeIcon,
      },
    ],

    navMainStudent: [
      {
        title: "Take Appointment",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Register a Student",
            url: "/appointment/studentRegister",
          },
        ],
      },
    ],
    
    navMainContractor: [
      {
        title: "Take Appointment",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Demo Class",
            url: "/appointment/reminder/demo-class",
          },
          {
            title: "Normal Class",
            url: "/appointment/reminder/normal-class",
          },
        ],
      },
      {
        title:  "Admin Dashboard",
        url:  "/adminDashboard",
        icon: LayoutDashboard,
        isActive: false,
      },
      {
        title: "Teachers Availability",
        url: "/teachersAvailability",
        icon: User2,
      },
    ],

    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
  };

  // Swith-Case statement to render specific navitems based on roles
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getNavItems = (role: string) => {
    switch (role) {
      case "admin":
        return data.navMainAdmin;
      case "teacher":
        return data.navMainTeacher;
      case "student":
        return data.navMainStudent;
      case "contractor":
        return data.navMainContractor;  
      default:
        return [];
    }
  };
  
  // Used use-memo hook to prevent unnecessary re renders
  const navItems = React.useMemo(() => getNavItems(role), [getNavItems, role]);
  
  return (
    <>
      {(!pathname.startsWith("/login") && !pathname.startsWith("/signup")) &&  (
        <Sidebar variant="inset" {...props}>
          <SidebarHeader className="rounded">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/">
                    <Image
                      src={LOGO_IMG}
                      height={100}
                      width={150}
                      alt="robo-class-logo"
                    />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <NavMain items={navItems} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={data.user} />
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
}
