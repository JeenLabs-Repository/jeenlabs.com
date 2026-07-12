import type { Metadata } from "next";

import {
  GOOGLE_SITE_VERIFICATION,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/site-seo";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  /** Set true for 404 and other non-indexable pages. */
  noIndex?: boolean;
  ogType?: "website" | "article";
};

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  keywords = [...SITE_KEYWORDS],
  noIndex = false,
  ogType = "website",
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const fullTitle =
    path === "/" ? `${SITE_NAME} — ${SITE_TAGLINE}` : `${title} | ${SITE_NAME}`;

  return {
    title: path === "/" ? { default: fullTitle, template: `%s | ${SITE_NAME}` } : title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: ogType,
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: path === "/" ? fullTitle : `${title} | ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: path === "/" ? fullTitle : `${title} | ${SITE_NAME}`,
      description,
      creator: TWITTER_HANDLE,
    },
    ...(GOOGLE_SITE_VERIFICATION
      ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export const rootMetadata = createPageMetadata({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  path: "/",
});
