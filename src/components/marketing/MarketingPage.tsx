import type { ReactNode } from 'react'

import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import { JsonLd, organizationJsonLd, webPageJsonLd } from '@/components/seo/JsonLd'
import type { PageSeo } from '@/config/site'
import { usePageSeo } from '@/hooks/use-page-seo'

export function MarketingPage({
  seo,
  children,
  jsonLd,
}: {
  seo: PageSeo
  children: ReactNode
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}) {
  usePageSeo(seo)

  const schema = jsonLd ?? [
    organizationJsonLd(),
    webPageJsonLd(seo.title, seo.description, seo.path),
  ]

  return (
    <>
      <JsonLd data={schema} />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <MarketingFooter />
    </>
  )
}
