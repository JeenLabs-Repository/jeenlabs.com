import { Link } from 'react-router-dom'

import { MarketingPage } from '@/components/marketing/MarketingPage'
import { ImageTextSplit } from '@/components/marketing/sections'
import { Button } from '@/components/ui/button'
import { SITE_ROUTES } from '@/config/site'

export function NotFoundPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.notFound}>
      <ImageTextSplit
        title="Page not found"
        imageLabel="404 illustration"
        imagePosition="left"
        action={
          <Button asChild className="h-11 w-fit bg-brand text-white hover:bg-brand/90">
            <Link to={SITE_ROUTES.home.path}>Back to home</Link>
          </Button>
        }
      >
        <p>
          The page you requested does not exist or may have moved. Use the menu to
          explore services, contact us, or return home.
        </p>
      </ImageTextSplit>
    </MarketingPage>
  )
}
