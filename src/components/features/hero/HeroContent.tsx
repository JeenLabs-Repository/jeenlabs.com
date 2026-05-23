import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { HeroTagline } from '@/components/features/hero/HeroTagline'
import { cn } from '@/lib/utils'

export function HeroContent({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { filter: 'blur(30px)', opacity: 0, scale: 1.02 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          scale: 1,
          duration: 2.2,
          ease: 'expo.out',
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative mx-auto flex h-full min-h-0 w-full max-w-[100rem] flex-col',
        className,
        'px-4 pt-[calc(4rem+env(safe-area-inset-top,0px))]',
        'pb-[max(1rem,env(safe-area-inset-bottom,0px))]',
        'sm:px-6 sm:pt-[calc(4.25rem+env(safe-area-inset-top,0px))]',
        'md:px-8 md:pt-[calc(4.75rem+env(safe-area-inset-top,0px))]',
        'lg:px-10 xl:px-16',
      )}
    >
      <div
        ref={revealRef}
        className={cn(
          'relative flex min-h-0 w-full max-w-4xl flex-1 flex-col',
          'justify-center gap-8 py-2',
          'sm:gap-10 sm:py-4',
          'lg:justify-between lg:gap-0 lg:py-0',
        )}
      >
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 z-0',
            'bg-[radial-gradient(ellipse_92%_78%_at_50%_46%,rgba(255,255,255,0.9)_0%,transparent_62%)]',
            'sm:bg-[radial-gradient(ellipse_98%_85%_at_48%_44%,rgba(255,255,255,0.92)_0%,transparent_66%)]',
            'lg:bg-[radial-gradient(ellipse_105%_90%_at_42%_42%,rgba(255,255,255,0.95)_0%,transparent_72%)]',
            'dark:bg-[radial-gradient(ellipse_92%_78%_at_50%_46%,rgba(0,0,0,0.92)_0%,transparent_62%)]',
            'dark:sm:bg-[radial-gradient(ellipse_98%_85%_at_48%_44%,rgba(0,0,0,0.94)_0%,transparent_66%)]',
            'dark:lg:bg-[radial-gradient(ellipse_105%_90%_at_42%_42%,rgba(0,0,0,1)_0%,transparent_72%)]',
          )}
        />

        <div
          aria-hidden
          className="relative z-10 hidden shrink-0 items-center gap-3 invisible pointer-events-none lg:flex"
        >
          <div className="size-2.5 shrink-0 rounded-full" />
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
            jeenlabs
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase">
            Software studio
          </span>
        </div>

        <HeroTagline className="relative z-10" />

        {/* Preserves desktop vertical rhythm until CTA is wired */}
        <div
          aria-hidden
          className={cn(
            'relative z-10 hidden min-h-11 w-fit shrink-0 items-center gap-4 self-start',
            'invisible pointer-events-none sm:min-h-12 sm:gap-5 md:min-h-14 lg:flex',
          )}
        >
          <div className="size-11 shrink-0 sm:size-12 md:size-14" />
          <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase sm:text-[11px] sm:tracking-[0.2em]">
            Get Started
          </span>
        </div>
      </div>
    </div>
  )
}
