import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'


export default function SurMesure() {
  return (
    <>
      <Seo seo={SEO.surMesure} />
      <PageHero
        eyebrow="Raid 4×4"
        h1="Raid 4×4 sur mesure"
        image="/media/sur-mesure-piste-sable.jpg"
        imageAlt="Raid 4x4 sur mesure au Maroc, véhicule sur piste sablonneuse"
      />

      <Section>
        <div className="container">
          <h2 className="reveal max-w-[24ch] text-display-md">
            Vous en avez rêvé d'un raid 4×4 sur mesure&nbsp;?
          </h2>
          <Prose className="reveal mt-10">
            <p>
              Vous connaissez déjà une partie du Maroc et vous souhaitez en découvrir
              davantage, le voir différemment, hors des sentiers battus, car il ne vous
              a pas tout dévoilé&nbsp;?
            </p>
            <p>
              Fan de sable, vous rêvez de parcourir les dunes inaccessibles sans
              connaissance et de faire du hors-piste en 4×4, moto ou SSV, ou aimeriez
              venir avec votre véhicule et avez juste besoin d'un guide et d'un véhicule
              d'accompagnement&nbsp;? Jean-Luc vous compose votre raid sur mesure selon
              vos envies et vos besoins.
            </p>
            <p>
              Il est possible de suivre les pistes mythiques du Dakar ou d'autres
              rallye-raids qui ont eu lieu dans le décor de rêve qu'offre le Maroc.
            </p>
            <p>Parlez-nous de vos souhaits, de vos attentes, nous ferons le reste.</p>
            <p>
              Parce que nous connaissons parfaitement les recoins de ce merveilleux
              pays, nous sommes là pour vous écouter, vous conseiller et concevoir avec
              vous le circuit et le tracé de votre raid de rêve.
            </p>
            <p>
              Nous nous adaptons et nous chargeons de l'organisation de votre raid. Nous
              adapterons ensemble la formule de votre convenance, en privilégiant
              sécurité et qualité. Le but est que vous n'ayez pour seul souci que celui
              de vous amuser. Vous n'aurez que du plaisir dans votre aventure&nbsp;!
            </p>
            <p>
              <strong>
                Découvrez nos{' '}
                <Link to="/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/">circuits</Link>{' '}
                comme inspiration pour votre raid 4×4 sur mesure.
              </strong>
            </p>
          </Prose>

          <h2 className="reveal mt-14 text-display-sm">
            <Link to="/contact/" className="text-sand underline decoration-sand/40 underline-offset-4 hover:decoration-sand">
              Contactez-nous
            </Link>{' '}
            et osez vivre votre passion.
          </h2>
        </div>
      </Section>

      <CrossLinks exclude={[SEO.surMesure.path]} />
    </>
  )
}
