/**
 * Shared layout and surface tokens for the landing app.
 */

import { cn } from "@/lib/utils";

/**
 * Horizontal gutters mapped to viewport bands:
 * mobile (<640) · tablet (sm/md) · laptop (lg) · desktop (xl) · wide (2xl)
 */
export const sitePaddingX =
  "pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pl-6 sm:pr-6 md:pl-8 md:pr-8 lg:pl-12 lg:pr-12 xl:pl-16 xl:pr-16 2xl:pl-20 2xl:pr-20";

/**
 * Full-width navbar insets — compact, symmetric edge padding only.
 */
export const navBarPaddingX =
  "pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pl-5 sm:pr-5 md:pl-8 md:pr-8 lg:pl-10 lg:pr-10 xl:pl-12 xl:pr-12";

/**
 * Vertical section rhythm — fluid across phone → wide desktop.
 * Avoid locking short viewports into min-h-screen except hero/contact intent.
 */
export const siteSectionYClass =
  "py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 2xl:py-36";

export const siteSectionYTallClass =
  "py-16 sm:py-20 md:py-24 lg:py-32 xl:py-36 2xl:min-h-[100dvh] 2xl:py-40";

export const siteHeaderOffsetClass = "pt-[var(--spacing-site-header)]";

/** Full-bleed page/section canvas — matches layout body and footer. */
export const siteBackgroundClass = "bg-background";

/** Shared focus ring for interactive controls (keyboard). */
export const siteFocusRingClass =
  "outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Dot-grid overlay — rendered once in SiteAmbientBackground. */
export const siteGridClass = cn(
  "[background-size:48px_48px] sm:[background-size:56px_56px] md:[background-size:60px_60px]",
  "bg-[linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_3%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_3%,transparent)_1px,transparent_1px)]",
  "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
  "[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
);

/** Subtle brand rule — navbar underline and section dividers. */
export const siteSectionBrandRuleClass = "border-b border-brand/35";
export const siteEyebrowClass =
  "font-mono text-[0.625rem] font-bold tracking-[0.28em] text-brand-accessible uppercase sm:tracking-[0.32em] sm:text-xs";

/** Small mono stat labels — same accessible brand contrast as eyebrows. */
export const siteStatLabelClass =
  "mt-2 font-mono text-[0.625rem] font-semibold tracking-[0.18em] text-brand-accessible uppercase sm:tracking-[0.2em] sm:text-xs";

/** Primary section heading scale — stays 2–3 lines on narrow phones. */
export const siteSectionTitleClass =
  "text-[clamp(1.75rem,7vw,4.25rem)] leading-[0.95] font-black tracking-[-0.03em] text-foreground uppercase text-balance";

/** Outline accent word inside section headings (matches hero). */
export const siteTitleAccentClass =
  "text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--brand)_85%,white)]";

/** Section supporting copy — readable sentence case; mono reserved for labels. */
export const siteSectionDescriptionClass =
  "max-w-[42ch] text-sm leading-relaxed text-muted-foreground text-pretty sm:text-[0.9375rem] lg:text-base";

/** Small mono chips / tags. */
export const siteMonoChipClass =
  "rounded-full border border-border/50 bg-background/50 px-2.5 py-1 font-mono text-[0.6rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase sm:px-3 sm:text-[0.625rem] sm:tracking-[0.15em]";

/** Text pill links for secondary actions. */
export const sitePillLinkClass = cn(
  "inline-flex min-h-11 items-center justify-center rounded-full border border-border/50 bg-background/30 px-4 py-2 font-mono text-[0.625rem] font-semibold leading-none tracking-[0.15em] text-foreground uppercase no-underline transition-[border-color,color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
  "hover:border-brand/50 hover:text-brand active:scale-[0.98]",
  siteFocusRingClass,
);

/** Form labels — mono uppercase chips. */
export const siteFormLabelClass =
  "mb-1.5 block font-mono text-[0.625rem] font-semibold tracking-[0.15em] text-muted-foreground uppercase";

/** Footer contact form fields — dim white outlines on dark canvas. */
export const siteFooterFormFieldClass =
  "w-full rounded-xl border border-white/10 bg-background/30 px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/10 sm:px-4";

/** Shared input, select, and textarea styling. */
export const siteFormFieldClass =
  "w-full rounded-xl border border-border/50 bg-background/30 px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 sm:px-4";

/** Card shell for form panels — use sparingly; prefer open layouts. */
export const siteFormPanelClass =
  "rounded-2xl border border-border/40 bg-background/20 p-4 sm:p-5 md:p-6";

/** Footer / legal meta line. */
export const siteFooterMetaClass =
  "font-mono text-[0.6rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase sm:text-[0.625rem] sm:tracking-[0.2em] sm:text-xs";

export const siteWatermarkClass = cn(
  "font-brand text-[clamp(2.5rem,16vw,12rem)] leading-[0.75] font-black tracking-[-0.04em]",
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
