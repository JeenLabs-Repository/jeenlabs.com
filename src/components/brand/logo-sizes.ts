export type LogoScale = "sm" | "md" | "lg" | "xl";

export type ResponsiveLogoScale =
  | LogoScale
  | {
      mobile: LogoScale;
      tablet?: LogoScale;
      desktop?: LogoScale;
    };

export type ResolvedLogoScales = {
  mobile: LogoScale;
  tablet: LogoScale;
  desktop: LogoScale;
};

export function resolveResponsiveScale(
  scale: ResponsiveLogoScale | undefined,
  fallback: LogoScale,
): ResolvedLogoScales {
  if (!scale || typeof scale === "string") {
    const value = scale ?? fallback;
    return { mobile: value, tablet: value, desktop: value };
  }

  return {
    mobile: scale.mobile,
    tablet: scale.tablet ?? scale.mobile,
    desktop: scale.desktop ?? scale.tablet ?? scale.mobile,
  };
}

type BreakpointClasses = {
  mobile: string;
  tablet: string;
  desktop: string;
};

/** Fluid mark height — clamp(min, preferred vw, max) per scale tier */
export const LOGO_MARK_SIZE: Record<LogoScale, BreakpointClasses> = {
  sm: {
    mobile: "h-[clamp(2.25rem,7vw,3rem)]",
    tablet: "h-[clamp(2.5rem,8vw,3.5rem)]",
    desktop: "h-[clamp(2.75rem,9vw,4rem)]",
  },
  md: {
    mobile: "h-[clamp(2.75rem,9vw,3.75rem)]",
    tablet: "h-[clamp(3rem,10vw,4.25rem)]",
    desktop: "h-[clamp(3.25rem,11vw,4.75rem)]",
  },
  lg: {
    mobile: "h-[clamp(3.25rem,11vw,4.5rem)]",
    tablet: "h-[clamp(3.75rem,12vw,5.25rem)]",
    desktop: "h-[clamp(4.25rem,13vw,6rem)]",
  },
  xl: {
    mobile: "h-[clamp(3.75rem,13vw,5.25rem)]",
    tablet: "h-[clamp(4.25rem,14vw,6rem)]",
    desktop: "h-[clamp(4.75rem,15vw,7rem)]",
  },
};

/** Fluid wordmark — font-size via clamp; tracking stays em-relative */
export const LOGO_NAME_SIZE: Record<LogoScale, BreakpointClasses> = {
  sm: {
    mobile: "text-[clamp(1rem,2.8vw,1.375rem)] tracking-[0.18em]",
    tablet: "text-[clamp(1.0625rem,3vw,1.5rem)] tracking-[0.2em]",
    desktop: "text-[clamp(1.125rem,3.2vw,1.625rem)] tracking-[0.22em]",
  },
  md: {
    mobile: "text-[clamp(1.125rem,3.2vw,1.5rem)] tracking-[0.24em]",
    tablet: "text-[clamp(1.25rem,3.6vw,1.75rem)] tracking-[0.28em]",
    desktop: "text-[clamp(1.375rem,4vw,2rem)] tracking-[0.32em]",
  },
  lg: {
    mobile: "text-[clamp(1.375rem,4vw,1.875rem)] tracking-[0.28em]",
    tablet: "text-[clamp(1.5rem,4.5vw,2.125rem)] tracking-[0.32em]",
    desktop: "text-[clamp(1.75rem,5vw,2.5rem)] tracking-[0.36em]",
  },
  xl: {
    mobile: "text-[clamp(1.625rem,4.8vw,2.125rem)] tracking-[0.32em]",
    tablet: "text-[clamp(1.875rem,5.5vw,2.5rem)] tracking-[0.36em]",
    desktop: "text-[clamp(2.125rem,6vw,3rem)] tracking-[0.4em]",
  },
};

export const LOGO_GAP_HORIZONTAL: Record<LogoScale, BreakpointClasses> = {
  sm: {
    mobile: "gap-[clamp(0.375rem,1.5vw,0.625rem)]",
    tablet: "gap-[clamp(0.5rem,1.75vw,0.75rem)]",
    desktop: "gap-[clamp(0.5rem,2vw,0.875rem)]",
  },
  md: {
    mobile: "gap-[clamp(0.5rem,2vw,0.75rem)]",
    tablet: "gap-[clamp(0.625rem,2.25vw,0.875rem)]",
    desktop: "gap-[clamp(0.75rem,2.5vw,1rem)]",
  },
  lg: {
    mobile: "gap-[clamp(0.625rem,2.25vw,0.875rem)]",
    tablet: "gap-[clamp(0.75rem,2.5vw,1rem)]",
    desktop: "gap-[clamp(0.875rem,3vw,1.25rem)]",
  },
  xl: {
    mobile: "gap-[clamp(0.75rem,2.5vw,1rem)]",
    tablet: "gap-[clamp(0.875rem,3vw,1.25rem)]",
    desktop: "gap-[clamp(1rem,3.5vw,1.5rem)]",
  },
};

export const LOGO_GAP_VERTICAL: Record<LogoScale, BreakpointClasses> = {
  sm: {
    mobile: "gap-[clamp(0.375rem,1.5vw,0.625rem)]",
    tablet: "gap-[clamp(0.5rem,1.75vw,0.75rem)]",
    desktop: "gap-[clamp(0.5rem,2vw,0.875rem)]",
  },
  md: {
    mobile: "gap-[clamp(0.5rem,2vw,0.75rem)]",
    tablet: "gap-[clamp(0.625rem,2.25vw,0.875rem)]",
    desktop: "gap-[clamp(0.75rem,2.5vw,1rem)]",
  },
  lg: {
    mobile: "gap-[clamp(0.625rem,2.25vw,0.875rem)]",
    tablet: "gap-[clamp(0.75rem,2.5vw,1rem)]",
    desktop: "gap-[clamp(0.875rem,3vw,1.25rem)]",
  },
  xl: {
    mobile: "gap-[clamp(0.75rem,2.5vw,1rem)]",
    tablet: "gap-[clamp(0.875rem,3vw,1.25rem)]",
    desktop: "gap-[clamp(1rem,3.5vw,1.5rem)]",
  },
};

function prefixBreakpointClasses(classes: string, prefix: string): string {
  return classes
    .split(/\s+/)
    .filter(Boolean)
    .map((className) => `${prefix}${className}`)
    .join(" ");
}

export function buildResponsiveClass(
  map: Record<LogoScale, BreakpointClasses>,
  scales: ResolvedLogoScales,
): string {
  const mobile = map[scales.mobile].mobile;
  const tablet = prefixBreakpointClasses(map[scales.tablet].tablet, "md:");
  const desktop = prefixBreakpointClasses(map[scales.desktop].desktop, "lg:");

  return [mobile, tablet, desktop].join(" ");
}
