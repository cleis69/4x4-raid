import { media, type Media } from './medias'

/**
 * ─────────────────────────────────────────────────────────────────
 *  RAIDS — SOURCE DE VÉRITÉ
 *
 *  Chaque champ est annoté :
 *    ✅  = information RÉELLE, relevée sur 4x4-raid.com
 *    ⚠️  = information MANQUANTE, à fournir par le client
 *
 *  Les champs manquants sont typés `null` (jamais une valeur inventée).
 *  L'UI affiche automatiquement un état « Sur devis » / « À compléter »
 *  quand la valeur vaut null — voir components/ui/DataOrPlaceholder.tsx.
 * ─────────────────────────────────────────────────────────────────
 */

export type Difficulte = 'Découverte' | 'Intermédiaire' | 'Engagé'
export type Terrain = 'Montagne' | 'Désert' | 'Dunes' | 'Mixte'
export type Format = 'Journée' | 'Court séjour' | 'Expédition' | 'Sur mesure' | 'Entreprise'

export type Etape = {
  jour: string
  titre: string
  /** ✅ Kilométrages tels qu'annoncés sur le site actuel. */
  distances: string[]
  /** ✅ Repères géographiques et terrains cités. */
  reperes: string[]
  /** ✅ Type d'hébergement annoncé. null = non précisé sur le site. */
  nuit: string | null
}

export type Raid = {
  slug: string
  /** Nom éditorial — reformulation de marque, l'offre reste identique. */
  nom: string
  /** Intitulé exact utilisé sur le site actuel (traçabilité + SEO). */
  nomSource: string
  format: Format
  duree: string
  /** Nombre de jours, pour le tri et les filtres. */
  jours: number
  region: string
  terrain: Terrain
  difficulte: Difficulte
  /** ✅ Distance totale si annoncée, sinon null. */
  distance: string | null
  /** ⚠️ Aucun tarif n'est publié sur le site actuel. Toujours null. */
  prixAPartirDe: number | null
  depart: string
  accroche: string
  chapo: string
  image: Media
  etapes: Etape[]
  /** ✅ Éléments explicitement mentionnés sur le site. */
  inclus: string[]
  /** ⚠️ Aucune liste d'exclusions n'existe sur le site actuel. */
  nonInclus: string[]
  /** Vrai si la fiche est complète et publiable en l'état. */
  ficheComplete: boolean
  notes?: string
}

/* ═══════════════════════════════════════════════════════════════
   ✅ RAID 01 — source : /circuits-raid-4x4-au-maroc/raid-4x4-marrakech/
   « Circuit 1 : MARRAKECH / MARRAKECH — 1 journée »
   ═══════════════════════════════════════════════════════════════ */
const oukaimeden: Raid = {
  slug: 'atlas-oukaimeden',
  nom: 'Atlas — Oukaïmeden',
  nomSource: 'Circuit 1 : Marrakech / Marrakech — 1 journée',
  format: 'Journée',
  duree: '1 jour',
  jours: 1,
  region: 'Haut-Atlas',
  terrain: 'Montagne',
  difficulte: 'Découverte',
  distance: '190 km — dont 90 km de piste',
  prixAPartirDe: null,
  depart: 'Marrakech',
  accroche: 'Dix heures pour quitter le goudron.',
  chapo:
    "Départ à l'aube, retour à la nuit tombante. Entre-temps : quatre-vingt-dix kilomètres de piste qui montent vers l'Oukaïmeden, et une ville qui disparaît dans le rétroviseur en moins d'une heure. Le format le plus court du répertoire — et déjà une vraie sortie de route.",
  image: media.atlas,
  etapes: [
    {
      jour: 'Jour 01',
      titre: 'Marrakech → Oukaïmeden → Marrakech',
      distances: ['90 km de piste', '100 km de goudron'],
      reperes: ['Départ Marrakech vers 8h00', "Déjeuner à l'Oukaïmeden", 'Retour Marrakech vers 18h00'],
      nuit: null,
    },
  ],
  inclus: ["Déjeuner à l'Oukaïmeden"],
  nonInclus: [],
  ficheComplete: false,
  notes: '⚠️ À FOURNIR : tarif, véhicule affecté, nombre de participants max, liste précise des inclusions.',
}

