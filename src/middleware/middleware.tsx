import { NextRequest, NextResponse } from "next/server";
import { CookieTokenList } from "./../common/cookie/cookies";

export function middleware(req: NextRequest) {

  let isSignIn =
    req.cookies.get(CookieTokenList.BACKEND_ACCESS_TOKEN)?.valueOf() != null;

  const unAuthPageUrls = [
    "/apps/calendar",
    "/apps/user/list",
    "/login",
    "/auth/callback/google"
  ]
  if (
    !isSignIn &&
    unAuthPageUrls.some((value) => {
      return value !== req.nextUrl.pathname;
    })
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}
