/** Main product site (post-login redirect target). */
export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

/** Auth UI host — production: https://auth.jeenlabs.com */
export const authUrl =
  process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3000"

export const defaultCallbackUrl = "/dashboard"

export function authPath(path: "sign-in" | "sign-up") {
  return `${authUrl}/${path}`
}
