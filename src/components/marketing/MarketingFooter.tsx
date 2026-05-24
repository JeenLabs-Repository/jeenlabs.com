import { Link } from 'react-router-dom'

import { BrandLogo } from '@/components/brand/logo'
import { SITE_ROUTES } from '@/config/site'

const FOOTER_LINKS = [
  SITE_ROUTES.services,
  SITE_ROUTES.aboutUs,
  SITE_ROUTES.contactUs,
  SITE_ROUTES.blog,
  SITE_ROUTES.pricing,
  SITE_ROUTES.privacyPolicy,
  SITE_ROUTES.termsOfService,
  SITE_ROUTES.cookies,
] as const

export function MarketingFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-[75rem] flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="space-y-3">
          <Link to={SITE_ROUTES.home.path} aria-label="JeenLabs home">
            <BrandLogo size="sm" />
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Automation, software, and website development — built with craft.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
            {FOOTER_LINKS.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border px-4 py-4 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-[75rem] text-xs text-muted-foreground">
          © {new Date().getFullYear()} JeenLabs. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
