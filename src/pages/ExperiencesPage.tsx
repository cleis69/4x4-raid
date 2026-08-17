import { useSeo } from '@/lib/seo'
import { experiences } from '@/data/contenu'
import { media } from '@/data/medias'
import { terrainWords } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { Figure, Reveal, Section } from '@/components/ui/Primitives'

/**
 * PAGE EXPÉRIENCES
 *
 * Cette page ne parle pas de lieux. Elle parle de sensations.
 * Traitement typographique volontairement radical : une sensation
 * par ligne, en très grand, sur une image plein cadre.
 * C'est la page la plus « film » du site — elle vend l'envie, pas l'offre.
 */
export default function ExperiencesPage() {
  useSeo({
    title: 'Expériences — Le sable, le volant, le bivouac | 4x4-raid',
    description:
      "Ce que l'on ressent sur un raid 4x4 au Maroc : le franchissement de dunes, la conduite tout-terrain, le bivouac dans le désert, la rencontre berbère.",
    path: '/experiences',
    image: media.dunes.src,
  })

  return (
    <>
      <header className="border-b border-line pb-14 pt-[calc(var(--header-h)+5rem)]">
        <div className="container">
          <p className="eyebrow">Expériences</p>
          <h1 className="mt-8 max-w-[13ch] text-display-lg">
            Ce que vous allez
            <br />
            <span className="text-muted">ressentir</span>
          </h1>
          <p className="mt-8 max-w-measure text-lead text-muted">
            On peut décrire un itinéraire en kilomètres. On ne peut pas décrire
            en kilomètres ce qu'il vous fait. Cette page essaie quand même.
          </p>
        </div>
      </header>

      {/* Une expérience = un écran */}
      {experiences.map((exp, i) => (
        <section key={exp.id} className="grain relative border-b border-line">
          <div className="grid lg:grid-cols-2">
            {/* Média — pleine hauteur, alterné */}
            <Reveal
              as="scale"
              className={`relative min-h-[52svh] overflow-hidden lg:min-h-[86svh] ${
                i % 2 === 1 ? 'lg:order-2' : ''
              }`}
            >
              <img
                src={exp.image.src}
                alt={exp.image.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:bg-gradient-to-r" />
            </Reveal>

            {/* Texte */}
            <div className={`flex items-center py-section-sm ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="container lg:max-w-none lg:px-16">
                <Reveal>
                  <p className="font-display text-micro uppercase text-sand">
                    {String(i + 1).padStart(2, '0')} — {exp.titre}
                  </p>
                </Reveal>

                {/* Le bloc de sensations : une par ligne, très grand */}
                <div className="mt-8">
                  {exp.sensations.map((s, j) => (
                    <Reveal key={s} as="mask" delay={j * 110}>
                      <p className="font-display text-display-md leading-[1.02]">{s}</p>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-10 max-w-measure space-y-5">
                  {exp.recit.map((p, j) => (
                    <Reveal key={j} delay={j * 80}>
                      <p className="leading-relaxed text-muted">{p}</p>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={120}>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {exp.mots.map((m) => (
                      <li key={m} className="rounded-pill border border-line px-3 py-1.5 font-display text-micro uppercase text-muted">
                        {m}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Bandeau de terrain */}
      <div className="fade-x flex select-none overflow-hidden border-b border-line py-6" aria-hidden>
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

      <Section className="!py-section-sm">
        <div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-[16ch] text-display-lg">
              Le reste
              <br />
              <span className="text-muted">ne s'écrit pas.</span>
            </h2>
            <p className="mt-6 max-w-measure text-muted">
              Il se conduit. Choisissez un itinéraire, ou dites-nous simplement
              ce que vous cherchez à vivre.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/raids" size="lg">Explorer les raids</Button>
            <Button to="/contact" variant="ghost" size="lg">Créer mon aventure</Button>
          </div>
        </div>
      </Section>

      {/* Rappel visuel discret */}
      <div className="border-t border-line">
        <Figure media={media.paysage} className="max-h-[42svh]" sizes="100vw" imgClassName="opacity-60" />
      </div>
    </>
  )
}
