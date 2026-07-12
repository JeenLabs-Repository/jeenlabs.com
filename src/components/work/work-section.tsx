"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { runGsap } from "@/lib/run-gsap";
import {
  WORK_FILTERS,
  WORK_ITEMS,
  type WorkService,
} from "@/lib/sections-content";
import { siteFormPanelClass, siteMonoChipClass, sitePillLinkClass } from "@/lib/site-layout";

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<WorkService>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") return WORK_ITEMS;
    return WORK_ITEMS.filter((item) => item.service === activeFilter);
  }, [activeFilter]);

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
      }, sectionRef);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;
    if (prefersReducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void runGsap((gsap) => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          gridRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
          },
        );
      }, gridRef);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [activeFilter, prefersReducedMotion]);

  return (
    <SectionShell id="work" ariaLabelledBy="work-heading" sectionRef={sectionRef}>
      <div ref={headerRef} className="mb-8 flex flex-col gap-5 sm:mb-10">
        <SectionHeader
          eyebrow="Work"
          title="Recent"
          titleAccent="projects"
          description="Examples of what we've shipped for clients across different industries."
          headingId="work-heading"
        />

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {WORK_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                sitePillLinkClass,
                "cursor-pointer border-0 bg-transparent",
                activeFilter === filter &&
                  "border-brand/50 bg-brand/10 text-brand",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6"
      >
        {visibleItems.map((item, index) => (
          <article
            key={item.title}
            className={cn(siteFormPanelClass, "flex flex-col overflow-hidden p-0")}
          >
            <div className="flex h-36 items-end justify-between border-b border-border/40 bg-background/30 p-5 sm:h-40">
              <span className={siteMonoChipClass}>{item.service}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
              <h3 className="text-lg font-bold tracking-tight text-foreground uppercase sm:text-xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
