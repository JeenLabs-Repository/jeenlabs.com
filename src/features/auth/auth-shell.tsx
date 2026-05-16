import Link from "next/link"
import { Suspense } from "react"

import { AuthAside } from "@/features/auth/auth-aside"
import { AuthModeTabs } from "@/features/auth/auth-mode-tabs"
import { ThemeToggleButton } from "@/features/landing/theme-toggle"
import { BrandLogo } from "@/shared/components/brand/logo"
import { appUrl } from "@/lib/auth-urls"
import { cn } from "@/lib/utils"

export function AuthShell({
  mode,
  title,
  description,
  children,
  compactForm,
}: {
  mode: "sign-in" | "sign-up"
  title: string
  description: string
  children: React.ReactNode
  compactForm?: boolean
}) {
  return (
    <div className="auth-page auth-page-bg relative flex flex-col">
      <div
        aria-hidden
        className="auth-page-noise pointer-events-none absolute inset-0"
      />

      <header className="relative z-10 flex shrink-0 items-center justify-between px-4 py-3 sm:px-6 lg:justify-end lg:px-10 lg:py-4 xl:px-14">
        <Link
          href={appUrl}
          className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground lg:hidden"
        >
          ← Back
        </Link>
        <ThemeToggleButton />
      </header>

      <main className="auth-page-main relative z-10">
        <div className="auth-card">
          <AuthAside mode={mode} />

          <div
            className={cn(
              "auth-card-form",
              compactForm && "auth-card-form--compact",
            )}
          >
            <header className="auth-card-form-header">
              <BrandLogo size="md" className="lg:hidden" />
              <div className="flex flex-col gap-2">
                <h1 className="auth-card-form-title">{title}</h1>
                <p className="auth-card-form-lead lg:hidden">{description}</p>
              </div>
            </header>

            <Suspense
              fallback={
                <div className="h-10 shrink-0 rounded-full bg-muted/50" />
              }
            >
              <AuthModeTabs active={mode} />
            </Suspense>

            {children}
          </div>
        </div>
      </main>

      <footer className="relative z-10 shrink-0 px-4 pb-5 pt-2 text-center sm:px-6 lg:hidden">
        <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground/50 uppercase">
          Secure sign-in · auth.jeenlabs.com
        </p>
        <p className="mt-2 text-muted-foreground/70 text-xs">
          <Link
            href={appUrl}
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            ← Return to jeenlabs.com
          </Link>
        </p>
      </footer>
    </div>
  )
}
