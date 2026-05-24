import { MarketingPage } from '@/components/marketing/MarketingPage'
import { FaqAccordion, TextWide } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

const CAREER_FAQS = [
  {
    question: 'Are you hiring remotely?',
    answer: 'Yes — we work with talented people globally with overlap in US and India hours.',
  },
  {
    question: 'What roles do you hire for?',
    answer: 'Engineering, product design, and automation specialists who care about shipping.',
  },
  {
    question: 'How do I apply?',
    answer: 'Send your portfolio or GitHub and a short note via the contact page.',
  },
] as const

export function CareersPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.careers}>
      <TextWide title="Current open positions">
        <p>
          We are selectively growing the studio. Open roles will be listed here —
          until then, send an introduction if you want to build with us.
        </p>
      </TextWide>
      <FaqAccordion title="Frequently asked questions" items={[...CAREER_FAQS]} />
    </MarketingPage>
  )
}
