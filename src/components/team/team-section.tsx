"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useEffect, useRef } from "react";

import { RingCtaButton } from "@/components/ring-cta-button";
import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { runGsap } from "@/lib/run-gsap";
import { goToSection } from "@/lib/scroll";
import { TEAM } from "@/lib/sections-content";
import { siteFormPanelClass, siteSectionBrandRuleClass } from "@/lib/site-layout";

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
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
          contentRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
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

  return (
    <SectionShell
      id="team"
      ariaLabelledBy="team-heading"
      sectionRef={sectionRef}
      className={siteSectionBrandRuleClass}
    >
      <div className="mb-10 sm:mb-12">
        <SectionHeader
          eyebrow="Team"
          title="How we"
          titleAccent="work"
          description="A flexible crew assembled around what your project actually needs."
          headingId="team-heading"
        />
      </div>

      <article
        ref={contentRef}
        className={`${siteFormPanelClass} mx-auto flex max-w-3xl flex-col gap-5`}
      >
        <h3 className="text-xl font-bold tracking-tight text-foreground uppercase sm:text-2xl">
          {TEAM.title}
        </h3>
        {TEAM.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {paragraph}
          </p>
        ))}
        <RingCtaButton
          label="Get in touch"
          aria-label="Get in touch"
          onClick={() => goToSection("contact")}
          className="mt-2"
        />
      </article>
    </SectionShell>
  );
}
