import { MarketingPage } from '@/components/marketing/MarketingPage'
import { ContactFormSection, MapWide, ThreeColText } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

export function ContactUsPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.contactUs}>
      <ContactFormSection
        title="Send us a message"
        sideContent={
          <>
            <p>
              Prefer email? Write to{' '}
              <a href="mailto:hello@jeenlabs.com" className="text-brand hover:underline">
                hello@jeenlabs.com
              </a>
              .
            </p>
            <p>Include your timeline, budget range, and links to any relevant materials.</p>
          </>
        }
      />
      <MapWide title="Our location" />
      <ThreeColText
        columns={[
          { title: 'Email', body: 'hello@jeenlabs.com — we reply within one business day.' },
          { title: 'Hours', body: 'Mon–Fri, overlapping US and India time zones.' },
          { title: 'Engagements', body: 'Remote-first studio — on-site workshops by arrangement.' },
        ]}
      />
    </MarketingPage>
  )
}
