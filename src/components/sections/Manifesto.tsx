import { terrainWords } from '@/data/site'
import { Reveal, Section } from '@/components/ui/Primitives'

/**
 * ─── 02 · MANIFESTO ───────────────────────────────────────────
 * Court. Une seule idée : ce n'est pas un circuit, c'est une
 * expédition. Le bandeau défilant est composé exclusivement de
 * termes de terrain réellement employés par 4x4-raid.
 */
export function Manifesto() {
  return (
    <Section className="overflow-hidden">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Manifeste</p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-8 max-w-[18ch] text-display-lg">
            Ce n'est pas un circuit.
            <br />
            <span className="text-muted">C'est une expédition.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-20">
          <Reveal delay={160}>
            <p className="max-w-measure text-lead leading-relaxed">
              Un circuit vous transporte. Une expédition vous engage. Ici, vous ne suivez
              pas un autocar&nbsp;: vous tenez le volant, vous lisez le road-book, vous
              choisissez la trajectoire dans la dune.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="max-w-measure leading-relaxed text-muted">
              L'itinéraire n'est pas sorti d'un catalogue. Il est composé avec vous, à partir
              d'un répertoire d'étapes tenu à jour par des repérages permanents — parce que
              les pistes changent, et que celui qui vous guide vit sur place.
              <br />
              <br />
              Vous serez l'auteur et l'acteur d'une vraie aventure, dont vous aurez
              construit l'itinéraire.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bandeau de terrain — deux copies pour une boucle continue */}
      <div className="fade-x mt-20 flex select-none overflow-hidden border-y border-line py-6" aria-hidden>
        <div className="flex shrink-0 animate-sand-drift">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {terrainWords.map((w) => (
                <span
                  key={`${copy}-${w}`}
                  className="flex shrink-0 items-center gap-8 whitespace-nowrap px-8 font-display text-display-sm uppercase text-bone/25"
                >
                  {w}
                  <span className="h-1 w-1 rounded-pill bg-sand" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
