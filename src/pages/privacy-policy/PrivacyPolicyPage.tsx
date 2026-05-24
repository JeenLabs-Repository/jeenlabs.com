import { MarketingPage } from '@/components/marketing/MarketingPage'
import { BulletListSection, TextWide } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

export function PrivacyPolicyPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.privacyPolicy}>
      <TextWide title="Your privacy matters">
        <p>
          JeenLabs respects your privacy. This policy explains what we collect when
          you use our website or services, and how we use and protect that information.
        </p>
      </TextWide>
      <BulletListSection
        title="Our commitment to data security"
        items={[
          'We collect only information needed to respond to inquiries and deliver services.',
          'We do not sell personal data to third parties.',
          'Access to client data is limited to team members who need it.',
          'We use industry-standard safeguards for data in transit and at rest.',
          'You may request access, correction, or deletion by contacting hello@jeenlabs.com.',
        ]}
      />
    </MarketingPage>
  )
}
