import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

/**
 * ─────────────────────────────────────────────────────────────────
 *  ÉVENTAIL DE CARTES
 *
 *  Plusieurs photographies superposées, très légèrement pivotées,
 *  qui se déploient au survol. C'est la composition la plus
 *  « photographique » du site : elle évoque un jeu de tirages posés
 *  sur une table plutôt qu'une grille de vignettes.
 *
 *  ── POURQUOI ÇA MARCHE ────────────────────────────────────────
 *  Les rotations sont minuscules (±3°). Au-delà, l'effet devient un
 *  gimmick de template. En dessous de 1°, il ne se voit pas. La
 *  fenêtre utile est étroite.
 *
 *  ── SEO ───────────────────────────────────────────────────────
 *  Chaque carte est un vrai <Link> avec son <h3> et son texte dans
 *  le DOM. L'empilement est purement visuel : au clavier, la
 *  tabulation traverse les cartes dans l'ordre, et le lecteur
 *  d'écran lit une liste normale.
 * ─────────────────────────────────────────────────────────────────
 */

export type FanCard = {
  href: string
  index: string
  title: string
  text: string
  image: string
  alt: string
}

/** Rotations et décalages fixes — déterministes, jamais aléatoires. */
const LAYOUT = [
  { rot: -3.2, x: -6, y: 10 },
  { rot: 0.8, x: 0, y: 0 },
  { rot: 2.9, x: 6, y: 14 },
  { rot: -1.6, x: 2, y: 6 },
]

export function FanCards({ cards }: { cards: FanCard[] }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <ul
      className="relative grid list-none grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-4"
      style={{ perspective: '1600px' }}
      onMouseLeave={() => setActive(null)}
    >
      {cards.map((c, i) => {
        const l = LAYOUT[i % LAYOUT.length]
        const isActive = active === i
        const isDimmed = active !== null && !isActive

        return (
          <li key={c.href} className="relative">
            <Link
              to={c.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={cn(
                'group block overflow-hidden rounded-card border border-line bg-surface',
                'transition-[transform,opacity,border-color] duration-700 ease-raid',
                'will-change-transform motion-reduce:!transform-none',
              )}
              style={{
                // Au repos : léger éventail. Au survol : la carte se
                // redresse et avance ; les voisines reculent à peine.
                transform: isActive
                  ? 'rotate(0deg) translate3d(0, -14px, 0) scale(1.03)'
                  : `rotate(${l.rot}deg) translate3d(${l.x}px, ${l.y}px, 0) scale(${isDimmed ? 0.97 : 1})`,
                opacity: isDimmed ? 0.55 : 1,
                zIndex: isActive ? 20 : 10 - i,
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.alt}
                  width={900}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 90vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-raid group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

                <span className="absolute left-5 top-5 font-display text-micro uppercase tracking-[0.22em] text-bone/70">
                  {c.index}
                </span>

                {/* Le titre monte et se révèle à l'approche */}
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="text-display-sm leading-tight transition-colors duration-300 group-hover:text-sand">
                    {c.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-2 max-w-[34ch] text-sm leading-relaxed text-muted',
                      'transition-[opacity,transform] duration-500 ease-raid',
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                      // Sur tactile, pas de survol : le texte reste lisible.
                      'max-lg:!translate-y-0 max-lg:!opacity-100',
                    )}
                  >
                    {c.text}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
