import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { site, terrainWords } from '@/data/site'
import { Hero } from '@/components/sections/Hero'
import { ParallaxImage } from '@/components/motion/ParallaxImage'
import { FanCards, type FanCard } from '@/components/motion/FanCards'
import { DisplayIndex, Prose, Section, SectionHeader, SplitEditorial } from '@/components/motion/Editorial'

/**
 * ─────────────────────────────────────────────────────────────────
 *  ACCUEIL — composition éditoriale
 *
 *  Le rythme est délibéré : chaque section change de registre plutôt
 *  que d'empiler des blocs identiques.
 *
 *    Hero plein écran
 *    → texte SEO en colonne étroite, énorme espace négatif
 *    → bandeau typographique défilant (rupture)
 *    → éventail de cartes (les 3 familles de raids)
 *    → bloc asymétrique avec image qui déborde vers le bord
 *    → chiffre monumental sur photo pleine largeur
 *    → CTA
 *
 *  ── SEO ───────────────────────────────────────────────────────
 *  Les deux paragraphes de l'accueil WordPress sont reproduits mot
 *  pour mot, en HTML sémantique, dans une colonne lisible. Ils ne
 *  sont ni raccourcis ni masqués derrière une interaction.
 * ─────────────────────────────────────────────────────────────────
 */

