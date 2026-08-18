import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { site } from '@/data/site'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'


/**
 * ⚠️ Vérifier que les 5 domaines sont encore actifs et disponibles en
 * https. rel="noopener" ajouté ; envisager "nofollow" si l'échange de
 * liens n'est pas contractuel.
 */
const PARTENAIRES = [
  { nom: 'Prestige Voyages', url: 'https://www.prestige-voyages.com', d: "Spécialiste du voyage de luxe : hôtels de charme, yacht et jet privé. Prestige Voyages est un créateur de voyages sur mesure et d'exception." },
  { nom: 'Mauritiusveo', url: 'https://voyage.mauritiusveo.com', d: "Mauritiusveo organise votre séjour à l'Île Maurice pour des vacances d'exception et une expérience de voyage unique." },
  { nom: 'USAVeo', url: 'https://voyage.usaveo.com', d: "USAVeo organise votre séjour aux États-Unis — New York, Miami — pour des vacances d'exception et une expérience de voyage unique." },
  { nom: 'ChinaVeo', url: 'https://voyage.chinaveo.com', d: "ChinaVeo organise votre séjour en Chine — Pékin, Xi'an, Shanghai, Hong Kong — pour une expérience de voyage unique." },
  { nom: 'SeychellesVeo', url: 'https://voyage.seychellesveo.com', d: "SeychellesVeo organise votre séjour aux Seychelles pour des vacances d'exception et une expérience de voyage unique." },
]

export default function Partenaires() {
  return (
    <>
      <Seo seo={SEO.partenaires} />
      <PageHero eyebrow="Partenaires" h1="Nos partenaires" />

      <Section>
        <div className="container">
          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
            {PARTENAIRES.map((p) => (
              <div key={p.nom} className="reveal h-full bg-surface p-8">
                <h2 className="text-display-sm">{p.nom}</h2>
                <p className="mt-4 leading-relaxed text-muted">{p.d}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-5 inline-block font-display text-eyebrow uppercase text-sand"
                >
                  Visiter le site <span aria-hidden>↗</span>
                </a>
              </div>
            ))}
          </div>

          <div className="reveal mt-12">
            <Link to="/contact/" className="inline-flex h-14 items-center rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone">
              Demandez votre offre personnalisée
            </Link>
          </div>
        </div>
      </Section>

      <CrossLinks />
    </>
  )
}
