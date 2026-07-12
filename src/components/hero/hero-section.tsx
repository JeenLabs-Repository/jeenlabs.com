"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

import { DeferredAfterPaint } from "@/components/deferred-after-paint";
import { RingCtaButton } from "@/components/ring-cta-button";
import { goToSection } from "@/lib/scroll";
import {
  siteBackgroundClass,
  siteHeaderOffsetClass,
  sitePaddingX,
} from "@/lib/site-layout";

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
        "relative isolate w-full min-h-dvh overflow-hidden",
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
        className={cn(
          "relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col",
          sitePaddingX,
          siteHeaderOffsetClass,
          "pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]",
        )}
      >
        <div className="flex w-full flex-1 items-center">
          <div className="flex max-w-4xl flex-col gap-6 sm:gap-8">
            <h1
              className={cn(
                "font-sans text-[clamp(2.375rem,10.5vw,3.5rem)] leading-[0.92] font-black tracking-tighter text-foreground uppercase sm:text-[clamp(2.75rem,8.5vw,4.75rem)] md:text-[clamp(3.25rem,7vw,6rem)] lg:text-[clamp(3.75rem,5.5vw,7.5rem)] lg:leading-[0.9]",
                "-mt-[min(2.5rem,calc(var(--spacing-site-header)*0.5))]",
                !prefersReducedMotion &&
                  "motion-safe:md:animate-hero-headline-enter",
              )}
            >
              Build <br />
              products <br />
              <span className="text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--brand)_85%,white)]">
                with craft
              </span>
            </h1>
            <p
              className={cn(
                "max-w-[34ch] text-sm leading-relaxed tracking-wide text-muted-foreground sm:max-w-sm md:font-mono md:text-[0.6875rem] md:leading-relaxed md:tracking-[0.3em] md:uppercase lg:tracking-[0.35em]",
                !prefersReducedMotion && "opacity-0 motion-safe:animate-hero-tagline-enter",
              )}
            >
              We partner with teams to design and ship{" "}
              <span className="text-brand">thoughtful</span> digital experiences
              — from idea to production.
            </p>
            <div
              className={cn(
                !prefersReducedMotion && "opacity-0 motion-safe:animate-hero-cta-enter",
              )}
            >
              <RingCtaButton
                label="Get started"
                aria-label="Get started — contact us"
                onClick={() => goToSection("contact")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
