import { process } from '@/data/contenu'
import { Reveal, Section } from '@/components/ui/Primitives'

/**
 * ─── 08 · COMMENT ÇA MARCHE ───────────────────────────────────
 * Section de réassurance : elle lève l'objection « c'est
 * compliqué / c'est loin / je ne sais pas conduire ».
 * Cinq étapes, numérotées, sans illustration — le texte suffit.
 */
export function Process() {
  return (
    <Section>
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal>
              <p className="eyebrow">Comment ça marche</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 text-display-lg">
                Cinq étapes.
                <br />
                <span className="text-muted">Pas une de plus.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-8 max-w-measure-tight text-muted">
                Aucune plateforme de réservation automatique, aucun paiement à l'aveugle.
                Un raid se construit par la conversation — c'est plus lent qu'un clic,
                et c'est exactement pour ça que ça marche.
              </p>
            </Reveal>
          </div>

          <ol className="border-t border-line">
            {process.map((step, i) => (
              <Reveal key={step.index} delay={i * 70}>
                <li className="group grid grid-cols-[auto_1fr] gap-6 border-b border-line py-9 md:gap-10">
                  <span className="font-display text-display-sm leading-none text-muted transition-colors duration-base group-hover:text-sand">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="text-display-sm">{step.titre}</h3>
                    <p className="mt-3 max-w-measure text-muted">{step.texte}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
