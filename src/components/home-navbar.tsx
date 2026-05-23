import { BrandLogo } from '@/components/brand-logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

export function HomeNavbar() {
  return (
    <header
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-[1001]',
        'flex items-center justify-between',
        'pt-[max(2rem,env(safe-area-inset-top,0px))]',
        'pl-[max(1.5rem,env(safe-area-inset-left,0px))]',
        'pr-[max(1.5rem,env(safe-area-inset-right,0px))]',
        'md:pl-[max(2.5rem,env(safe-area-inset-left,0px))]',
        'md:pr-[max(2.5rem,env(safe-area-inset-right,0px))]',
      )}
    >
      <a
        href="/"
        className="pointer-events-auto text-foreground transition-opacity hover:opacity-90"
        aria-label="jeenlabs home"
      >
        <BrandLogo size="md" />
      </a>
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
    </header>
  )
}
