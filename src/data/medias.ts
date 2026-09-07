/**
 * ─────────────────────────────────────────────────────────────────
 *  CATALOGUE PHOTOGRAPHIQUE
 *
 *  Source unique de vérité pour toutes les images du site. Une photo
 *  n'est jamais référencée par son chemin dans un composant : on
 *  référence sa CLÉ, et le composant <Picture> en dérive le srcset.
 *
 *  ── Pourquoi ce fichier existe ────────────────────────────────
 *
 *  1. Le `sizes` sans `srcset` ne sert à rien. C'était le défaut de
 *     la version précédente : un unique JPEG de 1920 px était servi
 *     à tout le monde, téléphone compris. Ici chaque photo existe en
 *     trois largeurs WebP et le navigateur choisit.
 *
 *  2. Les dimensions intrinsèques sont déclarées. Sans elles le
 *     navigateur ne peut pas réserver la place de l'image avant de
 *     l'avoir chargée — c'est la première cause de CLS.
 *
 *  3. Le `alt` vit avec la photo, pas avec la page. Une même image
 *     réutilisée ailleurs garde une description correcte, et on ne
 *     retrouve plus de noms de fichiers en guise d'alternative
 *     textuelle (défaut relevé sur l'ancien site).
 *
 *  ── Format ────────────────────────────────────────────────────
 *
 *  WebP uniquement. Supporté par tous les navigateurs depuis 2020
 *  (Safari 14). Le repli JPEG n'est conservé que pour les images
 *  servies en `og:image` : certains robots de réseaux sociaux ne
 *  décodent toujours pas le WebP. Voir `ogJpeg`.
 *
 *  Les fichiers sont produits par `scripts/telecharger-medias.sh`
 *  depuis les originaux 2560 px de la médiathèque d'origine.
 * ─────────────────────────────────────────────────────────────────
 */

export type Media = {
  /** Largeurs disponibles, en pixels, dans l'ordre croissant. */
  widths: readonly number[]
  /** Dimensions de la plus grande variante — réservent la place. */
  w: number
  h: number
  /** Alternative textuelle rédigée. Jamais un nom de fichier. */
  alt: string
  /** Un repli JPEG 1200 px existe (image utilisable en og:image). */
  ogJpeg?: true
}

const L = [640, 1280, 1920] as const // paysage
const V = [480, 900, 1400] as const // portrait

