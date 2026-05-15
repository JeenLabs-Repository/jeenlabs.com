export type NavItem = {
  label: string
  href: string
  ariaLabel: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "home", href: "/", ariaLabel: "Home" },
] as const
