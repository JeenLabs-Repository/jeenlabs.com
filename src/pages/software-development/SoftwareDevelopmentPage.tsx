import { Link } from 'react-router-dom'

import { MarketingPage } from '@/components/marketing/MarketingPage'
import { ImageTextSplit, TextWide } from '@/components/marketing/sections'
import { Button } from '@/components/ui/button'
import { SITE_ROUTES } from '@/config/site'

export function SoftwareDevelopmentPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.softwareDevelopment}>
      <TextWide title="Tailored software for your business needs">
        <p>
          From MVPs to mature products, we design and build software aligned with
          your workflows, users, and growth plans.
        </p>
      </TextWide>
      <ImageTextSplit title="Software Projects" imageLabel="Software project board" imagePosition="right">
        <p>
          Portals, dashboards, integrations, and greenfield apps — delivered in
          iterative milestones with clear acceptance criteria.
        </p>
      </ImageTextSplit>
      <ImageTextSplit
        title="Request a quote"
        imageLabel="Project planning session"
        imagePosition="left"
        action={
          <Button asChild className="h-11 bg-brand text-white hover:bg-brand/90">
            <Link to={SITE_ROUTES.contactUs.path}>Request a quote</Link>
          </Button>
        }
      >
        <p>Share your requirements and timeline — we will respond with a scoped proposal.</p>
      </ImageTextSplit>
    </MarketingPage>
  )
}
