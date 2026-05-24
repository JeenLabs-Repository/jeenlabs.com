import { MarketingPage } from '@/components/marketing/MarketingPage'
import { PaginationArrows, TextWide } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

export function TermsOfServicePage() {
  return (
    <MarketingPage seo={SITE_ROUTES.termsOfService}>
      <TextWide title="Service terms and conditions">
        <p>
          These terms govern your use of jeenlabs.com and professional services
          provided by JeenLabs. By using our site or engaging our team, you agree
          to these conditions.
        </p>
        <p>
          Project-specific agreements, statements of work, and signed proposals take
          precedence over this summary where they differ.
        </p>
      </TextWide>
      <PaginationArrows
        sections={[
          { id: 'use', label: 'Use of site' },
          { id: 'services', label: 'Professional services' },
          { id: 'ip', label: 'Intellectual property' },
          { id: 'liability', label: 'Liability' },
        ]}
      />
    </MarketingPage>
  )
}
