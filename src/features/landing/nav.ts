export type NavItem = {
  label: string
  href: string
  ariaLabel: string
}

import { authPath } from "@/lib/auth-urls"

export const PUBLIC_NAV_ITEMS: readonly NavItem[] = [
  { label: "home", href: "/", ariaLabel: "Home" },
  { label: "sign in", href: authPath("sign-in"), ariaLabel: "Sign in" },
] as const

export const NAV_ITEMS = PUBLIC_NAV_ITEMS
