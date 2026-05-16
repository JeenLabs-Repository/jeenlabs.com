import { Suspense } from "react"
import type { Metadata } from "next"

import { AuthShell } from "@/features/auth/auth-shell"
import { SignUpForm } from "@/features/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your jeenlabs account.",
}

export default function SignUpPage() {
  return (
    <AuthShell
      mode="sign-up"
      title="Create your account"
      description="One login for studio updates. Use email or your existing GitHub / Google."
    >
      <Suspense fallback={<p className="text-center text-muted-foreground text-sm">Loading…</p>}>
        <SignUpForm />
      </Suspense>
    </AuthShell>
  )
}
