/** Tailwind CSS breakpoints — keep in sync with @theme in index.css */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type BreakpointKey = keyof typeof BREAKPOINTS
export type Breakpoint = 'base' | BreakpointKey

export function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS['2xl']) return '2xl'
  if (width >= BREAKPOINTS.xl) return 'xl'
  if (width >= BREAKPOINTS.lg) return 'lg'
  if (width >= BREAKPOINTS.md) return 'md'
  if (width >= BREAKPOINTS.sm) return 'sm'
  return 'base'
}

/** Glitter dot size tuned per viewport width */
export const GLITTER_DOT_SIZE: Record<Breakpoint, number> = {
  base: 4,
  sm: 5,
  md: 5,
  lg: 6,
  xl: 6,
  '2xl': 7,
}

/** Hero / glitter min-height — mobile-first Tailwind classes */
export const HERO_MIN_HEIGHT_CLASS =
  'min-h-[70svh] sm:min-h-[75svh] md:min-h-[80svh] lg:min-h-[85svh] xl:min-h-[90svh] 2xl:min-h-[92svh]'
