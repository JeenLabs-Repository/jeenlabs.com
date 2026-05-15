import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter, Jost } from "next/font/google"

import { Navbar } from "@/features/landing/navbar"
import { ThemeProvider } from "@/shared/components/providers/theme-provider"
import { cn } from "@/shared/lib/utils"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "jeenlabs",
  description:
    "Software studio — build products with clarity, speed, and craft.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark",
        "h-full",
        "antialiased",
        inter.variable,
        jost.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-dvh w-full flex-1 flex-col">
            <Navbar />
            <main className="flex min-h-0 flex-1 flex-col">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
