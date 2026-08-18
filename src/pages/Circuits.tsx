import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'


export default function Circuits() {
  return (
    <>
      <Seo seo={SEO.circuits} />
      <PageHero
        eyebrow="Circuits raid 4×4"
        h1="Circuits raid 4×4 au Maroc"
        image="/media/hero-piste-coucher-soleil.jpg"
        imageAlt="Raid 4×4 au Maroc sur mesure, véhicule sur piste au coucher du soleil"
      />

      <Section>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <p className="eyebrow reveal lg:col-span-4 lg:sticky lg:top-32 lg:h-fit">Sud Maroc</p>
            <div className="lg:col-span-8">
              <Prose className="reveal">
                <p>
                  Découvrez nos circuits raid 4×4 au Maroc. En direct ou en boucle, nous
                  organisons vos raids 4×4 au Maroc sur mesure au départ de Marrakech.
                  Notre répertoire de circuits au Sud Maroc compte une multitude d'étapes
                  modulables (journée ou ½ journée). Ceci vous permet de choisir et tracer
                  l'itinéraire et le circuit en fonction du nombre de jours dont vous
                  disposez et du rythme de raid que vous désirez, tout en tenant compte
                  des saisons.
                </p>
                <p>
                  Nous vous proposons des circuits, directs ou en boucle. Nous sommes à
                  travers le Maroc, au centre de traditions millénaires, au milieu de
                  contrées désertiques, de dunes, de canyons, des différentes chaînes de
                  l'Atlas, d'océans de sable ainsi que d'oasis. Des couleurs qui font
                  chanter les paysages, des nuits étoilées, des côtes de l'Atlantique, des
                  rencontres, de diverses gastronomies, des bivouacs, avec des sensations
                  fortes ainsi que des émotions que vous n'oublierez jamais.
                </p>
              </Prose>

              <h2 className="reveal mt-14 max-w-[30ch] text-display-md">
                <Link to="/contact/" className="text-sand underline decoration-sand/40 underline-offset-4 hover:decoration-sand">
                  Contactez-nous
                </Link>{' '}
                et nous composons votre raid 4×4 au Maroc sur mesure.
              </h2>
            </div>
          </div>
        </div>
      </Section>

      <CrossLinks exclude={[SEO.circuits.path]} title="Nos familles de raids" />
    </>
  )
}
