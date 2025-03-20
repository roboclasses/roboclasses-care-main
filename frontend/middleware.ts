'use server'
import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const protectedRoutePrefixes = ["/", "/adminDashboard", "/appointment", "/newBatchEntry", "/manageAttendance", "/courseEntry", "/userDashboard"];
    const studentRoutePrefixes = ["/newBatchEntry", "/adminDashboard", "/manageAttendance", "/courseEntry", "/userDashboard",  "/appointment/reminder/normal-class", "/appointment/reminder/demo-class"] ;
    // const teacherRoutePrefixes = ["/courseEntry", "/newBatchEntry", "/appointment/studentRegister"]
    const publicRoutes = ["/login", "/signup"];
    const currentPath = req.nextUrl.pathname;

    // Exclude public routes from middleware
    if (publicRoutes.includes(currentPath)) {
        return NextResponse.next();
    }

    const isProtectedRoute = protectedRoutePrefixes.some(prefix => currentPath.startsWith(prefix));
    const isStudentRoute = studentRoutePrefixes.some(prefix => currentPath.startsWith(prefix));
    // const isTeacherRoute  = teacherRoutePrefixes.some(prefix => currentPath.startsWith(prefix));

    if (isProtectedRoute) {
        const isAuth = req.cookies.get("token")?.value;
        const role = req.cookies.get("role")?.value;

        // Protection from not authenticated users
        if (!isAuth) {
            return NextResponse.redirect(new URL("/login", req.nextUrl));
        }
        // Student views
        if (isStudentRoute && !(role === "admin" || role === "teacher")) {
            return NextResponse.redirect(new URL("/", req.nextUrl));
        }
        // Teacher views
        // if(isTeacherRoute && !(role === "admin" || role === "student")){
        //     return NextResponse.redirect(new URL("/", req.nextUrl))
        // }
    }

    return NextResponse.next();
}

// Exclude API routes, static files, and assets
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/).*)"]
};