export const MEDIAS = {
  /* ── Sable et dunes ─────────────────────────────────────────── */
  'dunes-lever-soleil': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: "Deux 4×4 à l'assaut d'un cordon de dunes au lever du soleil, lors d'un raid 4×4 au Maroc",
  },
  'piste-coucher-soleil': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: '4×4 en progression sur une piste du Sud marocain au coucher du soleil',
  },
  'dune-descente': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: "Descente d'une grande dune de sable en 4×4 dans le désert marocain",
  },
  'dune-crete': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: '4×4 progressant sur la crête d’une dune au soleil rasant',
  },
  'dunes-franchissement': {
    widths: L, w: 1920, h: 1281,
    alt: 'Franchissement de dunes en 4×4 lors d’un raid dans le Sud marocain',
  },
  'dunes-ciel-bleu': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: 'Cordon de dunes orangées sous un ciel bleu, terrain de jeu des raids 4×4 au Maroc',
  },
  'erg-dunes': {
    widths: L, w: 1920, h: 1281,
    alt: 'Grandes dunes de l’erg marocain modelées par le vent',
  },
  'dune-marcheur': {
    widths: L, w: 1920, h: 1281,
    alt: 'Marcheur sur la crête d’une dune : l’échelle du désert marocain',
  },
  'erg-vue-plongeante': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: 'Vue plongeante sur un erg du Sud marocain et un bivouac au loin',
  },
  'bivouac-dunes-crepuscule': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: 'Bivouac installé au pied des dunes à la tombée du jour, pendant un raid 4×4',
  },
  'empreinte-sable': {
    widths: L, w: 1920, h: 1080,
    alt: 'Empreinte de pas dans le sable ridé du désert marocain',
  },

  /* ── Déserts, plateaux et pistes ────────────────────────────── */
  'desert-etendue': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: 'Immense plaine désertique du Maroc traversée par un 4×4',
  },
  'plateau-rocailleux': {
    widths: L, w: 1920, h: 1281,
    alt: 'Vaste plateau rocailleux du Sud marocain parcouru en 4×4',
  },
  'acacias-contre-jour': {
    widths: L, w: 1920, h: 1281,
    alt: 'Acacias et 4×4 à contre-jour sur une piste du désert marocain',
  },
  'convoi-poussiere': {
    widths: L, w: 1920, h: 1281,
    alt: 'Convoi de 4×4 soulevant la poussière sur une plaine désertique',
  },
  'piste-sable-parebrise': {
    widths: L, w: 1920, h: 1281,
    alt: 'Piste de sable vue depuis le pare-brise du 4×4, véhicules en tête',
  },
  'route-plateau': {
    widths: L, w: 1920, h: 1281,
    alt: 'Route sinueuse traversant un plateau aride du Sud marocain',
  },
  'route-hamada': {
    widths: L, w: 1920, h: 1281,
    alt: 'Route rectiligne au milieu de la hamada, un 4×4 à l’horizon',
  },

  /* ── Atlas, oueds et villages ───────────────────────────────── */
  'piste-montagne-retroviseur': {
    widths: L, w: 1920, h: 1281,
    alt: 'Piste de montagne de l’Atlas vue depuis le 4×4, rétroviseur au premier plan',
  },
  'oued-traversee': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: '4×4 traversant un oued en eau au bord d’une palmeraie marocaine',
  },
  'oued-vallee-verte': {
    widths: L, w: 1920, h: 1281,
    alt: '4×4 dans le lit d’un oued, au cœur d’une vallée verdoyante de l’Atlas',
  },
  'village-berbere-piste': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: 'Deux 4×4 sur une piste bordant un village berbère du Haut-Atlas',
  },
  'pause-piste-atlas': {
    widths: L, w: 1920, h: 1281,
    alt: 'Pause sur une piste caillouteuse de l’Atlas pendant un raid 4×4',
  },
  'oasis-palmeraie': {
    widths: L, w: 1920, h: 1440, ogJpeg: true,
    alt: '4×4 stationnés à l’ombre d’une palmeraie lors d’une étape de raid',
  },

  /* ── Groupes et entreprises ─────────────────────────────────── */
  'convoi-atlas-enneige': {
    widths: L, w: 1920, h: 1281, ogJpeg: true,
    alt: 'Convoi de 4×4 à l’arrêt sur une piste de l’Atlas, sommets enneigés en fond',
  },
  'groupe-prairie-atlas': {
    widths: L, w: 1920, h: 1281,
    alt: 'Participants et véhicules réunis en prairie lors d’un raid 4×4 pour entreprises',
  },
  'equipe-briefing-plateau': {
    widths: L, w: 1920, h: 1440, ogJpeg: true,
    alt: 'Briefing de l’équipe sur un plateau avant le départ d’un raid 4×4',
  },
  'montee-terre-rouge': {
    widths: L, w: 1920, h: 1282,
    alt: '4×4 en montée sur une pente de terre rouge lors d’un raid entreprise',
  },
  'groupe-vehicules-atlas': {
    widths: [640, 1280], w: 1280, h: 960,
    alt: 'Groupe de participants devant les 4×4, sommets de l’Atlas enneigés',
  },

  /* ── Formats portrait ───────────────────────────────────────── */
  'gorge-village-atlas': {
    widths: V, w: 1400, h: 1867,
    alt: 'Gorge rocheuse de l’Atlas dominant un village de vallée',
  },
  'ruelle-kasbah-convoi': {
    widths: V, w: 1400, h: 2100,
    alt: 'Convoi de 4×4 progressant dans la ruelle de terre d’un ksar marocain',
  },
  'dakar-vehicule': {
    widths: V, w: 1400, h: 2489,
    alt: 'Véhicule de rallye-raid sur les pistes mythiques du Dakar au Maroc',
  },
} as const satisfies Record<string, Media>

export type MediaKey = keyof typeof MEDIAS

/** Chemin de la plus grande variante — pour un preload ou un fallback. */
export function mediaSrc(key: MediaKey): string {
  const m = MEDIAS[key]
  return `/media/${key}-${m.widths[m.widths.length - 1]}.webp`
}

/** srcset complet : le navigateur choisit selon `sizes` et son écran. */
export function mediaSrcSet(key: MediaKey): string {
  return MEDIAS[key].widths.map((w) => `/media/${key}-${w}.webp ${w}w`).join(', ')
}

/**
 * Chemin du repli JPEG, réservé à `og:image`.
 * Les images sans `ogJpeg` ne doivent pas être utilisées comme telles.
 */
export function ogImage(key: MediaKey): string {
  return `/media/${key}.jpg`
}
