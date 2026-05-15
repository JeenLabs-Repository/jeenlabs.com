"use client"

import { useTheme } from "next-themes"

import {
  ThemeToggle,
  type Theme,
} from "@/components/ui/curtain-theme-toggle"
import { useMounted } from "@/shared/hooks/use-mounted"

export function ThemeToggleButton() {
  const { setTheme, resolvedTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) {
    return <div className="size-11 shrink-0" aria-hidden="true" />
  }

  const defaultTheme: Theme =
    resolvedTheme === "light" ? "light" : "dark"

  return (
    <ThemeToggle
      variant="icon"
      defaultTheme={defaultTheme}
      buttonSize={44}
      duration={600}
      onThemeChange={(theme) => setTheme(theme)}
    />
  )
}
