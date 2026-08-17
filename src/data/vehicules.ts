import { media, type Media } from './medias'

/**
 * ─────────────────────────────────────────────────────────────────
 *  VÉHICULES
 *
 *  ⚠️ AVERTISSEMENT IMPORTANT
 *  Le site actuel ne nomme AUCUN véhicule : ni marque, ni modèle,
 *  ni motorisation, ni transmission, ni équipement. Il mentionne
 *  seulement quatre CATÉGORIES d'engins et le fait qu'on peut venir
 *  avec le sien ou en louer un sur place.
 *
 *  Le brief demandait « chaque véhicule présenté comme un produit
 *  automobile ». C'est impossible sans inventer une flotte.
 *  Ce fichier structure donc les catégories réelles, et chaque
 *  caractéristique technique vaut `null` — l'interface affiche alors
 *  un placeholder explicite au lieu d'une donnée fabriquée.
 *
 *  Dès que le client remplit `specs`, la page devient une vraie
 *  fiche produit sans aucune modification de code.
 *  Voir CONTENU-A-FOURNIR.md § 9.
 * ─────────────────────────────────────────────────────────────────
 */

export type Spec = {
  label: string
  /** null = donnée absente du site actuel → placeholder affiché. */
  value: string | null
}

export type Vehicule = {
  id: string
  /** Catégorie réelle, citée sur 4x4-raid.com. */
  nom: string
  role: string
  accroche: string
  texte: string
  /** ✅ Éléments réellement documentés sur le site actuel. */
  faits: string[]
  /** ⚠️ Caractéristiques techniques — toutes à fournir. */
  specs: Spec[]
  image: Media
}

const specsVides = (): Spec[] => [
  { label: 'Modèle', value: null },
  { label: 'Motorisation', value: null },
  { label: 'Transmission', value: null },
  { label: 'Boîte', value: null },
  { label: 'Capacité', value: null },
  { label: 'Équipement spécifique', value: null },
]

export const vehicules: Vehicule[] = [
  {
    id: '4x4',
    nom: '4x4',
    role: 'Le socle',
    accroche: 'Celui qui porte le raid.',
    texte:
      "Le véhicule de référence. C'est lui qui franchit les dunes, traverse les oueds et encaisse deux cent quarante kilomètres de piste dans la journée. Sur les opérations d'entreprise, quatre participants maximum par voiture — pour la sécurité comme pour le confort.",
    faits: [
      '4 participants maximum par véhicule sur les formats entreprise',
      'Road-book sur mesure fourni',
      'Briefing quotidien avant départ',
      "Véhicule d'accompagnement sur les raids",
    ],
    specs: specsVides(),
    image: media.surMesure,
  },
  {
    id: 'moto',
    nom: 'Moto',
    role: "L'engagement",
    accroche: 'Le hors-piste sans carrosserie.',
    texte:
      "Pour ceux qui veulent le terrain sans filtre. La formule peut se limiter à l'accompagnement : vous venez avec votre machine, Jean-Luc ouvre la piste et le véhicule de suivi ferme la marche.",
    faits: [
      'Venue avec votre propre machine possible',
      "Accompagnement seul possible (guide + véhicule de suivi)",
      'Itinéraires composés sur mesure',
    ],
    specs: specsVides(),
    image: media.dunes,
  },
  {
    id: 'ssv',
    nom: 'SSV',
    role: 'Le compromis',
    accroche: "L'agilité, sans renoncer à l'arceau.",
    texte:
      "Entre le quad et le 4x4. Une réponse aux terrains techniques où l'encombrement d'une voiture devient un handicap, mais où l'on ne veut pas rouler sans structure.",
    faits: ['Venue avec votre propre SSV possible', 'Location sur place envisageable'],
    specs: specsVides(),
    image: media.atlas3,
  },
  {
    id: 'buggy',
    nom: 'Buggy',
    role: 'Le sable',
    accroche: 'Léger. Taillé pour les ergs.',
    texte:
      "Le rapport poids/motricité qui change tout dans le sable mou. C'est l'engin des ergs et du franchissement de dunes.",
    faits: ['Venue avec votre propre buggy possible', 'Location sur place envisageable'],
    specs: specsVides(),
    image: media.decouvrir,
  },
]

export const getVehicule = (id: string) => vehicules.find((v) => v.id === id)

/**
 * ✅ RÉEL — deux formules de mise à disposition, mentionnées
 * explicitement sur les pages Sur mesure et Circuits.
 */
export const formules = [
  {
    titre: 'Vous venez avec le vôtre',
    texte:
      "4x4, moto, SSV ou buggy personnel. La prestation peut se limiter à l'accompagnement : un guide qui connaît le terrain, un véhicule de suivi, et un tracé composé avec vous.",
  },
  {
    titre: 'Vous louez sur place',
    texte:
      "Pas de véhicule, ou pas envie de traverser l'Europe au volant. Une location sur place est possible — les modèles disponibles et les conditions sont confirmés au moment du devis.",
  },
] as const
