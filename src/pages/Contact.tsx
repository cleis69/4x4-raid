import { useState } from 'react'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { site } from '@/data/site'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'

/**
 * PAGE CONTACT — la plus récemment mise à jour du site (2025).
 * Texte verbatim + NAP strictement identique au footer et au JSON-LD.
 * Le site d'origine n'avait aucun formulaire : en ajouter un est un gain.
 *
 * ⚠️ Le formulaire n'envoie rien tant que l'endpoint n'est pas branché.
 */
const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: '4x4-raid',
  email: site.email,
  telephone: '+212661085550',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Douar Sugtana / Agafay — BP 21042 AZLI',
    postalCode: '40019',
    addressLocality: 'Marrakech',
    addressCountry: 'MA',
  },
  areaServed: { '@type': 'Country', name: 'Maroc' },
}

const FIELD =
  'mt-2 h-12 w-full rounded border border-line bg-transparent px-4 text-bone transition-colors duration-200 focus:border-sand focus:outline-none'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ⚠️ À BRANCHER : Formspree, Basin, ou fonction serverless.
    setSent(true)
  }

  return (
    <>
      <Seo seo={SEO.contact} jsonLd={localBusinessLd} />
      <PageHero eyebrow="Contact" h1="Contactez-nous" />

      <Section>
        <div className="container grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <div>
            <Prose className="reveal">
              <p>
                Installés au Maroc depuis plus de 25 ans et étant sur place, nous avons
                les meilleurs ingrédients pour les plus belles aventures, parmi cet
                univers d'Atlas, de déserts, canyons, pistes, hors-pistes, oueds,
                oasis, sable, dunes, pistes côtières, plages, bivouacs, bonnes
                adresses, etc.
              </p>
              <p>
                D'un simple accompagnement avec votre propre 4×4, SSV, moto ou buggy,
                jusqu'à la réalisation avec tout compris, on vous construira votre raid
                4×4 sur mesure dans l'esprit de vos souhaits.
              </p>
              <p>
                <strong>Jean-Luc Miolane</strong>
              </p>
            </Prose>

            {sent ? (
              <div className="reveal mt-12 rounded-card border border-sand/40 bg-sand/[0.05] p-8">
                <p className="font-display text-display-sm text-sand">Demande enregistrée</p>
                <p className="mt-4 max-w-measure text-muted">
                  Jean-Luc revient vers vous sous {site.responseTime}. En attendant, si
                  c'est urgent&nbsp;: {site.phoneDisplay}.
                </p>
                <p className="mt-6 text-xs text-muted">
                  ⚠️ Aucun message n'a réellement été envoyé — l'endpoint du formulaire
                  reste à brancher.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="reveal mt-12 grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="font-display text-micro uppercase text-muted">
                    Nom et prénom <span className="text-sand">*</span>
                  </span>
                  <input type="text" name="nom" required autoComplete="name" className={FIELD} />
                </label>
                <label className="block">
                  <span className="font-display text-micro uppercase text-muted">
                    E-mail <span className="text-sand">*</span>
                  </span>
                  <input type="email" name="email" required autoComplete="email" className={FIELD} />
                </label>
                <label className="block">
                  <span className="font-display text-micro uppercase text-muted">Téléphone</span>
                  <input type="tel" name="telephone" autoComplete="tel" className={FIELD} />
                </label>
                <label className="block">
                  <span className="font-display text-micro uppercase text-muted">Période souhaitée</span>
                  <input type="text" name="periode" placeholder="Ex. mars 2027" className={FIELD} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="font-display text-micro uppercase text-muted">Votre projet de raid</span>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Les dunes, l'Atlas, les pistes du Dakar, un bivouac, un raid entreprise…"
                    className="mt-2 w-full resize-y rounded border border-line bg-transparent px-4 py-3 text-bone transition-colors duration-200 placeholder:text-muted/60 focus:border-sand focus:outline-none"
                  />
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex h-14 items-center rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone"
                  >
                    Envoyer ma demande
                  </button>
                  <p className="mt-4 text-xs text-muted">
                    Réponse sous {site.responseTime}. Vos données servent uniquement à
                    traiter votre demande.
                  </p>
                </div>
              </form>
            )}
          </div>

          <aside className="reveal lg:sticky lg:top-32 lg:h-fit">
            <div className="rounded-card border border-line bg-surface p-8">
              <p className="font-display text-micro uppercase text-sand">
                Réponse sous {site.responseTime}
              </p>
              <div className="mt-8 space-y-5 border-t border-line pt-6 text-sm">
                <div>
                  <p className="font-display text-micro uppercase text-muted">E-mail</p>
                  <a href={`mailto:${site.email}`} className="link-underline mt-1.5 block text-bone">
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="font-display text-micro uppercase text-muted">Téléphone</p>
                  <a href={`tel:${site.phoneHref}`} className="link-underline mt-1.5 block text-bone">
                    {site.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="font-display text-micro uppercase text-muted">Adresse</p>
                  <address className="mt-1.5 not-italic leading-relaxed text-bone/85">
                    {site.address.org}
                    <br />
                    {site.address.line}
                    <br />
                    {site.address.box}
                    <br />
                    {site.address.city} — {site.address.country}
                  </address>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
