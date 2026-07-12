"use client";

import { LazySection } from "@/components/lazy-section";
import { HOME_SECTIONS } from "@/lib/section-visibility";

export function HomeSections() {
  return (
    <>
      <LazySection
        id="services"
        loader={() =>
          import("@/components/services/services-section").then((mod) => ({
            default: mod.ServicesSection,
          }))
        }
      />
      <LazySection
        id="about"
        loader={() =>
          import("@/components/about/about-section").then((mod) => ({
            default: mod.AboutSection,
          }))
        }
      />
      <LazySection
        id="stats"
        loader={() =>
          import("@/components/stats/stats-section").then((mod) => ({
            default: mod.StatsSection,
          }))
        }
      />
      <LazySection
        id="team"
        loader={() =>
          import("@/components/team/team-section").then((mod) => ({
            default: mod.TeamSection,
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
        loader={() =>
          import("@/components/footer/cinematic-footer").then((mod) => ({
            default: mod.CinematicFooter,
          }))
        }
      />
    </>
  );
}
