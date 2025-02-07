'use server'
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server"

export default function middleware(req:NextRequest){
    // 1.Check if route is protected
    const protectedRoutes = ["/","/adminDashboard", "/appointment", "/newBatchEntry", "/teacherView"]
    const adminRoutes = ["/adminDashboard", "/newBatchEntry", "/teacherView"]
    const currentPath = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(currentPath);
    const isAdminRoutes = adminRoutes.includes(currentPath);


    if(isProtectedRoute)
    {
        //2. Check for user session
        const isAuth = cookies().get("token")?.value
        const role = cookies().get("role")?.value

        //3. Redirect unauthorized users
        if(!isAuth)
        {
            return NextResponse.redirect(new URL("/login", req.nextUrl))
        }

        // 4. Give routes access to admin and teacher role only
        if(isAdminRoutes && !(role === "admin" || role === "teacher"))
        {
            return NextResponse.redirect(new URL("/", req.nextUrl))
        }
    }
    return NextResponse.next();
}

// Routes middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}