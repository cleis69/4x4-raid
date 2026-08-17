import { Link } from 'react-router-dom'
import { territoires } from '@/data/contenu'
import { Button } from '@/components/ui/Button'
import { Figure, Reveal, Section } from '@/components/ui/Primitives'

/**
 * ─── 06 · LE MAROC AUTREMENT ──────────────────────────────────
 * Traitement éditorial : chaque territoire = une double page.
 * Alternance gauche/droite en desktop, empilement en mobile.
 * Aucun territoire inventé — tous cités sur le site actuel.
 */
export function Territoires() {
  return (
    <Section id="territoires">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Le Maroc autrement</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-8 max-w-[15ch] text-display-lg">
            Cinq territoires,
            <br />
            <span className="text-muted">une seule traversée</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-8 max-w-measure text-muted">
            Méditerranée, Atlantique, Sahara, Rif et Atlas — dont le sommet culmine
            à 4 168 mètres. Peu de pays offrent une telle amplitude sur une seule boucle.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 space-y-24 md:space-y-32">
        {territoires.map((t, i) => {
          const reversed = i % 2 === 1
          return (
            <article key={t.id} className="container">
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <Reveal as="scale" className={reversed ? 'md:order-2' : undefined}>
                  <Link to={`/destinations/${t.id}`} className="group block overflow-hidden rounded-card">
                    <Figure
                      media={t.image}
                      className="transition-transform duration-slow ease-raid group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                </Reveal>

                <Reveal delay={120} className={reversed ? 'md:order-1' : undefined}>
                  <div>
                    <p className="font-display text-micro uppercase text-sand">{t.index} — {t.soustitre}</p>
                    <h3 className="mt-5 text-display-md">
                      <Link to={`/destinations/${t.id}`} className="transition-colors duration-fast hover:text-sand">
                        {t.nom}
                      </Link>
                    </h3>
                    <p className="mt-6 max-w-measure leading-relaxed text-muted">{t.texte}</p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {t.marqueurs.slice(0, 3).map((m) => (
                        <li key={m} className="rounded-pill border border-line px-3 py-1.5 font-display text-micro uppercase text-muted">
                          {m}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7">
                      <Button to={`/destinations/${t.id}`} variant="line">En savoir plus</Button>
                    </div>
                  </div>
                </Reveal>
              </div>
            </article>
          )
        })}
      </div>

      <div className="container mt-20">
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-measure text-muted">
              Chaque territoire a sa fiche, ses repères de terrain et les raids qui le traversent.
            </p>
            <Button to="/destinations" variant="ghost">Toutes les destinations</Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
