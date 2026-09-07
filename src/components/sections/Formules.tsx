import { useState } from "react";
import { Link } from "react-router-dom";
import { Picture } from "@/components/Picture";
import type { MediaKey } from "@/data/medias";
import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────
 *  LES QUATRE FORMULES — en éventail
 *
 *  La présentation est un éventail : quatre cartes très légèrement
 *  pivotées, comme des tirages posés sur une table. Au survol, la
 *  carte visée se redresse et avance, ses voisines reculent à peine.
 *
 *  ── Ce qui a changé, et pourquoi ──────────────────────────────
 *
 *  La première version de cet éventail n'était pas lisible : les
 *  cartes étaient hautes (ratio 3/4), le texte était posé SUR la
 *  photo, et la description n'apparaissait qu'au SURVOL. On faisait
 *  donc défiler quatre grandes images sans comprendre ce qui était
 *  proposé — et sur écran tactile, où le survol n'existe pas, la
 *  description n'apparaissait jamais au bon moment.
 *
 *  L'éventail est conservé, la lecture est corrigée :
 *
 *    · la photo est basse (3/2) et sert de bandeau, pas de fond ;
 *    · le texte vit sous elle, sur un aplat opaque, toujours visible ;
 *    · LES MÊMES TROIS AXES sur les quatre cartes — durée, qui
 *      conduit, ce que comprend le format. On ne compare que ce qui
 *      est aligné : des libellés différents d'une carte à l'autre
 *      obligeraient à tout relire.
 *
 *  Les angles restent minuscules (±2,5°). Au-delà, l'éventail devient
 *  un gimmick et le texte penché fatigue ; en dessous de 1°, l'effet
 *  ne se voit plus. La fenêtre utile est étroite. En dessous de
 *  1024 px et en `prefers-reduced-motion`, les cartes sont droites.
 *
 *  ── Sur téléphone : on fait glisser, on ne descend pas ────────
 *
 *  Empilées, ces quatre fiches demandaient environ 2 500 px de
 *  défilement vertical : la quatrième formule était hors de portée.
 *  Sous 1024 px la liste devient donc un rail horizontal à aimantation
 *  (`snap`), chaque carte occupant 78 % de la largeur. Les 22 % qui
 *  restent laissent dépasser la carte suivante : c'est cette amorce,
 *  et non une icône, qui indique qu'on peut faire glisser.
 *
 *  Le rail déborde jusqu'aux bords de l'écran (marges négatives
 *  compensant le padding du conteneur) — une carte coupée net au
 *  bord se lit comme un rail, une carte qui s'arrête avant se lit
 *  comme une erreur de mise en page.
 *
 *  Rien n'est masqué au sens du référencement : les quatre cartes
 *  sont dans le DOM, dans l'ordre, et le défilement est natif.
 *
 *  ⚠️ Aucune caractéristique n'est inventée : chaque valeur provient
 *  du texte de l'ancien site (cf. INVENTAIRE-SEO.md). Les tarifs ne
 *  sont volontairement pas affichés — ils n'ont jamais été publiés.
 *
 *  ── SEO ───────────────────────────────────────────────────────
 *  Chaque carte est un vrai <Link> portant son <h3> et son texte dans
 *  le DOM. L'empilement est purement visuel : au clavier, la
 *  tabulation traverse les cartes dans l'ordre, et le lecteur d'écran
 *  lit une liste normale.
 * ─────────────────────────────────────────────────────────────────
 */

type Formule = {
  href: string;
  index: string;
  titre: string;
  pitch: string;
  media: MediaKey;
  specs: readonly { k: string; v: string }[];
};

const FORMULES: readonly Formule[] = [
  {
    href: "/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/",
    index: "01",
    titre: "Sur mesure",
    pitch:
      "Vous décrivez vos envies, vos dates et votre niveau : Jean-Luc trace l’itinéraire et se charge de toute l’organisation.",
    media: "dunes-ciel-bleu",
    specs: [
      { k: "Durée", v: "Libre, selon votre projet" },
      { k: "Au volant", v: "Vous — votre véhicule ou une location sur place" },
      { k: "Format", v: "Itinéraire construit avec vous, du guide seul au tout compris" },
    ],
  },
  {
    href: "/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/",
    index: "02",
    titre: "Départ de Marrakech",
    pitch:
      "Les circuits au départ de Marrakech, par les pistes oubliées du Sud marocain, en direct ou en boucle.",
    media: "dune-descente",
    specs: [
      { k: "Durée", v: "D’une journée à 14 nuits" },
      { k: "Au volant", v: "Vous, accompagné par Jean-Luc" },
      {
        k: "Format",
        v: "Auberges et bivouacs — temps fort : la Boucle Sud, 7 jours et plus de 1 500 km",
      },
    ],
  },
  {
    href: "/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/",
    index: "03",
    titre: "Entreprises",
    pitch:
      "Séminaires d’incentive, team-building et voyages de récompense, avec salles de travail équipées si besoin.",
    media: "convoi-atlas-enneige",
    specs: [
      { k: "Durée", v: "Sur mesure, selon le séminaire" },
      { k: "Au volant", v: "Vos équipes — 4 participants maximum par 4×4" },
      {
        k: "Format",
        v: "Road-book sur mesure et briefing quotidien. Références : L’Oréal, Renault, Bardahl",
      },
    ],
  },
  {
    href: "/circuits-raid-4x4-au-maroc/3-excursions-4x4-a-marrakech/",
    index: "04",
    titre: "Excursions",
    pitch:
      "Trois itinéraires à la journée au départ de Marrakech, sur pistes et hors-pistes, sans quitter le tout-terrain.",
    media: "village-berbere-piste",
    specs: [
      { k: "Durée", v: "1 journée" },
      { k: "Au volant", v: "Jean-Luc — vous êtes passager" },
      { k: "Format", v: "3 itinéraires au choix, tarif unique, pique-nique compris" },
    ],
  },
];

