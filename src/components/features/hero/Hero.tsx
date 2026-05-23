import { GlitterAnimation } from '@/components/glitter-animation'
import { HERO_MIN_HEIGHT_CLASS } from '@/config/breakpoints'

export function Hero() {
  return (
    <section
      className={`relative w-full overflow-hidden ${HERO_MIN_HEIGHT_CLASS}`}
      aria-label="Hero"
    >
      <GlitterAnimation className={`w-full ${HERO_MIN_HEIGHT_CLASS}`} showGradient />
    </section>
  )
}
