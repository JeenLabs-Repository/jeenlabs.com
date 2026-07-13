"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { SectionShell } from "@/components/section-shell";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap-lazy";
import { runGsap } from "@/lib/run-gsap";
import {
  SERVICE_SLUGS,
  SERVICES_CONTENT,
  type ServiceSlug,
  serviceHref,
} from "@/lib/services-content";
import { siteFocusRingClass, siteMonoChipClass } from "@/lib/site-layout";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<ServiceSlug, ReactNode> = {
  "web-development": (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
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
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
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
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
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

function ArrowIcon({ className }: { className?: string }) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("size-3.5 stroke-current sm:size-4", className)}
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceRow({
  service,
  isActive,
  onActivate,
  rowRef,
  isTouchUi,
}: {
  service: (typeof SERVICES)[number];
  isActive: boolean;
  onActivate: () => void;
  rowRef: (el: HTMLElement | null) => void;
  isTouchUi: boolean;
}) {
  const href = serviceHref(service.slug);

  return (
    <article
      ref={rowRef}
      onMouseEnter={() => {
        if (!isTouchUi) onActivate();
      }}
      className={cn(
        "group relative border-t border-border/40 transition-[background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "py-5 sm:py-6 md:py-7 lg:py-8",
        // Keep content clear of the active rail on every breakpoint.
        "pl-4 sm:pl-5 md:pl-0",
        isActive && "bg-foreground/[0.03]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute top-3 bottom-3 left-0 w-px origin-center bg-brand/0 transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:top-4 md:bottom-4",
          isActive ? "scale-y-100 bg-brand" : "scale-y-50 bg-brand/0",
        )}
        aria-hidden
      />

      <div
        className={cn(
          "grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-3 sm:gap-x-4 md:gap-x-6 lg:gap-x-8",
          "md:grid-cols-[4.5rem_minmax(0,1fr)_auto] lg:grid-cols-[5.5rem_minmax(0,1fr)_auto]",
        )}
      >
        <span
          className={cn(
            "pt-1.5 font-mono text-[0.65rem] font-bold tracking-[0.22em] uppercase transition-colors duration-500 sm:pt-2 sm:text-[0.7rem] sm:tracking-[0.28em] md:pt-2.5",
            isActive ? "text-brand-accessible" : "text-muted-foreground/70",
          )}
        >
          {service.index}
        </span>

        <div className="flex min-w-0 flex-col gap-3 md:gap-4">
          {isTouchUi ? (
            <button
              type="button"
              onClick={onActivate}
              className={cn(
                "flex w-full items-start justify-between gap-3 text-left",
                siteFocusRingClass,
                "rounded-sm",
              )}
              aria-expanded={isActive}
              aria-controls={`service-panel-${service.slug}`}
            >
              <h3 className="text-[clamp(1.4rem,5.2vw,3.25rem)] leading-[1.02] font-black tracking-[-0.03em] text-foreground uppercase">
                {service.title}
              </h3>
              <span
                className={cn(
                  "mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-[color,border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isActive && "border-brand/50 bg-brand text-white",
                )}
                aria-hidden
              >
                <ArrowIcon
                  className={cn(
                    "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    isActive && "rotate-45",
                  )}
                />
              </span>
            </button>
          ) : (
            <Link
              href={href}
              onMouseEnter={onActivate}
              onFocus={onActivate}
              className={cn(
                "block min-w-0 no-underline",
                siteFocusRingClass,
                "rounded-sm",
              )}
            >
              <h3 className="text-[clamp(1.5rem,5.5vw,3.25rem)] leading-[1.02] font-black tracking-[-0.03em] text-foreground uppercase transition-colors duration-500">
                {service.title}
              </h3>
            </Link>
          )}

          <div
            id={`service-panel-${service.slug}`}
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              isActive
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0",
            )}
            aria-hidden={!isActive}
          >
            <div className="overflow-hidden">
              <p className="max-w-[48ch] pt-0.5 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.9375rem]">
                {service.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 pb-1">
                {service.tags.map((tag) => (
                  <li key={tag} className={siteMonoChipClass}>
                    {tag}
                  </li>
                ))}
              </ul>
              {isTouchUi ? (
                <Link
                  href={href}
                  className={cn(
                    "mt-4 inline-flex min-h-11 items-center gap-2 font-mono text-[0.625rem] font-semibold tracking-[0.16em] text-brand-accessible uppercase no-underline",
                    siteFocusRingClass,
                    "rounded-sm",
                  )}
                >
                  View details
                  <ArrowIcon className="size-3" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        {!isTouchUi ? (
          <Link
            href={href}
            onMouseEnter={onActivate}
            onFocus={onActivate}
            className={cn(
              "hidden items-center gap-4 no-underline md:flex md:pt-1",
              siteFocusRingClass,
              "rounded-full",
            )}
            aria-label={`View ${service.title} details`}
          >
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
                "inline-flex size-10 items-center justify-center rounded-full border border-border/50 transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isActive
                  ? "border-brand/50 bg-brand text-white"
                  : "border-border/40 bg-transparent text-muted-foreground group-hover:border-brand/40",
              )}
              aria-hidden
            >
              <ArrowIcon />
            </span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function useIsTouchUi() {
  // Default to touch-safe until we can measure — avoids first-tap navigation on phones.
  const [isTouchUi, setIsTouchUi] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setIsTouchUi(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isTouchUi;
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouchUi = useIsTouchUi();

  // Touch / coarse pointer: expand the row nearest the viewport center while scrolling.
  useEffect(() => {
    if (!isTouchUi) return;

    const rows = rowRefs.current.filter(Boolean) as HTMLElement[];
    if (rows.length === 0) return;

    const ratios = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = rows.indexOf(entry.target as HTMLElement);
          if (index < 0) continue;
          ratios.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestIndex = 0;
        let bestRatio = -1;
        for (const [index, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        }

        if (bestRatio > 0.2) {
          setActiveIndex(bestIndex);
        }
      },
      {
        // Center band of the viewport — the row crossing it becomes active.
        root: null,
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    for (const row of rows) observer.observe(row);
    return () => observer.disconnect();
  }, [isTouchUi]);

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

      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover reset for fine-pointer list */}
      <div
        ref={listRef}
        className="border-b border-border/40"
        onMouseLeave={() => {
          if (!isTouchUi) setActiveIndex(0);
        }}
      >
        {SERVICES.map((service, index) => (
          <ServiceRow
            key={service.slug}
            service={service}
            isActive={activeIndex === index}
            onActivate={() => setActiveIndex(index)}
            isTouchUi={isTouchUi}
            rowRef={(el) => {
              rowRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </SectionShell>
  );
}
