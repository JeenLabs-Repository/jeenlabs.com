import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { SITE_ROUTES } from '@/config/site'

const CONSENT_KEY = 'jeenlabs-cookie-consent'
const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000

type ConsentValue = 'all' | 'essential'

function getStoredConsent(): ConsentValue | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { value: ConsentValue; expires: number }
    if (Date.now() > parsed.expires) {
      localStorage.removeItem(CONSENT_KEY)
      return null
    }
    return parsed.value
  } catch {
    return null
  }
}

function setStoredConsent(value: ConsentValue) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ value, expires: Date.now() + CONSENT_TTL_MS }),
  )
}

export function getCookieConsent(): ConsentValue | null {
  return getStoredConsent()
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getStoredConsent() === null)
  }, [])

  if (!visible) return null

  function acceptAll() {
    setStoredConsent('all')
    setVisible(false)
  }

  function rejectNonEssential() {
    setStoredConsent('essential')
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[1100] mx-auto max-w-3xl rounded-xl border border-border bg-background/95 p-5 shadow-lg backdrop-blur-md sm:inset-x-6"
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        We use cookies to enhance your experience and analyze traffic. By clicking
        &lsquo;Accept All&rsquo;, you consent to our use of cookies.{' '}
        <Link to={SITE_ROUTES.cookies.path} className="text-brand hover:underline">
          Learn more
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          type="button"
          className="h-11 bg-brand text-white hover:bg-brand/90"
          onClick={acceptAll}
        >
          Accept All
        </Button>
        <Button type="button" variant="outline" className="h-11" onClick={rejectNonEssential}>
          Reject Non-Essential
        </Button>
      </div>
    </div>
  )
}
