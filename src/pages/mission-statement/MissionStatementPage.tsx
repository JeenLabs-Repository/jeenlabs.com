import { MarketingPage } from '@/components/marketing/MarketingPage'
import { TextButtonCenter, TextWide } from '@/components/marketing/sections'
import { SITE_ROUTES } from '@/config/site'

export function MissionStatementPage() {
  return (
    <MarketingPage seo={SITE_ROUTES.missionStatement}>
      <TextWide title="Driving innovation with integrity">
        <p>
          We exist to help teams build technology that is trustworthy, maintainable,
          and genuinely useful — not hype for its own sake.
        </p>
        <p>
          Integrity means saying no when scope is wrong, flagging risks early, and
          delivering what we promise.
        </p>
      </TextWide>
      <TextButtonCenter
        title="Join us on our mission"
        description="Whether you need a partner or want to join the studio — we would love to talk."
        buttonLabel="Contact Us"
        buttonTo={SITE_ROUTES.contactUs.path}
      />
    </MarketingPage>
  )
}
