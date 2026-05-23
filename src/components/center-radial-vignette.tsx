import { useTheme } from '@/hooks/use-theme'
import { getGlitterPreset } from '@/lib/glitter-theme'
import { cn } from '@/lib/utils'

export type CenterRadialVignetteProps = {
  className?: string
}

/**
 * Full-screen center radial vignette matched to the active glitter theme.
 */
export function CenterRadialVignette({ className }: CenterRadialVignetteProps) {
  const theme = useTheme()
  const { vignetteBackground } = getGlitterPreset(theme)

  return (
    <div
      key={theme}
      className={cn('pointer-events-none absolute inset-0 z-10', className)}
      style={{ background: vignetteBackground }}
      aria-hidden
    />
  )
}
