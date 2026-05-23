import { HeroTagline } from '@/components/hero-tagline'
import { cn } from '@/lib/utils'

export function HomeHero() {
  return (
    <div
      className={cn(
        'relative mx-auto flex h-full min-h-0 w-full max-w-[100rem] flex-col',
        'px-4 pt-[calc(4rem+env(safe-area-inset-top,0px))]',
        'pb-[max(1rem,env(safe-area-inset-bottom,0px))]',
        'sm:px-6 sm:pt-[calc(4.25rem+env(safe-area-inset-top,0px))]',
        'md:px-8 md:pt-[calc(4.75rem+env(safe-area-inset-top,0px))]',
        'lg:px-10 xl:px-16',
      )}
    >
      <div
        className={cn(
          'relative flex min-h-0 w-full max-w-4xl flex-1 flex-col',
          'justify-center gap-8 py-2',
          'sm:gap-10 sm:py-4',
          'lg:justify-between lg:gap-0 lg:py-0',
        )}
      >
        <div
          aria-hidden
          className="hero-content-vignette pointer-events-none absolute inset-0 z-0"
        />
        <HeroTagline className="relative z-10" />
      </div>
    </div>
  )
}
