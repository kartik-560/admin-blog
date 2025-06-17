import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("admin-auth");
  const isLoggedIn = cookie?.value === "true";

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // ✅ Debug log
  console.log("🔒 [Middleware] admin-auth cookie:", cookie?.value);

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// ✅ Ensure middleware only runs for /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
