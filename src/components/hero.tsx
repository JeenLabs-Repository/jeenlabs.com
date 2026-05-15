"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { JeenlabsLogo } from "@/components/jeenlabs-logo"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { cn } from "@/lib/utils"

const BRAND_RED = "#dc2626"

const CANVAS_COLORS = [
  [220, 38, 38],
  [255, 255, 255],
] as number[][]

export function Hero() {
  const { isMobile, isTablet, prefersReducedMotion } = useBreakpoint()

  const dotSize = isMobile ? 3 : isTablet ? 4 : 5
  const animationSpeed = prefersReducedMotion ? 0 : isMobile ? 2.5 : 3

  return (
    <section
      className={cn(
        "relative flex min-h-dvh w-full flex-col overflow-hidden bg-black",
      )}
    >
      <div className="absolute inset-0">
        {prefersReducedMotion ? (
          <div className="size-full bg-black" />
        ) : (
          <CanvasRevealEffect
            animationSpeed={animationSpeed}
            containerClassName="bg-black"
            colors={CANVAS_COLORS}
            dotSize={dotSize}
            showGradient
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,1)_0%,transparent_100%)]" />
        <div className="absolute top-0 right-0 left-0 h-1/4 bg-gradient-to-b from-black to-transparent sm:h-1/3" />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center text-center",
          "px-4 pt-[calc(4.25rem+env(safe-area-inset-top,0px))] pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]",
          "sm:px-6 sm:pb-8",
          "md:px-8 md:pt-[calc(4.75rem+env(safe-area-inset-top,0px))]",
          "lg:max-w-7xl lg:px-10 lg:pb-12",
          "xl:max-w-[90rem] xl:px-16",
          "2xl:max-w-[100rem]",
        )}
      >
        <JeenlabsLogo
          className={cn(
            "mx-auto h-12 w-auto text-white sm:h-16 md:h-[4.5rem] lg:h-20",
          )}
        />

        <p
          className={cn(
            "mt-6 text-[0.65rem] font-medium uppercase sm:mt-8 sm:text-xs",
            "tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em]",
          )}
          style={{ color: BRAND_RED }}
        >
          Software studio
        </p>

        <h1
          className={cn(
            "mt-3 max-w-[18ch] text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white",
            "min-[360px]:max-w-none min-[360px]:text-[2rem]",
            "sm:mt-4 sm:max-w-3xl sm:text-4xl sm:leading-[1.08]",
            "md:text-5xl",
            "lg:text-6xl lg:leading-[1.05]",
            "xl:max-w-4xl",
          )}
        >
          Build products with clarity, speed, and craft.
        </h1>

        <p
          className={cn(
            "mt-4 max-w-md text-sm leading-relaxed text-white/60",
            "sm:mt-6 sm:max-w-xl sm:text-base",
            "md:text-lg",
            "lg:max-w-2xl",
          )}
        >
          jeenlabs partners with teams to design and ship thoughtful digital
          experiences — from idea to production.
        </p>

        <div
          className={cn(
            "mt-8 flex w-full max-w-xs flex-col gap-3 min-[360px]:max-w-sm",
            "sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center",
          )}
        >
          <Link
            href="/#contact"
            className={cn(
              "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 active:opacity-80",
              "sm:w-auto sm:min-w-[10.5rem]",
            )}
            style={{ backgroundColor: BRAND_RED }}
          >
            Start a project
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
          <Link
            href="/#work"
            className={cn(
              "inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/20 px-6 text-sm font-medium text-white transition-colors",
              "hover:border-white/40 hover:bg-white/5 active:bg-white/10",
              "sm:w-auto sm:min-w-[10.5rem]",
            )}
          >
            View our work
          </Link>
        </div>
      </div>
    </section>
  )
}
