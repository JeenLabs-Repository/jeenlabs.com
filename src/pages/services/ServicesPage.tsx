import { MarketingPage } from '@/components/marketing/MarketingPage'
import { ThreeColText } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

export function ServicesPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.services}>
      <ThreeColText
        columns={[
          {
            title: 'Automation Solutions',
            body: 'Connect tools, automate reporting, and eliminate repetitive tasks with reliable workflows built for your team.',
          },
          {
            title: 'Software Development',
            body: 'Ship custom applications, internal tools, and customer-facing products with maintainable architecture.',
          },
          {
            title: 'Website Development',
            body: 'Launch fast, accessible sites with strong SEO foundations and conversion-focused design.',
          },
        ]}
      />
    </MarketingPage>
  )
}
