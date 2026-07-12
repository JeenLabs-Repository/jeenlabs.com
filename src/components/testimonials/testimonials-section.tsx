"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { runGsap } from "@/lib/run-gsap";
import { TESTIMONIALS } from "@/lib/sections-content";
import { siteFormPanelClass, siteMonoChipClass } from "@/lib/site-layout";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    if (prefersReducedMotion) return;

    const cards = cardRefs.current.filter(Boolean);
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
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="testimonials"
      ariaLabelledBy="testimonials-heading"
      sectionRef={sectionRef}
    >
      <div ref={headerRef} className="mb-10 sm:mb-12">
        <SectionHeader
          eyebrow="Clients"
          title="What they"
          titleAccent="say"
          description="Feedback from teams we've partnered with."
          headingId="testimonials-heading"
        />
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
      >
        {TESTIMONIALS.map((item, index) => (
          <article
            key={item.name}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className={cn(siteFormPanelClass, "flex flex-col gap-4")}
          >
            <span className={siteMonoChipClass}>{item.service}</span>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground italic sm:text-base">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div>
              <p className="font-semibold text-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.company}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
