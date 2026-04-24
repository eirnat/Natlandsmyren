import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ACCESS_COOKIE_NAME = "site_access";
const EXEMPT_PATHS = ["/under-utvikling", "/preview", "/studio"];

function isExemptPath(pathname: string): boolean {
  return EXEMPT_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isExemptPath(pathname) || isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.get(ACCESS_COOKIE_NAME)?.value === "true";
  if (hasAccess) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/under-utvikling";
  redirectUrl.search = "";

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/:path*"],
};
