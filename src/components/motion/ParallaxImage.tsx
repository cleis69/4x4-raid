import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * ─────────────────────────────────────────────────────────────────
 *  PARALLAX IMAGE
 *
 *  La profondeur vient de la composition, pas de la 3D. Une image qui
 *  défile 15 % moins vite que la page crée une séparation entre
 *  premier plan et arrière-plan que l'œil lit comme de la distance.
 *
 *  Deux règles qui font la différence entre « premium » et « gadget » :
 *
 *  1. L'image est SUR-DIMENSIONNÉE (scale 1.18) et déplacée à
 *     l'intérieur d'un conteneur en overflow-hidden. Sans ça, le
 *     déplacement révèle un bord vide — l'erreur classique.
 *
 *  2. L'amplitude reste faible. Au-delà de ~80 px, le parallax se
 *     remarque consciemment et devient un effet. En dessous, il ne
 *     se remarque pas : il se ressent.
 * ─────────────────────────────────────────────────────────────────
 */

type Props = {
  src: string
  alt: string
  /** Amplitude en pixels. Rester sous 80. */
  strength?: number
  className?: string
  imgClassName?: string
  /** Ratio réservé — évite tout décalage de mise en page (CLS). */
  ratio?: string
  priority?: boolean
  sizes?: string
  width?: number
  height?: number
}

export function ParallaxImage({
  src,
  alt,
  strength = 56,
  className,
  imgClassName,
  ratio = '3/2',
  priority = false,
  sizes = '100vw',
  width = 1600,
  height = 1067,
}: Props) {
  const holder = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const h = holder.current
    const i = img.current
    if (!h || !i) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Sur mobile le parallax coûte cher et se voit peu : on le coupe.
    if (window.innerWidth < 768) return

    let raf = 0
    let visible = false

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) tick()
      else cancelAnimationFrame(raf)
    })
    io.observe(h)

    const tick = () => {
      if (!visible) return
      const r = h.getBoundingClientRect()
      // −1 quand l'élément entre par le bas, +1 quand il sort par le haut
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
      i.style.transform = `translate3d(0, ${(-p * strength).toFixed(2)}px, 0) scale(1.18)`
      raf = requestAnimationFrame(tick)
    }

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <div
      ref={holder}
      className={cn('relative overflow-hidden bg-surface', className)}
      style={{ aspectRatio: ratio }}
    >
      <img
        ref={img}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={cn('h-full w-full scale-[1.18] object-cover will-change-transform', imgClassName)}
      />
    </div>
  )
}
