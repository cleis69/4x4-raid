import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'
import { HorizontalScroll } from '@/components/motion/HorizontalScroll'


const CIRCUIT3 = [
  { jour: 'Jour 1', lignes: ['Départ de Marrakech 5h30', '120 km de pistes – 180 km de route. Le Haut-Atlas puis région des arganiers et du safran', 'Ce soir, auberge dans un site unique'] },
  { jour: 'Jour 2', lignes: ['150 km de pistes et hors-pistes – 80 km de route', 'Pistes du « Dakar », canyons, Djebel Bani, lac sec, ergs, sable, dunes…', 'Bivouac dans les dunes de Chegaga'] },
  { jour: 'Jour 3', lignes: ['240 km de pistes et hors-pistes – 20 km de route', "Le grand désert : cratères, palmeraies, ergs, pour rejoindre la passe mythique du Dakar (Auberge de l'Oasis)"] },
  { jour: 'Jour 4 — Journée de sable', lignes: ['120 km de hors-pistes dont 50 km de franchissement de dunes', 'Bivouac au cœur des dunes de Merzouga'] },
  { jour: 'Jour 5', lignes: ['120 km de pistes – 240 km de route', 'La traversée du Sarhro, route des mille Kasbah, puis hôtel *** à Ouarzazate'] },
  { jour: 'Jour 6', lignes: ['Aït Benhaddou, col du Tichka, retour Marrakech vers 18h00'] },
]

const tripLd = {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: 'Raid 4x4 Marrakech — Boucle Sud Maroc',
  description: "Boucle Sud Maroc de plus de 1 500 km au départ de Marrakech : Haut-Atlas, pistes du Dakar, dunes de Chegaga et Merzouga, route des mille Kasbah.",
  touristType: 'Raid 4x4',
  provider: { '@type': 'TravelAgency', name: '4x4-raid', url: 'https://4x4-raid.com' },
}

export default function Marrakech() {
  return (
    <>
      <Seo seo={SEO.marrakech} jsonLd={tripLd} />
      <PageHero
        eyebrow="Circuits départ de Marrakech"
        h1="Raid 4×4 Marrakech"
        image="/media/atlas-piste-montagne.jpg"
        imageAlt="Piste de montagne du Haut-Atlas parcourue en 4x4 au départ de Marrakech"
      />

      <Section>
        <div className="container">
          <h2 className="reveal max-w-[26ch] text-display-md">
            D'une journée à 14 nuits, Jean-Luc vous compose votre raid 4×4 Marrakech sur mesure.
          </h2>
          <Prose className="reveal mt-10">
            <p>
              <strong>Par les pistes oubliées</strong>, savourez autrement et{' '}
              <strong>hors des sentiers battus</strong> votre circuit raid d'exception, avec une
              ambiance Raid découverte sur un <strong>parcours authentique et original</strong>.
              L'ensemble des circuits raid 4×4 Marrakech peuvent être{' '}
              <strong>personnalisés selon vos désirs</strong> et rêves d'aventure.
            </p>
          </Prose>

          <article className="reveal mt-16 border-t border-line pt-10">
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="font-display text-micro uppercase text-sand">Circuit 1</span>
              <h2 className="text-display-sm">Marrakech / Marrakech — 1 journée</h2>
            </div>
            <ul className="mt-6 space-y-2">
              {['Départ de Marrakech vers 8h00', "90 km de pistes – 100 km de goudron (déjeuner à l'Oukaïmeden)", 'Retour Marrakech vers 18h00'].map((e) => (
                <li key={e} className="flex gap-3 text-muted">
                  <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-line-strong" />{e}
                </li>
              ))}
            </ul>
          </article>

          <article className="reveal mt-14 border-t border-line pt-10">
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="font-display text-micro uppercase text-sand">Circuit 2</span>
              <h2 className="text-display-sm">Marrakech / Marrakech — 2 jours / 1 nuit</h2>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-card border border-line bg-surface p-6">
                <p className="font-display text-micro uppercase text-sand">Jour 1</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  <li>Départ de Marrakech vers 9h00</li>
                  <li>100 km de pistes – 100 km de goudron (déjeuner pique-nique)</li>
                  <li>Dîner et nuit en auberge dans le Haut-Atlas</li>
                </ul>
              </div>
              <div className="rounded-card border border-line bg-surface p-6">
                <p className="font-display text-micro uppercase text-sand">Jour 2</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  <li>60 km de pistes – 100 km de route – déjeuner à l'Oukaïmeden</li>
                  <li>Retour Marrakech vers 18h00</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </Section>

      {/* Circuit 3 — défilement horizontal piloté par le scroll */}
      <HorizontalScroll
        heading={
          <div className="reveal">
            <span className="font-display text-micro uppercase text-sand">Circuit 3</span>
            <h2 className="mt-4 max-w-[22ch] text-display-md">
              Boucle Sud Maroc — plus de 1 500 km, 7 jours / 6 nuits
            </h2>
          </div>
        }
      >
        {CIRCUIT3.map((d) => (
          <article key={d.jour} className="flex w-[82vw] shrink-0 snap-start flex-col rounded-card border border-line bg-surface p-7 sm:w-[380px]">
            <p className="font-display text-eyebrow uppercase text-sand">{d.jour}</p>
            <ul className="mt-5 space-y-3">
              {d.lignes.map((l) => (
                <li key={l} className="text-sm leading-relaxed text-muted">{l}</li>
              ))}
            </ul>
          </article>
        ))}
        <article className="flex w-[82vw] shrink-0 snap-start flex-col justify-center rounded-card border border-dashed border-sand/40 bg-sand/[0.04] p-7 sm:w-[380px]">
          <p className="font-display text-eyebrow uppercase text-sand">Jour 7 — à confirmer</p>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Le circuit est annoncé sur 7 jours / 6 nuits. Le détail du 7ᵉ jour n'était pas publié :
            à préciser, ou à ajuster en 6 jours / 5 nuits.
          </p>
        </article>
      </HorizontalScroll>

      <Section className="!pt-0">
        <div className="container flex flex-wrap gap-3">
          <Link to="/contact/" className="inline-flex h-14 items-center rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone">
            Demandez votre offre personnalisée
          </Link>
          <Link to="/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/" className="inline-flex h-14 items-center rounded-pill border border-line-strong px-9 font-display text-eyebrow uppercase transition-colors duration-200 hover:border-sand hover:text-sand">
            Raid sur mesure
          </Link>
        </div>
      </Section>

      <CrossLinks exclude={[SEO.marrakech.path]} />
    </>
  )
}
