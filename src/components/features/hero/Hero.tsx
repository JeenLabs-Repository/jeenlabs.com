import { GlitterAnimation } from '@/components/glitter-animation'

import './hero.css'

export function Hero() {
  return (
    <section className="hero-section" aria-label="Hero">
      <GlitterAnimation className="hero-section__glitter" showGradient />
    </section>
  )
}
