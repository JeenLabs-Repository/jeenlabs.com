import { Geist_Mono, Inter, Jost } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";

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
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
