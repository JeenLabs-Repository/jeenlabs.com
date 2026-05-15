"use client"

import { useEffect, useState } from "react"

function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState(defaultValue)

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const onChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [query])

  return matches
}

/** Breakpoints aligned to common device widths (320–2560px). */
export function useBreakpoint() {
  const isMobile = useMediaQuery("(max-width: 639px)")
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)")
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isLargeDesktop = useMediaQuery("(min-width: 1536px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isMobileOrTablet: isMobile || isTablet,
    prefersReducedMotion,
  }
}
