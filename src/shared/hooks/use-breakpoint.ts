"use client"

import { useEffect, useState } from "react"

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [query])

  return matches
}

/** Breakpoints: mobile ≤639px, tablet 640–1023px, desktop ≥1024px */
export function useBreakpoint() {
  const isMobile = useMediaQuery("(max-width: 639px)")
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return {
    isMobile,
    isTablet,
    isMobileOrTablet: isMobile || isTablet,
    prefersReducedMotion,
  }
}
