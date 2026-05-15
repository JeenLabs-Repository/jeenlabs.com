"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, HomeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NotFound() {
  const router = useRouter()

  return (
    <section
      className={cn(
        "relative flex min-h-dvh w-full flex-1 flex-col overflow-hidden bg-background",
      )}
      aria-labelledby="not-found-heading"
    >
      <div
        className="not-found-brand-glow pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="not-found-dot-grid pointer-events-none absolute inset-0 opacity-[0.85]"
        aria-hidden
      />
      <div
        aria-hidden
        className="hero-content-vignette pointer-events-none absolute inset-0 opacity-[0.55]"
      />

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-[100rem] flex-1 flex-col items-center justify-center",
          "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16",
          /* Same padding top & bottom so justify-center hits true viewport middle (fixed navbar floats above) */
          "py-[max(5.25rem,calc(3.25rem+env(safe-area-inset-top,0px)),calc(3.25rem+env(safe-area-inset-bottom,0px)))]",
        )}
      >
        <div className="relative flex max-w-4xl flex-col items-center text-center">
          <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-brand uppercase sm:text-[11px]">
            404 · page not found
          </p>

          <h1
            id="not-found-heading"
            className="hero-headline font-brand mt-5 font-black tracking-tighter text-foreground uppercase"
          >
            This path{" "}
            <span className="text-outline-brand">isn&apos;t wired up</span>
          </h1>

          <p className="hero-description mx-auto mt-6 max-w-[38ch] text-muted-foreground sm:max-w-md">
            That URL may have moved or never existed in this build. Go back to the{" "}
            <span className="text-brand">studio home</span>, or return where you came from.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <Link
              href="/"
              className={cn(
                "group relative flex w-fit min-h-11 shrink-0 touch-manipulation items-center gap-4",
                "sm:gap-5",
              )}
              aria-label="Return to jeenlabs home"
            >
              <div
                className={cn(
                  "hero-cta-ring flex size-11 items-center justify-center overflow-hidden rounded-full border transition-all duration-500 sm:size-12 md:size-14",
                )}
              >
                <div className="hero-cta-fill flex size-full items-center justify-center rounded-full transition-colors duration-500">
                  <HomeIcon
                    className="size-[18px] shrink-0 text-foreground transition-colors duration-500 group-hover:text-white"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                </div>
              </div>
              <span className="hero-cta-label font-mono text-[10px] font-bold tracking-[0.18em] text-foreground uppercase sm:text-[11px] sm:tracking-[0.2em]">
                Back home
              </span>
            </Link>

            <Button
              variant="outline"
              type="button"
              className="rounded-full border-brand/25 hover:border-brand/50"
              onClick={() => router.back()}
            >
              <ArrowLeft
                className="size-4"
                data-icon="inline-start"
                aria-hidden
              />
              Go back
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
