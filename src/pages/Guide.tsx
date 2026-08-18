import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'


const PHILOSOPHIE = [
  { t: 'Professionnalisme', d: "Parce que vous méritez mieux qu'un prix, nous analysons les prestations que vous souhaitez. 4×4-raid.com by Africamiol vous propose ensuite une prestation totalement personnalisée, adaptée à votre niveau et à vos exigences." },
  { t: 'Sens du service', d: "Notre équipe est disponible tous les jours et s'engage à vous recontacter dans les 36 heures pour répondre à vos questions." },
  { t: "Esprit d'innovation", d: "Parce que l'aventure ne se vit pas dans des guides, 4×4-raid.com by Africamiol s'engage à vous faire découvrir des parcours inédits et des paysages fabuleux." },
]

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jean-Luc Miolane',
  alternateName: 'Le Renard du Désert',
  jobTitle: 'Guide et organisateur de raids 4x4',
  worksFor: { '@type': 'TravelAgency', name: '4x4-raid', url: 'https://4x4-raid.com' },
  address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' },
}

export default function Guide() {
  return (
    <>
      <Seo seo={SEO.guide} jsonLd={personLd} />
      <PageHero
        eyebrow="Votre guide"
        h1="Guide raids 4×4 au Maroc"
        image="/media/guide-jean-luc.jpg"
        imageAlt="Jean-Luc Miolane, guide de raids 4x4 au Maroc, au volant sur piste"
      />

      <Section>
        <div className="container">
          <h2 className="reveal text-display-md">Jean-Luc Miolane — le Renard du Désert</h2>
          <Prose className="reveal mt-10">
            <p>
              C'est <strong>Jean-Luc Miolane</strong> qui sera votre guide pour votre raid 4×4 à
              travers le Maroc. <strong>Plus de 45 ans d'expérience des raids et du sable.</strong>
            </p>
            <p>
              Pour vous faire partager et savourer intensément l'aventure. Installé aujourd'hui près
              de Marrakech, il organise et guide des raids 4×4. Son but : donner l'accès aux raids
              4×4 à tous ceux qui rêvent de rouler sur les traces du Dakar, de traverser les
              différents Atlas, de connaître le désert de sable et d'en franchir les dunes —
              c'est-à-dire en toute sécurité, faire partager notre riche expérience du terrain et de
              ce pays, avec toutes ses émotions, en appréciant la beauté du patrimoine naturel. En
              sa compagnie, vous découvrirez les plus belles pistes du Maroc, mais aussi du Sud Sahara.
            </p>
            <p>
              Soucieux de pouvoir vous préparer les plus belles expéditions, Jean-Luc s'installe au
              Maroc depuis 25 ans pour disposer, en vivant sur place, de la meilleure logistique, de
              son équipe d'organisation qu'il a formée, ainsi que d'un important répertoire d'étapes
              mis à jour par des repérages permanents. Présent sur toutes les opérations, par son
              expérience et ses connaissances incomparables du territoire, des pistes et des
              hors-pistes, vous apprécierez le professionnel mais aussi le personnage convivial, prêt
              à répondre à la moindre de vos envies. Exigence, sécurité et bonne humeur sont ses
              maîtres-mots. Il saura vous guider et transformer votre raid en souvenir inoubliable&nbsp;!
            </p>
          </Prose>

          <h2 className="reveal mt-16 text-display-sm">Notre philosophie</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
            {PHILOSOPHIE.map((p, i) => (
              <div key={p.t} className="reveal h-full bg-surface p-8" style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}>
                <p className="font-display text-micro uppercase text-sand">0{i + 1}</p>
                <h3 className="mt-4 text-display-sm">{p.t}</h3>
                <p className="mt-4 leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-12 flex flex-wrap gap-3">
            <Link to="/contact/" className="inline-flex h-14 items-center rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone">
              Demandez votre offre personnalisée
            </Link>
            <Link to="/temoignages/" className="inline-flex h-14 items-center rounded-pill border border-line-strong px-9 font-display text-eyebrow uppercase transition-colors duration-200 hover:border-sand hover:text-sand">
              Lire les témoignages
            </Link>
          </div>
        </div>
      </Section>

      <CrossLinks />
    </>
  )
}
