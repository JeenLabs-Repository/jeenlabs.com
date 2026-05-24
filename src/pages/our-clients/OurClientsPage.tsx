import { MarketingPage } from '@/components/marketing/MarketingPage'
import { LogoGrid, QuoteBlock, TextWide } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

export function OurClientsPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.ourClients}>
      <LogoGrid
        title="Our partners"
        logos={['Northline Ops', 'Atlas Fin', 'Brightfield', 'Summit Health']}
      />
      <TextWide title="Success stories">
        <p>
          We have helped teams automate reporting, launch customer portals, and
          rebuild marketing sites under tight deadlines — always with maintainable
          outcomes their internal teams can own.
        </p>
      </TextWide>
      <QuoteBlock
        quote="JeenLabs delivered automation that cut our weekly reporting from hours to minutes — and documented everything clearly."
        author="Operations Director"
        role="Logistics client"
      />
    </MarketingPage>
  )
}
