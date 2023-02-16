import { NextRequest, NextResponse } from "next/server";
import { CookieTokenList } from "./common/cookie/cookies";

export function middleware(req: NextRequest) {

  const isSignIn =
    req.cookies.get(CookieTokenList.BACKEND_ACCESS_TOKEN)?.valueOf() != null;

  const unAuthPageUrls = [
    req.nextUrl.pathname.startsWith("/apps/calendar"),
    req.nextUrl.pathname.startsWith("/apps/user/list"),
    req.nextUrl.pathname.startsWith("/_next"),
    req.nextUrl.pathname.startsWith("/images"),
    req.nextUrl.pathname.startsWith("/login"),
    req.nextUrl.pathname.startsWith("/auth/callback/google"),
    req.nextUrl.pathname === "/"
  ].some((value) => { return value; })
  if (
    !isSignIn &&
    !unAuthPageUrls
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
