import { useEffect, useState } from 'react'

import { BrandLogo } from '@/components/brand/logo'
import { NavMenu } from '@/components/navigation/NavMenu'
import { SITE_MENU_ITEMS } from '@/components/navigation/nav.config'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={cn(
        'flex size-11 flex-col items-center justify-center gap-1.5 border-0 bg-transparent p-0 cursor-pointer',
        'touch-manipulation sm:size-12 md:size-14',
      )}
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={isOpen}
      aria-controls="site-nav-menu"
    >
      <span
        className={cn(
          'block h-0.5 w-5 rounded-full bg-brand transition-transform duration-300 ease-out sm:w-6',
          isOpen && 'translate-y-[4.5px] rotate-45',
        )}
      />
      <span
        className={cn(
          'block h-0.5 w-5 rounded-full bg-brand transition-transform duration-300 ease-out sm:w-6',
          isOpen && '-translate-y-[4.5px] -rotate-45',
        )}
      />
    </button>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    const next = !isOpen
    if (next) setShowMenu(true)
    setIsOpen(next)
  }

  const closeMenu = () => {
    if (!isOpen) return
    setIsOpen(false)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
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
          aria-label="JeenLabs home"
        >
          <BrandLogo size="md" />
        </a>

        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 md:gap-3">
          <ModeToggle variant="icon" buttonSize={44} />
          <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
        </div>
      </header>

      <NavMenu
        items={SITE_MENU_ITEMS}
        isOpen={isOpen}
        showMenu={showMenu}
        onClose={closeMenu}
        onExitComplete={() => setShowMenu(false)}
      />
    </>
  )
}
