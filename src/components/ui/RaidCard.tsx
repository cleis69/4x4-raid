import { Link } from 'react-router-dom'
import type { Raid } from '@/data/raids'
import { Figure, Placeholder } from './Primitives'
import { cn } from '@/lib/utils'

/**
 * Carte raid — un seul composant pour la home et la page Raids.
 * Le prix est la seule donnée absente du site actuel : elle est
 * traitée par <Placeholder>, jamais remplacée par un chiffre inventé.
 */
export function RaidCard({ raid, index, large }: { raid: Raid; index: number; large?: boolean }) {
  return (
    <Link
      to={`/raids/${raid.slug}`}
      className="group relative block overflow-hidden rounded-card border border-line bg-surface transition-colors duration-base ease-raid hover:border-line-strong"
    >
      <div className="relative overflow-hidden">
        <Figure
          media={raid.image}
          className={cn('transition-transform duration-slow ease-raid group-hover:scale-[1.04]', large ? 'aspect-[4/5] md:aspect-[16/10]' : 'aspect-[4/3]')}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

        <span className="absolute left-5 top-5 font-display text-micro uppercase tracking-[0.22em] text-bone/70">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="absolute right-5 top-5 rounded-pill border border-bone/25 bg-ink/40 px-3 py-1 font-display text-micro uppercase text-bone backdrop-blur-sm">
          {raid.format}
        </span>
      </div>

      <div className="relative p-6 md:p-8">
        <h3 className="text-display-sm transition-colors duration-fast group-hover:text-sand">{raid.nom}</h3>
        <p className="mt-3 max-w-measure text-sm leading-relaxed text-muted">{raid.accroche}</p>

        {/* Grille de spécifications — même structure pour tous les raids */}
        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-4">
          <Spec label="Durée" value={raid.duree} />
          <Spec label="Région" value={raid.region} />
          <Spec label="Terrain" value={raid.terrain} />
          <Spec label="Niveau" value={raid.difficulte} />
        </dl>

        <div className="mt-7 flex items-end justify-between gap-4 border-t border-line pt-6">
          <div>
            <dt className="font-display text-micro uppercase text-muted">À partir de</dt>
            <dd className="mt-1 font-display text-xl">
              {raid.prixAPartirDe === null ? (
                <Placeholder label={`Tarif — ${raid.nomSource}`}>Sur devis</Placeholder>
              ) : (
                `${raid.prixAPartirDe} €`
              )}
            </dd>
          </div>
          <span className="font-display text-eyebrow uppercase text-sand">
            <span className="link-underline">Découvrir</span>
            <span aria-hidden className="ml-2 inline-block transition-transform duration-fast group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-display text-micro uppercase text-muted">{label}</dt>
      <dd className="mt-1.5 text-sm text-bone">{value}</dd>
    </div>
  )
}
