import type { Metadata } from "next";
import { Geist_Mono, Inter, Jost } from "next/font/google";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { CookieConsentBanner } from "@/components/consent/cookie-consent-banner";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { homeJsonLd } from "@/lib/seo/json-ld";
import { rootMetadata } from "@/lib/seo/metadata";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

const themeAwareFavicons = [
  {
    url: "/favicon/light-chrome.svg",
    type: "image/svg+xml",
    media: "(prefers-color-scheme: light)",
  },
  {
    url: "/favicon/dark-chrome.svg",
    type: "image/svg+xml",
    media: "(prefers-color-scheme: dark)",
  },
] as const;

export const metadata: Metadata = {
  ...rootMetadata,
  icons: {
    icon: [...themeAwareFavicons],
    apple: [...themeAwareFavicons],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} ${jost.variable} dark min-h-svh antialiased font-sans`}
    >
      <body className="min-h-svh overflow-x-hidden bg-background font-sans text-foreground">
        <a
          href="#main-content"
          className="bg-background text-foreground focus:ring-brand sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1100] focus:rounded-full focus:px-4 focus:py-2 focus:ring-2 focus:outline-none"
        >
          Skip to content
        </a>
        <JsonLd data={homeJsonLd()} />
        <GoogleAnalytics />
        <Providers>
          <Navbar />
          <main
            id="main-content"
            className="overflow-x-hidden w-full max-w-full"
          >
            {children}
          </main>
        </Providers>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
