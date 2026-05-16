function parseAllowedHosts(raw: string | undefined): string[] {
  if (!raw?.trim()) {
    return [
      "localhost:3000",
      "127.0.0.1:3000",
      "auth.localhost:3000",
      "auth.jeenlabs.com",
      "jeenlabs.com",
      "www.jeenlabs.com",
    ]
  }
  return raw.split(",").map((h) => h.trim()).filter(Boolean)
}

export const authAllowedHosts = parseAllowedHosts(
  process.env.BETTER_AUTH_ALLOWED_HOSTS,
)

export const authCookieDomain = process.env.AUTH_COOKIE_DOMAIN
