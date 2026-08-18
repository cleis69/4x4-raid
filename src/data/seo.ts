/**
 * ─────────────────────────────────────────────────────────────────
 *  MÉTADONNÉES SEO — une entrée par URL, verbatim de l'existant
 *
 *  Source : INVENTAIRE-SEO.md, relevé sur 4x4-raid.com.
 *  Les URLs reproduisent EXACTEMENT celles de WordPress, slash final
 *  compris. Ne jamais les modifier : le site est déjà positionné.
 *
 *  Les descriptions tronquées en plein mot ont été complétées
 *  (marqué « complété »). Aucun title n'a été raccourci.
 * ─────────────────────────────────────────────────────────────────
 */

export type PageSeo = {
  path: string
  title: string
  description: string
  ogImage?: string
}

export const SEO = {
  home: {
    path: '/',
    title: '4x4-raid Maroc, Marrakech, Agadir, Ouarzazate - 4x4-raid.com',
    description:
      'Découvrez les raids de 4x4-raid au Maroc. Africamiol vous compose votre raid sur mesure également en entreprises. Au départ de Marrakech, Agadir, Ouarzazate.',
    ogImage: '/media/hero-piste-coucher-soleil.jpg',
  },
  circuits: {
    path: '/circuits-raid-4x4-au-maroc/',
    title: 'Circuits Raid 4x4 au Maroc - 4x4-raid.com',
    // complété : l'originale s'arrêtait sur « Agadir ou »
    description:
      'Découvrez nos circuits pour un raid 4x4 au Maroc. En direct ou en boucle, nous organisons votre raid 4x4 au Maroc sur mesure au départ de Marrakech, Agadir ou Ouarzazate.',
    ogImage: '/media/hero-piste-coucher-soleil.jpg',
  },
  surMesure: {
    path: '/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/',
    title: 'Raid 4x4 sur mesure - 4x4-raid.com',
    description:
      'Découvrez nos circuits pour votre raid 4x4 sur mesure au Maroc. Nous organisons votre raid selon vos désirs et capacités.',
    ogImage: '/media/sur-mesure-piste-sable.jpg',
  },
  entreprises: {
    path: '/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/',
    title: 'Raids 4x4 pour entreprises - 4x4-raid.com',
    description:
      "Notre expérience nous permet d'être à votre écoute et d'organiser vos Raids 4x4 pour entreprises au Maroc sur mesure : incentive, team-building, séminaires.",
    ogImage: '/media/entreprise-convoi.jpg',
  },
  marrakech: {
    path: '/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/',
    title: 'Raid 4x4 Marrakech - 4x4-raid.com',
    description:
      "D'une journée à 14 nuits, Jean-Luc vous compose vos circuits Raid 4x4 Marrakech sur mesure. Savourez votre raid par les pistes oubliées et hors des sentiers battus.",
    ogImage: '/media/atlas-piste-montagne.jpg',
  },
  excursions: {
    path: '/circuits-raid-4x4-au-maroc/3-excursions-4x4-a-marrakech/',
    title: '3 excursions 4x4 à Marrakech - 4x4-raid.com',
    description:
      'Aux choix. 3 excursions 4x4 à Marrakech. Pistes et hors pistes. En mode tout Terrain. Vous serez à bord du 4x4 piloté par Jean-Luc qui aime partager sa passion.',
    ogImage: '/media/excursion-journee.jpg',
  },
  guide: {
    path: '/guide-raids-4x4-maroc/',
    title: 'Guide raids 4x4 Maroc, Marrakech, Agadir, Ouarzazate - 4x4-raid.com',
    // aligné sur 45 ans (décision client ; l'originale disait 30)
    description:
      "C'est Jean-Luc qui sera votre guide raids 4×4 à travers le Maroc. Plus de 45 ans d'expérience des Raids, il est surnommé le Renard du Désert.",
    ogImage: '/media/guide-jean-luc.jpg',
  },
  decouvrir: {
    path: '/decouvrir-le-maroc-en-4x4/',
    title: 'Découvrir le Maroc en 4x4 - 4x4-raid.com',
    description:
      'Découvrir le Maroc en 4x4, SSV, Buggy, et Moto. Sa nature encore préservée permet de très belles sorties en 4×4 avec des vues à couper le souffle.',
    ogImage: '/media/desert-etendue.jpg',
  },
  actualite: {
    path: '/actualite-raids-4x4-maroc/',
    title: 'Actualité raids 4x4 Maroc - 4x4-raid.com',
    // remplace « facebook », qui était la description d'origine
    description:
      "Actualités des raids 4x4 de 4x4-raid au Maroc : nouveaux parcours, bivouacs et récits d'aventure au départ de Marrakech.",
    ogImage: '/media/atlas-paysage.jpg',
  },
  photos: {
    path: '/photos-raids-4x4-maroc/',
    title: 'Photos Raids 4x4 Maroc - 4x4-raid.com',
    description:
      'Photos Raids 4x4 Maroc. Découvrez les photos de nos Raids 4x4 au Maroc prises par nos clients et inspirez vous pour créer votre aventure sur mesure.',
    ogImage: '/media/dunes-franchissement.jpg',
  },
  temoignages: {
    path: '/temoignages/',
    title: 'Témoignages - 4x4-raid.com',
    description:
      "Témoignages de nos clients après leur raid 4x4 au Maroc avec Jean-Luc Miolane, le Renard du Désert : L'Oréal, Bardahl, et de nombreux voyageurs.",
    ogImage: '/media/panorama-sud.jpg',
  },
  partenaires: {
    path: '/partenaires/',
    title: 'Partenaires 4x4-raid - 4x4-raid.com',
    description:
      "Les partenaires de 4x4-raid : Prestige Voyages, Mauritiusveo, USAVeo, ChinaVeo, SeychellesVeo. Des créateurs de voyages sur mesure et d'exception.",
  },
  contact: {
    path: '/contact/',
    title: 'Contact - 4x4-raid.com',
    // complété : l'originale s'arrêtait sur « d'Atlas, »
    description:
      "Installés au Maroc depuis plus de 25 ans et étant sur place, nous avons les meilleurs ingrédients pour les plus belles aventures d'Atlas, de déserts et de dunes. Contactez Jean-Luc Miolane.",
    ogImage: '/media/sur-mesure-piste-sable.jpg',
  },
} satisfies Record<string, PageSeo>

/** Les 13 URLs à prérendre au build. */
export const ALL_PATHS = Object.values(SEO).map((s) => s.path)
