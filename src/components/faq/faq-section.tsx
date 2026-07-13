"use client";

import { useEffect, useRef } from "react";
import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { runGsap } from "@/lib/run-gsap";
import { FAQ_ITEMS } from "@/lib/sections-content";
import { cn } from "@/lib/utils";

export function FaqSection() {
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
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: listRef.current,
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
      id="faq"
      ariaLabelledBy="faq-heading"
      sectionRef={sectionRef}
      tone="ember"
      innerClassName="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14"
    >
      <div
        ref={headerRef}
        className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_0.85fr]"
      >
        <SectionHeader
          eyebrow="FAQ"
          title="Before you"
          titleAccent="write"
          description="Straight answers on how we engage — so the contact form isn’t your first discovery call."
          headingId="faq-heading"
        />
      </div>

      <div
        ref={listRef}
        className="grid grid-cols-1 gap-0 border-t border-border/40 md:grid-cols-2"
      >
        {FAQ_ITEMS.map((item) => (
          <article
            key={item.question}
            className={cn(
              "flex flex-col gap-2.5 border-b border-border/40 py-5 sm:gap-3 sm:py-6 md:px-5 md:odd:pl-0 md:even:pr-0 lg:px-6",
              "md:odd:border-r md:odd:border-border/40",
            )}
          >
            <h3 className="text-base font-semibold tracking-tight text-foreground text-balance sm:text-lg">
              {item.question}
            </h3>
            <p className="max-w-[46ch] text-sm leading-relaxed text-muted-foreground text-pretty">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
