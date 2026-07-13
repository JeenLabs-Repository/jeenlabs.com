"use client";

import { useEffect, useRef } from "react";
import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { runGsap } from "@/lib/run-gsap";
import { PROCESS_STEPS } from "@/lib/sections-content";
import { cn } from "@/lib/utils";

export function ProcessSection() {
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
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: listRef.current,
                start: "top 85%",
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
      id="process"
      ariaLabelledBy="process-heading"
      sectionRef={sectionRef}
      tone="plain"
      innerClassName="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14"
    >
      <div ref={headerRef} className="max-w-2xl">
        <SectionHeader
          eyebrow="Process"
          title="How an"
          titleAccent="engagement"
          description="Four honest stages from brief to handoff — no discovery theater, no silent month of “progress.”"
          headingId="process-heading"
        />
      </div>

      <div
        ref={listRef}
        className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
      >
        {PROCESS_STEPS.map((step) => (
          <article
            key={step.index}
            className={cn(
              "group relative flex flex-col gap-3.5 border-t border-border/40 py-6 sm:gap-4 sm:py-8 sm:pr-5",
              "sm:odd:pr-5 sm:even:border-l sm:even:border-border/40 sm:even:pl-5 sm:even:pr-0",
              "lg:border-t-0 lg:border-l lg:px-6 lg:py-0 lg:pr-6 lg:pl-6",
              "lg:first:border-l-0 lg:first:pl-0",
              "lg:even:border-l lg:even:pl-6",
            )}
          >
            <span className="mb-0.5 font-mono text-[0.65rem] font-bold tracking-[0.28em] text-brand-accessible uppercase">
              {step.index}
            </span>
            <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground uppercase sm:text-2xl">
              {step.title}
            </h3>
            <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.9375rem]">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
