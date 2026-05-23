import { GlitterAnimation } from '@/components/glitter-animation'
import { HeroContent } from '@/components/features/hero/HeroContent'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section
      className={cn(
        'relative flex h-dvh max-h-dvh w-full flex-col overflow-hidden',
        'bg-white dark:bg-black',
      )}
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        <GlitterAnimation className="h-full min-h-0" showGradient />
      </div>

      <div className="relative z-10 flex h-full min-h-0 flex-1 flex-col">
        <HeroContent />
      </div>
    </section>
  )
}
