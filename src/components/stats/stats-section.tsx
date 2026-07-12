"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useEffect, useRef, useState } from "react";

import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { registerGsapPlugins, getGsap } from "@/lib/gsap-lazy";
import { runGsap } from "@/lib/run-gsap";
import { STATS } from "@/lib/sections-content";
import { siteStatLabelClass } from "@/lib/site-layout";

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
    <div ref={nodeRef} className="text-center">
      <p className="font-brand text-[clamp(2.5rem,8vw,4.5rem)] leading-none font-black tracking-tighter text-foreground">
        {display}
        {suffix}
      </p>
      <p className={siteStatLabelClass}>{label}</p>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
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
      }, sectionRef);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [prefersReducedMotion]);

  return (
    <SectionShell id="stats" sectionRef={sectionRef}>
      <div ref={headerRef} className="mb-10 sm:mb-14">
        <SectionHeader
          eyebrow="Stats"
          title="By the"
          titleAccent="numbers"
          description="A snapshot of the results we've helped teams achieve so far."
        />
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
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
