import { cn } from '@/lib/utils'

export type HeroTaglineProps = {
  className?: string
  headlineClassName?: string
  descriptionClassName?: string
}

/**
 * Hero headline + description (Inter headline, Geist Mono description at md+).
 * Styles: `src/styles/hero.css` and `src/styles/brand.css`.
 */
export function HeroTagline({
  className,
  headlineClassName,
  descriptionClassName,
}: HeroTaglineProps) {
  return (
    <div className={cn('flex max-w-4xl flex-col gap-4 sm:gap-5', className)}>
      <h1
        className={cn(
          'hero-headline font-black tracking-tighter text-foreground uppercase',
          headlineClassName,
        )}
      >
        Build <br />
        products <br />
        <span className="text-outline-brand">with craft</span>
      </h1>
      <p
        className={cn(
          'hero-description max-w-[34ch] text-muted-foreground sm:max-w-sm',
          descriptionClassName,
        )}
      >
        We partner with teams to design and ship{' '}
        <span className="text-brand">thoughtful</span> digital experiences — from
        idea to production.
      </p>
    </div>
  )
}