/* ═══════════════════════════════════════════════════════════════
   ✅ RAID 02 — « Circuit 2 : MARRAKECH / MARRAKECH — 2 jours / 1 nuit »
   ═══════════════════════════════════════════════════════════════ */
const hautAtlas: Raid = {
  slug: 'haut-atlas-deux-jours',
  nom: 'Haut-Atlas — Une nuit en altitude',
  nomSource: 'Circuit 2 : Marrakech / Marrakech — 2 jours / 1 nuit',
  format: 'Court séjour',
  duree: '2 jours / 1 nuit',
  jours: 2,
  region: 'Haut-Atlas',
  terrain: 'Montagne',
  difficulte: 'Découverte',
  distance: '360 km — dont 160 km de piste',
  prixAPartirDe: null,
  depart: 'Marrakech',
  accroche: 'Le premier soir où la ville ne se voit plus.',
  chapo:
    "Deux jours suffisent à changer d'échelle. Cent kilomètres de piste le premier jour, une auberge quelque part dans le Haut-Atlas, puis la redescente par l'Oukaïmeden. C'est le format qui convertit : ceux qui le font reviennent pour sept jours.",
  image: media.atlas2,
  etapes: [
    {
      jour: 'Jour 01',
      titre: 'Marrakech → Haut-Atlas',
      distances: ['100 km de piste', '100 km de goudron'],
      reperes: ['Départ Marrakech vers 9h00', 'Déjeuner pique-nique'],
      nuit: 'Dîner et nuit en auberge dans le Haut-Atlas',
    },
    {
      jour: 'Jour 02',
      titre: 'Haut-Atlas → Oukaïmeden → Marrakech',
      distances: ['60 km de piste', '100 km de route'],
      reperes: ["Déjeuner à l'Oukaïmeden", 'Retour Marrakech vers 18h00'],
      nuit: null,
    },
  ],
  inclus: ['Nuit en auberge dans le Haut-Atlas', 'Dîner', 'Déjeuner pique-nique', "Déjeuner à l'Oukaïmeden"],
  nonInclus: [],
  ficheComplete: false,
  notes: '⚠️ À FOURNIR : tarif, nom de l’auberge, véhicule affecté, nombre de participants max.',
}

/* ═══════════════════════════════════════════════════════════════
   ✅ RAID 03 — « Circuit 3 : Boucle Sud Maroc de plus de 1'500 km »
   ⚠️ INCOHÉRENCE SOURCE : le site annonce « 7 jours / 6 nuits »
      mais ne détaille que les Jours 1 à 6. Le Jour 7 est absent.
      Signalé au client — à arbitrer avant publication.
   ═══════════════════════════════════════════════════════════════ */
