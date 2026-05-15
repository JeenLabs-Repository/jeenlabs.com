"use client"

import { useTheme } from "next-themes"

import { CanvasRevealEffect } from "@/features/landing/hero/canvas-reveal-effect"
import { HERO_CANVAS_COLORS } from "@/features/landing/hero/constants"
import { HeroContent } from "@/features/landing/hero/hero-content"
import { useBreakpoint } from "@/shared/hooks/use-breakpoint"
import { useMounted } from "@/shared/hooks/use-mounted"
import { cn } from "@/shared/lib/utils"

export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const { isMobile, isTablet, prefersReducedMotion } = useBreakpoint()

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
            colors={HERO_CANVAS_COLORS[theme]}
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
        <HeroContent />
      </div>
    </section>
  )
}