/** Rotations et décalages fixes — déterministes, jamais aléatoires. */
const EVENTAIL = [
  { rot: -2.5, y: 14 },
  { rot: -0.8, y: 4 },
  { rot: 1.1, y: 8 },
  { rot: 2.5, y: 18 },
];

export function Formules() {
  const [actif, setActif] = useState<number | null>(null);

  return (
    <>
      <ul
        className={cn(
          "list-none",
          // Téléphone et tablette : rail horizontal aimanté, débordant
          // jusqu'aux bords de l'écran.
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar",
          "-mx-5 scroll-px-5 px-5 md:-mx-8 md:scroll-px-8 md:px-8",
          // Grand écran : l'éventail reprend sa place.
          "lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0",
        )}
        style={{ perspective: "1800px" }}
        onMouseLeave={() => setActif(null)}
      >
        {FORMULES.map((f, i) => {
          const e = EVENTAIL[i % EVENTAIL.length];
          const estActif = actif === i;
          const estEstompe = actif !== null && !estActif;

          return (
            <li
              key={f.href}
              className="relative w-[78vw] shrink-0 snap-start sm:w-[62vw] md:w-[46vw] lg:w-auto lg:shrink"
            >
              <Link
                to={f.href}
                onMouseEnter={() => setActif(i)}
                onFocus={() => setActif(i)}
                className={cn(
                  // Pas de classe `reveal` ici : elle pose son propre
                  // transform, que le transform en ligne de l'éventail
                  // écraserait. L'apparition est portée par le conteneur
                  // de la section, dans Home.tsx.
                  "group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface",
                  "transition-[transform,opacity,border-color] duration-700 ease-raid hover:border-sand/50",
                  "will-change-transform motion-reduce:!transform-none",
                  // L'éventail ne se déploie qu'à partir de 4 colonnes.
                  "max-lg:!rotate-0 max-lg:!translate-y-0",
                )}
                style={
                  {
                    transform: estActif
                      ? "rotate(0deg) translate3d(0, -12px, 0) scale(1.03)"
                      : `rotate(${e.rot}deg) translate3d(0, ${e.y}px, 0) scale(${estEstompe ? 0.98 : 1})`,
                    opacity: estEstompe ? 0.62 : 1,
                    zIndex: estActif ? 20 : 10 - i,
                  } as React.CSSProperties
                }
              >
                {/* Bandeau photographique — il situe le terrain, il ne
                    porte aucun texte : rien à lire par-dessus une image. */}
                <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[3/2]">
                  <Picture
                    media={f.media}
                    sizes="(max-width: 640px) 78vw, (max-width: 768px) 62vw, (max-width: 1024px) 46vw, 23vw"
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-[1200ms] ease-raid group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-5 top-4 font-display text-micro uppercase tracking-[0.22em] text-bone/80 [text-shadow:0_1px_6px_rgb(0_0_0/0.6)]">
                    {f.index}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-display-sm leading-tight transition-colors duration-200 group-hover:text-sand">
                    {f.titre}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.pitch}</p>

                  {/* Les trois repères qui rendent les formules comparables. */}
                  <dl className="mt-5 flex-1 border-t border-line pt-3 text-sm sm:mt-6 sm:pt-4">
                    {f.specs.map((spec) => (
                      <div
                        key={spec.k}
                        className="border-b border-line/60 py-2.5 last:border-0 last:pb-0 sm:py-3"
                      >
                        <dt className="font-display text-micro uppercase tracking-[0.18em] text-sand/80">
                          {spec.k}
                        </dt>
                        <dd className="mt-1.5 leading-snug text-bone/85">{spec.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <span className="mt-5 inline-block font-display text-eyebrow uppercase text-sand">
                    Détails{" "}
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Amorce de la carte suivante + rappel écrit. Sur grand écran
          l'éventail est entièrement visible : l'indication disparaît. */}
      <p className="mt-4 flex items-center gap-3 font-display text-micro uppercase tracking-[0.22em] text-muted lg:hidden">
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        Faites glisser — 4 formules
      </p>
    </>
  );
}
