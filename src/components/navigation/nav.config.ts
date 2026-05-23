export type NavItem = {
  label: string
  href: string
  ariaLabel: string
}

/** Extend when new pages are added */
export const SITE_MENU_ITEMS: readonly NavItem[] = [
  { label: 'home', href: '/', ariaLabel: 'Home' },
] as const
