import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Get JWT from cookies
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if no token
  }

  return NextResponse.next(); // Allow access if token exists
}

// Protect only specific routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/candidates/:path*",
    "/compare/:path*",
    "/add-candidate/:path*",
    "/hired/:path*",
    "/insights/:path*",
  ], // Add your protected routes
};
