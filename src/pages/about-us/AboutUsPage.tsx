import { MarketingPage } from '@/components/marketing/MarketingPage'
import { FeaturesInline, TeamGrid, TextWide } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

export function AboutUsPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.aboutUs}>
      <TextWide title="Our journey">
        <p>
          JeenLabs started as a small studio obsessed with shipping useful software
          — automation that saves time, products that solve real problems, and sites
          that perform under pressure.
        </p>
        <p>
          Today we partner with teams who want craft and velocity without the overhead
          of a large agency.
        </p>
      </TextWide>
      <TeamGrid
        title="Meet the team"
        members={[
          { name: 'Alex Rivera', role: 'Founding Engineer' },
          { name: 'Jordan Lee', role: 'Product Design' },
          { name: 'Sam Patel', role: 'Automation Lead' },
        ]}
      />
      <FeaturesInline
        title="Our values"
        items={[
          { title: 'Craft', description: 'Quality is non-negotiable — in code, copy, and communication.' },
          { title: 'Clarity', description: 'Transparent scope, honest timelines, and direct feedback.' },
          { title: 'Ownership', description: 'We treat your product like our own until it ships.' },
        ]}
      />
    </MarketingPage>
  )
}
