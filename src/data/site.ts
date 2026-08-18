/**
 * IDENTITÉ & NAVIGATION
 *
 * Le NAP (nom / adresse / téléphone) doit rester STRICTEMENT identique
 * partout — footer, page contact, JSON-LD, Google Business Profile.
 * Toute variation affaiblit le référencement local.
 */
export const site = {
  name: '4x4-raid',
  legalName: 'Africamiol & J.L.M Organisations',
  url: 'https://4x4-raid.com',
  email: 'info@4x4-raid.com',
  phoneDisplay: '00 212 661 08 55 50',
  phoneHref: '+212661085550',
  facebook: 'https://www.facebook.com/4x4-raid-111521127239727/',
  responseTime: '36 heures',
  address: {
    org: 'Jean-Luc Miolane Organisation',
    line: 'Douar Sugtana / Agafay — Marrakech',
    box: 'BP 21042 – AZLI',
    city: '40019 Marrakech',
    country: 'MAROC',
  },
  bases: ['Laayoune', 'Ouarzazate', 'Marrakech'],
  departures: ['Marrakech', 'Agadir', 'Ouarzazate'],
} as const

export type NavItem = {
  label: string
  href: string
  children?: readonly { label: string; href: string }[]
}

/**
 * Navigation — reproduit l'arborescence WordPress et ses URLs.
 * Chaque entrée est un vrai <Link> rendu en <a href> : maillage
 * interne intact pour le crawl.
 */
export const nav: readonly NavItem[] = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Raids 4×4',
    href: '/circuits-raid-4x4-au-maroc/',
    children: [
      { label: 'Sur mesure', href: '/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/' },
      { label: 'Pour entreprises', href: '/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/' },
      { label: 'Départ de Marrakech', href: '/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/' },
    ],
  },
  { label: 'Excursions 4×4', href: '/circuits-raid-4x4-au-maroc/3-excursions-4x4-a-marrakech/' },
  { label: 'Votre guide', href: '/guide-raids-4x4-maroc/' },
  {
    label: 'Informations',
    href: '/decouvrir-le-maroc-en-4x4/',
    children: [
      { label: 'Découvrir le Maroc en 4×4', href: '/decouvrir-le-maroc-en-4x4/' },
      { label: 'Actualités', href: '/actualite-raids-4x4-maroc/' },
      { label: 'Photos', href: '/photos-raids-4x4-maroc/' },
      { label: 'Témoignages', href: '/temoignages/' },
      { label: 'Partenaires', href: '/partenaires/' },
    ],
  },
  { label: 'Contact', href: '/contact/' },
]

/** Termes de terrain cités sur la page Contact — bandeau défilant. */
export const terrainWords = [
  'Atlas', 'Déserts', 'Canyons', 'Pistes', 'Hors-pistes', 'Oueds',
  'Oasis', 'Sable', 'Dunes', 'Pistes côtières', 'Plages', 'Bivouacs',
] as const
