import { temoignages, referencesEntreprises } from '@/data/contenu'
import { Reveal, Section } from '@/components/ui/Primitives'

/**
 * ─── 09 · PREUVE SOCIALE ──────────────────────────────────────
 * 100 % de témoignages réels, repris de /temoignages/.
 * Scroll horizontal natif (scroll-snap) : aucun carrousel JS,
 * aucune flèche, le geste est le même sur souris et au doigt.
 */
export function Temoignages() {
  const vedettes = temoignages.filter((t) => t.vedette)
  const autres = temoignages.filter((t) => !t.vedette)

  return (
    <Section id="temoignages" tone="surface" className="overflow-hidden">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Ils y sont allés</p>
        </Reveal>

        {/* Citation vedette — traitée comme un titre, pas comme un encart */}
        {vedettes[0] && (
          <Reveal delay={100}>
            <figure className="mt-10 max-w-5xl">
              <blockquote className="font-display text-display-md leading-[1.08]">
                <span className="text-sand" aria-hidden>«&nbsp;</span>
                {vedettes[0].citation}
                <span className="text-sand" aria-hidden>&nbsp;»</span>
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-base text-bone">{vedettes[0].auteur}</span>
                <span className="font-display text-micro uppercase text-muted">{vedettes[0].contexte}</span>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>

      {/* Défilement horizontal — déborde volontairement du container */}
      <div className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:px-8 xl:px-10">
        {[...vedettes.slice(1), ...autres].map((t) => (
          <figure
            key={t.auteur}
            className="flex w-[86vw] shrink-0 snap-start flex-col justify-between rounded-card border border-line bg-ink p-8 sm:w-[440px]"
          >
            <blockquote className="leading-relaxed text-bone/90">{t.citation}</blockquote>
            <figcaption className="mt-8 border-t border-line pt-5">
              <p className="font-display text-sm text-bone">{t.auteur}</p>
              <p className="mt-1 font-display text-micro uppercase text-muted">{t.contexte}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Références entreprises — texte seul, sobre */}
      <div className="container mt-16">
        <Reveal>
          <p className="font-display text-micro uppercase text-muted">
            Ont fait appel à 4x4-raid pour leurs opérations d'entreprise
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
            {referencesEntreprises.map((r) => (
              <li key={r} className="font-display text-base text-bone/45 transition-colors duration-fast hover:text-bone">
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
