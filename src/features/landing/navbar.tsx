"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { HamburgerButton } from "@/features/landing/hamburger-button"
import { useNavItems } from "@/features/landing/use-nav-items"
import { NavMenu } from "@/features/landing/nav-menu"
import { ThemeToggleButton } from "@/features/landing/theme-toggle"
import { BrandLogo } from "@/shared/components/brand/logo"
import { cn } from "@/shared/lib/utils"

export function Navbar() {
  const navItems = useNavItems()
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
          className="pointer-events-auto text-foreground transition-opacity hover:opacity-90"
          aria-label="jeenlabs home"
        >
          <BrandLogo size="md" />
        </Link>

        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 md:gap-3">
          <ThemeToggleButton />
          <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
        </div>
      </header>

      <NavMenu
        items={navItems}
        isOpen={isOpen}
        showMenu={showMenu}
        onClose={closeMenu}
        onExitComplete={() => setShowMenu(false)}
      />
    </>
  )
}
