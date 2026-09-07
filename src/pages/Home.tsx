import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { site, terrainWords } from '@/data/site'
import { Hero } from '@/components/sections/Hero'
import { ParallaxImage } from '@/components/motion/ParallaxImage'
import { Formules } from '@/components/sections/Formules'
import { DisplayIndex, Prose, Section, SectionHeader, SplitEditorial } from '@/components/motion/Editorial'
import { Picture } from '@/components/Picture'
import type { MediaKey } from '@/data/medias'

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
 *    → les quatre formules, comparables d'un seul regard
 *    → bloc asymétrique avec image qui déborde vers le bord
 *    → chiffre monumental sur photo pleine largeur
 *    → témoignages, puis aperçu de la galerie
 *    → CTA
 *
 *  ── SEO ───────────────────────────────────────────────────────
 *  Les deux paragraphes de l'accueil WordPress sont reproduits mot
 *  pour mot, en HTML sémantique, dans une colonne lisible. Ils ne
 *  sont ni raccourcis ni masqués derrière une interaction.
 * ─────────────────────────────────────────────────────────────────
 */

/**
 * Trois voix, trois contextes différents — voyageur fidèle, dirigeant,
 * première fois. La preuve sociale est l'actif le plus fort du site :
 * elle était reléguée sur une page interne, elle remonte ici.
 * Texte intégral et balisage Review : /temoignages/.
 */
const PREUVES = [
  {
    texte:
      "Un homme brut, honnête, sensible qui adore partager. Sur le hors-piste, l'inattendu est toujours là, mais Jean-Luc encadre, répare, et nous amène toujours à bon port.",
    auteur: 'Pierre-Laurent Fortès',
    contexte: '5 séjours avec J.-L. Miolane',
  },
  {
    texte:
      "Le raid 4×4 nous a enchantés par la diversité des paysages extraordinaires visités et la sécurité offerte sans présence pesante de l'encadrement. Un très bon professionnalisme !",
    auteur: 'Jean-Christophe Perrichon',
    contexte: "Directeur Général — L'Oréal DPP (Suisse)",
  },
  {
    texte:
      "Je rentre d'un voyage inoubliable : des paysages sublimes, une conduite sportive mais toujours ludique, des bivouacs où rien ne manquait. L'AVENTURE de ma vie de citadine !",
    auteur: 'Mireille Viala',
    contexte: 'France',
  },
]

/**
 * Aperçu de la galerie — quatre terrains.
 * Ratio unique et volontairement portrait : la bande doit se lire
 * comme une frise. Des ratios mélangés laisseraient des trous dès
 * que la grille passe à deux colonnes.
 */
const APERCU: readonly MediaKey[] = [
  'oued-traversee',
  'ruelle-kasbah-convoi',
  'erg-dunes',
  'bivouac-dunes-crepuscule',
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

      {/* ═══ LES QUATRE FORMULES — comparables d’un regard ══════ */}
      <Section id="nos-raids" tone="surface">
        <div className="container">
          <SectionHeader
            eyebrow="Nos raids"
            title={<>Quatre formules, <span className="text-muted">un même terrain</span></>}
            sub="Sur mesure, au départ de Marrakech, pour votre entreprise ou à la journée. Chaque itinéraire reste modulable : le répertoire d'étapes se recombine selon vos jours disponibles, votre rythme et la saison."
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
            <Formules />
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
                  media="equipe-briefing-plateau"
                  ratio="4/3"
                  className="rounded-card"
                  sizes="(max-width: 1024px) 92vw, 58vw"
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
      <section className="grain relative flex min-h-[50svh] items-end overflow-hidden md:min-h-[56svh]">
        <div className="absolute inset-0">
          <ParallaxImage
            media="dunes-franchissement"
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

      {/* ═══ PREUVE SOCIALE ═════════════════════════════════════ */}
      <Section tone="surface">
        <div className="container">
          <SectionHeader
            eyebrow="Ils y sont allés"
            title={<>Ce qu'en disent <span className="text-muted">ceux qui sont partis</span></>}
            sub="Voyageurs fidèles, équipes dirigeantes, premières fois. Huit témoignages, tous nominatifs."
            action={
              <Link
                to="/temoignages/"
                className="group inline-flex h-12 items-center gap-3 rounded-pill border border-line-strong px-7 font-display text-eyebrow uppercase transition-colors duration-200 hover:border-sand hover:text-sand"
              >
                Tous les témoignages
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            }
          />
          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
            {PREUVES.map((t, i) => (
              <figure
                key={t.auteur}
                className="reveal flex h-full flex-col rounded-card border border-line bg-ink p-7"
                style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
              >
                <blockquote className="flex-1 leading-relaxed text-bone/90">{t.texte}</blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <p className="font-display text-sm">{t.auteur}</p>
                  <p className="mt-1 font-display text-micro uppercase text-muted">{t.contexte}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ APERÇU DE LA GALERIE ═══════════════════════════════ */}
      <Section size="sm">
        <div className="container">
          <SectionHeader
            eyebrow="En images"
            title={<>Quatre terrains, <span className="text-muted">un seul pays</span></>}
            sub="Oueds en eau, ruelles de ksar, ergs et bivouacs : la galerie complète des raids."
            action={
              <Link
                to="/photos-raids-4x4-maroc/"
                className="group inline-flex h-12 items-center gap-3 rounded-pill border border-line-strong px-7 font-display text-eyebrow uppercase transition-colors duration-200 hover:border-sand hover:text-sand"
              >
                Voir la galerie
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            }
          />
          <div className="mt-10 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-4">
            {APERCU.map((key, i) => (
              <Link
                key={key}
                to="/photos-raids-4x4-maroc/"
                className="reveal group block overflow-hidden rounded-card"
                style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
              >
                <Picture
                  media={key}
                  ratio="4/5"
                  sizes="(max-width: 768px) 46vw, 23vw"
                  imgClassName="transition-transform duration-700 ease-raid group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </Section>

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
