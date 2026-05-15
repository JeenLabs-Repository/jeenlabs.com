"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"

import { JeenlabsLogo } from "@/components/jeenlabs-logo"
import { ModeToggle } from "@/components/mode-toggle"

const BRAND_RED = "#dc2626"

const NAV_ITEMS = [{ label: "home", href: "/", ariaLabel: "Home" }] as const

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<HTMLAnchorElement[]>([])

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

  useEffect(() => {
    const overlay = overlayRef.current
    const panel = panelRef.current
    const links = linkRefs.current.filter(Boolean)
    if (!overlay || !panel) return

    if (isOpen) {
      gsap.killTweensOf([overlay, panel, ...links])
      gsap.set(overlay, { display: "flex", autoAlpha: 0 })
      gsap.set(panel, { y: 24 })
      gsap.set(links, { y: 48, autoAlpha: 0 })

      gsap
        .timeline()
        .to(overlay, { autoAlpha: 1, duration: 0.35, ease: "power2.out" })
        .to(panel, { y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .to(
          links,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.35",
        )
    } else if (showMenu) {
      gsap.killTweensOf([overlay, panel, ...links])
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(overlay, { display: "none" })
            setShowMenu(false)
          },
        })
        .to(links, {
          y: 32,
          autoAlpha: 0,
          duration: 0.2,
          stagger: 0.03,
          ease: "power2.in",
        })
        .to(panel, { y: 16, duration: 0.25, ease: "power2.in" }, "-=0.1")
        .to(overlay, { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, "-=0.15")
    }
  }, [isOpen, showMenu])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[1001] flex items-center justify-between px-6 pt-8 md:px-10">
        <Link
          href="/"
          className="pointer-events-auto text-black transition-colors dark:text-white"
          aria-label="jeenlabs home"
        >
          <JeenlabsLogo />
        </Link>

        <div className="pointer-events-auto flex items-center gap-2 md:gap-3">
          <ModeToggle />
          <button
            type="button"
            className="flex size-12 flex-col items-center justify-center gap-1.5 border-0 bg-transparent p-0 cursor-pointer md:size-14"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="site-nav-menu"
          >
            <span
              className="block h-0.5 w-6 rounded-full transition-transform duration-300 ease-out"
              style={{
                background: BRAND_RED,
                transform: isOpen ? "translateY(5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-0.5 w-6 rounded-full transition-transform duration-300 ease-out"
              style={{
                background: BRAND_RED,
                transform: isOpen ? "translateY(-5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {showMenu && (
        <div
          ref={overlayRef}
          id="site-nav-menu"
          className="fixed inset-0 z-[1000] hidden flex-col bg-background/90 backdrop-blur-xl"
          aria-hidden={!isOpen}
        >
          <nav
            ref={panelRef}
            className="flex flex-1 flex-col items-end justify-center px-6 pb-16 pt-28 md:px-16 md:pt-32"
            aria-label="Main menu"
          >
            <ul className="m-0 flex list-none flex-col items-end p-0 text-right">
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.href}
                  className="border-y border-border/50"
                >
                  <Link
                    href={item.href}
                    aria-label={item.ariaLabel}
                    className="group flex flex-row-reverse items-baseline gap-4 py-5 no-underline md:py-7"
                    onClick={closeMenu}
                    ref={(el) => {
                      if (el) linkRefs.current[index] = el
                    }}
                  >
                    <span
                      className="min-w-8 font-mono text-xs tabular-nums opacity-40"
                      style={{ color: BRAND_RED }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-3xl font-semibold tracking-tight lowercase transition-transform duration-300 ease-out group-hover:-translate-x-2 md:text-5xl lg:text-6xl"
                      style={{ color: BRAND_RED }}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
