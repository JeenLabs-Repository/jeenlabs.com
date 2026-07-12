"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { RingCtaButton } from "@/components/ring-cta-button";
import { CONTACT_EMAIL } from "@/lib/contact-content";
import {
  getOtherServices,
  serviceHref,
  type ServiceContent,
} from "@/lib/services-content";
import { runGsap } from "@/lib/run-gsap";
import { goToSection } from "@/lib/scroll";
import {
  siteEyebrowClass,
  siteFocusRingClass,
  siteHeaderOffsetClass,
  siteMonoChipClass,
  sitePaddingX,
  sitePillLinkClass,
  siteSectionDescriptionClass,
  siteSectionTitleClass,
  siteSectionYClass,
  siteTitleAccentClass,
} from "@/lib/site-layout";

function OfferingCard({ offering }: { offering: ServiceContent["offerings"][number] }) {
  return (
    <article className="rounded-2xl border border-border/40 bg-background/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:p-6">
      <h3 className="text-lg font-bold tracking-tight text-foreground uppercase sm:text-xl">
        {offering.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground text-pretty">{offering.intro}</p>
      <ul className="mt-4 space-y-2">
        {offering.items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

type ServiceDetailProps = {
  service: ServiceContent;
};

export function ServiceDetail({ service }: ServiceDetailProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const otherServices = getOtherServices(service.slug);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    if (prefersReducedMotion) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void runGsap((gsap) => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          heroRef.current,
          { y: 36, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
        );

        gsap.fromTo(
          mainRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mainRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );

        if (techRef.current) {
          gsap.fromTo(
            techRef.current,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: techRef.current,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        gsap.fromTo(
          ctaRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
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
    <section
      ref={sectionRef}
      className={cn(
        "relative isolate w-full overflow-hidden",
        "bg-[color-mix(in_oklch,var(--background)_88%,var(--foreground)_3%)]",
      )}
      aria-labelledby={`service-${service.slug}-heading`}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-24 right-[-8%] size-[min(60vw,26rem)] rounded-full bg-brand/[0.07] blur-[100px]" />
      </div>
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-7xl flex-col",
          sitePaddingX,
          siteHeaderOffsetClass,
          siteSectionYClass,
          "pt-6 sm:pt-8",
        )}
      >
        <div
          ref={heroRef}
          className={cn(
            "flex flex-col gap-4 pb-8 sm:gap-5 sm:pb-10 md:gap-6",
            !prefersReducedMotion && "opacity-0",
          )}
        >
          <Link
            href="/#services"
            className={cn(
              "inline-flex w-fit rounded-sm font-mono text-[0.625rem] font-bold tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:text-brand sm:text-xs",
              siteFocusRingClass,
            )}
          >
            All services
          </Link>

          <div className="flex max-w-3xl flex-col gap-4 sm:gap-5">
            <p className={siteEyebrowClass}>
              {service.index} — Services
            </p>
            <h1
              id={`service-${service.slug}-heading`}
              className={siteSectionTitleClass}
            >
              <span className={siteTitleAccentClass}>
                {service.headline}
              </span>
            </h1>
            <p className={cn(siteSectionDescriptionClass, "max-w-[48ch] sm:text-base sm:normal-case sm:tracking-normal")}>
              {service.heroSubtitle}
            </p>
            <ul className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <li key={tag} className={siteMonoChipClass}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          ref={mainRef}
          className={cn(
            "grid grid-cols-1 gap-8 border-t border-border/40 py-8 sm:gap-9 sm:py-9 lg:grid-cols-2 lg:gap-10 lg:py-12",
            !prefersReducedMotion && "opacity-0",
          )}
        >
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-foreground uppercase sm:text-3xl">
                {service.whyTitle}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {service.whySummary}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold tracking-tight text-foreground uppercase">
                {service.processTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.processIntro}
              </p>
              <ol className="mt-5 space-y-4">
                {service.processSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {service.offerings.map((offering) => (
              <OfferingCard key={offering.title} offering={offering} />
            ))}
          </div>
        </div>

        {service.technologies && service.technologies.length > 0 && (
          <div
            ref={techRef}
            className={cn(
              "border-t border-border/40 py-8 lg:py-10",
              !prefersReducedMotion && "opacity-0",
            )}
          >
            <div className="mb-6 max-w-2xl">
              <h2 className="text-2xl font-black tracking-tight text-foreground uppercase sm:text-3xl">
                Technologies we use
              </h2>
              {service.technologiesIntro && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {service.technologiesIntro}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.technologies.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-border/40 bg-background/20 p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <h3 className="text-sm font-bold tracking-tight text-foreground uppercase">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {group.items}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          ref={ctaRef}
          className={cn(
            "flex flex-col gap-8 border-t border-border/40 pt-8 pb-2 lg:gap-10 lg:pt-10",
            !prefersReducedMotion && "opacity-0",
          )}
        >
          <div className="flex max-w-2xl flex-col gap-4">
            <h2 className="text-2xl font-black tracking-tight text-foreground uppercase sm:text-3xl">
              {service.ctaTitle}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              {service.ctaDescription}
            </p>
            <p className="text-sm text-muted-foreground">
              Prefer email?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={cn(
                  "font-medium text-brand-accessible underline underline-offset-4",
                  siteFocusRingClass,
                  "rounded-sm",
                )}
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <RingCtaButton
              aria-label={`Get started with ${service.title}`}
              className="mt-2"
              onClick={() => goToSection("contact")}
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className={cn(siteEyebrowClass, "text-muted-foreground")}>
              Explore other services
            </p>
            <ul className="flex flex-wrap gap-3">
              {otherServices.map((other) => (
                <li key={other.slug}>
                  <Link href={serviceHref(other.slug)} className={sitePillLinkClass}>
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
