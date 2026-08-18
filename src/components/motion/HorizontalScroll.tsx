import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * ─────────────────────────────────────────────────────────────────
 *  DÉFILEMENT HORIZONTAL PILOTÉ PAR LE SCROLL
 *
 *  Une section devient collante et son contenu glisse latéralement
 *  pendant que la page continue de descendre. C'est la rupture de
 *  rythme la plus efficace d'une page longue : le corps continue le
 *  même geste, l'œil change complètement de direction.
 *
 *  ── LE PIÈGE À ÉVITER ─────────────────────────────────────────
 *  Détourner l'événement `wheel` pour forcer le défilement latéral
 *  casse le trackpad, le clavier et le lecteur d'écran. On ne
 *  détourne rien : on lit la position de scroll NATIVE et on
 *  translate. Le scroll reste le scroll.
 *
 *  ── DÉGRADATION ───────────────────────────────────────────────
 *  Sous 1024 px ou en reduced-motion, la section redevient un
 *  défilement horizontal tactile classique (scroll-snap), sans
 *  sticky ni JavaScript. Le contenu est identique dans les deux cas.
 * ─────────────────────────────────────────────────────────────────
 */

type Props = {
  children: React.ReactNode
  /** En-tête affiché à gauche, fixe pendant le défilement. */
  heading?: React.ReactNode
  className?: string
}

export function HorizontalScroll({ children, heading, className }: Props) {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const s = section.current
    const t = track.current
    if (!s || !t) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wide = window.matchMedia('(min-width: 1024px)')

    const decide = () => setEnabled(wide.matches && !reduce.matches)
    decide()
    wide.addEventListener('change', decide)
    reduce.addEventListener('change', decide)

    let raf = 0
    let visible = false

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) tick()
      else cancelAnimationFrame(raf)
    })
    io.observe(s)

    const tick = () => {
      if (!visible || !wide.matches || reduce.matches) {
        t.style.transform = ''
        return
      }
      // Distance à parcourir latéralement = débord du rail.
      const overflow = t.scrollWidth - window.innerWidth + 48
      if (overflow <= 0) {
        t.style.transform = ''
        raf = requestAnimationFrame(tick)
        return
      }
      const rect = s.getBoundingClientRect()
      // La hauteur de la section moins un écran = course de scroll utile.
      const span = s.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, span)))
      t.style.transform = `translate3d(${(-p * overflow).toFixed(1)}px, 0, 0)`
      raf = requestAnimationFrame(tick)
    }

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      wide.removeEventListener('change', decide)
      reduce.removeEventListener('change', decide)
    }
  }, [])

  return (
    <section
      ref={section}
      className={cn('relative', className)}
      // Hauteur = course de scroll. 260vh donne un glissement posé.
      style={enabled ? { height: '260vh' } : undefined}
    >
      <div
        className={cn(
          enabled && 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden',
        )}
      >
        {heading && <div className="container mb-10 shrink-0">{heading}</div>}

        <div
          ref={track}
          className={cn(
            'flex gap-5 will-change-transform',
            enabled
              ? 'px-[max(1.25rem,calc((100vw-1600px)/2+2.5rem))]'
              : // Repli : défilement tactile natif avec accroche
                'no-scrollbar snap-x snap-mandatory overflow-x-auto px-5 pb-4 md:px-8',
          )}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
