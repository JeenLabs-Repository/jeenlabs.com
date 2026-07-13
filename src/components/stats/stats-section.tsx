"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getGsap, registerGsapPlugins } from "@/lib/gsap-lazy";
import { runGsap } from "@/lib/run-gsap";
import { STATS } from "@/lib/sections-content";
import { siteStatLabelClass } from "@/lib/site-layout";
import { cn } from "@/lib/utils";

function StatItem({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const node = nodeRef.current;
    if (!node) return;

    let cancelled = false;
    let killTrigger: (() => void) | undefined;

    void (async () => {
      await registerGsapPlugins();
      const gsap = await getGsap();
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const tween = { val: 0 };
      const trigger = ScrollTrigger.create({
        trigger: node,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(tween, {
            val: value,
            duration: 1.6,
            delay: index * 0.08,
            ease: "power2.out",
            onUpdate: () => setDisplay(Math.round(tween.val)),
          });
        },
      });

      killTrigger = () => trigger.kill();
    })();

    return () => {
      cancelled = true;
      killTrigger?.();
    };
  }, [value, index, prefersReducedMotion]);

  return (
    <div
      ref={nodeRef}
      className={cn(
        "flex flex-col gap-2 border-t border-border/40 pt-5 sm:gap-3 sm:pt-6",
        "md:border-t-0 md:border-l md:pt-0 md:pl-5 lg:pl-7",
        index === 0 && "md:border-l-0 md:pl-0",
        // On phones: pair as 2×2 with clearer gutters; avoid cramped labels.
        index % 2 === 0
          ? "pr-3 sm:pr-4 md:pr-0"
          : "pl-3 sm:pl-4 md:pl-5 lg:pl-7",
        index < 2 && "pb-1 md:pb-0",
      )}
    >
      <p
        className={cn(
          "font-mono text-[clamp(1.85rem,8vw,4.75rem)] leading-none font-medium tracking-[-0.03em] tabular-nums text-foreground",
          index === 0 && "text-brand-accessible",
        )}
      >
        {display}
        <span className="text-[0.55em] tracking-normal text-brand/80">
          {suffix}
        </span>
      </p>
      <p
        className={cn(siteStatLabelClass, "mt-0 max-w-[12ch] sm:max-w-[16ch]")}
      >
        {label}
      </p>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

        if (gridRef.current) {
          gsap.fromTo(
            gridRef.current.children,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 88%",
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
      id="stats"
      sectionRef={sectionRef}
      tone="ink"
      className="border-y border-border/30"
    >
      <div
        ref={headerRef}
        className="mb-8 grid grid-cols-1 items-end gap-6 sm:mb-10 md:mb-12 lg:mb-14 lg:grid-cols-[1fr_0.85fr] lg:gap-8"
      >
        <SectionHeader
          eyebrow="Stats"
          title="By the"
          titleAccent="numbers"
          description="Delivery counts from engagements so far — kept short so they stay honest."
        />
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-x-0 gap-y-6 sm:gap-y-8 md:grid-cols-4 md:gap-0"
      >
        {STATS.map((stat, index) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            index={index}
          />
        ))}
      </div>
    </SectionShell>
  );
}
