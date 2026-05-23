import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import type { NavItem } from '@/components/navigation/nav.config'
import { cn } from '@/lib/utils'

type NavMenuProps = {
  items: readonly NavItem[]
  isOpen: boolean
  showMenu: boolean
  onClose: () => void
  onExitComplete: () => void
}

export function NavMenu({
  items,
  isOpen,
  showMenu,
  onClose,
  onExitComplete,
}: NavMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<HTMLAnchorElement[]>([])

  useEffect(() => {
    const overlay = overlayRef.current
    const panel = panelRef.current
    const links = linkRefs.current.filter(Boolean)
    if (!overlay || !panel) return

    if (isOpen) {
      gsap.killTweensOf([overlay, panel, ...links])
      gsap.set(overlay, { display: 'flex', autoAlpha: 0 })
      gsap.set(panel, { y: 24 })
      gsap.set(links, { y: 48, autoAlpha: 0 })

      gsap
        .timeline()
        .to(overlay, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
        .to(panel, { y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        .to(
          links,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: 'power3.out',
          },
          '-=0.35',
        )
    } else if (showMenu) {
      gsap.killTweensOf([overlay, panel, ...links])
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(overlay, { display: 'none' })
            onExitComplete()
          },
        })
        .to(links, {
          y: 32,
          autoAlpha: 0,
          duration: 0.2,
          stagger: 0.03,
          ease: 'power2.in',
        })
        .to(panel, { y: 16, duration: 0.25, ease: 'power2.in' }, '-=0.1')
        .to(overlay, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, '-=0.15')
    }
  }, [isOpen, showMenu, onExitComplete])

  if (!showMenu) return null

  return (
    <div
      ref={overlayRef}
      id="site-nav-menu"
      className="fixed inset-0 z-[1000] hidden flex-col bg-background/90 backdrop-blur-xl"
      aria-hidden={!isOpen}
    >
      <nav
        ref={panelRef}
        className={cn(
          'flex flex-1 flex-col items-end justify-center',
          'px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-[calc(4.5rem+env(safe-area-inset-top,0px))]',
          'sm:px-6 sm:pb-12 sm:pt-24',
          'md:px-12 md:pb-16 md:pt-28',
          'lg:px-16 lg:pt-32',
        )}
        aria-label="Main menu"
      >
        <ul className="m-0 flex list-none flex-col items-end p-0 text-right">
          {items.map((item, index) => (
            <li key={item.href} className="w-full border-y border-border/50">
              <a
                href={item.href}
                aria-label={item.ariaLabel}
                className={cn(
                  'group flex flex-row-reverse items-baseline gap-3 py-4 no-underline touch-manipulation',
                  'sm:gap-4 sm:py-5 md:py-7',
                )}
                onClick={onClose}
                ref={(el) => {
                  if (el) linkRefs.current[index] = el
                }}
              >
                <span className="min-w-7 font-mono text-[0.65rem] tabular-nums text-brand opacity-40 sm:min-w-8 sm:text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={cn(
                    'text-2xl font-semibold tracking-tight lowercase text-brand transition-transform duration-300 ease-out',
                    'group-hover:-translate-x-1 group-active:-translate-x-2',
                    'sm:text-3xl md:text-5xl lg:text-6xl',
                  )}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
