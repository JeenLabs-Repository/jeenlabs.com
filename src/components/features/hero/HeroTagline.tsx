import { cn } from '@/lib/utils'

export type HeroTaglineProps = {
  className?: string
  headlineClassName?: string
  descriptionClassName?: string
}

export function HeroTagline({
  className,
  headlineClassName,
  descriptionClassName,
}: HeroTaglineProps) {
  return (
    <div className={cn('flex max-w-4xl flex-col gap-4 sm:gap-5', className)}>
      <h1
        className={cn(
          'm-0 font-sans font-black tracking-tighter text-foreground uppercase',
          'text-[clamp(2.375rem,10.5vw,3.5rem)] leading-[0.92]',
          'sm:text-[clamp(2.75rem,8.5vw,4.75rem)]',
          'md:text-[clamp(3.25rem,7vw,6rem)]',
          'lg:text-[clamp(3.75rem,5.5vw,7.5rem)] lg:leading-[0.9]',
          headlineClassName,
        )}
      >
        Build <br />
        products <br />
        <span className="text-outline-brand">with craft</span>
      </h1>
      <p
        className={cn(
          'm-0 max-w-[34ch] text-sm leading-[1.55] tracking-[0.01em] text-muted-foreground normal-case sm:max-w-sm',
          'md:font-mono md:text-[0.6875rem] md:leading-[1.65] md:tracking-[0.3em] md:uppercase',
          'lg:tracking-[0.35em]',
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
