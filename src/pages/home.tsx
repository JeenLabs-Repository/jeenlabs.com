import { CenterRadialVignette } from '@/components/center-radial-vignette'
import { DotMatrixGlitterAnimation } from '@/components/dot-matrix-glitter-animation'
import { ThemeToggle } from '@/components/theme-toggle'

export function HomePage() {
  return (
    <div className="relative min-h-svh w-full">
      <DotMatrixGlitterAnimation />
      <CenterRadialVignette />
      <ThemeToggle />
    </div>
  )
}
