"use client"

import { useMemo } from "react"

import type { NavItem } from "@/features/landing/nav"
import { PUBLIC_NAV_ITEMS } from "@/features/landing/nav"
import { authClient } from "@/lib/auth-client"

export function useNavItems(): readonly NavItem[] {
  const { data: session } = authClient.useSession()

  return useMemo(() => {
    if (!session) {
      return PUBLIC_NAV_ITEMS
    }

    return [
      { label: "home", href: "/", ariaLabel: "Home" },
      { label: "dashboard", href: "/dashboard", ariaLabel: "Dashboard" },
    ] as const
  }, [session])
}
