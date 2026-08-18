import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'


const TEMOIGNAGES = [
  { auteur: 'Pierre-Laurent Fortès', contexte: 'France — 5 séjours avec J.-L. Miolane', texte: "J'adore le sable et j'ai eu la chance de connaître avec Jean-Luc le Sud Maroc, la Mauritanie, le Mali, etc. Un homme brut, honnête, sensible qui adore partager. Sur le hors-piste, l'inattendu est toujours là, mais Jean-Luc encadre, répare, et nous amène toujours à bon port. À ne pas manquer, ses pique-niques !" },
  { auteur: 'Christian Boillat', contexte: 'Suisse', texte: "Ma première visite au Maroc lors de ce raid de 7 jours avec des copains. Au programme : pistes de l'Atlas, rivières à traverser, dunes, sable, bivouacs dans le désert. J'ai adoré et ai apprécié l'accueil des Marocains. Jean-Luc Miolane y est comme un poisson dans l'eau. C'est un vrai renard du désert." },
  { auteur: 'Mireille Viala', contexte: 'France', texte: "Je rentre d'un voyage inoubliable, fait de relations humaines extraordinaires, de découvertes de paysages sublimes, d'un environnement parfois désert, parfois sablonneux, parfois plus rude, mais jamais hostile, d'un mode de conduite sportif mais toujours ludique, de soirées étape de charme, dans les auberges de fortune ou sur des bivouacs où rien ne manquait, pas même l'électricité ! Bref, l'AVENTURE de ma vie de citadine !" },
  { auteur: 'Jean-Christophe Perrichon', contexte: "Directeur Général — L'Oréal Division Produits Professionnels (Suisse)", texte: "Nous tenons à te remercier ainsi que tes équipes de l'excellente prestation que tu nous as offerte lors de notre séminaire autour de Marrakech. Le bivouac a été vécu comme une vraie rupture, tout en offrant confort et animations. Le raid 4×4 nous a enchantés par la diversité des paysages extraordinaires visités et la sécurité offerte sans présence pesante de l'encadrement. Un très bon professionnalisme !" },
  { auteur: 'Frédéric Fievet', contexte: 'Directeur commercial — BARDAHL Industrie', texte: "Je tiens à te remercier pour l'organisation du Raid BARDAHL de la semaine dernière. Nous en avons pris plein les yeux… du sable, des cailloux, de la bonne humeur et des souvenirs à la pelle." },
  { auteur: 'Thomas Dussous', contexte: 'Agence LFE', texte: "Au nom de toute l'équipe LFE, nous tenions à te remercier, toi et toute ton équipe, pour l'organisation de ce raid et de ce bivouac / réunion au cœur du Maroc. Je sais que la nuit sous les étoiles a été un moment très intense de leur séjour et qu'ils m'en parlaient avec des yeux qui brillaient de plaisir !" },
  { auteur: 'Olivier Ros', contexte: 'Cabinet A.I.A.', texte: "Ce petit mail pour vous remercier encore une fois de la qualité de vos prestations ainsi que du professionnalisme dont vous avez fait preuve tout au long de notre séjour au Maroc. Cela restera un grand souvenir pour moi, mais aussi pour l'ensemble des participants." },
  { auteur: 'Nadine et Christian Reboul', contexte: 'France', texte: "Nous voici de retour dans le tourbillon de la vie ! Nous tenions à te remercier pour ce fabuleux voyage. Il y a eu des moments un peu difficiles, mais dans l'ensemble c'était super. Nous sommes rentrés avec plein de belles images et, franchement, cette aventure en ta compagnie restera gravée longtemps !" },
]

const reviewLd = TEMOIGNAGES.map((t) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  reviewBody: t.texte,
  author: { '@type': 'Person', name: t.auteur },
  itemReviewed: { '@type': 'TravelAgency', name: '4x4-raid' },
}))

export default function Temoignages() {
  return (
    <>
      <Seo seo={SEO.temoignages} jsonLd={reviewLd} />
      <PageHero
        eyebrow="Ils y sont allés"
        h1="Témoignages"
        image="/media/panorama-sud.jpg"
        imageAlt="Panorama du Sud marocain depuis un circuit raid 4x4"
      />

      <Section>
        <div className="container">
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {TEMOIGNAGES.map((t) => (
              <figure key={t.auteur} className="reveal mb-6 break-inside-avoid rounded-card border border-line bg-surface p-7">
                <blockquote className="leading-relaxed text-bone/90">{t.texte}</blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <p className="font-display text-sm">{t.auteur}</p>
                  <p className="mt-1 font-display text-micro uppercase text-muted">{t.contexte}</p>
                </figcaption>
              </figure>
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
