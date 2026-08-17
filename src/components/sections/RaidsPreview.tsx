import { raids } from '@/data/raids'
import { RaidCard } from '@/components/ui/RaidCard'
import { Button } from '@/components/ui/Button'
import { Reveal, Section } from '@/components/ui/Primitives'

/**
 * ─── 04 · LES RAIDS ───────────────────────────────────────────
 * Les trois circuits réellement détaillés sur le site actuel,
 * dans l'ordre d'engagement croissant : 1 jour → 2 jours → 7 jours.
 */
export function RaidsPreview() {
  const mis = raids.slice(0, 3)

  return (
    <Section id="raids">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Les raids</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 max-w-[16ch] text-display-lg">
                Du premier col
                <br />
                <span className="text-muted">aux dunes de Merzouga</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Button to="/raids" variant="ghost">Tous les raids</Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-8">
          {mis.map((raid, i) => (
            <Reveal key={raid.slug} delay={i * 90} className={i === 2 ? 'md:col-span-2' : undefined}>
              <RaidCard raid={raid} index={i} large={i === 2} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 max-w-measure text-sm text-muted">
            Chaque itinéraire est modulable&nbsp;: le répertoire d'étapes se combine
            selon le nombre de jours dont vous disposez, le rythme souhaité et la saison.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
