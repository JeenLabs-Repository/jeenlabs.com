"use client";

import { useEffect, useRef } from "react";
import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { runGsap } from "@/lib/run-gsap";
import { FOCUS_AREAS } from "@/lib/sections-content";
import { cn } from "@/lib/utils";

export function FocusSection() {
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
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
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
      id="focus"
      ariaLabelledBy="focus-heading"
      sectionRef={sectionRef}
      tone="plain"
      tall
      innerClassName="flex flex-col gap-8 sm:gap-10 md:gap-14 lg:gap-16"
    >
      <div ref={headerRef} className="max-w-2xl">
        <SectionHeader
          eyebrow="Focus"
          title="Who we"
          titleAccent="help"
          description="Contexts we show up for — not a sector buffet, three recurring constraints we know how to cut through."
          headingId="focus-heading"
        />
      </div>

      <div ref={listRef} className="flex flex-col border-t border-border/40">
        {FOCUS_AREAS.map((area, index) => (
          <article
            key={area.index}
            className={cn(
              "grid grid-cols-1 gap-3 border-b border-border/40 py-7 sm:gap-4 sm:py-8 md:grid-cols-[5rem_minmax(0,0.9fr)_minmax(0,1.2fr)] md:items-start md:gap-8 md:py-10 lg:gap-12",
            )}
          >
            <span className="mb-0.5 font-mono text-[0.7rem] font-bold tracking-[0.28em] text-brand-accessible uppercase md:mb-0 md:pt-1.5">
              {area.index}
            </span>
            <h3 className="text-[clamp(1.35rem,4vw,2.25rem)] leading-[1.05] font-black tracking-[-0.03em] text-foreground uppercase">
              {area.title}
            </h3>
            <p
              className={cn(
                "max-w-[48ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.9375rem] md:pt-1",
                index === 0 && "md:text-foreground/85",
              )}
            >
              {area.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
