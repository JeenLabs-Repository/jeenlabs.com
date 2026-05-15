"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { HamburgerButton } from "@/features/landing/hamburger-button"
import { NAV_ITEMS } from "@/features/landing/nav"
import { NavMenu } from "@/features/landing/nav-menu"
import { ThemeToggleButton } from "@/features/landing/theme-toggle"
import { LogoMark, LogoWordmark } from "@/shared/components/brand/logo"
import { cn } from "@/shared/lib/utils"

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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-[1001]",
          "flex items-center justify-between",
          "pt-[max(2rem,env(safe-area-inset-top,0px))]",
          "pl-[max(1.5rem,env(safe-area-inset-left,0px))]",
          "pr-[max(1.5rem,env(safe-area-inset-right,0px))]",
          "md:pl-[max(2.5rem,env(safe-area-inset-left,0px))]",
          "md:pr-[max(2.5rem,env(safe-area-inset-right,0px))]",
        )}
      >
        <Link
          href="/"
          prefetch={false}
          className="pointer-events-auto inline-flex shrink-0 items-center gap-2 text-foreground transition-opacity hover:opacity-90 sm:gap-2.5"
          aria-label="jeenlabs home"
        >
          <LogoMark className="h-9 w-auto md:h-10" />
          <LogoWordmark size="sm" />
        </Link>

        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 md:gap-3">
          <ThemeToggleButton />
          <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
        </div>
      </header>

      <NavMenu
        items={NAV_ITEMS}
        isOpen={isOpen}
        showMenu={showMenu}
        onClose={closeMenu}
        onExitComplete={() => setShowMenu(false)}
      />
    </>
  )
}
