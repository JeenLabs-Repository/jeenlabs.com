"use client";

import { BrandLogo } from "@/components/brand/logo";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

import { ContactForm } from "@/components/footer/contact-form";
import { registerGsapPlugins } from "@/lib/gsap-lazy";
import { CONTACT_EMAIL } from "@/lib/contact-content";
import { runGsap } from "@/lib/run-gsap";
import {
  navBarPaddingX,
  siteEyebrowClass,
  siteFocusRingClass,
  sitePaddingX,
  sitePillLinkClass,
  siteSectionDescriptionClass,
  siteSectionTitleClass,
  siteTitleAccentClass,
  siteFooterMetaClass,
  siteWatermarkAccentClass,
  siteWatermarkClass,
  siteSectionYClass,
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
 * Contact lives in normal document flow so the full “Ready to build”
 * chapter is always reachable on phones and short laptop viewports.
 * (The old fixed + clip-path reveal clipped the form on mobile.)
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
        if (giantTextRef.current) {
          gsap.fromTo(
            giantTextRef.current,
            { y: 48, opacity: 0.15 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                end: "bottom bottom",
                scrub: 1,
              },
            },
          );
        }

        gsap.fromTo(
          contentRef.current,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
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
        "bg-[color-mix(in_oklch,var(--background)_90%,var(--brand)_4%)]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute top-1/2 left-1/2 size-[min(100vw,40rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.1] blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_10%,color-mix(in_oklch,var(--background)_75%,transparent)_80%)]" />
      </div>

      <div className="relative z-10 w-full overflow-hidden border-b border-border/40 bg-background/35 py-2.5 backdrop-blur-md sm:py-3.5">
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
          "pb-10 sm:pb-14 md:pb-16",
        )}
      >
        <div
          ref={giantTextRef}
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden opacity-40 select-none",
            siteWatermarkClass,
          )}
          aria-hidden
        >
          <span className="translate-y-1/4 whitespace-nowrap sm:translate-y-1/5">
            JEENL<span className={siteWatermarkAccentClass}>A</span>BS
          </span>
        </div>

        <div
          ref={contentRef}
          className="relative z-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16"
        >
          <div className="flex max-w-xl flex-col gap-4 sm:gap-5">
            <p className={siteEyebrowClass}>Contact</p>
            <h2 id="contact-heading" className={siteSectionTitleClass}>
              Ready to{" "}
              <span className={siteTitleAccentClass}>build?</span>
            </h2>
            <p className={siteSectionDescriptionClass}>
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
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={cn(
                sitePillLinkClass,
                "mt-1 w-fit border-brand/30 bg-brand/10 text-brand-accessible hover:border-brand/50 hover:text-brand",
              )}
            >
              Email directly
            </a>
          </div>

          <div className="w-full min-w-0 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-[1.75rem] sm:p-1.5">
            <div className="rounded-[calc(1.25rem-0.25rem)] border border-white/5 bg-background/50 p-4 sm:rounded-[calc(1.75rem-0.375rem)] sm:p-5 md:p-6">
              <ContactForm variant="footer" className="w-full text-left" />
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "relative z-20 flex w-full flex-col gap-4 border-t border-border/30 bg-background/40 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-6",
          navBarPaddingX,
          "pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]",
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
