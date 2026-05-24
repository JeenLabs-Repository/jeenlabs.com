import { Link } from 'react-router-dom'

import { MarketingPage } from '@/components/marketing/MarketingPage'
import { ImageTextSplit, TextWide } from '@/components/marketing/sections'
import { Button } from '@/components/ui/button'
import { SITE_ROUTES } from '@/config/site'

export function WebsiteDevelopmentPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.websiteDevelopment}>
      <TextWide title="Create a professional online presence">
        <p>
          Your website is often the first impression — we build experiences that
          load fast, read clearly, and convert visitors into conversations.
        </p>
      </TextWide>
      <ImageTextSplit
        title="View our portfolio"
        imageLabel="Portfolio website preview"
        imagePosition="left"
        action={
          <Button asChild variant="outline" className="h-11">
            <Link to={SITE_ROUTES.ourClients.path}>See client work</Link>
          </Button>
        }
      >
        <p>Explore examples of marketing sites and product landing pages we have shipped.</p>
      </ImageTextSplit>
      <ImageTextSplit title="Web Design Showcase" imageLabel="Web design mockups" imagePosition="right">
        <p>
          Responsive layouts, accessible typography, and performance budgets baked
          in from day one — not bolted on at launch.
        </p>
      </ImageTextSplit>
    </MarketingPage>
  )
}
