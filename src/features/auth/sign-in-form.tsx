"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

import { AuthField } from "@/features/auth/auth-field"
import { SocialAuthButtons } from "@/features/auth/social-auth-buttons"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { defaultCallbackUrl } from "@/lib/auth-urls"
import { cn } from "@/lib/utils"

export function SignInForm() {
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get("callbackUrl") ?? defaultCallbackUrl

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
      callbackURL,
    })

    setLoading(false)

    if (signInError) {
      setError(signInError.message ?? "Could not sign in. Check your details and try again.")
      return
    }

    window.location.assign(callbackURL)
  }

  return (
    <div className="flex flex-col gap-6">
      <SocialAuthButtons callbackURL={callbackURL} disabled={loading} compact />

      <div className="relative flex items-center gap-3">
        <div className="h-px flex-1 bg-border/70" />
        <span className="shrink-0 text-muted-foreground text-xs">or use email</span>
        <div className="h-px flex-1 bg-border/70" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-x-5">
          <AuthField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            compact
          />
          <AuthField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            compact
          />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex cursor-pointer items-center gap-2.5 text-muted-foreground text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 rounded border-border accent-brand"
            />
            Remember this device
          </label>

          <Button
            type="submit"
            className={cn(
              "h-11 w-full rounded-xl lg:h-10 lg:w-auto lg:min-w-[10rem]",
            )}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </div>

        {error ? (
          <p
            className="rounded-xl border border-destructive/25 bg-destructive/8 px-3.5 py-2.5 text-destructive text-sm"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </form>
    </div>
  )
}
