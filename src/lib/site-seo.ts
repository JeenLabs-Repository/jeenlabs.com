import { CONTACT_EMAIL } from "@/lib/contact-content";

/** Canonical production URL — override with NEXT_PUBLIC_SITE_URL in Coolify. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://jeenlabs.com";

export const SITE_NAME = "JeenLabs";

export const SITE_TAGLINE =
  "Automation, web development & custom software studio";

export const SITE_DESCRIPTION =
  "JeenLabs is a software studio specializing in automation, web development, and custom software. We help businesses ship faster with thoughtful design, reliable engineering, and end-to-end delivery from idea to production.";

export const SITE_KEYWORDS = [
  "JeenLabs",
  "software development company",
  "web development agency",
  "business automation",
  "custom software development",
  "Next.js development",
  "workflow automation",
  "SaaS development",
  "Mumbai software studio",
  "India software company",
] as const;

export const ORGANIZATION = {
  name: SITE_NAME,
  email: CONTACT_EMAIL,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon/dark-chrome.svg`,
  description: SITE_DESCRIPTION,
  areaServed: "Worldwide",
  knowsAbout: [
    "Web Development",
    "Software Development",
    "Business Process Automation",
    "Custom Software",
  ],
} as const;

export const TWITTER_HANDLE = "@jeenlabs" as const;

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || null;

export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || null;