const boucleSud: Raid = {
  slug: 'boucle-sud-maroc',
  nom: 'Boucle Sud — La grande traversée',
  nomSource: "Circuit 3 : Marrakech / Marrakech — Boucle Sud Maroc de plus de 1'500 km",
  format: 'Expédition',
  duree: '7 jours / 6 nuits',
  jours: 7,
  region: 'Atlas · Sahara · Merzouga',
  terrain: 'Dunes',
  difficulte: 'Engagé',
  distance: "Plus de 1 500 km",
  prixAPartirDe: null,
  depart: 'Marrakech',
  accroche: 'Mille cinq cents kilomètres. Six nuits. Deux bivouacs dans le sable.',
  chapo:
    "L'itinéraire de référence. Il traverse le Haut-Atlas, plonge sur les pistes du Dakar, franchit cinquante kilomètres de dunes en une seule journée et remonte par la route des mille Kasbah. Ce n'est pas un circuit touristique allongé : c'est une expédition avec ses journées de sable et ses nuits sous les étoiles.",
  image: media.dunes,
  etapes: [
    {
      jour: 'Jour 01',
      titre: 'Marrakech → Haut-Atlas → pays des arganiers',
      distances: ['120 km de piste', '180 km de route'],
      reperes: ['Départ Marrakech 5h30', 'Le Haut-Atlas', 'Région des arganiers et du safran'],
      nuit: 'Auberge dans un site unique',
    },
    {
      jour: 'Jour 02',
      titre: 'Pistes du Dakar → dunes de Chegaga',
      distances: ['150 km de pistes et hors-pistes', '80 km de route'],
      reperes: ['Pistes du « Dakar »', 'Canyons', 'Djebel Bani', 'Lac sec', 'Ergs', 'Sable', 'Dunes'],
      nuit: 'Bivouac dans les dunes de Chegaga',
    },
    {
      jour: 'Jour 03',
      titre: 'Le grand désert → la passe mythique du Dakar',
      distances: ['240 km de pistes et hors-pistes', '20 km de route'],
      reperes: ['Le grand désert', 'Cratères', 'Palmeraies', 'Ergs', 'Passe mythique du Dakar'],
      nuit: "Auberge de l'Oasis",
    },
    {
      jour: 'Jour 04',
      titre: 'Journée de sable',
      distances: ['120 km de hors-piste', 'dont 50 km de franchissement de dunes'],
      reperes: ['Franchissement de dunes', 'Progression intégralement hors-piste'],
      nuit: 'Bivouac au cœur des dunes de Merzouga',
    },
    {
      jour: 'Jour 05',
      titre: 'Traversée du Sarhro → Ouarzazate',
      distances: ['120 km de piste', '240 km de route'],
      reperes: ['La traversée du Sarhro', 'Route des mille Kasbah'],
      nuit: 'Hôtel 3 étoiles à Ouarzazate',
    },
    {
      jour: 'Jour 06',
      titre: 'Aït Benhaddou → col du Tichka → Marrakech',
      distances: [],
      reperes: ['Aït Benhaddou', 'Col du Tichka', 'Retour Marrakech vers 18h00'],
      nuit: null,
    },
  ],
  inclus: [
    '2 bivouacs (Chegaga, Merzouga)',
    "Nuits en auberge (dont l'Auberge de l'Oasis)",
    'Nuit en hôtel 3 étoiles à Ouarzazate',
  ],
  nonInclus: [],
  ficheComplete: false,
  notes:
    "⚠️ INCOHÉRENCE : annoncé 7 jours / 6 nuits, mais seuls les Jours 1 à 6 sont détaillés sur le site. Le Jour 7 manque. ⚠️ À FOURNIR : tarif, détail du Jour 7, véhicule, participants max, matériel fourni.",
}

/* ═══════════════════════════════════════════════════════════════
   ✅ RAID 04 — source : /raid-4x4-sur-mesure/
   ═══════════════════════════════════════════════════════════════ */
const surMesure: Raid = {
  slug: 'sur-mesure',
  nom: 'Sur mesure',
  nomSource: 'Raid 4x4 sur mesure',
  format: 'Sur mesure',
  duree: "D'une journée à 14 nuits",
  jours: 0,
  region: 'Tout le Maroc',
  terrain: 'Mixte',
  difficulte: 'Intermédiaire',
  distance: null,
  prixAPartirDe: null,
  depart: 'Marrakech · Agadir · Ouarzazate',
  accroche: 'Vous tracez. On ouvre la piste.',
  chapo:
    "Vous connaissez déjà une partie du Maroc et il ne vous a pas tout dévoilé. Vous voulez suivre les pistes mythiques du Dakar. Vous venez avec votre propre 4x4, votre moto, votre SSV, et vous avez juste besoin d'un guide et d'un véhicule d'accompagnement. Jean-Luc compose le tracé avec vous — d'un simple accompagnement jusqu'au tout compris.",
  image: media.surMesure,
  etapes: [],
  inclus: [
    'Conception du tracé avec Jean-Luc Miolane',
    "Organisation complète du raid, formule adaptée",
    "Possibilité de venir avec son propre véhicule (4x4, moto, SSV, buggy)",
    'Possibilité de location de véhicule sur place',
  ],
  nonInclus: [],
  ficheComplete: false,
  notes:
    "⚠️ À FOURNIR : grille tarifaire indicative par formule (accompagnement seul / semi / tout compris), véhicules de location disponibles.",
}

/* ═══════════════════════════════════════════════════════════════
   ✅ RAID 05 — source : /raids-4x4-pour-entreprises/
   ⚠️ INCOHÉRENCE SOURCE : « 20 ans d'expérience » sur cette page,
      « 25 ans » sur la page Circuits, « 45 ans » sur la page Guide,
      « plus de 10 ans » dans la meta-description. À unifier.
   ═══════════════════════════════════════════════════════════════ */
