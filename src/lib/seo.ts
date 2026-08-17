import { useEffect } from 'react'
import { site } from '@/data/site'

type Seo = {
  title: string
  description: string
  path: string
  image?: string
  /** JSON-LD injecté et nettoyé au démontage. */
  jsonLd?: Record<string, unknown>
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * SEO par page, sans dépendance externe.
 * Titre unique, description, canonical, Open Graph et données structurées.
 */
export function useSeo({ title, description, path, image, jsonLd }: Seo) {
  useEffect(() => {
    const url = `${site.url}${path}`
    document.title = title

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    if (image) setMeta('meta[property="og:image"]', 'property', 'og:image', image)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    let script: HTMLScriptElement | null = null
    if (jsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.page = 'true'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      script?.remove()
    }
  }, [title, description, path, image, jsonLd])
}
