import { galerie } from '@/data/medias'
import { Figure, Reveal, Section } from '@/components/ui/Primitives'
import { cn } from '@/lib/utils'

/**
 * ─── 10 · GALERIE ─────────────────────────────────────────────
 * Grille éditoriale asymétrique — pas une planche contact.
 * Les formats varient volontairement pour créer du rythme.
 * Toutes les images sont lazy : la galerie est en bas de page.
 */

// Rythme de la grille : plein / demi / demi / plein-hauteur…
const spans = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-4',
  'md:col-span-8 md:row-span-2',
  'md:col-span-4',
  'md:col-span-5',
  'md:col-span-7',
  'md:col-span-12',
]

export function Galerie() {
  return (
    <Section id="galerie">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Galerie</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 max-w-[16ch] text-display-lg">Ce que vous ramènerez</h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="max-w-measure-tight text-sm text-muted">
              Photographies prises pendant les raids. Aucune image d'illustration,
              aucune banque d'images.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          {galerie.map((m, i) => (
            <Reveal
              key={m.src}
              as="scale"
              delay={(i % 3) * 80}
              className={cn('overflow-hidden rounded-card', spans[i] ?? 'md:col-span-4')}
            >
              <figure className="group relative h-full">
                <img
                  src={m.src}
                  alt={m.alt}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full w-full min-h-[200px] object-cover transition-transform duration-slow ease-raid group-hover:scale-[1.05]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/90 to-transparent p-5 font-display text-micro uppercase text-bone/0 transition-all duration-base ease-raid group-hover:translate-y-0 group-hover:text-bone/80">
                  {m.alt}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
