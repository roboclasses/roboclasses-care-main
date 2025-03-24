import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import NavBar from "@/components/NavBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Viewport } from 'next'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ROBO CLASSES care",
  description: "STEM Accredited robotics and coding courses",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // themeColor: 'black',
  // colorScheme: 'dark'
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <NavBar/>
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>  
        <Toaster />
      </body>
    </html>
  );
}
