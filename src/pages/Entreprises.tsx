import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'


const REFERENCES = ["L'Oréal", 'Renault', 'Gemma Gastronomie SA', 'Dade Behring', 'Bardahl', 'BF Goodrich', 'Carglass', 'Labeyrie', 'Siligom']

export default function Entreprises() {
  return (
    <>
      <Seo seo={SEO.entreprises} />
      <PageHero
        eyebrow="Raids 4×4"
        h1="Raids 4×4 pour entreprises"
        image="/media/entreprise-convoi.jpg"
        imageAlt="Raid 4x4 entreprise au Maroc : convoi de véhicules en formation"
      />

      <Section>
        <div className="container">
          <h2 className="reveal max-w-[26ch] text-display-md">
            Osez vivre l'aventure des raids 4×4 pour entreprises
          </h2>
          <Prose className="reveal mt-10">
            <p>Séminaires d'incentive, de team-building ou voyages de récompense de vos employés ou de vos clients.</p>
            <p>Les liens inaltérables se créent avec cohésion ; en permanence, l'entraide et la motivation investissent les équipes.</p>
            <p>
              Mes <strong>25 ans d'expérience</strong> au Maroc me permettent d'être à votre écoute,
              de comprendre vos attentes ainsi que vos enjeux et de vous proposer des solutions
              originales pour vos raids 4×4 pour entreprises. Un dépaysement s'intégrant parfaitement
              dans votre stratégie, dans le souci de la sécurité et du respect de votre budget.
            </p>
            <p>
              Nous pouvons organiser toute sorte de raids 4×4 pour entreprises, avec événements,
              allier détente, travail (dans des salles de travail équipées avec le confort) et
              émotions lors d'un raid 4×4 pour entreprises.
            </p>
            <p>
              Faites vivre à vos équipes, commerciaux et clients des moments d'une intensité rare :
              apprendre à maîtriser un 4×4, à franchir une dune, découvrir l'esprit d'équipe et d'entraide.
            </p>
            <p>Nous vous proposons des formules adaptées à vos besoins, avec l'exigence de qualité et de sécurité.</p>
            <p>
              Occupation des 4×4 avec 4 participants maximum (sécurité / confort). Des road-books sur
              mesure et précis, des briefings réguliers (minimum 1 par jour) avec : description du
              parcours, des difficultés, des conseils de sécurité, et un contrôle des équipements personnels.
            </p>
          </Prose>

          <div className="reveal mt-14">
            <p className="font-display text-micro uppercase text-muted">Quelques références</p>
            <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
              {REFERENCES.map((r) => (
                <li key={r} className="font-display text-base text-bone/50 transition-colors duration-200 hover:text-bone">{r}</li>
              ))}
            </ul>
          </div>

          <div className="reveal mt-12">
            <Link to="/contact/" className="inline-flex h-14 items-center rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone">
              Demandez votre offre personnalisée
            </Link>
          </div>
        </div>
      </Section>

      <CrossLinks exclude={[SEO.entreprises.path]} />
    </>
  )
}
