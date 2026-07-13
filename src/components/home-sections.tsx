"use client";

import { LazySection } from "@/components/lazy-section";
import { HOME_SECTIONS } from "@/lib/section-visibility";

export function HomeSections() {
  return (
    <>
      <LazySection
        id="services"
        skeletonMinHeightClassName="min-h-[28rem] sm:min-h-[32rem] md:min-h-[36rem]"
        loader={() =>
          import("@/components/services/services-section").then((mod) => ({
            default: mod.ServicesSection,
          }))
        }
      />
      <LazySection
        id="process"
        skeletonMinHeightClassName="min-h-[24rem] sm:min-h-[26rem] md:min-h-[28rem]"
        loader={() =>
          import("@/components/process/process-section").then((mod) => ({
            default: mod.ProcessSection,
          }))
        }
      />
      <LazySection
        id="about"
        skeletonMinHeightClassName="min-h-[28rem] sm:min-h-[32rem] md:min-h-[36rem]"
        loader={() =>
          import("@/components/about/about-section").then((mod) => ({
            default: mod.AboutSection,
          }))
        }
      />
      <LazySection
        id="capabilities"
        skeletonMinHeightClassName="min-h-[28rem] sm:min-h-[32rem] md:min-h-[34rem]"
        loader={() =>
          import("@/components/capabilities/capabilities-section").then(
            (mod) => ({
              default: mod.CapabilitiesSection,
            }),
          )
        }
      />
      <LazySection
        id="stats"
        skeletonMinHeightClassName="min-h-[20rem] sm:min-h-[22rem] md:min-h-[24rem]"
        loader={() =>
          import("@/components/stats/stats-section").then((mod) => ({
            default: mod.StatsSection,
          }))
        }
      />
      <LazySection
        id="focus"
        skeletonMinHeightClassName="min-h-[26rem] sm:min-h-[28rem] md:min-h-[32rem]"
        loader={() =>
          import("@/components/focus/focus-section").then((mod) => ({
            default: mod.FocusSection,
          }))
        }
      />
      <LazySection
        id="team"
        skeletonMinHeightClassName="min-h-[28rem] sm:min-h-[30rem] md:min-h-[32rem]"
        loader={() =>
          import("@/components/team/team-section").then((mod) => ({
            default: mod.TeamSection,
          }))
        }
      />
      <LazySection
        id="faq"
        skeletonMinHeightClassName="min-h-[28rem] sm:min-h-[30rem] md:min-h-[32rem]"
        loader={() =>
          import("@/components/faq/faq-section").then((mod) => ({
            default: mod.FaqSection,
          }))
        }
      />
      {HOME_SECTIONS.testimonials ? (
        <LazySection
          id="testimonials"
          loader={() =>
            import("@/components/testimonials/testimonials-section").then(
              (mod) => ({
                default: mod.TestimonialsSection,
              }),
            )
          }
        />
      ) : null}
      {HOME_SECTIONS.work ? (
        <LazySection
          id="work"
          loader={() =>
            import("@/components/work/work-section").then((mod) => ({
              default: mod.WorkSection,
            }))
          }
        />
      ) : null}
      <LazySection
        id="contact"
        skeletonMinHeightClassName="min-h-[36rem] sm:min-h-[40rem] md:min-h-[44rem]"
        loader={() =>
          import("@/components/footer/cinematic-footer").then((mod) => ({
            default: mod.CinematicFooter,
          }))
        }
      />
    </>
  );
}
