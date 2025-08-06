"use server";

import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  //Routes which are not accessible
  const protectedRoutePrefixes = [
    "/",
    "/adminDashboard",
    "/appointment",
    "/assessmentGenerator",
    "/feedbackAdmin",
    "/courseEntry",
    "/manageAttendance",
    "/manageRoles",
    "/newBatchEntry",
    "/teachersAvailability",
    "/timeOff",
    "/assessmentViewer",
    "/feedbackViewer",
  ];
  const studentRoutePrefixes = [
    "/adminDashboard",
    "/appointment/normal-class",
    "/appointment/demo-class",
    "/assessmentGenerator",
    "/feedbackAdmin",
    "/courseEntry",
    "/manageAttendance",
    "/manageRoles",
    "/newBatchEntry",
    "/teachersAvailability",
    "/timeOff",
    "/assessmentViewer",
    "/feedbackViewer",
  ];

  const contractorRoutePrefixes = [
    "/assessmentGenerator",
    "/feedbackAdmin",
    "/courseEntry",
    "/manageAttendance",
    "/manageRoles",
    "/newBatchEntry",
    "/timeOff",
    "/assessmentViewer",
    "/feedbackViewer",
  ]

  const publicRoutes = ["/login", "/signup"];
  const openRoutePrefixes = ["/assessmentViewer/create", "/feedbackViewer/edit"]
  
  // Get the current pathname
  const currentPath = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(currentPath)
  const isOpenRoute = openRoutePrefixes.some(prefix => currentPath.startsWith(prefix))

  // Exclude public routes from middleware
  if (isPublicRoute || isOpenRoute) {
    return NextResponse.next();
  }

  //Checking the routes prefixes
  const isProtectedRoute = protectedRoutePrefixes.some((prefix) =>
    currentPath.startsWith(prefix)
  );
  const isStudentRoute = studentRoutePrefixes.some((prefix) =>
    currentPath.startsWith(prefix)
  );
  const isContractorRoute = contractorRoutePrefixes.some((prefix) =>
    currentPath.startsWith(prefix)
  );

  if (isProtectedRoute) {
    const isAuth = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;

    // Protection from not authenticated users
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Student views
    if (isStudentRoute && !(role === "admin" || role === "teacher" || role === "contractor")) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    // Contractor views
    if(isContractorRoute && !(role==="admin" || role === "teacher")){
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}


// Exclude API routes, static files, and assets
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/).*)",
  ],
};
