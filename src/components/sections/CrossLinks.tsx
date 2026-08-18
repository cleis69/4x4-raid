import { Link } from 'react-router-dom'

/**
 * MAILLAGE INTERNE CONTEXTUEL
 *
 * Remplace le bloc « 3 cartes » que WordPress répétait à l'identique
 * sur les 13 pages — trois H3 dupliqués partout, ce qui diluait la
 * spécificité sémantique de chaque page.
 *
 * Ici les cartes sont filtrées : la page courante s'exclut d'elle-même.
 * Le maillage reste dense, mais il devient contextuel.
 */
const ALL = [
  {
    href: '/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/',
    label: 'Raid 4×4 sur mesure',
    text: 'Jean-Luc compose votre raid selon vos envies et vos besoins.',
    image: '/media/sur-mesure-piste-sable.jpg',
    alt: 'Raid 4x4 sur mesure au Maroc, véhicule sur piste sablonneuse',
  },
  {
    href: '/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/',
    label: 'Raids 4×4 pour entreprises',
    text: 'Incentive, team-building et séminaires au cœur du désert marocain.',
    image: '/media/entreprise-convoi.jpg',
    alt: 'Raid 4x4 entreprise au Maroc : convoi de véhicules en formation',
  },
  {
    href: '/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/',
    label: 'Circuits départ de Marrakech',
    text: "D'une journée à 14 nuits, par les pistes oubliées du Sud marocain.",
    image: '/media/atlas-piste-montagne.jpg',
    alt: 'Piste de montagne du Haut-Atlas parcourue en 4x4 au départ de Marrakech',
  },
]

export function CrossLinks({
  exclude = [],
  title = 'Continuer la découverte',
}: {
  exclude?: string[]
  title?: string
}) {
  const cards = ALL.filter((c) => !exclude.includes(c.href))
  if (cards.length === 0) return null

  return (
    <section className="border-t border-line bg-surface py-section">
      <div className="container">
        <p className="eyebrow reveal">{title}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Link
              key={c.href}
              to={c.href}
              className="reveal group block overflow-hidden rounded-card border border-line bg-ink transition-colors duration-500 ease-raid hover:border-line-strong"
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-raid group-hover:scale-105"
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
