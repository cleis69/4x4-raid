import { Link } from 'react-router-dom'
import { useSeo } from '@/lib/seo'
import { territoires } from '@/data/contenu'
import { media } from '@/data/medias'
import { site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { Figure, Reveal, Section } from '@/components/ui/Primitives'

/**
 * PAGE DESTINATIONS
 *
 * Traitement éditorial, pas catalogue. Chaque territoire est une
 * histoire, pas une fiche produit.
 *
 * ⚠️ Aucun territoire inventé. Les cinq présentés sont ceux réellement
 * traversés d'après les itinéraires publiés sur 4x4-raid.com.
 * Les destinations évoquées par le brief mais absentes du site
 * (Erg Chebbi notamment) n'ont pas été ajoutées.
 */
export default function Destinations() {
  useSeo({
    title: 'Destinations — Atlas, Sahara, Merzouga, Côte Atlantique | 4x4-raid',
    description:
      "Les territoires traversés par les raids 4x4 de 4x4-raid : Haut-Atlas, Sahara et dunes de Merzouga, pistes du Dakar, route des mille Kasbah, côte Atlantique.",
    path: '/destinations',
    image: media.decouvrir.src,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Territoires traversés au Maroc',
      itemListElement: territoires.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.nom,
        url: `${site.url}/destinations/${t.id}`,
      })),
    },
  })

  return (
    <>
      <header className="border-b border-line pb-14 pt-[calc(var(--header-h)+5rem)]">
        <div className="container">
          <p className="eyebrow">Destinations</p>
          <h1 className="mt-8 max-w-[13ch] text-display-lg">
            Cinq territoires,
            <br />
            <span className="text-muted">une seule traversée</span>
          </h1>
          <p className="mt-8 max-w-measure text-lead text-muted">
            Méditerranée, Atlantique, Sahara, Rif et Atlas — dont le sommet culmine à
            4 168 mètres. Peu de pays offrent une telle amplitude sur une seule boucle.
          </p>
        </div>
      </header>

      {/* Liste éditoriale — alternance gauche / droite */}
      <Section className="!pt-0">
        <div className="space-y-0">
          {territoires.map((t, i) => {
            const reversed = i % 2 === 1
            return (
              <article key={t.id} className="border-b border-line py-section-sm">
                <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-16">
                  <Reveal as="scale" className={reversed ? 'md:order-2' : undefined}>
                    <Link to={`/destinations/${t.id}`} className="group block overflow-hidden rounded-card">
                      <Figure
                        media={t.image}
                        className="transition-transform duration-slow ease-raid group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </Link>
                  </Reveal>

                  <Reveal delay={120} className={reversed ? 'md:order-1' : undefined}>
                    <div>
                      <p className="font-display text-micro uppercase text-sand">
                        {t.index} — {t.soustitre}
                      </p>
                      <h2 className="mt-5 text-display-md">
                        <Link to={`/destinations/${t.id}`} className="transition-colors duration-fast hover:text-sand">
                          {t.nom}
                        </Link>
                      </h2>
                      <p className="mt-6 max-w-measure leading-relaxed text-muted">{t.texte}</p>

                      <ul className="mt-7 flex flex-wrap gap-2">
                        {t.marqueurs.map((m) => (
                          <li key={m} className="rounded-pill border border-line px-3 py-1.5 font-display text-micro uppercase text-muted">
                            {m}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <Button to={`/destinations/${t.id}`} variant="line">
                          Explorer {t.nom.toLowerCase()}
                        </Button>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </article>
            )
          })}
        </div>
      </Section>

      <Section tone="surface" className="!py-section-sm">
        <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-[20ch] text-display-md">
            Ces territoires se combinent.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button to="/raids" size="lg">Voir les raids</Button>
            <Button to="/contact" variant="ghost" size="lg">Créer mon aventure</Button>
          </div>
        </div>
      </Section>
    </>
  )
}
