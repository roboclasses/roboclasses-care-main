import "./globals.css";

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import type { Viewport } from "next";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROBO CLASSES care",
  description: "STEM Accredited robotics and coding courses.",
  ...(process.env.NODE_ENV === "production" && {
    icons: {
      icon: "/favicon.ico",
    },
  }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased overflow-x-hidden`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <NavBar />
            <main>
              {children}
              <Toaster />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
