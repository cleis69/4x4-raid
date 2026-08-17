import { useSeo } from '@/lib/seo'
import { vehicules, formules } from '@/data/vehicules'
import { media } from '@/data/medias'
import { site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { Placeholder, Reveal, Section } from '@/components/ui/Primitives'

/**
 * PAGE VÉHICULES
 *
 * ⚠️ PAGE VOLONTAIREMENT INCOMPLÈTE — ET ASSUMÉE COMME TELLE.
 *
 * Le site actuel ne nomme aucun véhicule. Construire une « fiche
 * produit automobile » aurait exigé d'inventer une flotte : marques,
 * modèles, motorisations. Le brief l'interdit explicitement (§ 26).
 *
 * Le parti pris : livrer la mise en page premium complète, avec des
 * tableaux de spécifications réels dont chaque ligne est un
 * placeholder identifié. Le jour où le client remplit
 * `src/data/vehicules.ts`, la page devient une vraie page produit
 * sans une ligne de code à modifier.
 */
export default function Vehicules() {
  useSeo({
    title: 'Véhicules — 4x4, moto, SSV, buggy | 4x4-raid Maroc',
    description:
      "Les engins des raids 4x4 au Maroc : 4x4, moto, SSV et buggy. Venez avec le vôtre ou louez sur place. Quatre participants maximum par véhicule.",
    path: '/vehicules',
    image: media.surMesure.src,
  })

  return (
    <>
      <header className="border-b border-line pb-14 pt-[calc(var(--header-h)+5rem)]">
        <div className="container">
          <p className="eyebrow">Les engins</p>
          <h1 className="mt-8 max-w-[12ch] text-display-lg">
            Le vôtre,
            <br />
            <span className="text-muted">ou le nôtre</span>
          </h1>
          <p className="mt-8 max-w-measure text-lead text-muted">
            Quatre catégories d'engins, deux façons d'y accéder. Le choix dépend
            du terrain, de la durée et de ce que vous voulez ressentir sous les roues.
          </p>
        </div>
      </header>

      {/* ─── LES DEUX FORMULES ────────────────────────────── */}
      <div className="border-b border-line bg-surface">
        <div className="container grid gap-px md:grid-cols-2">
          {formules.map((f, i) => (
            <div key={f.titre} className={i === 0 ? 'py-10 md:pr-12' : 'border-t border-line py-10 md:border-l md:border-t-0 md:pl-12'}>
              <p className="font-display text-micro uppercase text-sand">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-4 text-display-sm">{f.titre}</h2>
              <p className="mt-4 max-w-measure text-muted">{f.texte}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FICHES ───────────────────────────────────────── */}
      {vehicules.map((v, i) => (
        <Section key={v.id} id={v.id} tone={i % 2 === 1 ? 'surface' : 'ink'} className="border-b border-line">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Média */}
              <Reveal as="scale" className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative overflow-hidden rounded-card" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={v.image.src}
                    alt={v.image.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-5 top-5 font-display text-micro uppercase text-bone/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>

              {/* Contenu */}
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <Reveal>
                  <p className="font-display text-micro uppercase text-sand">{v.role}</p>
                </Reveal>
                <Reveal delay={70}>
                  <h2 className="mt-4 text-display-lg">{v.nom}</h2>
                </Reveal>
                <Reveal delay={110}>
                  <p className="mt-5 font-display text-display-sm text-muted">{v.accroche}</p>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-8 max-w-measure leading-relaxed text-muted">{v.texte}</p>
                </Reveal>

                {/* Ce qui est documenté */}
                <Reveal delay={200}>
                  <ul className="mt-8 border-t border-line">
                    {v.faits.map((f) => (
                      <li key={f} className="flex gap-4 border-b border-line py-3.5 text-sm">
                        <span aria-hidden className="mt-0.5 text-sand">✓</span>
                        <span className="text-bone/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Tableau de spécifications */}
                <Reveal delay={240}>
                  <div className="mt-10">
                    <p className="font-display text-micro uppercase text-muted">Caractéristiques</p>
                    <dl className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
                      {v.specs.map((s) => (
                        <div key={s.label} className="bg-ink px-5 py-4">
                          <dt className="font-display text-micro uppercase text-muted">{s.label}</dt>
                          <dd className="mt-1.5 text-sm">
                            {s.value ?? (
                              <Placeholder label={`${s.label} — ${v.nom}`}>À communiquer</Placeholder>
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>

                <Reveal delay={280}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button to={`/contact?objet=info`} variant="ghost">
                      Demander la disponibilité
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* ─── NOTE DE TRANSPARENCE ─────────────────────────── */}
      <Section className="!py-section-sm">
        <div className="container">
          <Placeholder variant="block" label="Fiches techniques complètes de la flotte">
            Les caractéristiques techniques ne figurent nulle part sur le site actuel :
            aucun modèle, aucune motorisation, aucun équipement n'est publié. Elles n'ont
            donc pas été inventées. Dès que ces éléments sont fournis, cette page devient
            une véritable page produit — la mise en page est déjà en place.
          </Placeholder>
        </div>
      </Section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <Section tone="surface" className="!py-section-sm">
        <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="max-w-[20ch] text-display-md">
              Le bon engin dépend du terrain.
            </h2>
            <p className="mt-5 max-w-measure text-muted">
              Dites-nous où vous voulez aller — on vous dira avec quoi.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/contact" size="lg">Créer mon aventure</Button>
            <Button href={`tel:${site.contact.phoneHref}`} variant="ghost" size="lg">
              {site.contact.phoneDisplay}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
