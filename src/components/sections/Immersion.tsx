import { media } from '@/data/medias'
import { useParallax } from '@/hooks/useParallax'
import { Reveal } from '@/components/ui/Primitives'

/**
 * ─── 05 · IMMERSION ───────────────────────────────────────────
 * Rupture plein écran. Un seul chiffre, une seule phrase.
 * Parallax léger (60 px max) désactivé sous 768 px.
 */
export function Immersion() {
  const bg = useParallax<HTMLDivElement>(70)

  return (
    <section className="grain relative flex min-h-[85svh] items-center overflow-hidden">
      <div ref={bg} className="absolute -inset-y-24 inset-x-0">
        <img
          src={media.dunes.src}
          alt={media.dunes.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
      </div>

      <div className="container relative z-10 py-section">
        <Reveal>
          <p className="eyebrow">Jour 04 — Journée de sable</p>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-10 font-display text-[clamp(4rem,17vw,15rem)] font-bold leading-[0.82] tracking-tighter">
            50<span className="text-sand">km</span>
          </p>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 max-w-measure text-lead text-bone/90">
            Cinquante kilomètres de franchissement de dunes en une seule journée.
            Pas une trace de piste. Pas un panneau. Le soir, bivouac au cœur des
            dunes de Merzouga.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 font-display text-micro uppercase text-muted">
            Boucle Sud — 7 jours · plus de 1 500 km
          </p>
        </Reveal>
      </div>
    </section>
  )
}
