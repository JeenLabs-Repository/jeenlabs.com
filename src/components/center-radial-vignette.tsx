import { cn } from '@/lib/utils'

export type CenterRadialVignetteProps = {
  className?: string
}

/**
 * Full-screen overlay that darkens toward the center via a radial gradient.
 * Place above background content; does not capture pointer events.
 */
export function CenterRadialVignette({ className }: CenterRadialVignetteProps) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-10', className)}
      style={{ background: 'var(--glitter-vignette)' }}
      aria-hidden
    />
  )
}
