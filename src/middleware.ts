import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const AUTH_PATHS = ["/sign-in", "/sign-up"] as const

/**
 * In production, send auth UI on the main domain to auth.jeenlabs.com.
 * Local dev keeps /sign-in on localhost unless you map auth.localhost.
 */
export function middleware(request: NextRequest) {
  const authHost = process.env.AUTH_HOST?.trim()
  // Only redirect when explicitly enabled — avoids sending users to an undeployed subdomain.
  if (
    !authHost ||
    process.env.AUTH_SUBDOMAIN_ENABLED !== "true" ||
    process.env.NODE_ENV !== "production"
  ) {
    return NextResponse.next()
  }

  const { pathname, hostname } = request.nextUrl
  const isAuthPath = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )

  if (!isAuthPath) {
    return NextResponse.next()
  }

  if (hostname === authHost) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.protocol = "https:"
  url.hostname = authHost
  url.port = ""
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/sign-in", "/sign-up"],
}
