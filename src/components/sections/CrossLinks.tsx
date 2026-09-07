import { Link } from 'react-router-dom'
import { Picture } from '@/components/Picture'
import type { MediaKey } from '@/data/medias'

/**
 * ─────────────────────────────────────────────────────────────────
 *  MAILLAGE INTERNE CONTEXTUEL
 *
 *  Remplace le bloc « 3 cartes » que WordPress répétait à l'identique
 *  sur les 13 pages — trois H3 dupliqués partout, ce qui diluait la
 *  spécificité sémantique de chaque page.
 *
 *  Deux règles :
 *
 *  1. La page courante s'exclut d'elle-même (`exclude`).
 *  2. Chaque page CHOISIT ses trois destinations (`pick`), au lieu de
 *     renvoyer toujours vers les mêmes. Une page « Guide » qui pointe
 *     vers les témoignages et les photos vaut mieux, pour le crawl
 *     comme pour le lecteur, qu'un bloc identique de bas de page.
 *
 *  Les photos diffèrent d'une destination à l'autre : plus aucune
 *  image ne se retrouve deux fois sur le même écran.
 * ─────────────────────────────────────────────────────────────────
 */

type Lien = {
  href: string
  label: string
  text: string
  media: MediaKey
}

export const LIENS = {
  circuits: {
    href: '/circuits-raid-4x4-au-maroc/',
    label: 'Circuits raid 4×4 au Maroc',
    text: 'Un répertoire d’étapes modulables, en direct ou en boucle, à recomposer selon vos dates.',
    media: 'plateau-rocailleux',
  },
  surMesure: {
    href: '/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/',
    label: 'Raid 4×4 sur mesure',
    text: 'Jean-Luc compose votre raid selon vos envies et vos besoins.',
    media: 'dunes-ciel-bleu',
  },
  entreprises: {
    href: '/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/',
    label: 'Raids 4×4 pour entreprises',
    text: 'Incentive, team-building et séminaires au cœur du désert marocain.',
    media: 'convoi-atlas-enneige',
  },
  marrakech: {
    href: '/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/',
    label: 'Circuits départ de Marrakech',
    text: 'D’une journée à 14 nuits, par les pistes oubliées du Sud marocain.',
    media: 'dune-descente',
  },
  excursions: {
    href: '/circuits-raid-4x4-au-maroc/3-excursions-4x4-a-marrakech/',
    label: 'Excursions 4×4 à Marrakech',
    text: 'Trois itinéraires à la journée, pistes et hors-pistes, pique-nique compris.',
    media: 'village-berbere-piste',
  },
  guide: {
    href: '/guide-raids-4x4-maroc/',
    label: 'Votre guide — Jean-Luc Miolane',
    text: 'Quarante-cinq ans de raids et de sable, vingt-cinq ans installé au Maroc.',
    media: 'equipe-briefing-plateau',
  },
  temoignages: {
    href: '/temoignages/',
    label: 'Témoignages',
    text: 'Ce qu’en disent ceux qui sont partis — voyageurs, dirigeants, équipes.',
    media: 'oued-vallee-verte',
  },
  photos: {
    href: '/photos-raids-4x4-maroc/',
    label: 'Photos des raids',
    text: 'Dunes, bivouacs, oueds et pistes oubliées : la galerie des raids.',
    media: 'erg-vue-plongeante',
  },
  decouvrir: {
    href: '/decouvrir-le-maroc-en-4x4/',
    label: 'Découvrir le Maroc en 4×4',
    text: 'Climat, formalités, monnaie, santé : tout ce qu’il faut savoir avant de partir.',
    media: 'desert-etendue',
  },
} as const satisfies Record<string, Lien>

export type LienKey = keyof typeof LIENS

/** Les trois familles de raids — le maillage par défaut, hérité de WordPress. */
const DEFAUT: LienKey[] = ['surMesure', 'entreprises', 'marrakech']

export function CrossLinks({
  pick = DEFAUT,
  exclude = [],
  title = 'Continuer la découverte',
}: {
  /** Destinations choisies par la page, dans l'ordre d'affichage. */
  pick?: LienKey[]
  /** Chemins à ne jamais afficher — typiquement la page courante. */
  exclude?: string[]
  title?: string
}) {
  const cards = pick.map((k) => LIENS[k]).filter((c) => !exclude.includes(c.href))
  if (cards.length === 0) return null

  return (
    <section className="border-t border-line bg-surface py-section-sm">
      <div className="container">
        <p className="eyebrow reveal">{title}</p>
        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3 md:gap-6">
          {cards.map((c, i) => (
            <Link
              key={c.href}
              to={c.href}
              className="reveal group block overflow-hidden rounded-card border border-line bg-ink transition-colors duration-500 ease-raid hover:border-line-strong"
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Picture
                  media={c.media}
                  sizes="(max-width: 768px) 92vw, 31vw"
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover transition-transform duration-700 ease-raid group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-display-sm transition-colors duration-200 group-hover:text-sand">
                  {c.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.text}</p>
                <span className="mt-5 inline-block font-display text-eyebrow uppercase text-sand">
                  Détails <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
