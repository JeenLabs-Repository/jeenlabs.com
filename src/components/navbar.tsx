"use client";

import { BrandLogo } from "@/components/brand/logo";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  type MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavbarScroll } from "@/hooks/use-navbar-scroll";
import { getGsap } from "@/lib/gsap-lazy";
import { goToHome, scrollToSection } from "@/lib/scroll";
import { navBarPaddingX, siteFocusRingClass } from "@/lib/site-layout";

const NAV_ITEMS = [
  { label: "home", href: "/#home", ariaLabel: "Home" },
  { label: "services", href: "/#services", ariaLabel: "Services" },
  { label: "about", href: "/#about", ariaLabel: "About" },
  { label: "team", href: "/#team", ariaLabel: "Team" },
  { label: "contact", href: "/#contact", ariaLabel: "Contact" },
] as const;

const OUTLINE_STROKE = "1px color-mix(in oklab, var(--brand) 85%, white)";

function formatLabel(label: string) {
  return label.replace(/\b\w/g, (char) => char.toUpperCase());
}

function NavMenuItem({
  item,
  index,
  onClose,
  setLinkRef,
}: {
  item: (typeof NAV_ITEMS)[number];
  index: number;
  onClose: () => void;
  setLinkRef: (el: HTMLAnchorElement | null) => void;
}) {
  const labelRef = useRef<HTMLSpanElement>(null);

  const animateLabel = (hover: boolean) => {
    const label = labelRef.current;
    if (!label) return;

    void getGsap().then((gsap) => {
      gsap.to(label, {
        color: hover ? "transparent" : "var(--brand)",
        webkitTextStroke: hover ? OUTLINE_STROKE : "0px transparent",
        x: hover ? -4 : 0,
        duration: hover ? 0.35 : 0.4,
        ease: hover ? "power2.out" : "power3.out",
      });
    });
  };

  return (
    <li className="w-full border-y border-border/50">
      <Link
        href={item.href}
        prefetch={item.href === "/#home" ? false : undefined}
        aria-label={item.ariaLabel}
        className={cn(
          "group flex touch-manipulation flex-row-reverse items-baseline gap-3 rounded-sm py-4 no-underline sm:gap-4 sm:py-5 md:py-7",
          siteFocusRingClass,
        )}
        onClick={(event) => {
          if (item.href.startsWith("/#")) {
            const id = item.href.slice(2);
            const onHome = window.location.pathname === "/";
            const target = onHome ? document.getElementById(id) : null;
            if (target) {
              event.preventDefault();
              onClose();
              scrollToSection(id);
            } else {
              onClose();
            }
          } else {
            onClose();
          }
        }}
        onMouseEnter={() => animateLabel(true)}
        onMouseLeave={() => animateLabel(false)}
        onFocus={() => animateLabel(true)}
        onBlur={() => animateLabel(false)}
        ref={setLinkRef}
      >
        <span className="min-w-7 font-mono text-[0.65rem] text-brand tabular-nums opacity-40 sm:min-w-8 sm:text-xs">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          ref={labelRef}
          className="text-2xl font-semibold tracking-tight text-brand sm:text-3xl md:text-5xl lg:text-6xl"
        >
          {formatLabel(item.label)}
        </span>
      </Link>
    </li>
  );
}

