import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Public routes that should only be accessible when not logged in
  const authRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"]

  // Paths that require authentication
  const protectedRoutes = ["/dashboard", "/boards", "/workspace", "/settings", "/profile"]

  // Check if the user is trying to access auth routes while logged in
  if (token && authRoutes.some((route) => request.nextUrl.pathname === route)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Check if the user is trying to access protected routes without being logged in
  if (!token && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/dashboard",
    "/boards/:path*",
    "/workspace/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
}

