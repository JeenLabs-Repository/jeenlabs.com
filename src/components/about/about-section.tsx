"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { runGsap } from "@/lib/run-gsap";
import { ABOUT_MISSION, ABOUT_VALUES } from "@/lib/sections-content";
import { siteFormPanelClass } from "@/lib/site-layout";

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 size-4 shrink-0 text-brand"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
    <SectionShell id="about" ariaLabelledBy="about-heading" sectionRef={sectionRef}>
      <div ref={headerRef} className="mb-10 sm:mb-12">
        <SectionHeader
          eyebrow="About"
          title="Who we"
          titleAccent="are"
          description="The story behind JeenLabs and our passion for building technology that helps businesses grow."
          headingId="about-heading"
        />
      </div>

      <div
        ref={mainRef}
        className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8"
      >
        <article className={cn(siteFormPanelClass, "flex flex-col gap-5")}>
          <h3 className="text-xl font-bold tracking-tight text-foreground uppercase sm:text-2xl">
            {ABOUT_MISSION.title}
          </h3>
          {ABOUT_MISSION.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {paragraph}
            </p>
          ))}
          <ul className="mt-2 space-y-3">
            {ABOUT_MISSION.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-muted-foreground sm:text-base"
              >
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </article>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {ABOUT_VALUES.map((value) => (
            <article key={value.title} className={siteFormPanelClass}>
              <h4 className="text-lg font-bold tracking-tight text-foreground uppercase">
                {value.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
