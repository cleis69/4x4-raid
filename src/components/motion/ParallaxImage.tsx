import { useEffect, useRef } from 'react'
import { MEDIAS, mediaSrc, mediaSrcSet, type MediaKey } from '@/data/medias'
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
  media: MediaKey
  /** Amplitude en pixels. Rester sous 80. */
  strength?: number
  className?: string
  imgClassName?: string
  /** Ratio réservé — évite tout décalage de mise en page (CLS). */
  ratio?: string
  priority?: boolean
  /** Largeur d'affichage : décrit la place occupée, pas le fichier. */
  sizes?: string
  /** Alternative textuelle de remplacement. Par défaut, celle du catalogue. */
  alt?: string
}

export function ParallaxImage({
  media,
  strength = 56,
  className,
  imgClassName,
  ratio = '3/2',
  priority = false,
  sizes = '100vw',
  alt,
}: Props) {
  const m = MEDIAS[media]
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
        src={mediaSrc(media)}
        srcSet={mediaSrcSet(media)}
        sizes={sizes}
        alt={alt ?? m.alt}
        width={m.w}
        height={m.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={cn('h-full w-full scale-[1.18] object-cover will-change-transform', imgClassName)}
      />
    </div>
  )
}
