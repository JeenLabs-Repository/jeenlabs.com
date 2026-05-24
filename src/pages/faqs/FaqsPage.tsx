import { Link } from 'react-router-dom'

import { MarketingPage } from '@/components/marketing/MarketingPage'
import { FaqAccordion, ImageTextSplit } from '@/components/marketing/sections'
import { faqJsonLd, organizationJsonLd, webPageJsonLd } from '@/components/seo/JsonLd'
import { Button } from '@/components/ui/button'
import { SITE_ROUTES } from '@/config/site'

const FAQ_ITEMS = [
  {
    question: 'How do projects start?',
    answer: 'We begin with a short discovery call, then propose scope, timeline, and investment.',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Yes — mutual NDAs are standard for new client engagements.',
  },
  {
    question: 'What tech stacks do you use?',
    answer: 'We match the stack to the project — React, Node, Python, and cloud-native tooling are common.',
  },
  {
    question: 'Can you work with our in-house team?',
    answer: 'Absolutely. We often embed alongside internal engineers and designers.',
  },
] as const

export function FaqsPage() {
  return (
    <MarketingPage
      seo={SITE_ROUTES.faqs}
      jsonLd={[
        organizationJsonLd(),
        webPageJsonLd(
          SITE_ROUTES.faqs.title,
          SITE_ROUTES.faqs.description,
          SITE_ROUTES.faqs.path,
        ),
        faqJsonLd([...FAQ_ITEMS]),
      ]}
    >
      <FaqAccordion title="Get quick answers to your questions" items={[...FAQ_ITEMS]} />
      <ImageTextSplit
        title="Didn't find your answer? Contact us"
        imageLabel="Support conversation"
        imagePosition="left"
        action={
          <Button asChild className="h-11 bg-brand text-white hover:bg-brand/90">
            <Link to={SITE_ROUTES.contactUs.path}>Contact Us</Link>
          </Button>
        }
      >
        <p>We are happy to walk through your specific situation on a quick call.</p>
      </ImageTextSplit>
    </MarketingPage>
  )
}
