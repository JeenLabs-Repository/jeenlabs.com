import { useEffect, useState } from 'react'

import {
  getBreakpoint,
  GLITTER_DOT_SIZE,
  type Breakpoint,
} from '@/config/breakpoints'

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Mobile ≤639px, tablet 640–1023px, desktop ≥1024px */
export function useLayoutBreakpoint() {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  return {
    isMobile,
    isTablet,
    isMobileOrTablet: isMobile || isTablet,
    prefersReducedMotion,
  }
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== 'undefined'
      ? getBreakpoint(window.innerWidth)
      : 'base',
  )

  useEffect(() => {
    const update = () => setBreakpoint(getBreakpoint(window.innerWidth))

    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  return breakpoint
}

export function useResponsiveGlitterDotSize(): number {
  const breakpoint = useBreakpoint()
  return GLITTER_DOT_SIZE[breakpoint]
}
