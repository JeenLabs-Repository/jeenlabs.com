"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { registerGsapPlugins } from "@/lib/gsap-lazy";
import { runGsap } from "@/lib/run-gsap";
import {
  SERVICES_CONTENT,
  SERVICE_SLUGS,
  serviceHref,
  type ServiceSlug,
} from "@/lib/services-content";
import { siteFocusRingClass, siteMonoChipClass } from "@/lib/site-layout";

const SERVICE_ICONS: Record<ServiceSlug, ReactNode> = {
  "web-development": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-5 stroke-current sm:size-6"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="14" rx="2" strokeWidth="1.5" />
      <path d="M3 8h18" strokeWidth="1.5" />
      <circle cx="6" cy="6" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="6" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  ),
  "software-development": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-5 stroke-current sm:size-6"
      aria-hidden
    >
      <path
        d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  automation: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-5 stroke-current sm:size-6"
      aria-hidden
    >
      <path
        d="M6 6h4v4H6zM14 6h4v4h-4zM10 14h4v4h-4z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 8h4M12 10v4M8 14H6M18 14h-2"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const SERVICES = SERVICE_SLUGS.map((slug) => ({
  ...SERVICES_CONTENT[slug],
  icon: SERVICE_ICONS[slug],
}));

function ServiceRow({
  service,
  isActive,
  onActivate,
  rowRef,
}: {
  service: (typeof SERVICES)[number];
  isActive: boolean;
  onActivate: () => void;
  rowRef: (el: HTMLAnchorElement | null) => void;
}) {
  return (
    <Link
      href={serviceHref(service.slug)}
      ref={rowRef}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={cn(
        "group relative grid grid-cols-1 gap-3 border-t border-border/40 no-underline transition-[background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:grid-cols-[4.5rem_minmax(0,1fr)_auto] md:items-start md:gap-6 lg:grid-cols-[5.5rem_minmax(0,1fr)_auto] lg:gap-8",
        "py-5 sm:py-6 md:py-7 lg:py-8",
        isActive && "bg-foreground/[0.03]",
        siteFocusRingClass,
        "rounded-sm",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-px bg-brand/0 transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isActive && "bg-brand scale-y-100",
          !isActive && "scale-y-50",
        )}
        aria-hidden
      />

      <span
        className={cn(
          "font-mono text-[0.7rem] font-bold tracking-[0.28em] uppercase transition-colors duration-500 md:pt-1",
          isActive ? "text-brand-accessible" : "text-muted-foreground/70",
        )}
      >
        {service.index}
      </span>

      <div className="flex min-w-0 flex-col gap-3 md:gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={cn(
              "text-[clamp(1.5rem,5.5vw,3.25rem)] leading-[0.95] font-black tracking-[-0.03em] text-foreground uppercase transition-colors duration-500",
              isActive && "text-foreground",
            )}
          >
            {service.title}
          </h3>
          <span
            className={cn(
              "mt-1 shrink-0 text-muted-foreground transition-[color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden",
              isActive && "text-brand",
            )}
          >
            {service.icon}
          </span>
        </div>

        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            isActive
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="max-w-[48ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.9375rem]">
              {service.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <li key={tag} className={siteMonoChipClass}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-4 md:flex md:pt-2">
        <span
          className={cn(
            "text-muted-foreground transition-colors duration-500",
            isActive && "text-brand",
          )}
        >
          {service.icon}
        </span>
        <span
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border border-border/50 transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            isActive
              ? "translate-x-0 border-brand/50 bg-brand text-white"
              : "translate-x-0 border-border/40 bg-transparent text-muted-foreground group-hover:border-brand/40",
          )}
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-4 stroke-current"
          >
            <path
              d="M7 17L17 7M17 7H8M17 7V16"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<HTMLAnchorElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    if (prefersReducedMotion) return;

    const rows = rowRefs.current.filter(Boolean);
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void runGsap((gsap) => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          headerRef.current,
          { y: 36, opacity: 0 },
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

        gsap.fromTo(
          rows,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 82%",
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
    if (typeof window === "undefined" || prefersReducedMotion) return;
    void registerGsapPlugins().then(async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      ScrollTrigger.refresh();
    });
  }, [prefersReducedMotion]);

  return (
    <SectionShell
      id="services"
      ariaLabelledBy="services-heading"
      sectionRef={sectionRef}
      tall
      tone="studio"
      innerClassName="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16"
    >
      <div ref={headerRef} className="md:max-w-2xl">
        <SectionHeader
          eyebrow="Services"
          title="What we"
          titleAccent="build"
          description="Automation, web products, and custom software — scoped to the constraint, shipped to production."
          headingId="services-heading"
        />
      </div>

      <div
        ref={listRef}
        className="border-b border-border/40"
        onMouseLeave={() => setActiveIndex(0)}
      >
        {SERVICES.map((service, index) => (
          <ServiceRow
            key={service.slug}
            service={service}
            isActive={activeIndex === index}
            onActivate={() => setActiveIndex(index)}
            rowRef={(el) => {
              if (el) rowRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </SectionShell>
  );
}
