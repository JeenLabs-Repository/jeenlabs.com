"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

import { AuthField } from "@/features/auth/auth-field"
import { SocialAuthButtons } from "@/features/auth/social-auth-buttons"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { defaultCallbackUrl } from "@/lib/auth-urls"

export function SignUpForm() {
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get("callbackUrl") ?? defaultCallbackUrl

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match." })
      return
    }

    if (password.length < 8) {
      setFieldErrors({ password: "Use at least 8 characters." })
      return
    }

    setLoading(true)

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL,
    })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message ?? "Could not create your account. Try again.")
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

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-5">
          <AuthField
            id="name"
            label="Full name"
            autoComplete="name"
            placeholder="Alex Chen"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <AuthField
            id="email"
            label="Work email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <AuthField
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            required
          />
          <AuthField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={fieldErrors.confirmPassword}
            required
          />
        </div>

        {error ? (
          <p
            className="rounded-xl border border-destructive/25 bg-destructive/8 px-3.5 py-2.5 text-destructive text-sm"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <Button type="submit" className="h-11 w-full rounded-xl" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="text-center text-[11px] leading-relaxed text-muted-foreground/80 lg:text-left">
        By continuing you agree to our terms. Email is used for authentication only.
      </p>
    </div>
  )
}