function NavMenuOverlay({
  isOpen,
  showMenu,
  onClose,
  linkRefs,
  menuButtonRef,
  onExitComplete,
}: {
  isOpen: boolean;
  showMenu: boolean;
  onClose: () => void;
  linkRefs: MutableRefObject<HTMLAnchorElement[]>;
  menuButtonRef: MutableRefObject<HTMLButtonElement | null>;
  onExitComplete: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const links = linkRefs.current.filter(Boolean);
    if (!overlay || !panel) return;

    let cancelled = false;

    void getGsap().then((gsap) => {
      if (cancelled) return;

      if (isOpen) {
        gsap.killTweensOf([overlay, panel, ...links]);
        gsap.set(overlay, { display: "flex", autoAlpha: 0 });
        gsap.set(panel, { y: 24 });
        gsap.set(links, { y: 48, autoAlpha: 0 });
        gsap
          .timeline({
            onComplete: () => {
              links[0]?.focus();
            },
          })
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
          );
        return;
      }

      if (!showMenu) return;

      gsap.killTweensOf([overlay, panel, ...links]);
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
            onExitComplete();
            menuButtonRef.current?.focus();
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
        .to(
          overlay,
          { autoAlpha: 0, duration: 0.3, ease: "power2.in" },
          "-=0.15",
        );
    });

    return () => {
      cancelled = true;
    };
  }, [isOpen, showMenu, linkRefs, menuButtonRef, onExitComplete]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusable = [
        menuButtonRef.current,
        ...linkRefs.current.filter(Boolean),
      ].filter(
        (el): el is HTMLAnchorElement | HTMLButtonElement => el != null,
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, linkRefs, menuButtonRef]);

  if (!showMenu) return null;

  return (
    <div
      ref={overlayRef}
      id="site-nav-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[1000] hidden flex-col bg-background/90 backdrop-blur-xl"
      aria-hidden={!isOpen}
    >
      <nav
        ref={panelRef}
        className={cn(
          "flex flex-1 flex-col items-end justify-center",
          navBarPaddingX,
          "pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:pb-12 md:pb-16",
          "pt-[var(--spacing-site-header)]",
        )}
        aria-label="Main menu"
      >
        <ul className="m-0 flex list-none flex-col items-end p-0 text-right">
          {NAV_ITEMS.map((item, index) => (
            <NavMenuItem
              key={item.href}
              item={item}
              index={index}
              onClose={onClose}
              setLinkRef={(el) => {
                if (el) linkRefs.current[index] = el;
              }}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isVisible, backgroundOpacity } = useNavbarScroll(isOpen || showMenu);
  const navChromeOpacity = isOpen ? 1 : backgroundOpacity;

  const toggleMenu = () => {
    const next = !isOpen;
    if (next) setShowMenu(true);
    setIsOpen(next);
  };

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-[1001] w-full",
          "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          !isVisible && "-translate-y-full",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-background transition-opacity duration-500 ease-out motion-reduce:transition-none"
          style={{ opacity: navChromeOpacity }}
          aria-hidden
        />
        <div className="relative pt-[max(1rem,env(safe-area-inset-top,0px))]">
          <div
            className={cn(
              "pointer-events-auto flex h-16 w-full items-center justify-between",
              navBarPaddingX,
            )}
          >
            <Link
              href="/#home"
              prefetch={false}
              className={cn(
                "inline-flex shrink-0 items-center rounded-sm text-foreground transition-opacity hover:opacity-90",
                siteFocusRingClass,
                !prefersReducedMotion &&
                  "motion-safe:animate-nav-chrome-enter nav-chrome-enter-delay-1",
              )}
              aria-label="jeenlabs home"
              onClick={(event) => {
                if (window.location.pathname === "/") {
                  event.preventDefault();
                  goToHome();
                }
              }}
            >
              <BrandLogo
                variant="logo-name-horizontal"
                size={{ mobile: "sm", tablet: "sm", desktop: "md" }}
              />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className={cn(
                "inline-flex size-10 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border-0 bg-transparent p-0 touch-manipulation sm:size-11",
                siteFocusRingClass,
                !prefersReducedMotion &&
                  "motion-safe:animate-nav-chrome-enter nav-chrome-enter-delay-2",
              )}
              onClick={toggleMenu}
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isOpen}
              aria-controls="site-nav-menu"
            >
              <span
                className={cn(
                  "block h-0.5 w-5 rounded-full bg-brand transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] sm:w-6",
                  isOpen && "translate-y-[4.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 rounded-full bg-brand transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] sm:w-6",
                  isOpen && "-translate-y-[4.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-brand/35 transition-opacity duration-500 ease-out motion-reduce:transition-none"
          style={{ opacity: navChromeOpacity }}
        />
      </header>

      <NavMenuOverlay
        isOpen={isOpen}
        showMenu={showMenu}
        onClose={closeMenu}
        linkRefs={linkRefs}
        menuButtonRef={menuButtonRef}
        onExitComplete={() => setShowMenu(false)}
      />
    </>
  );
}
