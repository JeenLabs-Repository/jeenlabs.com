import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

import {
  buildResponsiveClass,
  LOGO_GAP_HORIZONTAL,
  LOGO_GAP_VERTICAL,
  LOGO_MARK_SIZE,
  LOGO_NAME_SIZE,
  type LogoScale,
  type ResponsiveLogoScale,
  resolveResponsiveScale,
} from "./logo-sizes";

export type {
  LogoScale,
  ResolvedLogoScales,
  ResponsiveLogoScale,
} from "./logo-sizes";

/** Mark viewBox is 340×413 — keep width derived from height for consistent alignment */
const MARK_ASPECT = "aspect-[340/413]";

const DEFAULT_LOGO_COLOUR = "var(--foreground)";
const DEFAULT_LOGO_NAME_COLOUR = "var(--foreground)";

export type BrandLogoVariant =
  | "logo-only"
  | "logo-name-only"
  | "logo-name-horizontal"
  | "logo-name-vertical";

/** @deprecated Use `LogoScale` — kept for backwards compatibility */
export type BrandLogoSize = LogoScale;

type LogoColourProps = {
  /** Mark colour. Defaults to theme foreground (`var(--foreground)`). */
  logoColour?: string;
  /** Wordmark letter colour (JEENL / BS). Defaults to theme foreground. The “A” stays brand red. */
  logoNameColour?: string;
};

function resolveColour(
  colour: string | undefined,
  fallback: string,
  themeClass: string,
) {
  if (colour) {
    return {
      className: undefined,
      style: { color: colour } satisfies CSSProperties,
    };
  }

  return {
    className: themeClass,
    style: { color: fallback } satisfies CSSProperties,
  };
}

export function LogoMark({
  className,
  logoColour,
}: {
  className?: string;
  logoColour?: string;
}) {
  const colour = resolveColour(
    logoColour,
    DEFAULT_LOGO_COLOUR,
    "text-foreground",
  );

  return (
    <span
      className={cn("inline-flex shrink-0", colour.className)}
      style={colour.style}
    >
      <svg
        viewBox="0 0 340 413"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("block w-auto shrink-0", MARK_ASPECT, className)}
        aria-hidden
      >
        <title>Jeen Labs</title>
        <g>
          <path
            d="M340 35.5L279 107.5L321 196L237 276.5V357.5L180 413V369.517C180.644 369.38 181.283 369.23 181.917 369.066L184.51 372.947C188.214 371.873 191.745 370.4 195.057 368.574L194.148 363.993C195.701 363.078 197.196 362.077 198.63 360.995L202.509 363.586C205.488 361.197 208.197 358.488 210.586 355.509L207.995 351.63C209.075 350.198 210.077 348.7 210.994 347.147L215.574 348.058C217.398 344.746 218.873 341.213 219.947 337.511L216.066 334.918C216.512 333.188 216.86 331.421 217.11 329.622L221.687 328.711C221.89 326.835 222 324.93 222 323C222 321.07 221.892 319.165 221.687 317.289L217.11 316.378C216.86 314.581 216.512 312.812 216.066 311.084L219.947 308.491C218.873 304.787 217.4 301.256 215.574 297.944L210.994 298.853C210.077 297.3 209.075 295.802 207.995 294.37L210.586 290.491C208.197 287.512 205.486 284.803 202.509 282.414L198.63 285.005C197.198 283.925 195.701 282.924 194.148 282.007L195.057 277.426C191.745 275.602 188.214 274.127 184.51 273.053L181.917 276.934C181.283 276.77 180.644 276.62 180 276.483V254L254.5 183.5L230 131.5H110L85 183L159.5 254V276.592C159.025 276.699 158.553 276.813 158.083 276.934L155.49 273.053C151.788 274.127 148.255 275.6 144.943 277.426L145.854 282.007C144.301 282.922 142.806 283.923 141.372 285.005L137.493 282.414C134.515 284.803 131.805 287.512 129.416 290.491L132.007 294.37C130.925 295.802 129.923 297.3 129.006 298.853L124.426 297.944C122.602 301.256 121.125 304.787 120.053 308.491L123.934 311.084C123.488 312.812 123.142 314.579 122.89 316.378L118.313 317.289C118.11 319.165 118 321.07 118 323C118 324.93 118.108 326.835 118.313 328.711L122.89 329.622C123.14 331.421 123.488 333.19 123.934 334.918L120.053 337.511C121.127 341.213 122.6 344.746 124.426 348.058L129.006 347.147C129.925 348.7 130.925 350.196 132.007 351.63L129.416 355.509C131.805 358.486 134.514 361.197 137.493 363.586L141.372 360.995C142.804 362.075 144.301 363.076 145.854 363.993L144.943 368.574C148.255 370.398 151.786 371.874 155.49 372.947L158.083 369.066C158.553 369.187 159.025 369.301 159.5 369.407V413L102.5 357.5V276L18.5 196L60.5 108L0 35L42 0L104.5 75H235.5L297.5 0L340 35.5Z"
            fill="currentColor"
          />
          <path
            d="M180 354.596C193.408 350.355 203.128 337.815 203.128 323.004C203.128 308.193 193.408 295.652 180 291.412V293.811C192.13 297.965 200.85 309.467 200.85 323.004C200.85 336.541 192.129 348.044 180 352.198V354.596Z"
            fill="currentColor"
          />
          <path
            d="M159.5 352.022V354.432C146.352 350.041 136.874 337.629 136.874 323.004C136.874 308.379 146.352 295.967 159.5 291.575V293.987C147.631 298.283 139.15 309.652 139.15 323.004C139.15 336.355 147.632 347.726 159.5 352.022Z"
            fill="currentColor"
          />
          <path
            d="M180 349.779C190.849 345.726 198.574 335.267 198.574 323.004C198.574 310.74 190.849 300.282 180 296.228V349.779Z"
            fill="currentColor"
          />
          <path
            d="M159.5 296.421V349.586C148.916 345.401 141.428 335.077 141.428 323.004C141.428 310.93 148.915 300.606 159.5 296.421Z"
            fill="currentColor"
          />
          <path
            d="M251.5 286V343.5L280.5 316V255.5L251.5 286Z"
            fill="currentColor"
          />
          <path
            d="M88.5 287L59.5 255.5L59 255L59.5 316L88.5 343.5V287Z"
            fill="currentColor"
          />
          <path
            d="M144.292 284.771C132.003 293.006 123.915 307.017 123.915 322.919C123.915 338.822 132.005 352.833 144.292 361.068C133.112 352.383 125.875 338.528 125.875 322.919C125.875 307.311 133.11 293.455 144.292 284.771Z"
            fill="currentColor"
          />
          <path
            d="M195.514 284.771C207.803 293.006 215.891 307.017 215.891 322.919C215.891 338.822 207.801 352.833 195.514 361.068C206.694 352.383 213.931 338.528 213.931 322.919C213.931 307.311 206.696 293.455 195.514 284.771Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </span>
  );
}

