export function getPathname(): string {
  return window.location.pathname
}

export function navigate(href: string, replace = false): void {
  if (href === getPathname()) return

  if (replace) {
    window.history.replaceState(null, '', href)
  } else {
    window.history.pushState(null, '', href)
  }

  window.dispatchEvent(new Event('navigation'))
}

export function getDocsSlugs(pathname: string): string[] {
  if (!pathname.startsWith('/docs')) return []

  const rest = pathname.slice('/docs'.length).replace(/^\//, '')
  return rest ? rest.split('/').filter(Boolean) : []
}

export function isDocsPath(pathname: string): boolean {
  return pathname === '/docs' || pathname.startsWith('/docs/')
}
