"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { useMounted } from "@/hooks/use-mounted";
import {
  CONSENT_CHANGE_EVENT,
  hasAnalyticsConsent,
  readConsent,
  type SiteConsent,
} from "@/lib/consent";
import { GA_MEASUREMENT_ID } from "@/lib/site-seo";

export function GoogleAnalytics() {
  const mounted = useMounted();
  const [consent, setConsent] = useState<SiteConsent | null>(null);

  useEffect(() => {
    if (!mounted) return;

    setConsent(readConsent());

    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<SiteConsent>).detail;
      setConsent(detail ?? readConsent());
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, [mounted]);

  if (!GA_MEASUREMENT_ID || !mounted || !hasAnalyticsConsent(consent)) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
