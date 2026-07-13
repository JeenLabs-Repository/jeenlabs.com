"use client";

import { useEffect, useRef } from "react";
import { BrandLogo } from "@/components/brand/logo";
import { ContactForm } from "@/components/footer/contact-form";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { CONTACT_EMAIL } from "@/lib/contact-content";
import { registerGsapPlugins } from "@/lib/gsap-lazy";
import { runGsap } from "@/lib/run-gsap";
import {
  navBarPaddingX,
  siteEyebrowClass,
  siteFocusRingClass,
  siteFooterMetaClass,
  sitePaddingX,
  sitePillLinkClass,
  siteSectionDescriptionClass,
  siteSectionTitleClass,
  siteSectionYClass,
  siteTitleAccentClass,
  siteWatermarkAccentClass,
  siteWatermarkClass,
} from "@/lib/site-layout";
import { cn } from "@/lib/utils";

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
    <div className="flex items-center gap-8 px-4 sm:gap-12 sm:px-6">
      {MARQUEE_ITEMS.map((item, index) => (
        <span key={item} className="flex items-center gap-8 sm:gap-12">
          <span>{item}</span>
          <span
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              index % 2 === 0 ? "bg-brand/60" : "bg-muted-foreground/40",
            )}
            aria-hidden
          />
        </span>
      ))}
    </div>
  );
}

/**
 * Contact in document flow (fully visible on mobile).
 * Iconic JEENLABS watermark matches the monorepo cinematic footer.
 */
export function CinematicFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
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
              trigger: sectionRef.current,
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
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }, sectionRef);

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
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className={cn(
        "relative isolate w-full overflow-hidden",
        "border-t border-brand/20",
        "bg-background/75",
      )}
    >
      {/* Iconic watermark — mobile lifted so ~65% of letters stay in view; desktop keeps deep bleed */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 z-0 flex justify-center overflow-visible",
          // Mobile: rise into the transparent legal/padding zone (~65% glyph visibility).
          // Desktop: keep the existing hang below the section edge.
          "bottom-[5.25rem] sm:bottom-[5.75rem] md:-bottom-[5vh]",
        )}
        aria-hidden
      >
        <div
          ref={giantTextRef}
          className={cn(
            "group w-max origin-bottom text-center whitespace-nowrap select-none",
            "cursor-default transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "pointer-events-auto hover:scale-[1.015]",
            siteWatermarkClass,
            "hover:[-webkit-text-stroke:1px_color-mix(in_oklch,var(--foreground)_18%,transparent)]",
          )}
        >
          JEENL
          <span
            className={cn(
              siteWatermarkAccentClass,
              "transition-[-webkit-text-stroke-color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
              "group-hover:[-webkit-text-stroke:1px_color-mix(in_oklch,var(--brand)_85%,white)]",
            )}
          >
            A
          </span>
          BS
        </div>
      </div>

      <div className="relative z-10 w-full overflow-hidden border-y border-border/50 bg-background/40 py-2.5 backdrop-blur-sm sm:py-3.5">
        <div
          className={cn(
            "flex w-max font-mono text-[0.6rem] font-bold tracking-[0.28em] text-muted-foreground uppercase sm:text-[0.625rem] sm:tracking-[0.35em] sm:text-xs",
            !prefersReducedMotion && "animate-footer-marquee",
          )}
        >
          <MarqueeItem />
          <MarqueeItem />
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl",
          sitePaddingX,
          siteSectionYClass,
          // Room for the lifted wordmark behind the legal bar on phones.
          "pb-40 sm:pb-44 md:pb-40 lg:pb-48",
        )}
      >
        <div
          ref={contentRef}
          className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-stretch gap-5 text-left sm:items-center sm:gap-6 sm:text-center"
        >
          <div className="flex flex-col gap-4 sm:items-center sm:gap-5">
            <p className={siteEyebrowClass}>Contact</p>
            <h2 id="contact-heading" className={siteSectionTitleClass}>
              Ready to <span className={siteTitleAccentClass}>build?</span>
            </h2>
            <p className={cn(siteSectionDescriptionClass, "sm:mx-auto")}>
              Tell us about the product, automation, or software you need — we
              reply from{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-brand-accessible underline underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>

          <ContactForm variant="footer" className="w-full text-left" />
        </div>
      </div>

      {/* Transparent legal bar so the watermark stays visible underneath */}
      <div
        className={cn(
          "relative z-20 flex w-full flex-col gap-4 border-t border-border/20 bg-transparent py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-8 sm:pt-5",
          navBarPaddingX,
          // Extra bottom air on phones so the wordmark can sit behind without covering taps.
          "min-h-[5.5rem] pb-[max(1.75rem,env(safe-area-inset-bottom,0px))] sm:min-h-0",
        )}
      >
        <div className="flex min-w-0 flex-col gap-2">
          <p
            className={cn(
              siteFooterMetaClass,
              "flex flex-wrap items-center gap-x-1.5 gap-y-1",
            )}
          >
            <span>© {new Date().getFullYear()}</span>
            <BrandLogo variant="logo-name-only" nameSize="sm" />
            <span>. All rights reserved.</span>
          </p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal">
            <a
              href="/privacy"
              className={cn(
                "rounded-sm font-mono text-[0.625rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground",
                siteFocusRingClass,
              )}
            >
              Privacy
            </a>
            <a
              href="/terms"
              className={cn(
                "rounded-sm font-mono text-[0.625rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground",
                siteFocusRingClass,
              )}
            >
              Terms
            </a>
          </nav>
        </div>

        <button
          type="button"
          className={cn(
            sitePillLinkClass,
            "inline-flex size-11 shrink-0 items-center justify-center self-start p-0 sm:size-12 sm:self-auto",
          )}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative */}
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
    </section>
  );
}
