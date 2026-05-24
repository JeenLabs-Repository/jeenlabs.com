import { MarketingPage } from '@/components/marketing/MarketingPage'
import { TextWide } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

export function CookiesPage() {
  const seo = {
    ...SITE_ROUTES.cookies,
    description:
      'Learn how JeenLabs uses cookies for essential functionality, preferences, and analytics.',
  }

  return (
    <MarketingPage seo={seo}>
      <TextWide title="Cookie policy">
        <p>
          Cookies are small files stored on your device. We use essential cookies to
          operate the site, preference cookies to remember settings such as theme, and
          analytics cookies only when you accept all cookies via our consent banner.
        </p>
        <p>
          You can change your choice anytime by clearing site data or using the banner
          when it reappears after expiry.
        </p>
      </TextWide>
    </MarketingPage>
  )
}
