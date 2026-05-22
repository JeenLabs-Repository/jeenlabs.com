import type { ComponentProps, ComponentType } from 'react'
import type { MDXComponents } from 'mdx/types'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import {
  DocsBody,
  DocsDescription,
  DocsPage as DocsPageLayout,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page'
import { Link } from 'fumadocs-core/framework'
import browserCollections from 'collections/browser'
import { usePathname } from '@/hooks/use-pathname'
import { getDocPage, getDocsPageTree } from '@/lib/docs-pages'
import { baseOptions } from '@/lib/layout.shared'
import { getDocsSlugs } from '@/lib/navigation'
import { useMDXComponents } from '@/components/mdx'

type DocMdxContentProps = {
  toc: ComponentProps<typeof DocsPageLayout>['toc']
  frontmatter: { title?: string; description?: string }
  default: ComponentType<{ components?: MDXComponents }>
}

function DocMdxContent({ toc, frontmatter, default: Mdx }: DocMdxContentProps) {
  const components = useMDXComponents()

  return (
    <DocsPageLayout toc={toc}>
      <DocsTitle>{frontmatter.title}</DocsTitle>
      <DocsDescription>{frontmatter.description}</DocsDescription>
      <DocsBody>
        <Mdx components={components} />
      </DocsBody>
    </DocsPageLayout>
  )
}

const clientLoader = browserCollections.docs.createClientLoader({
  component: DocMdxContent,
})

export function DocsRoute() {
  const pathname = usePathname()
  const slugs = getDocsSlugs(pathname)
  const page = getDocPage(slugs)

  if (!page) {
    return (
      <p className="p-8 text-center">
        Documentation page not found.{' '}
        <Link href="/">Back home</Link>
      </p>
    )
  }

  const pageTree = getDocsPageTree()

  return (
    <DocsLayout {...baseOptions()} tree={pageTree}>
      {clientLoader.useContent(page.path)}
    </DocsLayout>
  )
}
