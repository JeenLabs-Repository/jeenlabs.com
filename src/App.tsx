import { useEffect } from 'react'
import { usePathname } from '@/hooks/use-pathname'
import { getDocPage } from '@/lib/docs-pages'
import { getDocsSlugs, isDocsPath, navigate } from '@/lib/navigation'
import { DocsRoute } from '@/pages/docs-page'
import { HomePage } from '@/pages/home'

export default function App() {
  const pathname = usePathname()

  useEffect(() => {
    if (!isDocsPath(pathname)) return

    const slugs = getDocsSlugs(pathname)
    if (!getDocPage(slugs) && getDocPage([])) {
      navigate('/docs', true)
    }
  }, [pathname])

  if (isDocsPath(pathname)) {
    return <DocsRoute />
  }

  return <HomePage />
}
