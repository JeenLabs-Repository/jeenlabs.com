import Link from "next/link"
import { Check, Lock, Zap } from "lucide-react"

import { BrandLogo } from "@/shared/components/brand/logo"
import { appUrl } from "@/lib/auth-urls"
import { cn } from "@/lib/utils"

const SIGN_IN_ITEMS = [
  "Roadmap and milestone updates",
  "Deliverables without email threads",
  "Direct line when something blocks you",
] as const

const SIGN_UP_ITEMS = [
  "Invite teammates after setup",
  "Scope, timelines, and open questions",
  "Resume conversations anytime",
] as const

export function AuthAside({ mode }: { mode: "sign-in" | "sign-up" }) {
  const items = mode === "sign-in" ? SIGN_IN_ITEMS : SIGN_UP_ITEMS
  const heading =
    mode === "sign-in" ? "Your studio workspace" : "Set up in minutes"
  const lead =
    mode === "sign-in"
      ? "Stay aligned with the jeenlabs team — updates, files, and messages in one place."
      : "One login for project updates, shared files, and team chat."

  return (
    <aside
      className={cn(
        "auth-card-aside relative min-h-0 flex-col justify-between overflow-hidden border-border/50 border-r",
        "px-10 py-9 xl:px-12 xl:py-10",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-brand/50 to-transparent"
      />

      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <div className="flex max-w-sm flex-col gap-8">
          <BrandLogo size="lg" className="self-start" />

          <div className="flex flex-col gap-3">
            <h2 className="auth-aside-heading max-w-[15ch]">{heading}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {lead}
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-snug">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Check className="size-3" strokeWidth={2.5} aria-hidden />
                </span>
                <span className="text-foreground/88">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex shrink-0 flex-col gap-4 border-border/40 border-t pt-6">
        <div className="flex items-start gap-3 text-muted-foreground text-xs leading-relaxed">
          <Lock className="mt-0.5 size-3.5 shrink-0 text-brand/80" aria-hidden />
          <p>Encrypted sessions. Sign out from any device in settings.</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-muted-foreground/60 uppercase">
            <Zap className="size-3 text-brand/70" aria-hidden />
            <span>auth.jeenlabs.com</span>
          </div>
          <Link
            href={appUrl}
            className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            ← jeenlabs.com
          </Link>
        </div>
      </div>
    </aside>
  )
}
