import { FrameworkProvider } from 'fumadocs-core/framework'
import {
  type ComponentProps,
  type ReactNode,
  useCallback,
  useMemo,
} from 'react'
import { usePathname } from '@/hooks/use-pathname'
import { getDocsSlugs, navigate } from '@/lib/navigation'

function FrameworkLink({
  href = '#',
  children,
  prefetch: _prefetch,
  ...props
}: ComponentProps<'a'> & { prefetch?: boolean }) {
  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }

        const url = new URL(href, window.location.origin)
        if (url.origin !== window.location.origin) return

        event.preventDefault()
        navigate(`${url.pathname}${url.search}${url.hash}`)
      }}
    >
      {children}
    </a>
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
