/**
 * ─────────────────────────────────────────────────────────────────
 *  MÉDIAS
 *  Les URL pointent vers les photos RÉELLES de 4x4-raid.com.
 *
 *  ⚠️ AVANT MISE EN PRODUCTION :
 *  1. Récupérer les fichiers originaux auprès du photographe.
 *  2. Ré-exporter en AVIF + WebP (fallback JPG), 3 largeurs :
 *     640 / 1280 / 1920 px.
 *  3. Les déposer dans /public/media/ et remplacer les URL ici.
 *  Tant que ce fichier pointe vers le CDN WordPress, le site
 *  dépend de l'ancien hébergement et Lighthouse restera pénalisé.
 * ─────────────────────────────────────────────────────────────────
 */

const CDN = 'https://4x4-raid.com/wp-content/uploads'

export type Media = {
  src: string
  alt: string
  /** Ratio d'origine, utilisé pour réserver la place et éviter tout CLS. */
  ratio: `${number}/${number}`
}

/** ✅ RÉEL — photos publiées sur 4x4-raid.com (page Photos, Circuits, Guide). */
export const media = {
  heroPoster: {
    src: `${CDN}/Canon6D_Michael_16909-scaled.jpg`,
    alt: "4x4 en progression sur une piste du Sud marocain au coucher du soleil",
    ratio: '3/2',
  },
  dunes: {
    src: `${CDN}/2020/05/Canon6D_Michael_16895-scaled.jpg`,
    alt: 'Franchissement de dunes lors d’un raid 4x4 dans le désert marocain',
    ratio: '3/2',
  },
  surMesure: {
    src: `${CDN}/2020/04/Canon6D_Michael_16942-scaled.jpg`,
    alt: 'Raid 4x4 sur mesure au Maroc, véhicule sur piste sablonneuse',
    ratio: '3/2',
  },
  atlas: {
    src: `${CDN}/Canon6D_Michael_15482-scaled.jpg`,
    alt: 'Piste de montagne du Haut-Atlas parcourue en 4x4 au départ de Marrakech',
    ratio: '3/2',
  },
  atlas2: {
    src: `${CDN}/Canon6D_Michael_15545-scaled.jpg`,
    alt: 'Circuit raid 4x4 dans les reliefs de l’Atlas marocain',
    ratio: '3/2',
  },
  atlas3: {
    src: `${CDN}/Canon6D_Michael_15558-scaled.jpg`,
    alt: 'Véhicule tout-terrain sur une piste oubliée de l’Atlas',
    ratio: '3/2',
  },
  atlas4: {
    src: `${CDN}/Canon6D_Michael_15617-scaled.jpg`,
    alt: 'Paysage de piste marocaine traversé lors d’un raid 4x4',
    ratio: '3/2',
  },
  paysage: {
    src: `${CDN}/Canon6D_Michael_15957-scaled-1024x683.jpg`,
    alt: 'Panorama du Sud marocain depuis un circuit raid 4x4',
    ratio: '3/2',
  },
  decouvrir: {
    src: `${CDN}/Canon6D_Michael_16631-scaled.jpg`,
    alt: 'Découvrir le Maroc en 4x4 : étendue désertique et relief',
    ratio: '3/2',
  },
  guide: {
    src: `${CDN}/GoPro_MSC_1581-scaled.jpg`,
    alt: 'Jean-Luc Miolane, guide de raids 4x4 au Maroc, au volant sur piste',
    ratio: '4/3',
  },
  entreprise1: {
    src: `${CDN}/2020/05/MG_1614-scaled.jpg`,
    alt: 'Raid 4x4 entreprise au Maroc : convoi de véhicules en formation',
    ratio: '3/2',
  },
  entreprise2: {
    src: `${CDN}/2020/05/MG_1533-scaled.jpg`,
    alt: 'Séminaire incentive en 4x4 dans le désert marocain',
    ratio: '3/2',
  },
  excursion: {
    src: `${CDN}/2020/04/Canon6D_Michael_15486-scaled.jpg`,
    alt: 'Excursion 4x4 à la journée au départ de Marrakech',
    ratio: '3/2',
  },
  logo: {
    src: `${CDN}/Logo-4x4-raid-by-africamiol.png`,
    alt: '4x4-raid by Africamiol',
    ratio: '300/56',
  },
} satisfies Record<string, Media>

/** Galerie éditoriale — uniquement des visuels réels du site. */
export const galerie: Media[] = [
  media.heroPoster,
  media.atlas,
  media.dunes,
  media.atlas2,
  media.decouvrir,
  media.atlas3,
  media.surMesure,
  media.paysage,
  media.atlas4,
]

/**
 * ⚠️ À FOURNIR — VIDÉO
 * Le site actuel annonce « VIDEO disponible bientôt » : aucune vidéo n'existe.
 * Dès qu'un film est disponible, renseigner ci-dessous et le Hero bascule
 * automatiquement de la photo vers la vidéo (voir components/sections/Hero.tsx).
 *
 * Cahier des charges recommandé :
 *  — 12 à 20 s, boucle propre, sans coupe brutale
 *  — H.264 .mp4 (< 3 Mo) + .webm, 1920×1080, sans audio
 *  — plans : roues dans le sable, crête de dune, silhouette du 4x4 à contre-jour
 */
export const heroVideo: { mp4?: string; webm?: string } = {
  mp4: undefined,
  webm: undefined,
}
