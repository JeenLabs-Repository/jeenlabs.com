"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import {
  ThemeToggle,
  type Theme,
} from "@/components/ui/curtain-theme-toggle"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="size-9" aria-hidden="true" />
  }

  const defaultTheme: Theme =
    resolvedTheme === "light" ? "light" : "dark"

  return (
    <ThemeToggle
      variant="icon"
      defaultTheme={defaultTheme}
      duration={600}
      onThemeChange={(theme) => setTheme(theme)}
    />
  )
}
