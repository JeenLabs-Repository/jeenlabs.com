"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ReactNode, useEffect, useRef } from "react";

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
import { siteMonoChipClass } from "@/lib/site-layout";

const SERVICE_ICONS: Record<ServiceSlug, ReactNode> = {
  "web-development": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-6 stroke-current"
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
      className="size-6 stroke-current"
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
      className="size-6 stroke-current"
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

function ServiceCard({
  service,
  cardRef,
}: {
  service: (typeof SERVICES)[number];
  cardRef: (el: HTMLAnchorElement | null) => void;
}) {
  return (
    <Link
      href={serviceHref(service.slug)}
      ref={cardRef}
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border/40 no-underline",
        "bg-background/25 p-6 backdrop-blur-sm transition-[border-color,background-color,transform] duration-500",
        "hover:border-brand/45 hover:bg-background/40 md:p-8",
        "md:hover:-translate-y-1",
      )}
    >
      <div
        className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-brand/0 blur-3xl transition-[background-color] duration-500 group-hover:bg-brand/10"
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-[0.65rem] font-bold tracking-[0.25em] text-brand/70 uppercase sm:text-xs">
          {service.index}
        </span>
        <div className="text-muted-foreground transition-colors duration-500 group-hover:text-brand">
          {service.icon}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-3">
        <h3 className="text-2xl font-black tracking-tight text-foreground uppercase sm:text-3xl">
          {service.title}
        </h3>
        <p className="max-w-[32ch] text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>

      <ul className="relative flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <li
            key={tag}
            className={cn(
              siteMonoChipClass,
              "transition-colors duration-500 group-hover:border-border group-hover:text-foreground",
            )}
          >
            {tag}
          </li>
        ))}
      </ul>

      <span className="relative font-mono text-[0.625rem] font-bold tracking-[0.2em] text-brand uppercase">
        Learn more →
      </span>
    </Link>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLAnchorElement[]>([]);
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
          cards,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
      innerClassName="flex flex-col gap-12 md:gap-16"
    >
      <div ref={headerRef}>
        <SectionHeader
          eyebrow="Services"
          title="What we"
          titleAccent="build"
          description="JeenLabs delivers automation, web development, and software development to help businesses thrive in the digital landscape."
          headingId="services-heading"
        />
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6"
      >
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.slug}
            service={service}
            cardRef={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </SectionShell>
  );
}
