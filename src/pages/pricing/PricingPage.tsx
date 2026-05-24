import { MarketingPage } from '@/components/marketing/MarketingPage'
import { PricingPlans, TextButtonCenter } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

export function PricingPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.pricing}>
      <PricingPlans
        plans={[
          {
            name: 'Starter',
            price: 'From $3k',
            description: 'Focused automation or landing page engagements.',
            features: ['2–3 week delivery', 'Single workflow or page', 'Handoff documentation'],
          },
          {
            name: 'Growth',
            price: 'From $12k',
            description: 'Multi-milestone software or website projects.',
            features: ['Phased delivery', 'Weekly check-ins', 'Staging + production deploy'],
            highlighted: true,
          },
          {
            name: 'Partner',
            price: 'Custom',
            description: 'Retainer for ongoing product and engineering support.',
            features: ['Dedicated hours/month', 'Priority support', 'Roadmap planning'],
          },
        ]}
      />
      <TextButtonCenter
        title="Request a custom quote"
        description="Every business is different — share your goals for a tailored proposal."
        buttonLabel="Get Started"
        buttonTo={SITE_ROUTES.contactUs.path}
      />
    </MarketingPage>
  )
}
