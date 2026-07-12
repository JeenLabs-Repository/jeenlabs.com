import type { Metadata } from "next";
import { Geist_Mono, Inter, Jost } from "next/font/google";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
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
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} ${jost.variable} dark min-h-dvh antialiased font-sans`}
    >
      <body className="min-h-dvh overflow-x-hidden bg-background font-sans text-foreground">
        <JsonLd data={homeJsonLd()} />
        <GoogleAnalytics />
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
