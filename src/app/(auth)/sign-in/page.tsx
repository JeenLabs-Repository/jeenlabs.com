import { Suspense } from "react"
import type { Metadata } from "next"

import { AuthShell } from "@/features/auth/auth-shell"
import { SignInForm } from "@/features/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your jeenlabs account.",
}

export default function SignInPage() {
  return (
    <AuthShell
      mode="sign-in"
      compactForm
      title="Welcome back"
      description="Pick up where you left off — client updates and project tools live here."
    >
      <Suspense fallback={<p className="text-center text-muted-foreground text-sm">Loading…</p>}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  )
}
