"use client";

import dynamic from "next/dynamic";
import { DeferredAfterPaint } from "@/components/deferred-after-paint";
import { RingCtaButton } from "@/components/ring-cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { goToSection } from "@/lib/scroll";
import {
  siteBackgroundClass,
  siteEyebrowClass,
  siteFocusRingClass,
  siteHeaderOffsetClass,
  sitePaddingX,
  sitePillLinkClass,
} from "@/lib/site-layout";
import { cn } from "@/lib/utils";

const AnimatedBackground = dynamic(
  () =>
    import("@/components/background/animated-background").then(
      (mod) => mod.AnimatedBackground,
    ),
  { ssr: false },
);

export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="home"
      aria-label="Introduction"
      className={cn(
        "relative isolate w-full min-h-[100svh] overflow-hidden",
        siteBackgroundClass,
      )}
    >
      <DeferredAfterPaint
        fallback={
          <div
            className="pointer-events-none absolute inset-0 bg-background"
            aria-hidden
          />
        }
      >
        <AnimatedBackground />
      </DeferredAfterPaint>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-background via-background/70 to-transparent"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col",
          sitePaddingX,
          siteHeaderOffsetClass,
          "pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]",
        )}
      >
        <div className="flex w-full flex-1 items-center">
          <div className="flex w-full max-w-6xl flex-col gap-5 sm:gap-7 md:gap-9">
            <p
              className={cn(
                siteEyebrowClass,
                !prefersReducedMotion &&
                  "opacity-0 motion-safe:animate-hero-tagline-enter",
              )}
            >
              JeenLabs · Software studio
            </p>
            <h1
              className={cn(
                "max-w-6xl font-sans text-[clamp(2.125rem,9vw,5.75rem)] leading-[0.94] font-black tracking-[-0.03em] text-foreground uppercase text-balance",
                !prefersReducedMotion &&
                  "motion-safe:md:animate-hero-headline-enter",
              )}
            >
              Build products{" "}
              <span className="text-transparent [-webkit-text-stroke:1.25px_color-mix(in_oklab,var(--brand)_88%,white)]">
                with craft
              </span>
            </h1>
            <p
              className={cn(
                "max-w-[46ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base sm:leading-relaxed md:text-lg",
                !prefersReducedMotion &&
                  "opacity-0 motion-safe:animate-hero-tagline-enter",
              )}
            >
              We partner with teams to design and ship{" "}
              <span className="text-brand">thoughtful</span> digital experiences
              — from idea to production.
            </p>
            <div
              className={cn(
                "flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6",
                !prefersReducedMotion &&
                  "opacity-0 motion-safe:animate-hero-cta-enter",
              )}
            >
              <RingCtaButton
                label="Get started"
                aria-label="Get started — contact us"
                onClick={() => goToSection("contact")}
              />
              <button
                type="button"
                className={cn(
                  sitePillLinkClass,
                  "border-border/40 bg-transparent px-5",
                )}
                onClick={() => goToSection("services")}
              >
                View services
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-start pb-6 sm:pb-8">
          <button
            type="button"
            onClick={() => goToSection("services")}
            className={cn(
              "group inline-flex items-center gap-3 rounded-sm font-mono text-[0.625rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-foreground",
              siteFocusRingClass,
              !prefersReducedMotion && "motion-safe:animate-hero-scroll-cue",
            )}
            aria-label="Scroll to services"
          >
            <span
              className="relative flex h-10 w-px overflow-hidden bg-border/60"
              aria-hidden
            >
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-1/2 bg-brand",
                  !prefersReducedMotion &&
                    "motion-safe:animate-hero-scroll-line",
                )}
              />
            </span>
            Scroll
          </button>
        </div>
      </div>
    </section>
  );
}
