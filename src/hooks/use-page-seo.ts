import { useEffect } from 'react'

import type { PageSeo } from '@/config/site'
import { SITE_URL } from '@/config/site'

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageSeo(seo: PageSeo) {
  useEffect(() => {
    document.title = seo.title

    if (seo.description) {
      upsertMeta('description', seo.description)
      upsertMeta('og:description', seo.description, 'property')
    }

    upsertMeta('og:title', seo.title, 'property')
    upsertMeta('og:type', 'website', 'property')
    upsertMeta('og:url', `${SITE_URL}${seo.path}`, 'property')

    if (seo.keywords?.length) {
      upsertMeta('keywords', seo.keywords.join(', '))
    }

    if (seo.noIndex) {
      upsertMeta('robots', 'noindex, nofollow')
    } else {
      upsertMeta('robots', 'index, follow')
    }

    upsertCanonical(`${SITE_URL}${seo.path}`)
  }, [seo])
}
