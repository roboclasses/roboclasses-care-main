"use client";
import * as React from "react";
import {
  BookIcon,
  LayoutDashboard,
  LifeBuoy,
  School,
  Send,
  SquareTerminal,
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
import Link from "next/link";
import Image from "next/image";
import { getUserSession } from "@/lib/session";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOGO_IMG } from "@/constants/images";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const pathname = usePathname();
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [avatar, setAvatar] = useState("")

// Fetch user credentials to set user profile
useEffect(()=>{
  const fetchUserSession = async()=>{
    const user = await getUserSession();
    setName(user.name || 'Guest')  
    setEmail(user.email || 'guest@gmail.com')
    setAvatar(user.name?.slice(0,2) || 'G')
  }
  fetchUserSession();
},[pathname])

 
  const data = {
    user: {
      name: name ,
      email: email ,
      avatar: avatar,
    },
    navMain: [
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
        title:  "Admnin Dashboard",
        url:  "/adminDashboard",
        icon: LayoutDashboard,
        isActive: false,
      },
      {
        title: "Teachers View",
        url: "/teacherView",
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
    // projects: [
    //   {
    //     name: "Upcoming Appointments",
    //     url: "#",
    //     icon: EqualApproximatelyIcon,
    //   },
    //   {
    //     name: "Bulk Appointments",
    //     url: "#",
    //     icon: MessageCircleQuestion,
    //   },
    //   {
    //     name: "Modify Appointments",
    //     url: "#",
    //     icon: Edit2Icon,
    //   },
    // ],
  };

  return (
    <>
      {pathname !== "/login" && pathname !== "/signup" && (
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
            <NavMain items={data.navMain} />
            {/* <NavProjects projects={data.projects} /> */}
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
