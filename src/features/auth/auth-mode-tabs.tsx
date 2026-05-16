"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { authPath } from "@/lib/auth-urls"
import { cn } from "@/lib/utils"

export function AuthModeTabs({ active }: { active: "sign-in" | "sign-up" }) {
  const searchParams = useSearchParams()
  const query = searchParams.toString()
  const suffix = query ? `?${query}` : ""

  const tabs = [
    { id: "sign-in" as const, label: "Sign in", href: `${authPath("sign-in")}${suffix}` },
    { id: "sign-up" as const, label: "Create account", href: `${authPath("sign-up")}${suffix}` },
  ]

  return (
    <div
      className="auth-mode-tabs grid grid-cols-2 gap-1 rounded-full border border-border/60 bg-muted/40 p-1"
      role="tablist"
      aria-label="Account mode"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          role="tab"
          aria-selected={active === tab.id}
          className={cn(
            "rounded-full px-3 py-2 text-center font-medium text-sm transition-colors lg:py-1.5 lg:text-[13px]",
            active === tab.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}
