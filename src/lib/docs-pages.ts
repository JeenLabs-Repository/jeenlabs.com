export type DocPageEntry = {
  slugs: string[]
  path: string
  url: string
  title: string
}

/** Client-safe page registry — keep in sync with content/docs */
export const docPages: DocPageEntry[] = [
  {
    slugs: [],
    path: 'index.mdx',
    url: '/docs',
    title: 'Hello World',
  },
]

export function getDocPage(slugs: string[]): DocPageEntry | undefined {
  const key = slugs.join('/')
  return docPages.find((page) => page.slugs.join('/') === key)
}

export function getDocsPageTree() {
  return {
    name: 'Documentation',
    children: docPages.map((page) => ({
      type: 'page' as const,
      name: page.title,
      url: page.url,
    })),
  }
}
