import { useEffect, useState } from 'react'
import { getPathname } from '@/lib/navigation'

export function usePathname(): string {
  const [pathname, setPathname] = useState(getPathname)

  useEffect(() => {
    function sync() {
      setPathname(getPathname())
    }

    window.addEventListener('popstate', sync)
    window.addEventListener('navigation', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('navigation', sync)
    }
  }, [])

  return pathname
}
