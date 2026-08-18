import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * ─────────────────────────────────────────────────────────────────
 *  CARROUSEL — glisser-déposer, cartes débordantes
 *
 *  Bâti sur le défilement NATIF plutôt que sur une transformation
 *  calculée. Conséquences : le geste tactile est parfait sans une
 *  ligne de code, la molette latérale fonctionne, le clavier
 *  fonctionne, et le contenu reste sélectionnable.
 *
 *  Le glisser-déposer à la souris est ajouté par-dessus, avec un
 *  seuil de 4 px avant de considérer que c'est un glissement — sinon
 *  un simple clic sur une carte serait avalé.
 *
 *  La carte suivante déborde volontairement du cadre : c'est ce
 *  débord, plus que les flèches, qui signale qu'il y a une suite.
 * ─────────────────────────────────────────────────────────────────
 */

type Props = {
  children: React.ReactNode
  /** Libellé du groupe pour les lecteurs d'écran. */
  label: string
  className?: string
}

export function Carousel({ children, label, className }: Props) {
  const rail = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const r = rail.current
    if (!r) return
    setAtStart(r.scrollLeft <= 4)
    setAtEnd(r.scrollLeft >= r.scrollWidth - r.clientWidth - 4)
  }, [])

  useEffect(() => {
    const r = rail.current
    if (!r) return
    sync()
    r.addEventListener('scroll', sync, { passive: true })

    // ─── Glisser-déposer souris ────────────────────────────────
    let down = false
    let dragging = false
    let startX = 0
    let startScroll = 0

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      down = true
      dragging = false
      startX = e.clientX
      startScroll = r.scrollLeft
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - startX
      // Seuil : en deçà, c'est un clic, pas un glissement.
      if (!dragging && Math.abs(dx) < 4) return
      dragging = true
      r.classList.add('cursor-grabbing', 'select-none')
      r.scrollLeft = startScroll - dx
    }
    const onUp = () => {
      down = false
      r.classList.remove('cursor-grabbing', 'select-none')
      // Neutralise le clic qui suivrait un glissement.
      if (dragging) {
        const kill = (ev: Event) => ev.preventDefault()
        r.addEventListener('click', kill, { capture: true, once: true })
        setTimeout(() => r.removeEventListener('click', kill, { capture: true }), 0)
      }
    }

    r.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    return () => {
      r.removeEventListener('scroll', sync)
      r.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [sync])

  const nudge = (dir: 1 | -1) => {
    const r = rail.current
    if (!r) return
    const card = r.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 20 : r.clientWidth * 0.8
    r.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className={cn('relative', className)}>
      <div
        ref={rail}
        role="group"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 focus-visible:outline-none"
      >
        {children}
      </div>

      {/* Navigation minimaliste : deux filets, jamais de gros boutons ronds */}
      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={atStart}
          aria-label="Précédent"
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-line text-bone transition-colors duration-200 hover:border-sand hover:text-sand disabled:pointer-events-none disabled:opacity-30"
        >
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={atEnd}
          aria-label="Suivant"
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-line text-bone transition-colors duration-200 hover:border-sand hover:text-sand disabled:pointer-events-none disabled:opacity-30"
        >
          <span aria-hidden>→</span>
        </button>

        {/* Jauge de progression — plus discrète qu'une pagination à points */}
        <div className="ml-2 h-px flex-1 bg-line">
          <div
            className="h-full bg-sand transition-[width] duration-300 ease-raid"
            style={{ width: atEnd ? '100%' : atStart ? '22%' : '60%' }}
          />
        </div>
      </div>
    </div>
  )
}
