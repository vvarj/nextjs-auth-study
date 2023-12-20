import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request.url);
  console.log(request.nextUrl?.pathname);
  const pathName = String(request.nextUrl?.pathname);
  const isPublicPath =
    pathName === "/login" || pathName === "/signup" || pathName === "/";
  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!token && pathName === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/about/:path*", "/login", "/signup", "/profile/:path*"],
};