const familles: FanCard[] = [
  {
    href: '/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/',
    index: '01',
    title: 'Sur mesure',
    text: 'Jean-Luc compose votre raid selon vos envies, votre niveau et vos dates.',
    image: '/media/sur-mesure-piste-sable.jpg',
    alt: 'Raid 4x4 sur mesure au Maroc, véhicule sur piste sablonneuse',
  },
  {
    href: '/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/',
    index: '02',
    title: 'Départ de Marrakech',
    text: "D'une journée à 14 nuits, par les pistes oubliées du Sud marocain.",
    image: '/media/atlas-piste-montagne.jpg',
    alt: 'Piste de montagne du Haut-Atlas parcourue en 4x4 au départ de Marrakech',
  },
  {
    href: '/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/',
    index: '03',
    title: 'Entreprises',
    text: 'Incentive, team-building et séminaires au cœur du désert.',
    image: '/media/entreprise-convoi.jpg',
    alt: 'Raid 4x4 entreprise au Maroc : convoi de véhicules en formation',
  },
  {
    href: '/circuits-raid-4x4-au-maroc/3-excursions-4x4-a-marrakech/',
    index: '04',
    title: 'Excursions',
    text: 'Trois itinéraires à la journée, pistes et hors-pistes, pique-nique compris.',
    image: '/media/excursion-journee.jpg',
    alt: 'Excursion 4x4 à la journée au départ de Marrakech',
  },
]

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Faut-il savoir conduire en tout-terrain pour un raid 4x4 au Maroc ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Les raids s'adressent aux débutants comme aux initiés. Pour beaucoup, c'est la première expérience de conduite tout-terrain. L'accompagnateur montre les manœuvres, mais c'est vous qui conduisez.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on venir avec son propre véhicule ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. 4x4, moto, SSV ou buggy personnel : la formule peut se limiter à un accompagnement avec guide et véhicule de suivi. Une location sur place est également possible.",
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <Seo seo={SEO.home} jsonLd={faqLd} />
      <Hero />

      {/* ═══ TEXTE INDEXÉ — colonne étroite, beaucoup de vide ═══ */}
      <Section size="sm">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <DisplayIndex
                index="01"
                word="Raid"
                sub="Maroc · sur mesure"
                className="reveal lg:sticky lg:top-28"
              />
            </div>

            <div className="lg:col-span-8">
              <Prose className="reveal" >
                <p>
                  Nous vous proposons le montage et la réalisation de votre raid 4×4
                  au Maroc de la planification jusqu'à la fin de votre aventure.
                  Savourez, hors des sentiers battus, votre séjour d'exception dans
                  une ambiance Rallye Raids sur des parcours authentiques et
                  originaux, en 4×4, Moto, SSV ou Buggy. Nos raids 4×4 Maroc
                  s'adressent aux passionnés d'aventure, à tous ceux qui souhaitent
                  découvrir des paysages extraordinaires, authentiques et naturels.
                  Grâce à ce plongeon dans la nature sauvage du Maroc, au milieu
                  d'une population accueillante et enjouée, vous vivrez une
                  expérience humaine, chargée d'émotions et de couleurs.
                </p>
                <p>
                  Vous en avez rêvé, alors osez venir vivre avec nous une expérience
                  inoubliable en étant l'acteur au sein de la passion aventureuse du
                  rallye-raid, que vous soyez débutants ou initiés, en famille ou
                  entre amis. Pour les personnes qui désirent conduire : peut-être
                  votre 1<sup>re</sup> expérience vers l'aventure et l'évasion avec
                  l'apprentissage de la conduite tout terrain, et pour d'autres se
                  perfectionner avec aussi du pilotage sur sable, franchissements de
                  dunes, etc. Nous vous mettons en situation sécurisée, mais vous
                  seuls êtes aux commandes ; soyez rassuré, l'accompagnateur répondra
                  à vos questions et vous montrera les meilleures manœuvres. Vous
                  serez l'auteur et l'acteur d'une vraie aventure, dont vous aurez
                  construit l'itinéraire, grâce aux conseils et aux nombreux
                  repérages de{' '}
                  <Link to="/guide-raids-4x4-maroc/">Jean-Luc Miolane</Link>.
                </p>
              </Prose>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ RUPTURE TYPOGRAPHIQUE ═══════════════════════════════ */}
      <div className="fade-x flex select-none overflow-hidden border-y border-line py-5" aria-hidden>
        <div className="flex shrink-0 animate-sand-drift">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {terrainWords.map((w) => (
                <span
                  key={`${copy}-${w}`}
                  className="flex shrink-0 items-center gap-8 whitespace-nowrap px-8 font-display text-display-sm uppercase text-bone/25"
                >
                  {w}
                  <span className="h-1 w-1 rounded-pill bg-sand" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ÉVENTAIL — les quatre familles de raids ═════════════ */}
      <Section tone="surface">
        <div className="container">
          <SectionHeader
            eyebrow="Nos raids"
            title={<>Quatre façons <span className="text-muted">de quitter la route</span></>}
            sub="Chaque itinéraire est modulable : le répertoire d'étapes se recombine selon vos jours disponibles, votre rythme et la saison."
            action={
              <Link
                to="/circuits-raid-4x4-au-maroc/"
                className="group inline-flex h-12 items-center gap-3 rounded-pill border border-line-strong px-7 font-display text-eyebrow uppercase transition-colors duration-200 hover:border-sand hover:text-sand"
              >
                Tous les circuits
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            }
          />
          <div className="reveal mt-10 md:mt-12">
            <FanCards cards={familles} />
          </div>
        </div>
      </Section>

      {/* ═══ BLOC ASYMÉTRIQUE — l'image déborde vers le bord ═════ */}
      <Section size="sm">
        <div className="container">
          <SplitEditorial
            offset
            media={
              <div className="reveal">
                <ParallaxImage
                  src="/media/guide-jean-luc.jpg"
                  alt="Jean-Luc Miolane, guide de raids 4x4 au Maroc, au volant sur piste"
                  ratio="4/3"
                  className="rounded-card"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            }
          >
            <div className="reveal" style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
              <p className="eyebrow">Votre guide</p>
              <h2 className="mt-5 text-display-md">Jean-Luc Miolane</h2>
              <p className="mt-4 font-display text-display-sm text-sand">« Le Renard du Désert »</p>
              <p className="mt-6 max-w-measure leading-relaxed text-muted">
                Plus de 45 ans d'expérience des raids et du sable, installé au Maroc
                depuis 25 ans. Il est présent sur toutes les opérations : c'est lui
                qui trace, qui ouvre la piste et qui répare.
              </p>
              <Link
                to="/guide-raids-4x4-maroc/"
                className="link-underline mt-8 inline-block font-display text-eyebrow uppercase text-sand"
              >
                Découvrir son parcours →
              </Link>
            </div>
          </SplitEditorial>
        </div>
      </Section>

      {/* ═══ CHIFFRE MONUMENTAL SUR PHOTO ═══════════════════════ */}
      <section className="grain relative flex min-h-[58svh] items-center overflow-hidden md:min-h-[64svh]">
        <div className="absolute inset-0">
          <ParallaxImage
            src="/media/dunes-franchissement.jpg"
            alt="Franchissement de dunes lors d'un raid 4x4 dans le désert marocain"
            strength={70}
            ratio="16/9"
            className="!absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/15" />
        </div>

        <div className="container relative z-10 py-section-sm">
          <p className="eyebrow reveal">Boucle Sud — Jour 04</p>
          <p
            className="reveal mt-7 font-display text-[clamp(4rem,17vw,15rem)] font-bold leading-[0.82] tracking-tighter"
            style={{ '--reveal-delay': '100ms' } as React.CSSProperties}
          >
            50<span className="text-sand">km</span>
          </p>
          <p
            className="reveal mt-8 max-w-measure text-lead text-bone/90"
            style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
          >
            Cent vingt kilomètres de hors-pistes dont cinquante de franchissement de
            dunes, en une seule journée. Le soir, bivouac au cœur des dunes de
            Merzouga.
          </p>
          <Link
            to="/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/"
            className="link-underline reveal mt-8 inline-block font-display text-eyebrow uppercase text-sand"
            style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
          >
            Voir l'itinéraire complet →
          </Link>
        </div>
      </section>

      {/* ═══ CTA FINAL ══════════════════════════════════════════ */}
      <Section className="border-t border-line text-center">
        <div className="container">
          <p className="eyebrow reveal justify-center">Prochaine étape</p>
          <h2
            className="reveal mx-auto mt-6 max-w-[22ch] text-display-md"
            style={{ '--reveal-delay': '100ms' } as React.CSSProperties}
          >
            Composons votre raid 4×4 au Maroc sur mesure
          </h2>
          <p
            className="reveal mx-auto mt-6 max-w-measure text-lead text-muted"
            style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
          >
            Réponse sous {site.responseTime}. Parlez-nous de vos envies, de vos dates
            et de votre niveau — Jean-Luc revient vers vous avec un tracé.
          </p>
          <div
            className="reveal mt-10 flex flex-wrap justify-center gap-3"
            style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
          >
            <Link
              to="/contact/"
              className="group inline-flex h-14 items-center gap-3 rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone"
            >
              Demandez votre offre personnalisée
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={`tel:${site.phoneHref}`}
              className="inline-flex h-14 items-center rounded-pill border border-line-strong px-9 font-display text-eyebrow uppercase text-bone transition-colors duration-200 hover:border-sand hover:text-sand"
            >
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
