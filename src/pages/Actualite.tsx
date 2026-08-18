import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { site } from '@/data/site'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'


/**
 * Page conservée (décision client) avec un contenu propre minimal.
 * L'originale ne portait qu'un bouton Facebook dont les liens pointaient
 * vers « # » — du contenu mince pénalisant. À alimenter dès que des
 * récits réels existent.
 */
export default function Actualite() {
  return (
    <>
      <Seo seo={SEO.actualite} />
      <PageHero eyebrow="Informations" h1="Actualité" />

      <Section>
        <div className="container">
          <Prose className="reveal">
            <p>
              Retrouvez ici les actualités de 4×4-raid : nouveaux parcours ouverts après repérage,
              récits de raids et de bivouacs, moments forts de nos expéditions au départ de
              Marrakech, Agadir et Ouarzazate.
            </p>
            <p>
              En attendant nos prochaines publications, suivez nos aventures au jour le jour sur
              notre page{' '}
              <a href={site.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>, ou
              explorez nos{' '}
              <Link to="/circuits-raid-4x4-au-maroc/">circuits raid 4×4 au Maroc</Link> et nos{' '}
              <Link to="/photos-raids-4x4-maroc/">photos</Link>.
            </p>
          </Prose>

          {/* ⚠️ À FOURNIR : premiers récits de raids. */}
          <div className="reveal mt-12 rounded-card border border-dashed border-line p-8">
            <p className="font-display text-micro uppercase text-sand">À venir</p>
            <p className="mt-3 max-w-measure text-sm leading-relaxed text-muted">
              Cette page accueillera prochainement les récits de nos raids. Pour être informé de
              leur parution, contactez-nous ou suivez-nous sur Facebook.
            </p>
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
