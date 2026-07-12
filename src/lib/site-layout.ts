/**
 * Shared layout and surface tokens for the landing app.
 */

import { cn } from "@/lib/utils";

/** Section content gutters — symmetric, uses horizontal space on large screens. */
export const sitePaddingX =
  "pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] sm:pl-8 sm:pr-8 md:pl-12 md:pr-12 lg:pl-16 lg:pr-16 xl:pl-20 xl:pr-20 2xl:pl-24 2xl:pr-24";

/**
 * Full-width navbar insets — compact, symmetric edge padding only.
 * Not tied to section content gutters.
 */
export const navBarPaddingX =
  "pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] sm:pl-6 sm:pr-6 md:pl-10 md:pr-10 lg:pl-12 lg:pr-12";

export const siteHeaderOffsetClass = "pt-[var(--spacing-site-header)]";

/** Full-bleed page/section canvas — matches layout body and footer. */
export const siteBackgroundClass = "bg-background";

/** Dot-grid overlay — rendered once in SiteAmbientBackground. */
export const siteGridClass = cn(
  "[background-size:60px_60px]",
  "bg-[linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_3%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_3%,transparent)_1px,transparent_1px)]",
  "[mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]",
  "[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]",
);

/** Subtle brand rule — navbar underline and section dividers. */
export const siteSectionBrandRuleClass = "border-b border-brand/35";
export const siteEyebrowClass =
  "font-mono text-[0.625rem] font-bold tracking-[0.35em] text-brand-accessible uppercase sm:text-xs";

/** Small mono stat labels — same accessible brand contrast as eyebrows. */
export const siteStatLabelClass =
  "mt-2 font-mono text-[0.625rem] font-semibold tracking-[0.2em] text-brand-accessible uppercase sm:text-xs";

/** Primary section heading scale. */
export const siteSectionTitleClass =
  "text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-black tracking-tighter text-foreground uppercase";

/** Outline accent word inside section headings (matches hero). */
export const siteTitleAccentClass =
  "text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--brand)_85%,white)]";

/** Section supporting copy. */
export const siteSectionDescriptionClass =
  "max-w-[42ch] text-sm leading-relaxed text-muted-foreground md:font-mono md:text-[0.6875rem] md:tracking-[0.2em] md:uppercase";

/** Small mono chips / tags. */
export const siteMonoChipClass =
  "rounded-full border border-border/50 bg-background/50 px-3 py-1 font-mono text-[0.625rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase";

/** Text pill links for secondary actions. */
export const sitePillLinkClass =
  "inline-flex items-center justify-center rounded-full border border-border/50 bg-background/30 px-4 py-2 font-mono text-[0.625rem] font-semibold leading-none tracking-[0.15em] text-foreground uppercase no-underline transition-colors hover:border-brand/50 hover:text-brand";

/** Form labels — mono uppercase chips. */
export const siteFormLabelClass =
  "mb-1.5 block font-mono text-[0.625rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase";

/** Footer contact form fields — dim white outlines on dark canvas. */
export const siteFooterFormFieldClass =
  "w-full rounded-xl border border-white/10 bg-background/20 px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/10";

/** Shared input, select, and textarea styling. */
export const siteFormFieldClass =
  "w-full rounded-xl border border-border/50 bg-background/30 px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

/** Card shell for form panels. */
export const siteFormPanelClass =
  "rounded-2xl border border-border/40 bg-background/25 p-5 backdrop-blur-sm sm:p-6";

/** Footer / legal meta line. */
export const siteFooterMetaClass =
  "font-mono text-[0.625rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-xs";

export const siteWatermarkClass = cn(
  "font-brand text-[clamp(3rem,19vw,15rem)] leading-[0.75] font-black tracking-[-0.04em]",
  "text-transparent max-w-[96vw]",
  "[-webkit-text-stroke:1px_color-mix(in_oklch,var(--foreground)_5%,transparent)]",
  "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--foreground)_10%,transparent)_0%,transparent_60%)]",
  "bg-clip-text",
);

export const siteWatermarkAccentClass = cn(
  "[-webkit-text-stroke:1px_color-mix(in_oklch,var(--brand)_50%,transparent)]",
  "bg-[linear-gradient(180deg,color-mix(in_oklch,var(--brand)_65%,transparent)_0%,color-mix(in_oklch,var(--brand)_18%,transparent)_65%)]",
  "bg-clip-text",
);
