import { faq } from '@/data/contenu'
import { site } from '@/data/site'
import { Accordion } from '@/components/ui/Accordion'
import { Placeholder, Reveal, Section } from '@/components/ui/Primitives'
import { Button } from '@/components/ui/Button'

/**
 * ─── 11 · FAQ ─────────────────────────────────────────────────
 * Deux questions n'ont pas de réponse publiée (tarifs, saison).
 * On les conserve — elles sont réellement posées par les visiteurs —
 * mais la réponse est un <Placeholder>, jamais une invention.
 */
export function Faq() {
  const items = faq.map((f) => ({
    q: f.q,
    r:
      f.r === 'PLACEHOLDER_TARIFS' ? (
        <Placeholder label="Grille tarifaire — aucun prix n'est publié sur le site actuel">
          Chaque raid étant composé sur mesure, le tarif dépend de la durée, du nombre de
          participants, du véhicule et du niveau de prestation. Un devis détaillé vous est
          adressé sous {site.responseTime} après votre demande.
        </Placeholder>
      ) : f.r === 'PLACEHOLDER_SAISON' ? (
        <Placeholder label="Fenêtres saisonnières praticables par région">
          Les itinéraires sont adaptés en fonction des saisons. Les fenêtres recommandées
          par région vous sont indiquées lors de la composition de votre raid.
        </Placeholder>
      ) : (
        f.r
      ),
  }))

  return (
    <Section id="faq" tone="surface">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal>
              <p className="eyebrow">Questions</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 text-display-lg">Avant de partir</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-8 max-w-measure-tight text-muted">
                Une question qui n'est pas là&nbsp;? L'équipe est disponible tous les jours
                et répond sous {site.responseTime}.
              </p>
              <div className="mt-8">
                <Button href={`mailto:${site.contact.email}`} variant="ghost">Poser ma question</Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <Accordion items={items} />
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/**
 * Données structurées FAQ — améliore l'éligibilité aux rich results.
 * Les deux réponses en attente sont exclues du balisage : on ne
 * publie pas une réponse incomplète dans un schéma Google.
 */
export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq
    .filter((f) => !f.r.startsWith('PLACEHOLDER_'))
    .map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
}
