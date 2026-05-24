import { Bot, Code2, Globe } from 'lucide-react'

import { JsonLd, organizationJsonLd, webPageJsonLd } from '@/components/seo/JsonLd'
import { Hero } from '@/components/features/hero/Hero'
import { MarketingFooter } from '@/components/marketing/MarketingFooter'
import {
  FeaturesInline,
  HeroCarousel,
  TextButtonCenter,
  TextWide,
} from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'
import { usePageSeo } from '@/hooks/use-page-seo'

export function Homepage() {
  usePageSeo(SITE_ROUTES.home)

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          webPageJsonLd(
            SITE_ROUTES.home.title,
            SITE_ROUTES.home.description,
            SITE_ROUTES.home.path,
          ),
        ]}
      />
      <main className="flex min-h-0 flex-1 flex-col">
        <Hero />
        <HeroCarousel
          slides={[
            {
              title: 'Cutting-edge solutions for your business',
              subtitle:
                'Automation, software, and web experiences engineered for growth.',
            },
            {
              title: 'Ship faster with a focused studio',
              subtitle: 'Small teams, direct communication, production-ready delivery.',
            },
            {
              title: 'Built for performance and clarity',
              subtitle: 'Accessible interfaces, measurable outcomes, maintainable code.',
            },
          ]}
        />
        <TextWide title="Revolutionizing technology with automation and software development">
          <p>
            JeenLabs helps teams modernize operations and build digital products
            that earn trust — from intelligent automation to full-stack software
            and high-performance websites.
          </p>
          <p>
            We combine product thinking with engineering discipline so you ship
            faster without sacrificing quality.
          </p>
        </TextWide>
        <FeaturesInline
          title="Our Key Services"
          items={[
            {
              title: 'Automation',
              description:
                'Streamline workflows, integrations, and reporting with reliable automation systems.',
              icon: Bot,
            },
            {
              title: 'Software Development',
              description:
                'Custom applications, portals, and APIs tailored to your business logic.',
              icon: Code2,
            },
            {
              title: 'Website Development',
              description:
                'Fast, accessible marketing and product sites optimized for conversion.',
              icon: Globe,
            },
          ]}
        />
        <TextButtonCenter
          title="Get Started"
          description="Tell us about your goals — we will recommend the right mix of automation, software, and web work."
          buttonLabel="Contact Us"
          buttonTo={SITE_ROUTES.contactUs.path}
        />
      </main>
      <MarketingFooter />
    </>
  )
}
