"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { ExperienceHero } from "@/components/ui/experience-hero"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { cn } from "@/lib/utils"

const CANVAS_COLORS = {
  dark: [
    [220, 38, 38],
    [255, 255, 255],
  ] as number[][],
  light: [
    [220, 38, 38],
    [23, 23, 23],
  ] as number[][],
}

export function Hero() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isMobile, isTablet, prefersReducedMotion } = useBreakpoint()

  useEffect(() => {
    setMounted(true)
  }, [])

  const theme = mounted && resolvedTheme === "light" ? "light" : "dark"
  const dotSize = isMobile ? 3 : isTablet ? 4 : 5
  const animationSpeed = prefersReducedMotion ? 0 : isMobile ? 2.5 : 3

  return (
    <section
      className={cn(
        "relative flex h-dvh max-h-dvh w-full flex-col overflow-hidden",
        "bg-white dark:bg-black",
      )}
    >
      <div className="absolute inset-0">
        {prefersReducedMotion ? (
          <div className="size-full bg-white dark:bg-black" />
        ) : (
          <CanvasRevealEffect
            key={theme}
            animationSpeed={animationSpeed}
            containerClassName="bg-white dark:bg-black"
            colors={CANVAS_COLORS[theme]}
            dotSize={dotSize}
            showGradient
          />
        )}
        <div
          className={cn(
            "absolute top-0 right-0 left-0 h-1/4 bg-gradient-to-b from-white to-transparent sm:h-1/3",
            "dark:from-black dark:to-transparent",
          )}
        />
      </div>

      <div className="relative z-10 flex h-full min-h-0 flex-1 flex-col">
        <ExperienceHero />
      </div>
    </section>
  )
}
