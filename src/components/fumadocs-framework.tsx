import { FrameworkProvider } from 'fumadocs-core/framework'
import {
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useMemo,
} from 'react'
import { usePathname } from '@/hooks/use-pathname'
import { getDocsSlugs, navigate } from '@/lib/navigation'

const linkButtonStyle: CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  textAlign: 'inherit',
}

function isExternalHref(href: string): boolean {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//')
  )
}

function FrameworkLink({
  href = '#',
  children,
  prefetch: _prefetch,
  className,
  style,
  ...props
}: ComponentProps<'a'> & { prefetch?: boolean }) {
  if (isExternalHref(href)) {
    return (
      <a href={href} className={className} style={style} {...props}>
        {children}
      </a>
    )
  }

  const destination = new URL(href, window.location.origin)

  return (
    <button
      type="button"
      className={className}
      style={{ ...linkButtonStyle, ...style }}
      onClick={() =>
        navigate(`${destination.pathname}${destination.search}${destination.hash}`)
      }
    >
      {children}
    </button>
  )
}

export function FumadocsFrameworkProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const usePathnameHook = useCallback(() => pathname, [pathname])

  const useParamsHook = useCallback(() => {
    const slugs = getDocsSlugs(pathname)
    return { '*': slugs.join('/') }
  }, [pathname])

  const useRouterHook = useCallback(
    () => ({
      push(url: string) {
        navigate(url)
      },
      refresh() {
        navigate(pathname, true)
      },
    }),
    [pathname],
  )

  const framework = useMemo(
    () => ({
      usePathname: usePathnameHook,
      useParams: useParamsHook,
      useRouter: useRouterHook,
      Link: FrameworkLink,
    }),
    [usePathnameHook, useParamsHook, useRouterHook],
  )

  return <FrameworkProvider {...framework}>{children}</FrameworkProvider>
}
