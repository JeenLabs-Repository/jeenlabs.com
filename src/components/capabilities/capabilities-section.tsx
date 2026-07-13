"use client";

import { useEffect, useRef } from "react";
import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { runGsap } from "@/lib/run-gsap";
import { CAPABILITIES } from "@/lib/sections-content";
import { siteMonoChipClass } from "@/lib/site-layout";
import { cn } from "@/lib/utils";

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
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

        if (listRef.current) {
          gsap.fromTo(
            listRef.current.children,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: listRef.current,
                start: "top 86%",
                toggleActions: "play none none none",
              },
            },
          );
        }
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
      id="capabilities"
      ariaLabelledBy="capabilities-heading"
      sectionRef={sectionRef}
      tone="studio"
      innerClassName="flex flex-col gap-8 sm:gap-10 md:gap-12"
    >
      <div
        ref={headerRef}
        className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
      >
        <SectionHeader
          eyebrow="Capabilities"
          title="Stack we"
          titleAccent="reach for"
          description="A focused toolkit — we pick what fits the constraint, not what’s fashionable this quarter."
          headingId="capabilities-heading"
        />
        <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground text-pretty lg:justify-self-end lg:pb-1 lg:text-right">
          Prefer boring technology that stays boring in production. New tools
          earn their place by risk and payoff, not trend charts.
        </p>
      </div>

      <div
        ref={listRef}
        className="grid grid-cols-1 gap-0 border-t border-border/40 md:grid-cols-2"
      >
        {CAPABILITIES.map((capability, index) => (
          <article
            key={capability.index}
            className={cn(
              "flex flex-col gap-4 border-b border-border/40 py-6 sm:gap-5 sm:py-8 md:px-6 md:py-9",
              "md:odd:border-r md:odd:pl-0 md:even:pr-0",
              index >= CAPABILITIES.length - 2 && "md:border-b-0",
            )}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-[0.65rem] font-bold tracking-[0.28em] text-muted-foreground/70 uppercase">
                {capability.index}
              </span>
              <h3 className="text-right text-lg font-bold tracking-[-0.02em] text-foreground uppercase sm:text-xl">
                {capability.title}
              </h3>
            </div>
            <p className="max-w-[44ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.9375rem]">
              {capability.description}
            </p>
            <ul className="flex flex-wrap gap-2">
              {capability.items.map((item) => (
                <li key={item} className={siteMonoChipClass}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
