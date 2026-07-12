/** Jeen Labs viewport breakpoints — align Tailwind `md:` / `lg:` with these ranges. */
export const JEENLABS_BREAKPOINTS = {
  /** 0–767px — base (unprefixed) Tailwind classes */
  mobile: { min: 0, max: 767 },
  /** 768–1023px — `md:` prefix */
  tablet: { min: 768, max: 1023 },
  /** 1024px+ — `lg:` prefix */
  desktop: { min: 1024 },
} as const;

export type JeenlabsBreakpoint = keyof typeof JEENLABS_BREAKPOINTS;
