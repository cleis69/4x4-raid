import { useEffect } from 'react'

/**
 * Reveal au scroll — un seul IntersectionObserver pour toute la page.
 * Zéro librairie d'animation : l'effet est entièrement porté par le CSS
 * (voir les utilitaires .reveal / .reveal-mask / .reveal-scale).
 *
 * Coût : ~40 lignes, aucun re-render React, aucun listener de scroll.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal, .reveal-mask, .reveal-scale')
    if (!nodes.length) return

    // Si l'utilisateur réduit les animations, on affiche tout immédiatement.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((n) => n.classList.add('is-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target) // one-shot : jamais de re-trigger
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])
}
