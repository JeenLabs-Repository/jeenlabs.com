import { CenterRadialVignette } from '@/components/center-radial-vignette'
import { DotMatrixGlitterAnimation } from '@/components/dot-matrix-glitter-animation'

export function HomePage() {
  return (
    <div className="relative min-h-svh w-full">
      <DotMatrixGlitterAnimation />
      <CenterRadialVignette />
    </div>
  )
}
