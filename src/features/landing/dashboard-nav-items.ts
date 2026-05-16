"use client"

import { useMemo } from "react"

import type { NavItem } from "@/features/landing/nav"
import { authClient } from "@/lib/auth-client"

export function useDashboardNavItems(): readonly NavItem[] {
  const { data: session } = authClient.useSession()

  return useMemo(() => {
    if (!session) {
      return [
        { label: "home", href: "/", ariaLabel: "Home" },
        { label: "sign in", href: "/sign-in", ariaLabel: "Sign in" },
      ] as const
    }

    return [
      { label: "home", href: "/", ariaLabel: "Home" },
      { label: "dashboard", href: "/dashboard", ariaLabel: "Dashboard" },
    ] as const
  }, [session])
}
