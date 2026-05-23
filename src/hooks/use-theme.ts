import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export type AppTheme = 'light' | 'dark'

export function useTheme(): AppTheme {
  const { resolvedTheme } = useNextTheme()
  const [theme, setTheme] = useState<AppTheme>('dark')

  useEffect(() => {
    setTheme(resolvedTheme === 'light' ? 'light' : 'dark')
  }, [resolvedTheme])

  return theme
}
