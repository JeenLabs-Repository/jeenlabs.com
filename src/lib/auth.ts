import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"

import { authAllowedHosts, authCookieDomain } from "@/lib/auth-env"
import { prisma } from "@/lib/prisma"

const trustedOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_APP_URL,
].filter((value): value is string => Boolean(value))

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mysql" }),
  trustedOrigins,
  plugins: [nextCookies()],
  baseURL: {
    allowedHosts: authAllowedHosts,
    protocol: process.env.NODE_ENV === "production" ? "https" : "http",
    fallback: process.env.BETTER_AUTH_URL,
  },
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  ...(authCookieDomain
    ? {
        advanced: {
          crossSubDomainCookies: {
            enabled: true,
            domain: authCookieDomain,
          },
        },
      }
    : {}),
})
