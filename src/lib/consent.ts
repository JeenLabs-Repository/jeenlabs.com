/** Client-side privacy / cookie consent for jeenlabs.com */

export const CONSENT_STORAGE_KEY = "jeenlabs-consent-v1";
export const CONSENT_CHANGE_EVENT = "jeenlabs:consent-change";

export type SiteConsent = {
  /** Schema version — bump key when shape changes. */
  v: 1;
  /** ISO timestamp when the visitor chose. */
  at: string;
  /** Acknowledged Privacy Policy and Terms of Use. */
  legal: true;
  /** Optional analytics cookies (e.g. Google Analytics). */
  analytics: boolean;
};

export function readConsent(): SiteConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<SiteConsent>;
    if (
      parsed?.v !== 1 ||
      parsed.legal !== true ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.at !== "string"
    ) {
      return null;
    }

    return {
      v: 1,
      at: parsed.at,
      legal: true,
      analytics: parsed.analytics,
    };
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean): SiteConsent {
  const consent: SiteConsent = {
    v: 1,
    at: new Date().toISOString(),
    legal: true,
    analytics,
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }),
  );

  return consent;
}

export function hasAnalyticsConsent(consent: SiteConsent | null): boolean {
  return consent?.analytics === true;
}
