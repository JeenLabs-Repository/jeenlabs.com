import { NAV_MENU_ROUTES } from '@/config/site'

export type NavItem = {
  label: string
  href: string
  ariaLabel: string
}

/** All marketing routes for staggered menu testing */
export const SITE_MENU_ITEMS: readonly NavItem[] = NAV_MENU_ROUTES.map((route) => ({
  label: route.menuLabel,
  href: route.path,
  ariaLabel: route.label,
}))
