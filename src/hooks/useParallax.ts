import { useEffect, useRef } from 'react'

/**
 * Parallax subtil, calé sur requestAnimationFrame.
 * Désactivé sous 768 px (coût CPU inutile sur mobile) et si
 * l'utilisateur a demandé une réduction des animations.
 *
 * @param intensity déplacement max en px — rester sous 80 pour éviter
 *                  l'effet « site de démo ».
 */
export function useParallax<T extends HTMLElement>(intensity = 60) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 768) return

    let raf = 0
    let visible = false

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) tick()
    })
    io.observe(el)

    const tick = () => {
      if (!visible) return
      const rect = el.getBoundingClientRect()
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
      el.style.transform = `translate3d(0, ${(-progress * intensity).toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [intensity])

  return ref
}
