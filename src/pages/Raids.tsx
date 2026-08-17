import { useMemo, useState } from 'react'
import { useSeo } from '@/lib/seo'
import { raids, filtres, filtreSaisonDisponible, type Format, type Terrain, type Difficulte } from '@/data/raids'
import { media } from '@/data/medias'
import { RaidCard } from '@/components/ui/RaidCard'
import { Button } from '@/components/ui/Button'
import { Placeholder, Reveal, Section } from '@/components/ui/Primitives'
import { cn } from '@/lib/utils'

type Filtres = { format: Format | null; terrain: Terrain | null; difficulte: Difficulte | null }

/**
 * PAGE RAIDS — plateforme de découverte.
 * Filtres purement client (6 raids : aucune raison de charger une
 * librairie de recherche). Le filtre « saison » reste masqué tant
 * que le client n'a pas fourni les fenêtres praticables.
 */
export default function Raids() {
  const [f, setF] = useState<Filtres>({ format: null, terrain: null, difficulte: null })

  useSeo({
    title: 'Raids 4x4 au Maroc — Circuits, expéditions et sur mesure | 4x4-raid',
    description:
      "Tous les raids 4x4 au Maroc : journée dans l'Atlas, court séjour, boucle Sud de 1 500 km, raid sur mesure et opérations d'entreprise. Départ Marrakech.",
    path: '/raids',
    image: media.surMesure.src,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Raids 4x4 au Maroc',
      itemListElement: raids.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: r.nom,
        url: `https://4x4-raid.com/raids/${r.slug}`,
      })),
    },
  })

  const resultats = useMemo(
    () =>
      raids.filter(
        (r) =>
          (!f.format || r.format === f.format) &&
          (!f.terrain || r.terrain === f.terrain) &&
          (!f.difficulte || r.difficulte === f.difficulte),
      ),
    [f],
  )

  const actifs = Object.values(f).filter(Boolean).length

  return (
    <>
      {/* ─── Hero de page ──────────────────────────────────── */}
      <header className="relative border-b border-line pb-14 pt-[calc(var(--header-h)+5rem)]">
        <div className="container">
          <p className="eyebrow">Les raids</p>
          <h1 className="mt-8 max-w-[14ch] text-display-lg">
            Six façons
            <br />
            <span className="text-muted">de quitter la route</span>
          </h1>
          <p className="mt-8 max-w-measure text-lead text-muted">
            D'une journée à quatorze nuits. Chaque itinéraire est modulable&nbsp;: le
            répertoire d'étapes se recombine selon vos jours disponibles, votre rythme
            et la saison.
          </p>
        </div>
      </header>

      {/* ─── Filtres ───────────────────────────────────────── */}
      <div className="sticky top-[var(--header-h)] z-30 border-b border-line bg-ink/90 backdrop-blur-xl">
        <div className="no-scrollbar container flex items-center gap-8 overflow-x-auto py-4">
          <FiltreGroupe
            label="Format"
            options={filtres.format}
            value={f.format}
            onChange={(v) => setF((s) => ({ ...s, format: v }))}
          />
          <FiltreGroupe
            label="Terrain"
            options={filtres.terrain}
            value={f.terrain}
            onChange={(v) => setF((s) => ({ ...s, terrain: v }))}
          />
          <FiltreGroupe
            label="Niveau"
            options={filtres.difficulte}
            value={f.difficulte}
            onChange={(v) => setF((s) => ({ ...s, difficulte: v }))}
          />

          {actifs > 0 && (
            <button
              onClick={() => setF({ format: null, terrain: null, difficulte: null })}
              className="link-underline shrink-0 font-display text-micro uppercase text-sand"
            >
              Réinitialiser ({actifs})
            </button>
          )}
        </div>
      </div>

      {/* ─── Résultats ─────────────────────────────────────── */}
      <Section className="!pt-14">
        <div className="container">
          <p className="font-display text-micro uppercase text-muted" aria-live="polite">
            {resultats.length} raid{resultats.length > 1 ? 's' : ''}
          </p>

          {resultats.length === 0 ? (
            <p className="mt-12 max-w-measure text-lead text-muted">
              Aucun raid ne correspond à cette combinaison. Ce n'est pas grave&nbsp;:
              tous les itinéraires sont modulables.{' '}
              <a href="/contact" className="link-underline text-sand">Dites-nous ce que vous cherchez.</a>
            </p>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8">
              {resultats.map((raid, i) => (
                <Reveal key={raid.slug} delay={(i % 2) * 80}>
                  <RaidCard raid={raid} index={i} />
                </Reveal>
              ))}
            </div>
          )}

          {!filtreSaisonDisponible && (
            <div className="mt-10">
              <Placeholder
                variant="block"
                label="Fenêtres saisonnières par région — nécessaires pour activer le filtre « Saison »"
              >
                Le filtre par saison sera activé dès que les fenêtres praticables auront été
                définies pour chaque région.
              </Placeholder>
            </div>
          )}
        </div>
      </Section>

      {/* ─── CTA sur mesure ────────────────────────────────── */}
      <Section tone="surface" className="!py-section-sm">
        <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="max-w-[18ch] text-display-md">Rien ne correspond exactement&nbsp;?</h2>
            <p className="mt-5 max-w-measure text-muted">
              C'est le cas le plus fréquent. Le sur-mesure n'est pas une option
              du catalogue — c'est le mode de fonctionnement par défaut.
            </p>
          </div>
          <Button to="/contact" size="lg">Créer mon aventure</Button>
        </div>
      </Section>
    </>
  )
}

function FiltreGroupe<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: T[]
  value: T | null
  onChange: (v: T | null) => void
}) {
  return (
    <fieldset className="flex shrink-0 items-center gap-2">
      <legend className="sr-only">{label}</legend>
      <span aria-hidden className="mr-1 font-display text-micro uppercase text-muted">{label}</span>
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            aria-pressed={active}
            onClick={() => onChange(active ? null : opt)}
            className={cn(
              'shrink-0 rounded-pill border px-3.5 py-1.5 font-display text-micro uppercase transition-colors duration-fast',
              active
                ? 'border-sand bg-sand text-ink'
                : 'border-line text-muted hover:border-line-strong hover:text-bone',
            )}
          >
            {opt}
          </button>
        )
      })}
    </fieldset>
  )
}
