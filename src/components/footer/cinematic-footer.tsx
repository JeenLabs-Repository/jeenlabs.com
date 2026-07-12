"use client";

import { BrandLogo } from "@/components/brand/logo";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

import { ContactForm } from "@/components/footer/contact-form";
import { registerGsapPlugins } from "@/lib/gsap-lazy";
import { runGsap } from "@/lib/run-gsap";
import {
  navBarPaddingX,
  siteEyebrowClass,
  sitePaddingX,
  sitePillLinkClass,
  siteSectionDescriptionClass,
  siteSectionTitleClass,
  siteTitleAccentClass,
  siteFooterMetaClass,
  siteWatermarkAccentClass,
  siteWatermarkClass,
} from "@/lib/site-layout";

const MARQUEE_ITEMS = [
  "Automation",
  "Web Development",
  "Software",
  "Clarity",
  "Speed",
  "Craft",
] as const;

function MarqueeItem() {
  return (
    <div className="flex items-center gap-12 px-6">
      {MARQUEE_ITEMS.map((item, index) => (
        <span key={item} className="flex items-center gap-12">
          <span>{item}</span>
          <span
            className={
              index % 2 === 0 ? "text-brand/60" : "text-muted-foreground/50"
            }
          >
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;
    if (prefersReducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void runGsap((gsap) => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          giantTextRef.current,
          { y: "10vh", scale: 0.8, opacity: 0 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          contentRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 45%",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );
      }, wrapperRef);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return;
    void registerGsapPlugins().then(async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      ScrollTrigger.refresh();
    });
  }, [prefersReducedMotion]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={wrapperRef}
      id="contact"
      className="relative h-dvh w-full [clip-path:polygon(0%_0,100%_0%,100%_100%,0_100%)]"
    >
      <footer
        className={cn(
          "fixed bottom-0 left-0 flex h-dvh w-full flex-col justify-between overflow-hidden bg-background/75 font-sans text-foreground antialiased backdrop-blur-md",
        )}
      >
        <div
          ref={giantTextRef}
          className={cn(
            "pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 w-max -translate-x-1/2 text-center whitespace-nowrap select-none",
            siteWatermarkClass,
          )}
          aria-hidden
        >
          JEENL<span className={siteWatermarkAccentClass}>A</span>BS
        </div>

        <div className="absolute top-[var(--spacing-site-header)] left-0 z-10 w-full overflow-hidden border-y border-border/50 bg-background/40 py-3 backdrop-blur-sm sm:py-4">
          <div
            className={cn(
              "animate-footer-marquee flex w-max font-mono text-[0.625rem] font-bold tracking-[0.35em] text-muted-foreground uppercase sm:text-xs",
            )}
          >
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        <div
          className={cn(
            "relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-center overflow-y-auto",
            sitePaddingX,
            "pt-[var(--spacing-site-header)]",
          )}
        >
          <div
            ref={contentRef}
            className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center sm:gap-6"
          >
            <div className="flex flex-col items-center gap-4 sm:gap-5">
              <p className={siteEyebrowClass}>Contact</p>
              <h2 className={siteSectionTitleClass}>
                Ready to{" "}
                <span className={siteTitleAccentClass}>build?</span>
              </h2>
              <p className={cn(siteSectionDescriptionClass, "mx-auto")}>
                Tell us about your project — we partner with teams from idea to
                production.
              </p>
            </div>

            <ContactForm variant="footer" className="w-full text-left" />
          </div>
        </div>

        <div
          className={cn(
            "relative z-20 flex w-full items-center justify-between gap-4 pb-8",
            navBarPaddingX,
          )}
        >
          <p className={cn(siteFooterMetaClass, "flex flex-wrap items-center gap-x-1.5")}>
            <span>© {new Date().getFullYear()}</span>
            <BrandLogo variant="logo-name-only" nameSize="sm" />
            <span>. All rights reserved.</span>
          </p>

          <button
            type="button"
            className={cn(
              sitePillLinkClass,
              "inline-flex size-11 shrink-0 items-center justify-center p-0 sm:size-12",
            )}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
