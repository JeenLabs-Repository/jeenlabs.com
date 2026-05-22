import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { setTheme } from '@/lib/theme'

export function ThemeToggle() {
  const theme = useTheme()

  function handleToggle() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  )
}
