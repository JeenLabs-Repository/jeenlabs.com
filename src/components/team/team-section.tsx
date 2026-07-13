"use client";

import { useEffect, useRef } from "react";
import { RingCtaButton } from "@/components/ring-cta-button";
import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { runGsap } from "@/lib/run-gsap";
import { goToSection } from "@/lib/scroll";
import { TEAM } from "@/lib/sections-content";
import { siteSectionBrandRuleClass } from "@/lib/site-layout";
import { cn } from "@/lib/utils";

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
      tone="studio"
      className={siteSectionBrandRuleClass}
    >
      <div
        ref={contentRef}
        className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20"
      >
        <div className="lg:sticky lg:top-[calc(var(--spacing-site-header)+1rem)]">
          <SectionHeader
            eyebrow="Team"
            title="How we"
            titleAccent="work"
            description="A flexible crew assembled around what your project actually needs."
            headingId="team-heading"
          />
          <div className="mt-8 hidden lg:block">
            <RingCtaButton
              label="Get in touch"
              aria-label="Get in touch"
              onClick={() => goToSection("contact")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 sm:gap-10">
          <article className="flex flex-col gap-5 border-t border-border/40 pt-7 sm:gap-6 sm:pt-8">
            <h3 className="text-[clamp(1.25rem,3.5vw,1.75rem)] font-bold tracking-[-0.02em] text-foreground uppercase text-balance">
              {TEAM.title}
            </h3>
            {TEAM.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={cn(
                  "max-w-[58ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base sm:leading-relaxed",
                  index === 0 && "text-foreground/90",
                )}
              >
                {paragraph}
              </p>
            ))}
          </article>

          <ul className="grid grid-cols-1 gap-0 border-t border-border/40 sm:grid-cols-3 sm:gap-0">
            {TEAM.principles.map((principle, index) => (
              <li
                key={principle.title}
                className={cn(
                  "flex flex-col gap-2 border-b border-border/40 py-5 sm:border-b-0 sm:border-l sm:px-4 sm:py-6 sm:first:border-l-0 sm:first:pl-0 lg:px-5",
                  index === 0 && "sm:pl-0",
                )}
              >
                <span className="font-mono text-[0.6rem] font-bold tracking-[0.22em] text-brand-accessible uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {principle.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="lg:hidden">
            <RingCtaButton
              label="Get in touch"
              aria-label="Get in touch"
              onClick={() => goToSection("contact")}
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
