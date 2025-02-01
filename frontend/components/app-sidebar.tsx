"use client";

import * as React from "react";
import {
  Edit2Icon,
  EqualApproximatelyIcon,
  LayoutDashboard,
  LifeBuoy,
  MessageCircleQuestion,
  Send,
  SquareTerminal,
  View,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
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
import { LOGO_IMG } from "@/constants/images";
import { usePathname } from "next/navigation";

const data = {
  user: {
    name: "Dev",
    email: "devstidax@gmail.com",
    avatar: { image: LOGO_IMG },
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
      title: "Admnin Dashboard",
      url: "/adminDashboard",
      icon: LayoutDashboard,
      isActive: false,
    },
    {
      title: "Teacher View",
      url: "/teacherView",
      icon: View,
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
  projects: [
    {
      name: "Upcoming Appointments",
      url: "#",
      icon: EqualApproximatelyIcon,
    },
    {
      name: "Bulk Appointments",
      url: "#",
      icon: MessageCircleQuestion,
    },
    {
      name: "Modify Appointments",
      url: "#",
      icon: Edit2Icon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
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
                      src={"/assests/images/logo.svg"}
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
            <NavProjects projects={data.projects} />
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
