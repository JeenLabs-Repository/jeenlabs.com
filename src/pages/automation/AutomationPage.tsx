import { Link } from 'react-router-dom'

import { MarketingPage } from '@/components/marketing/MarketingPage'
import { ImageTextSplit, TextWide } from '@/components/marketing/sections'
import { Button } from '@/components/ui/button'
import { SITE_ROUTES } from '@/config/site'

export function AutomationPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.automation}>
      <TextWide title="Optimize your operations with automation">
        <p>
          Replace manual hand-offs with dependable automation — from spreadsheet
          workflows to API integrations and scheduled reporting.
        </p>
      </TextWide>
      <ImageTextSplit title="Automation Tools" imageLabel="Automation dashboard" imagePosition="left">
        <p>
          We audit your process, identify bottlenecks, and implement automation
          that your team can monitor and extend.
        </p>
      </ImageTextSplit>
      <ImageTextSplit
        title="Contact us for a demo"
        imageLabel="Product demo preview"
        imagePosition="right"
        action={
          <Button asChild className="h-11 bg-brand text-white hover:bg-brand/90">
            <Link to={SITE_ROUTES.contactUs.path}>Book a demo</Link>
          </Button>
        }
      >
        <p>See how automation can save hours each week — tailored to your stack.</p>
      </ImageTextSplit>
    </MarketingPage>
  )
}
