import { DotMatrixGlitterAnimation } from '@/components/dot-matrix-glitter-animation'
import { HomeHero } from '@/components/home-hero'
import { HomeNavbar } from '@/components/home-navbar'

export function HomePage() {
  return (
    <div className="relative flex min-h-svh w-full flex-col overflow-hidden bg-white dark:bg-black">
      <div className="absolute inset-0">
        <DotMatrixGlitterAnimation />
      </div>

      <HomeNavbar />

      <div className="relative z-20 flex min-h-svh flex-1 flex-col">
        <HomeHero />
      </div>
    </div>
  )
}
