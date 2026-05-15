"use client"

import { cn } from "@/lib/utils"

type HamburgerButtonProps = {
  isOpen: boolean
  onClick: () => void
}

export function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex size-11 flex-col items-center justify-center gap-1.5 border-0 bg-transparent p-0 cursor-pointer",
        "touch-manipulation sm:size-12 md:size-14",
      )}
      onClick={onClick}
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isOpen}
      aria-controls="site-nav-menu"
    >
      <span
        className={cn(
          "block h-0.5 w-5 rounded-full bg-brand transition-transform duration-300 ease-out sm:w-6",
          isOpen && "translate-y-[4.5px] rotate-45",
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-5 rounded-full bg-brand transition-transform duration-300 ease-out sm:w-6",
          isOpen && "-translate-y-[4.5px] -rotate-45",
        )}
      />
    </button>
  )
}
