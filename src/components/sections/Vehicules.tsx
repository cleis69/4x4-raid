import { Link } from 'react-router-dom'
import { vehicules } from '@/data/vehicules'
import { Placeholder, Reveal, Section } from '@/components/ui/Primitives'
import { Button } from '@/components/ui/Button'

/**
 * ─── 07 · LES ENGINS ──────────────────────────────────────────
 * Aperçu des quatre catégories. Le détail vit sur /vehicules.
 *
 * ⚠️ Le site actuel ne nomme aucun véhicule : ni marque, ni modèle,
 * ni motorisation. Les caractéristiques sont donc des placeholders
 * assumés — voir src/data/vehicules.ts et CONTENU-A-FOURNIR § 9.
 */
export function Vehicules() {
  return (
    <Section tone="surface">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Les engins</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 max-w-[16ch] text-display-lg">
                Le vôtre,
                <br />
                <span className="text-muted">ou le nôtre</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-measure-tight text-muted">
              Vous venez avec votre 4x4, votre moto, votre SSV ou votre buggy&nbsp;? On peut
              se limiter à l'accompagnement — guide et véhicule de suivi. Sinon, location sur place.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {vehicules.map((v, i) => (
            <Reveal key={v.id} delay={i * 70}>
              <Link to={`/vehicules#${v.id}`} className="group flex h-full flex-col bg-ink p-8 transition-colors duration-base hover:bg-elevated">
                <p className="font-display text-micro uppercase text-sand">{v.role}</p>
                <h3 className="mt-4 text-display-sm transition-colors duration-fast group-hover:text-sand">
                  {v.nom}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{v.accroche}</p>

                <div className="mt-7 border-t border-line pt-5">
                  <Placeholder label={`Fiche technique ${v.nom} — modèle, motorisation, transmission, équipement`}>
                    Caractéristiques à venir
                  </Placeholder>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-measure text-sm text-muted">
              Le véhicule affecté dépend du raid, du terrain et du nombre de participants.
              Il est confirmé au moment du devis.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button to="/vehicules" variant="ghost">Voir les engins</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