export function LogoWordmark({
  className,
  logoNameColour,
}: {
  className?: string;
  logoNameColour?: string;
}) {
  const nameColour = resolveColour(
    logoNameColour,
    DEFAULT_LOGO_NAME_COLOUR,
    "text-foreground",
  );

  return (
    <span
      className={cn(
        "font-brand inline-block font-semibold leading-none whitespace-nowrap",
        className,
      )}
    >
      <span className={nameColour.className} style={nameColour.style}>
        JEENL
      </span>
      <span className="text-brand">A</span>
      <span className={nameColour.className} style={nameColour.style}>
        BS
      </span>
    </span>
  );
}

export type BrandLogoProps = LogoColourProps & {
  /** Layout: mark only, name only, or combined horizontal / vertical lockups. */
  variant?: BrandLogoVariant;
  /**
   * Sets both mark and wordmark scale. Overridden by `logoSize` / `nameSize`.
   * Use a string for uniform sizing, or per-viewport scales for responsive lockups.
   */
  size?: ResponsiveLogoScale;
  /** Mark (icon) scale per viewport: mobile (&lt;768px), tablet (md), desktop (lg). */
  logoSize?: ResponsiveLogoScale;
  /** Wordmark scale per viewport. The “A” accent stays brand red. */
  nameSize?: ResponsiveLogoScale;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
};

/** Jeen Labs brand logo — reusable across apps with layout and colour overrides. */
export function BrandLogo({
  variant = "logo-name-horizontal",
  size = "md",
  logoSize,
  nameSize,
  logoColour,
  logoNameColour,
  className,
  markClassName,
  wordmarkClassName,
}: BrandLogoProps) {
  const fallback = typeof size === "string" ? size : (size.mobile ?? "md");
  const markScales = resolveResponsiveScale(logoSize ?? size, fallback);
  const nameScales = resolveResponsiveScale(nameSize ?? size, fallback);
  const gapScales = resolveResponsiveScale(
    size ?? logoSize ?? nameSize,
    fallback,
  );

  const markClasses = buildResponsiveClass(LOGO_MARK_SIZE, markScales);
  const nameClasses = buildResponsiveClass(LOGO_NAME_SIZE, nameScales);
  const gapHorizontal = buildResponsiveClass(LOGO_GAP_HORIZONTAL, gapScales);
  const gapVertical = buildResponsiveClass(LOGO_GAP_VERTICAL, gapScales);

  if (variant === "logo-only") {
    return (
      <LogoMark
        className={cn(markClasses, markClassName, className)}
        logoColour={logoColour}
      />
    );
  }

  if (variant === "logo-name-only") {
    return (
      <LogoWordmark
        className={cn(nameClasses, wordmarkClassName, className)}
        logoNameColour={logoNameColour}
      />
    );
  }

  const isVertical = variant === "logo-name-vertical";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center",
        isVertical ? "flex-col" : "flex-row",
        isVertical ? gapVertical : gapHorizontal,
        className,
      )}
    >
      <LogoMark
        className={cn(markClasses, markClassName)}
        logoColour={logoColour}
      />
      <LogoWordmark
        className={cn(
          nameClasses,
          isVertical ? "translate-y-0" : "translate-y-px",
          wordmarkClassName,
        )}
        logoNameColour={logoNameColour}
      />
    </span>
  );
}
