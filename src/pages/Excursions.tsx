import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { site } from '@/data/site'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'


export default function Excursions() {
  return (
    <>
      <Seo seo={SEO.excursions} />
      <PageHero
        eyebrow="Excursions 4×4"
        h1="3 excursions 4×4 à Marrakech"
        image="/media/excursion-journee.jpg"
        imageAlt="Excursion 4x4 à la journée au départ de Marrakech"
      />

      <Section>
        <div className="container">
          <h2 className="reveal max-w-[28ch] text-display-md">
            « 4×4-raid » vous propose, au choix, 3 excursions 4×4 à Marrakech.
          </h2>
          <Prose className="reveal mt-10">
            <p>
              Des circuits originaux, sur pistes et hors-pistes, en mode tout terrain.
              L'art et la manière <strong>du plaisir de voyager et du plaisir de découvrir.</strong>
            </p>
            <p>
              Par des serpentins de pistes oubliées dans l'authenticité berbère, vous serez à bord
              du 4×4 piloté par Jean-Luc, qui aime partager sa passion et vous fera vivre une vraie
              aventure durant cette journée, hors des sentiers battus et du tourisme de masse. Un
              itinéraire vous attend avec des moments uniques et des endroits aux vues imprenables.
            </p>
            <p><em>Mais on ne va pas tout vous dire, pour que vous puissiez découvrir&nbsp;!</em></p>
            <p>
              Pour ces 3 excursions 4×4 à Marrakech s'applique un tarif unique pour chacun de ces
              circuits, avec un forfait qui comprend également le pique-nique (déjeuner). Que vous
              soyez une, deux ou trois personnes — et même quatre à condition d'accepter d'être
              trois sur la banquette arrière.
            </p>
            <p>Possibilité pour plus de 4 personnes : merci de nous contacter.</p>
          </Prose>

          <div className="reveal mt-12">
            <Link to="/contact/" className="inline-flex h-14 items-center rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone">
              Demandez votre offre personnalisée
            </Link>
          </div>
        </div>
      </Section>

      <CrossLinks exclude={[SEO.excursions.path]} />
    </>
  )
}
