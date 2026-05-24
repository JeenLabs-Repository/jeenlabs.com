import { useEffect } from 'react'

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
  id?: string
}

export function JsonLd({ data, id = 'page-json-ld' }: JsonLdProps) {
  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(data)
    return () => {
      script?.remove()
    }
  }, [data, id])

  return null
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JeenLabs',
    url: 'https://jeenlabs.com',
    logo: 'https://jeenlabs.com/favicon.svg',
    description:
      'Software studio specializing in automation, software development, and website development.',
  }
}

export function webPageJsonLd(title: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `https://jeenlabs.com${path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'JeenLabs',
      url: 'https://jeenlabs.com',
    },
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://jeenlabs.com${item.path}`,
    })),
  }
}
