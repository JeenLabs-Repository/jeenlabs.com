import { MarketingPage } from '@/components/marketing/MarketingPage'
import { BlogGrid, FeaturesInline, TextButtonCenter } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

export function BlogPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.blog}>
      <BlogGrid
        title="Read our latest articles"
        posts={[
          {
            title: 'Automating weekly reports without breaking Excel',
            excerpt: 'Patterns for reliable spreadsheet automation your finance team will trust.',
            category: 'Automation',
          },
          {
            title: 'Shipping MVPs with guardrails',
            excerpt: 'How to scope a first release that is small, testable, and extensible.',
            category: 'Software',
          },
          {
            title: 'Core Web Vitals for marketing sites',
            excerpt: 'Practical checks before you launch your next landing page.',
            category: 'Web',
          },
        ]}
      />
      <FeaturesInline
        title="Featured stories"
        items={[
          { title: 'Process', description: 'How we run discovery sprints before writing code.' },
          { title: 'Stack', description: 'Why we choose boring, proven tools for client work.' },
          { title: 'Partnership', description: 'Working embedded vs. hand-off delivery models.' },
        ]}
      />
      <TextButtonCenter
        title="Subscribe for updates"
        description="Get new articles on automation, software, and web craft — no spam."
        buttonLabel="Contact Us"
        buttonTo={SITE_ROUTES.contactUs.path}
      />
    </MarketingPage>
  )
}
