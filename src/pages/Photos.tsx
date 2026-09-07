import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { Picture } from '@/components/Picture'
import type { MediaKey } from '@/data/medias'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'

/**
 * ─────────────────────────────────────────────────────────────────
 *  GALERIE
 *
 *  Un seul H1 — le site d'origine en portait deux (« Souvenirs d'un
 *  raid avec » et « 4×4-raid » étaient tous deux balisés h1).
 *
 *  ── Ce qui change par rapport à l'ancienne galerie ────────────
 *
 *  L'ancienne page alignait huit vignettes sans ordre. Ici les
 *  photographies sont regroupées par terrain, chaque groupe portant
 *  son H2. Deux bénéfices, l'un pour le lecteur, l'autre pour le
 *  crawl : on parcourt une galerie structurée plutôt qu'un tas, et
 *  chaque image est indexée dans un contexte sémantique explicite
 *  (Google Images lit le texte qui entoure une photo).
 *
 *  Les huit photographies de la galerie d'origine sont toutes
 *  conservées — elles sont repérées ci-dessous. Les autres viennent
 *  de la même médiathèque et n'étaient pas publiées.
 * ─────────────────────────────────────────────────────────────────
 */

type Groupe = {
  titre: string
  intro: string
  photos: readonly (readonly [MediaKey, string])[] // [clé, classes de grille]
}

const GROUPES: readonly Groupe[] = [
  {
    titre: 'Sable, dunes et bivouacs',
    intro:
      'Merzouga, Chegaga, les ergs du Sud : le franchissement de dunes est le cœur de nos raids et la journée que personne n’oublie.',
    photos: [
      ['dunes-lever-soleil', 'md:col-span-7 md:row-span-2'],
      ['dunes-franchissement', 'md:col-span-5'], // galerie d'origine
      ['dune-descente', 'md:col-span-5'],
      ['dunes-ciel-bleu', 'md:col-span-4'], // galerie d'origine
      ['erg-dunes', 'md:col-span-8 md:row-span-2'],
      ['dune-marcheur', 'md:col-span-4'],
      ['bivouac-dunes-crepuscule', 'md:col-span-7'],
      ['erg-vue-plongeante', 'md:col-span-5'],
      ['empreinte-sable', 'md:col-span-12'],
    ],
  },
  {
    titre: 'Pistes, plateaux et hors-pistes',
    intro:
      'Hamada, plateaux caillouteux, pistes du Dakar : le terrain change tous les cent kilomètres, et le pilotage avec lui.',
    photos: [
      ['piste-coucher-soleil', 'md:col-span-7'], // galerie d'origine
      ['desert-etendue', 'md:col-span-5'], // galerie d'origine
      ['convoi-poussiere', 'md:col-span-5'], // galerie d'origine
      ['plateau-rocailleux', 'md:col-span-7'],
      ['piste-sable-parebrise', 'md:col-span-6'], // galerie d'origine
      ['acacias-contre-jour', 'md:col-span-6'],
      ['route-plateau', 'md:col-span-4'], // galerie d'origine
      ['dakar-vehicule', 'md:col-span-4 md:row-span-2'],
      ['route-hamada', 'md:col-span-4'],
    ],
  },
  {
    titre: 'Atlas, oueds et villages',
    intro:
      'Entre le Haut-Atlas et le désert, les pistes traversent gorges, oueds en eau, palmeraies et villages de terre.',
    photos: [
      ['oued-traversee', 'md:col-span-8'],
      ['gorge-village-atlas', 'md:col-span-4 md:row-span-2'],
      ['village-berbere-piste', 'md:col-span-8'],
      ['oued-vallee-verte', 'md:col-span-5'],
      ['ruelle-kasbah-convoi', 'md:col-span-3 md:row-span-2'],
      ['piste-montagne-retroviseur', 'md:col-span-4'],
      ['pause-piste-atlas', 'md:col-span-4'], // galerie d'origine
      ['oasis-palmeraie', 'md:col-span-5'],
    ],
  },
  {
    titre: 'Groupes, équipes et entreprises',
    intro:
      'Séminaires, team-building, raids entre amis : quatre participants par véhicule, un briefing par jour, un convoi qui reste groupé.',
    photos: [
      ['convoi-atlas-enneige', 'md:col-span-7'],
      ['equipe-briefing-plateau', 'md:col-span-5'],
      ['groupe-prairie-atlas', 'md:col-span-5'],
      ['montee-terre-rouge', 'md:col-span-7'],
      ['groupe-vehicules-atlas', 'md:col-span-12'],
    ],
  },
]

export default function Photos() {
  let rang = 0

  return (
    <>
      <Seo seo={SEO.photos} />
      <PageHero eyebrow="Galerie" h1="Photos raids 4×4 Maroc" media="dune-crete" />

      <Section>
        <div className="container">
          <Prose className="reveal mb-16">
            <p>
              Découvrez les photos de nos raids 4×4 au Maroc et inspirez-vous pour créer
              votre aventure sur mesure. Souvenirs d'un raid avec 4×4-raid : dunes de
              Merzouga et de Chegaga, pistes du Dakar, gorges de l'Atlas, oueds, oasis et
              bivouacs sous les étoiles.
            </p>
          </Prose>

          {GROUPES.map((g, gi) => (
            <section key={g.titre} className={gi > 0 ? 'mt-20 md:mt-28' : undefined}>
              <div className="reveal max-w-measure border-t border-line pt-8">
                <h2 className="text-display-sm">{g.titre}</h2>
                <p className="mt-4 leading-relaxed text-muted">{g.intro}</p>
              </div>

              <div className="mt-8 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-3 md:mt-10 md:grid-cols-12 md:gap-4">
                {g.photos.map(([key, span]) => {
                  // Les deux premières photos de la page sont chargées
                  // sans délai : tout le reste attend le défilement.
                  const priority = rang++ < 2
                  return (
                    <figure
                      key={key}
                      className={`reveal overflow-hidden rounded-card ${span}`}
                    >
                      <Picture
                        media={key}
                        priority={priority}
                        sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 40vw"
                        className="h-full w-full min-h-[200px]"
                        imgClassName="h-full w-full object-cover transition-transform duration-700 ease-raid hover:scale-105"
                      />
                    </figure>
                  )
                })}
              </div>
            </section>
          ))}

          <div className="reveal mt-16 flex flex-wrap gap-3">
            <Link
              to="/contact/"
              className="inline-flex h-14 items-center rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone"
            >
              Demandez votre offre personnalisée
            </Link>
            <Link
              to="/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/"
              className="inline-flex h-14 items-center rounded-pill border border-line-strong px-9 font-display text-eyebrow uppercase transition-colors duration-200 hover:border-sand hover:text-sand"
            >
              Voir les circuits
            </Link>
          </div>
        </div>
      </Section>

      <CrossLinks pick={['circuits', 'marrakech', 'temoignages']} />
    </>
  )
}
