import { Link, Navigate, useParams } from 'react-router-dom'
import { useSeo } from '@/lib/seo'
import { getTerritoire, territoires } from '@/data/contenu'
import { raids } from '@/data/raids'
import { site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { RaidCard } from '@/components/ui/RaidCard'
import { Figure, Placeholder, Reveal, Section } from '@/components/ui/Primitives'

/**
 * FICHE DESTINATION
 * Grande image → récit → marqueurs → raids associés.
 *
 * ⚠️ Pas de carte géographique : aucune coordonnée n'est publiée sur
 * le site actuel. On affiche les marqueurs comme un relevé de terrain,
 * et un placeholder signale ce qui manque. Voir CONTENU-A-FOURNIR § 12.
 */
export default function DestinationDetail() {
  const { id } = useParams()
  const t = id ? getTerritoire(id) : undefined

  useSeo({
    title: t ? `${t.nom} — Raid 4x4 au Maroc | 4x4-raid` : 'Destination — 4x4-raid',
    description: t ? t.texte.slice(0, 158) : '',
    path: `/destinations/${id}`,
    image: t?.image.src,
    jsonLd: t
      ? {
          '@context': 'https://schema.org',
          '@type': 'TouristDestination',
          name: t.nom,
          description: t.texte,
          touristType: 'Raid 4x4',
          includesAttraction: t.marqueurs.map((m) => ({ '@type': 'TouristAttraction', name: m })),
          address: { '@type': 'PostalAddress', addressCountry: 'MA' },
        }
      : undefined,
  })

  if (!t) return <Navigate to="/destinations" replace />

  const associes = raids.filter((r) => t.raidSlugs.includes(r.slug))
  const index = territoires.findIndex((x) => x.id === t.id)
  const suivant = territoires[(index + 1) % territoires.length]

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <header className="grain relative flex min-h-[80svh] items-end overflow-hidden">
        <div className="media-veil absolute inset-0">
          <img
            src={t.image.src}
            alt={t.image.alt}
            loading="eager"
            // @ts-expect-error — attribut valide
            fetchpriority="high"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="container relative z-10 pb-14 pt-32">
          <nav aria-label="Fil d'Ariane" className="font-display text-micro uppercase text-muted">
            <Link to="/destinations" className="link-underline">Destinations</Link>
            <span aria-hidden className="mx-2 text-sand">/</span>
            <span className="text-bone">{t.nom}</span>
          </nav>

          <p className="mt-7 font-display text-micro uppercase text-sand">
            {t.index} — {t.soustitre}
          </p>
          <h1 className="mt-4 max-w-[14ch] text-display-lg">{t.nom}</h1>
          <p className="mt-6 max-w-measure text-lead text-bone/85">{t.texte}</p>
        </div>
      </header>

      {/* ─── RELEVÉ DE TERRAIN ────────────────────────────── */}
      <div className="border-b border-line bg-surface">
        <div className="container py-8">
          <p className="font-display text-micro uppercase text-muted">Repères de terrain</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {t.marqueurs.map((m) => (
              <li key={m} className="rounded-pill border border-sand/30 bg-sand/[0.06] px-4 py-2 font-display text-micro uppercase text-sand">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── RÉCIT ────────────────────────────────────────── */}
      <Section>
        <div className="container grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow lg:sticky lg:top-32">Le territoire</p>
          </Reveal>
          <div className="max-w-measure space-y-7 text-lead leading-relaxed">
            {t.recit.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className={i === 0 ? undefined : 'text-muted'}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── GALERIE ──────────────────────────────────────── */}
      <Section tone="surface" className="!pt-0">
        <div className="container">
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            {t.galerie.map((m, i) => (
              <Reveal key={m.src + i} as="scale" delay={i * 80} className="overflow-hidden rounded-card">
                <Figure media={m} sizes="(max-width: 768px) 100vw, 33vw" />
              </Reveal>
            ))}
          </div>

          <div className="mt-8">
            <Placeholder label={`Traces GPS et photos supplémentaires — ${t.nom}`}>
              Une carte réelle nécessite les traces GPX. Photos spécifiques au territoire
              également souhaitées.
            </Placeholder>
          </div>
        </div>
      </Section>

      {/* ─── RAIDS ASSOCIÉS ───────────────────────────────── */}
      {associes.length > 0 && (
        <Section>
          <div className="container">
            <Reveal>
              <p className="eyebrow">Raids qui traversent ce territoire</p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
              {associes.map((raid, i) => (
                <Reveal key={raid.slug} delay={(i % 2) * 80}>
                  <RaidCard raid={raid} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ─── CTA + SUIVANT ────────────────────────────────── */}
      <Section tone="surface" className="!py-section-sm">
        <div className="container">
          <div className="flex flex-col gap-8 border-b border-line pb-12 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-[20ch] text-display-md">
              Ce territoire se combine avec les autres.
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact" size="lg">Créer mon aventure</Button>
              <Button href={`tel:${site.contact.phoneHref}`} variant="ghost" size="lg">
                {site.contact.phoneDisplay}
              </Button>
            </div>
          </div>

          <Link
            to={`/destinations/${suivant.id}`}
            className="group mt-12 flex items-center justify-between gap-6"
          >
            <div>
              <p className="font-display text-micro uppercase text-muted">Territoire suivant</p>
              <p className="mt-2 text-display-md transition-colors duration-fast group-hover:text-sand">
                {suivant.nom}
              </p>
            </div>
            <span aria-hidden className="text-3xl text-muted transition-transform duration-fast group-hover:translate-x-2 group-hover:text-sand">
              →
            </span>
          </Link>
        </div>
      </Section>
    </>
  )
}
