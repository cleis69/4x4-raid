import { Navigate, useParams, Link } from 'react-router-dom'
import { getRaid, raids } from '@/data/raids'
import { site } from '@/data/site'
import { useSeo } from '@/lib/seo'
import { Button } from '@/components/ui/Button'
import { RouteMap } from '@/components/ui/RouteMap'
import { Figure, Placeholder, Reveal, Rule, Section } from '@/components/ui/Primitives'

/**
 * PAGE DÉTAIL D'UN RAID
 * Structure : Hero → L'expédition → Itinéraire → Carte → Inclus /
 * non inclus → Le véhicule → CTA.
 * Tout champ absent du site actuel passe par <Placeholder>.
 */
export default function RaidDetail() {
  const { slug } = useParams()
  const raid = slug ? getRaid(slug) : undefined

  useSeo({
    title: raid ? `${raid.nom} — Raid 4x4 au Maroc | 4x4-raid` : 'Raid — 4x4-raid',
    description: raid ? raid.chapo.slice(0, 158) : '',
    path: `/raids/${slug}`,
    image: raid?.image.src,
    jsonLd: raid
      ? {
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: raid.nom,
          description: raid.chapo,
          touristType: raid.difficulte,
          provider: { '@type': 'TravelAgency', name: '4x4-raid', url: site.url },
          itinerary: {
            '@type': 'ItemList',
            numberOfItems: raid.etapes.length,
            itemListElement: raid.etapes.map((e, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: { '@type': 'Place', name: e.titre },
            })),
          },
        }
      : undefined,
  })

  if (!raid) return <Navigate to="/raids" replace />

  const autres = raids.filter((r) => r.slug !== raid.slug).slice(0, 2)

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <header className="grain relative flex min-h-[82svh] items-end overflow-hidden">
        <div className="media-veil absolute inset-0">
          <img
            src={raid.image.src}
            alt={raid.image.alt}
            loading="eager"
            // @ts-expect-error — attribut valide
            fetchpriority="high"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="container relative z-10 pb-14 pt-32">
          <nav aria-label="Fil d'Ariane" className="font-display text-micro uppercase text-muted">
            <Link to="/raids" className="link-underline">Raids</Link>
            <span aria-hidden className="mx-2 text-sand">/</span>
            <span className="text-bone">{raid.nom}</span>
          </nav>

          <h1 className="mt-7 max-w-[15ch] text-display-lg">{raid.nom}</h1>
          <p className="mt-6 max-w-measure text-lead text-bone/85">{raid.accroche}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/contact" size="lg">Réserver cette aventure</Button>
            <Button href={`tel:${site.contact.phoneHref}`} variant="ghost" size="lg">
              Parler à Jean-Luc
            </Button>
          </div>
        </div>
      </header>

      {/* ─── BANDEAU SPÉCIFICATIONS ───────────────────────── */}
      <div className="border-y border-line bg-surface">
        <dl className="container grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
          <Spec label="Durée" value={raid.duree} />
          <Spec label="Départ" value={raid.depart} />
          <Spec label="Région" value={raid.region} />
          <Spec label="Terrain" value={raid.terrain} />
          <Spec label="Niveau" value={raid.difficulte} />
          <Spec
            label="Distance"
            value={
              raid.distance ?? (
                <Placeholder label={`Distance totale — ${raid.nomSource}`}>Sur devis</Placeholder>
              )
            }
          />
        </dl>
      </div>

      {/* ─── L'EXPÉDITION ─────────────────────────────────── */}
      <Section>
        <div className="container grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow lg:sticky lg:top-32">L'expédition</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-measure text-lead leading-relaxed">{raid.chapo}</p>
          </Reveal>
        </div>
      </Section>

      {/* ─── ITINÉRAIRE ───────────────────────────────────── */}
      {raid.etapes.length > 0 && (
        <Section tone="surface">
          <div className="container">
            <Reveal>
              <p className="eyebrow">Itinéraire</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 text-display-md">Jour après jour</h2>
            </Reveal>

            {raid.etapes.length > 1 && (
              <Reveal delay={140}>
                <div className="mt-12">
                  <RouteMap etapes={raid.etapes} />
                </div>
              </Reveal>
            )}

            <ol className="mt-16 border-t border-line">
              {raid.etapes.map((etape, i) => (
                <Reveal key={etape.jour} delay={(i % 3) * 60}>
                  <li className="grid gap-6 border-b border-line py-10 md:grid-cols-[auto_1fr] md:gap-14">
                    <div className="md:w-32">
                      <p className="font-display text-display-sm leading-none text-sand">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <p className="mt-2 font-display text-micro uppercase text-muted">{etape.jour}</p>
                    </div>

                    <div>
                      <h3 className="text-display-sm">{etape.titre}</h3>

                      {etape.distances.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {etape.distances.map((d) => (
                            <li key={d} className="rounded-pill border border-sand/30 bg-sand/[0.06] px-3 py-1.5 font-display text-micro uppercase text-sand">
                              {d}
                            </li>
                          ))}
                        </ul>
                      )}

                      <ul className="mt-6 space-y-2">
                        {etape.reperes.map((r) => (
                          <li key={r} className="flex gap-3 text-muted">
                            <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-line-strong" />
                            {r}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 border-t border-line pt-5">
                        <p className="font-display text-micro uppercase text-muted">Nuit</p>
                        <p className="mt-1.5 text-bone">
                          {etape.nuit ?? (
                            <Placeholder label={`Hébergement ${etape.jour} — ${raid.nomSource}`}>
                              Retour — pas de nuit sur place
                            </Placeholder>
                          )}
                        </p>
                      </div>

                      <div className="mt-5">
                        <Placeholder label={`Photos ${etape.jour} — ${raid.nomSource}`}>
                          Photographies de l'étape à intégrer
                        </Placeholder>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            {raid.notes && (
              <div className="mt-10">
                <Placeholder variant="block" label="Points à arbitrer sur cette fiche">
                  {raid.notes.replace(/⚠️\s?/g, '')}
                </Placeholder>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ─── INCLUS / NON INCLUS ──────────────────────────── */}
      <Section>
        <div className="container grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">Ce qui est inclus</p>
              <ul className="mt-8 border-t border-line">
                {raid.inclus.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-line py-4">
                    <span aria-hidden className="mt-1.5 text-sand">✓</span>
                    <span className="text-bone/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Placeholder label={`Liste complète des inclusions — ${raid.nomSource}`}>
                  Liste complète à valider (véhicule, carburant, encadrement, assurances,
                  repas non mentionnés, transferts).
                </Placeholder>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <p className="eyebrow">Ce qui n'est pas inclus</p>
              <div className="mt-8">
                <Placeholder
                  variant="block"
                  label={`Exclusions — aucune liste n'existe sur le site actuel (${raid.nomSource})`}
                >
                  Cette liste doit être fournie&nbsp;: vols, assurances, boissons, pourboires,
                  dépenses personnelles, options. C'est une information de réassurance
                  essentielle — son absence fait chuter la conversion.
                </Placeholder>
              </div>

              <Rule className="my-10" />

              <p className="eyebrow">Conditions</p>
              <div className="mt-8">
                <Placeholder
                  variant="block"
                  label="Conditions d'annulation, acompte, assurance annulation"
                >
                  Politique d'annulation, montant de l'acompte et modalités de règlement
                  à fournir.
                </Placeholder>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ─── LE VÉHICULE ──────────────────────────────────── */}
      <Section tone="surface">
        <div className="container grid gap-12 md:grid-cols-2 md:gap-20 md:items-center">
          <Reveal as="scale">
            <Figure media={raid.image} className="rounded-card" sizes="(max-width: 768px) 100vw, 50vw" />
          </Reveal>
          <Reveal delay={100}>
            <div>
              <p className="eyebrow">Le véhicule</p>
              <h2 className="mt-8 text-display-md">Celui qui convient au terrain</h2>
              <p className="mt-6 max-w-measure text-muted">
                Le véhicule affecté dépend du raid, du terrain et du nombre de participants.
                Vous pouvez aussi venir avec le vôtre — 4x4, moto, SSV ou buggy — et vous
                limiter à l'accompagnement.
              </p>
              <div className="mt-8">
                <Placeholder
                  variant="block"
                  label={`Fiche véhicule affecté à « ${raid.nom} » — modèle, motorisation, transmission, équipement, photos`}
                >
                  Fiche technique du véhicule à intégrer.
                </Placeholder>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ─── CTA + AUTRES RAIDS ───────────────────────────── */}
      <Section>
        <div className="container">
          <div className="flex flex-col gap-8 border-b border-line pb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-[16ch] text-display-lg">
                Prêt&nbsp;?
                <br />
                <span className="text-muted">Ou presque&nbsp;?</span>
              </h2>
              <p className="mt-6 max-w-measure text-muted">
                Ce raid peut être raccourci, allongé, ou entièrement retracé.
                Dites-nous vos dates et vos envies.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact" size="lg">Réserver cette aventure</Button>
            </div>
          </div>

          <p className="mt-16 eyebrow">Autres raids</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {autres.map((r) => (
              <Link
                key={r.slug}
                to={`/raids/${r.slug}`}
                className="group flex items-center justify-between gap-6 rounded-card border border-line p-7 transition-colors duration-base hover:border-line-strong"
              >
                <div>
                  <h3 className="text-display-sm transition-colors group-hover:text-sand">{r.nom}</h3>
                  <p className="mt-2 font-display text-micro uppercase text-muted">
                    {r.duree} · {r.region}
                  </p>
                </div>
                <span aria-hidden className="text-2xl text-muted transition-transform duration-fast group-hover:translate-x-1 group-hover:text-sand">→</span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}

function Spec({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-r border-line px-1 py-6 last:border-r-0 md:px-4">
      <dt className="font-display text-micro uppercase text-muted">{label}</dt>
      <dd className="mt-2 text-sm text-bone">{value}</dd>
    </div>
  )
}
