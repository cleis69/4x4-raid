import { media } from '@/data/medias'
import { site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Primitives'

/**
 * ─── 12 · CTA FINAL ───────────────────────────────────────────
 * Le dernier écran avant le footer. Typographie maximale,
 * une seule action primaire, un contact direct en secours.
 */
export function FinalCta() {
  return (
    <section className="grain relative overflow-hidden border-t border-line">
      <div className="absolute inset-0">
        <img
          src={media.decouvrir.src}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/75 to-ink" />
      </div>

      <div className="container relative z-10 py-section text-center">
        <Reveal>
          <p className="eyebrow justify-center">Prochaine étape</p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mx-auto mt-10 max-w-[13ch] text-display-xl">
            Votre raid
            <br />
            <span className="text-sand">commence ici.</span>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p className="mx-auto mt-10 max-w-measure text-lead text-muted">
            Dites-nous ce que vous cherchez à vivre. Jean-Luc revient vers vous
            sous {site.responseTime} avec un tracé et un devis.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button to="/contact" size="lg">Planifier mon raid</Button>
            <Button href={`tel:${site.contact.phoneHref}`} variant="ghost" size="lg">
              {site.contact.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
