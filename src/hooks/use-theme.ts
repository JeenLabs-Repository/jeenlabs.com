import { useEffect, useState } from 'react'
import { getTheme, type Theme } from '@/lib/theme'

function readThemeFromDom(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/**
 * Reactive theme synced with `document.documentElement` class changes.
 */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(() => getTheme())

  useEffect(() => {
    setTheme(readThemeFromDom())

    const observer = new MutationObserver(() => {
      setTheme(readThemeFromDom())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return theme
}
