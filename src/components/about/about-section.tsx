"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { runGsap } from "@/lib/run-gsap";
import { ABOUT_MISSION, ABOUT_VALUES } from "@/lib/sections-content";

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 size-4 shrink-0 text-brand"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
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
          headerRef.current,
          { y: 32, opacity: 0 },
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

        gsap.fromTo(
          mainRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mainRef.current,
              start: "top 85%",
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

  return (
    <SectionShell
      id="about"
      ariaLabelledBy="about-heading"
      sectionRef={sectionRef}
      tone="plain"
    >
      <div ref={headerRef} className="mb-8 max-w-2xl sm:mb-10 md:mb-12 lg:mb-16">
        <SectionHeader
          eyebrow="About"
          title="Who we"
          titleAccent="are"
          description="A software studio that ships automation, web products, and custom systems teams can run."
          headingId="about-heading"
        />
      </div>

      <div
        ref={mainRef}
        className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 xl:gap-20"
      >
        <article className="relative flex flex-col gap-6 border-t border-brand/40 pt-8">
          <span
            className="pointer-events-none absolute -top-3 left-0 font-mono text-[0.625rem] font-bold tracking-[0.3em] text-brand-accessible uppercase"
            aria-hidden
          >
            Mission
          </span>
          <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em] text-foreground uppercase">
            {ABOUT_MISSION.title}
          </h3>
          {ABOUT_MISSION.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[58ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base sm:leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
          <ul className="mt-2 space-y-4">
            {ABOUT_MISSION.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm text-foreground/85 sm:text-base"
              >
                <CheckIcon />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="grid grid-cols-1 gap-0">
          {ABOUT_VALUES.map((value, index) => (
            <article
              key={value.title}
              className={cn(
                "group grid grid-cols-[3rem_1fr] gap-4 border-t border-border/40 py-6 transition-colors duration-500 hover:border-brand/35 sm:gap-5 sm:py-7",
              )}
            >
              <span className="font-mono text-[0.65rem] font-bold tracking-[0.25em] text-muted-foreground/60 tabular-nums transition-colors duration-500 group-hover:text-brand-accessible">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {value.title}
                </h4>
                <p className="max-w-[36ch] text-sm leading-relaxed text-muted-foreground text-pretty">
                  {value.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