const entreprises: Raid = {
  slug: 'entreprises',
  nom: 'Entreprises',
  nomSource: 'Raids 4x4 pour entreprises',
  format: 'Entreprise',
  duree: 'Sur demande',
  jours: 0,
  region: 'Sud Maroc',
  terrain: 'Mixte',
  difficulte: 'Découverte',
  distance: null,
  prixAPartirDe: null,
  depart: 'Marrakech · Agadir · Ouarzazate',
  accroche: 'Une dune apprend plus vite qu’un séminaire.',
  chapo:
    "Incentive, team-building, voyage de récompense. Quatre participants maximum par véhicule, road-books tracés sur mesure, briefing quotidien avec description du parcours, des difficultés et contrôle des équipements. Salles de travail équipées quand il en faut. La sécurité n'est pas une option et le budget n'est pas un sujet tabou.",
  image: media.entreprise1,
  etapes: [],
  inclus: [
    'Occupation des 4x4 : 4 participants maximum (sécurité / confort)',
    'Road-books sur mesure et précis',
    'Briefings réguliers — minimum 1 par jour',
    'Description du parcours, des difficultés et conseils de sécurité',
    'Contrôle des équipements personnels',
    'Possibilité de salles de travail équipées',
  ],
  nonInclus: [],
  ficheComplete: false,
  notes: '⚠️ À FOURNIR : fourchette budgétaire, taille de groupe min/max, logos partenaires autorisés.',
}

/* ═══════════════════════════════════════════════════════════════
   ✅ RAID 06 — source : /3-excursions-4x4-a-marrakech/
   ⚠️ Le site annonce 3 excursions mais n'en détaille AUCUNE
      (« on ne va pas tout vous dire pour que vous puissiez découvrir »).
      Choix éditorial assumé côté client — on le respecte, mais on
      structure la fiche pour l'accueillir le jour où il se détaille.
   ═══════════════════════════════════════════════════════════════ */
const excursions: Raid = {
  slug: 'excursions-marrakech',
  nom: 'Excursions — 3 itinéraires au départ de Marrakech',
  nomSource: '3 excursions 4x4 à Marrakech',
  format: 'Journée',
  duree: '1 jour',
  jours: 1,
  region: 'Autour de Marrakech',
  terrain: 'Mixte',
  difficulte: 'Découverte',
  distance: null,
  prixAPartirDe: null,
  depart: 'Marrakech',
  accroche: 'Trois itinéraires. Vous choisissez. On ne dit pas tout.',
  chapo:
    "Pistes et hors-pistes, en mode tout terrain. Vous êtes à bord, Jean-Luc pilote. Des serpentins de pistes oubliées dans l'authenticité berbère, loin du tourisme de masse. Tarif unique et forfaitaire par circuit, pique-nique compris — que vous soyez une, deux ou trois personnes.",
  image: media.excursion,
  etapes: [],
  inclus: [
    'Pilotage assuré par Jean-Luc Miolane',
    'Pique-nique (déjeuner) compris dans le forfait',
    'Tarif unique par circuit — de 1 à 3 personnes',
    '4 personnes possible (3 sur la banquette arrière)',
    'Au-delà de 4 personnes : nous consulter',
  ],
  nonInclus: [],
  ficheComplete: false,
  notes:
    "⚠️ À FOURNIR : le montant du forfait unique, et — si le client le souhaite — le détail des 3 itinéraires. Le site actuel les garde volontairement secrets.",
}

export const raids: Raid[] = [oukaimeden, hautAtlas, boucleSud, surMesure, entreprises, excursions]

export const getRaid = (slug: string) => raids.find((r) => r.slug === slug)

/** Raids avec un itinéraire réellement détaillé — mis en avant en home. */
export const raidsAvecItineraire = raids.filter((r) => r.etapes.length > 0)

/* ─── FILTRES ─────────────────────────────────────────────────── */
export const filtres = {
  format: ['Journée', 'Court séjour', 'Expédition', 'Sur mesure', 'Entreprise'] as Format[],
  terrain: ['Montagne', 'Désert', 'Dunes', 'Mixte'] as Terrain[],
  difficulte: ['Découverte', 'Intermédiaire', 'Engagé'] as Difficulte[],
}

/**
 * ⚠️ À FOURNIR — SAISONNALITÉ
 * Le site actuel évoque « en tenant compte des saisons » sans jamais
 * préciser lesquelles. Le filtre saison est donc désactivé tant que
 * le client n'a pas indiqué les fenêtres praticables par région.
 */
export const filtreSaisonDisponible = false
