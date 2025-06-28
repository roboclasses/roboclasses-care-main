import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/NavBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Viewport } from "next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROBO CLASSES care",
  description: "STEM Accredited robotics and coding courses.",
  icons: {
    icon: "/favicon.ico",
  },
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
