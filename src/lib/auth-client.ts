import { createAuthClient } from "better-auth/react"

function resolveAuthBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim()
  if (configured) return configured
  if (typeof window !== "undefined") return window.location.origin
  return undefined
}

export const authClient = createAuthClient({
  baseURL: resolveAuthBaseUrl(),
})
