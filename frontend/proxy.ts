"use server";

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // ✅ Public routes (no auth required)
  const publicRoutes = ["/login", "/signup"];

  // ✅ Routes that should always be accessible
  const openRoutePrefixes = [
    "/assessmentViewer/create",
    "/feedbackViewer/edit",
  ];

  // ✅ Protected routes (REMOVED "/" 🚨)
  const protectedRoutePrefixes = [
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
    "/students",
  ];

  // ❗ Routes restricted for students
  const restrictedForStudents = [
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

  // ❗ Routes restricted for contractors
  const restrictedForContractors = [
    "/assessmentGenerator",
    "/feedbackAdmin",
    "/courseEntry",
    "/manageAttendance",
    "/manageRoles",
    "/newBatchEntry",
    "/timeOff",
    "/assessmentViewer",
    "/feedbackViewer",
  ];

  const currentPath = req.nextUrl.pathname;

  // ✅ Allow public & open routes
  const isPublicRoute = publicRoutes.includes(currentPath);
  const isOpenRoute = openRoutePrefixes.some((prefix) =>
    currentPath.startsWith(prefix)
  );

  if (isPublicRoute || isOpenRoute) {
    return NextResponse.next();
  }

  // ✅ Check if route is protected
  const isProtectedRoute = protectedRoutePrefixes.some((prefix) =>
    currentPath.startsWith(prefix)
  );

  if (!isProtectedRoute) {
    return NextResponse.next(); // allow non-protected routes
  }

  // ✅ Get auth data from cookies
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  // 🚨 If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Student restriction
  const isStudentRestrictedRoute = restrictedForStudents.some((prefix) =>
    currentPath.startsWith(prefix)
  );

  if (isStudentRestrictedRoute && role === "student") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Contractor restriction
  const isContractorRestrictedRoute = restrictedForContractors.some((prefix) =>
    currentPath.startsWith(prefix)
  );

  if (isContractorRestrictedRoute && role === "contractor") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// ✅ Exclude API & static files
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/).*)",
  ],
};