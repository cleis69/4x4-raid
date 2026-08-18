import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { site } from '@/data/site'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'


const INFOS = [
  { t: 'Formalités', d: "Passeport en cours de validité pour les voyageurs individuels en provenance d'Europe." },
  { t: 'Monnaie', d: "La monnaie est le dirham. Dans les grandes villes, on trouve des banques et des distributeurs automatiques. La carte bancaire est généralement acceptée dans les grandes villes, mais mieux vaut se munir d'espèces." },
  { t: 'Change', d: 'Bureaux de change dans les aéroports et dans les grandes villes (banques).' },
  { t: 'Électricité', d: "Le courant est de 220 volts. Presque tous les villages ont l'électricité. Pour les bivouacs, prévoyez des lampes torches à piles." },
  { t: 'Téléphone & internet', d: "Le Maroc est très bien équipé en réseaux et relais de téléphonie mobile. Très rares sont les zones non couvertes, même dans le désert. Dans les grandes villes, on trouve de plus en plus de bornes wifi (hôtels, restaurants)." },
  { t: 'Circulation', d: "Les routes sont généralement bonnes, le réseau autoroutier est en pleine expansion, mais les normes locales de circulation vous interdisent de relâcher votre attention. La réglementation est la même qu'en France, et la signalisation est bilingue arabe-français. Le danger augmente à la tombée de la nuit : prudence." },
  { t: 'Décalage horaire', d: "Le Maroc vit toute l'année à l'heure GMT, soit une heure de moins qu'en France en hiver et deux heures de moins en été." },
  { t: 'Climat', d: "« Le Maroc est un pays froid où le soleil est chaud », en particulier à l'intérieur des terres où l'été peut être étouffant le jour et froid la nuit. Le désert peut connaître des températures diurnes excessives (40 à 50 °C) et froides la nuit. Prévoyez donc toujours une polaire." },
  { t: 'Santé', d: "Du point de vue sanitaire, le Maroc ne présente aucun risque particulier et n'exige aucun vaccin. Il est recommandé d'être à jour de ses vaccins habituels. Le risque alimentaire existe : respectez les règles habituelles (lavage fréquent des mains, aliments chauds et cuits, boissons capsulées). Dans le désert, attention aux morsures de vipères et aux piqûres de scorpions : un risque rare, mais réel." },
]

export default function Decouvrir() {
  return (
    <>
      <Seo seo={SEO.decouvrir} />
      <PageHero
        eyebrow="Informations"
        h1="Découvrir le Maroc en 4×4, SSV, Buggy et Moto"
        image="/media/desert-etendue.jpg"
        imageAlt="Découvrir le Maroc en 4x4 : étendue désertique et relief"
      />

      <Section>
        <div className="container">
          <Prose className="reveal">
            <p>
              Avec sa nature encore préservée, le Maroc permet de très belles sorties en 4×4 avec
              des vues à couper le souffle : le grand Sud, le Haut Atlas, le désert du Sahara,
              Zagora, les dunes majestueuses de Merzouga, mais aussi des villes magiques comme
              Marrakech, Fès, Meknès et bien d'autres.
            </p>
          </Prose>

          <h2 className="reveal mt-16 max-w-[30ch] text-display-md">
            Informations pratiques pour découvrir le Maroc en 4×4
          </h2>
          <Prose className="reveal mt-8">
            <p>
              Le Maroc est un pays de 31 millions d'habitants, riche en histoire et en culture. Sa
              nature est très diversifiée grâce à sa géographie : bordé par la mer Méditerranée,
              l'océan Atlantique et le Sahara, traversé par les chaînes du Rif et de l'Atlas (dont le
              plus haut sommet culmine à 4 168 m). Sa gastronomie, de renommée mondiale, saura
              satisfaire tous les goûts. Découvrir le Maroc en 4×4 est sans doute l'une des
              meilleures manières de profiter de ce magnifique pays.
            </p>
          </Prose>

          <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {INFOS.map((info, i) => (
              <div key={info.t} className="reveal border-t border-line pt-5" style={{ '--reveal-delay': `${(i % 3) * 60}ms` } as React.CSSProperties}>
                <h3 className="font-display text-micro uppercase tracking-[0.22em] text-sand">{info.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{info.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CrossLinks />
    </>
  )
}
