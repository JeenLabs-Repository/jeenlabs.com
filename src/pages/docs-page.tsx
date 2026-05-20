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

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, frontmatter, default: Mdx }) {
    return (
      <DocsPageLayout toc={toc}>
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <Mdx components={useMDXComponents()} />
        </DocsBody>
      </DocsPageLayout>
    )
  },
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
