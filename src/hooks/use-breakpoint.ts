import { useEffect, useState } from 'react'

import {
  getBreakpoint,
  GLITTER_DOT_SIZE,
  type Breakpoint,
} from '@/config/breakpoints'

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
