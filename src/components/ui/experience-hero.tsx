"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import { cn } from "@/lib/utils"

export function ExperienceHero({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const { prefersReducedMotion } = useBreakpoint()

  useEffect(() => {
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 2.2,
          ease: "expo.out",
        },
      )
    }, containerRef)

    const handleMouseMove = (e: MouseEvent) => {
      if (!ctaRef.current) return
      const rect = ctaRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY)
      if (dist < 150) {
        gsap.to(ctaRef.current, {
          x: (e.clientX - centerX) * 0.4,
          y: (e.clientY - centerY) * 0.4,
          duration: 0.6,
        })
      } else {
        gsap.to(ctaRef.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      ctx.revert()
    }
  }, [prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col",
        className,
        "px-4 pt-[calc(4.25rem+env(safe-area-inset-top,0px))] pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]",
        "sm:px-6 sm:pb-8 md:px-8 md:pt-[calc(4.75rem+env(safe-area-inset-top,0px))]",
        "lg:px-10 lg:pb-12 xl:px-16",
      )}
    >
      <div
        ref={revealRef}
        className="relative flex w-full min-h-[calc(100dvh-5rem)] max-w-4xl flex-col justify-between pb-8 md:pb-6"
      >
        <div
          aria-hidden
          className="hero-content-vignette pointer-events-none absolute inset-0 z-0"
        />

        <div
          aria-hidden
          className="relative z-10 flex shrink-0 items-center gap-3 invisible pointer-events-none"
        >
          <div className="size-2.5 shrink-0 rounded-full" />
          <span className="font-mono text-[0.65rem] font-bold tracking-[0.2em] uppercase sm:text-[11px]">
            jeenlabs
          </span>
          <span className="hidden font-mono text-[9px] tracking-widest uppercase sm:inline">
            Software studio
          </span>
        </div>

        <div className="relative z-10 max-w-4xl lg:-translate-y-6">
          <h1 className="text-[clamp(2.25rem,8vw,7.5rem)] font-black leading-[0.9] tracking-tighter text-foreground uppercase">
            Build <br />
            products <br />
            <span className="text-outline-brand">with craft</span>
          </h1>
          <p className="mt-6 max-w-sm font-mono text-[10px] leading-relaxed tracking-[0.3em] text-muted-foreground uppercase sm:text-[11px] sm:tracking-[0.35em]">
            We partner with teams to design and ship{" "}
            <span className="hero-accent normal-case">thoughtful</span> digital
            experiences — from idea to production.
          </p>
        </div>

        <Link
          ref={ctaRef}
          href="/sign-in"
          aria-label="Get started — sign in"
          className="group relative z-10 flex w-fit shrink-0 items-center gap-5 lg:-translate-y-10"
        >
          <div
            className={cn(
              "hero-cta-ring flex size-12 items-center justify-center overflow-hidden rounded-full border transition-all duration-500 sm:size-14",
            )}
          >
            <div className="hero-cta-fill flex size-full items-center justify-center rounded-full transition-colors duration-500">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-foreground transition-colors duration-500 group-hover:stroke-white"
                aria-hidden
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <span className="hero-cta-label font-mono text-[10px] font-bold tracking-[0.2em] text-foreground uppercase sm:text-[11px]">
            Get Started
          </span>
        </Link>
      </div>
    </div>
  )
}
