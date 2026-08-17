/**
 * ─────────────────────────────────────────────────────────────────
 *  SOURCE DE VÉRITÉ — IDENTITÉ & CONTACT
 *  Toutes les données de ce fichier sont VÉRIFIÉES sur 4x4-raid.com
 *  (pages Accueil, Contact, Guide, Entreprises — consultées 08/2026).
 *  Aucune information inventée.
 * ─────────────────────────────────────────────────────────────────
 */

export const site = {
  name: '4x4-raid',
  legalName: 'Africamiol & J.L.M Organisations',
  url: 'https://4x4-raid.com',
  locale: 'fr-FR',

  /** ✅ RÉEL — page Contact */
  contact: {
    email: 'info@4x4-raid.com',
    phoneDisplay: '00 212 661 08 55 50',
    phoneHref: '+212661085550',
    whatsapp: '+212661085550', // ⚠️ À CONFIRMER : le numéro est-il joignable sur WhatsApp ?
  },

  /** ✅ RÉEL — page Contact */
  address: {
    line1: 'Jean-Luc Miolane Organisation',
    line2: 'Douar Sugtana / Agafay — Marrakech',
    line3: 'BP 21042 – AZLI',
    line4: '40019 Marrakech — MAROC',
  },

  /** ✅ RÉEL — footer du site actuel */
  bases: ['Laayoune', 'Ouarzazate', 'Marrakech'],

  /** ✅ RÉEL — title & meta du site actuel */
  departures: ['Marrakech', 'Agadir', 'Ouarzazate'],

  /** ✅ RÉEL — seul réseau social présent sur le site */
  social: [{ label: 'Facebook', href: 'https://www.facebook.com/4x4-raid-111521127239727/' }],
  // ⚠️ À FOURNIR : Instagram / YouTube si les comptes existent.

  /** ✅ RÉEL — page Guide : « s'engage à vous recontacter dans les 36 heures » */
  responseTime: '36 h',
} as const

/** Navigation principale — architecture repensée (voir AUDIT). */
export const nav = [
  { label: 'Raids', href: '/raids' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Expériences', href: '/experiences' },
  { label: 'Véhicules', href: '/vehicules' },
  { label: 'Le Guide', href: '/le-guide' },
  { label: 'Contact', href: '/contact' },
] as const

export const footerNav = {
  explorer: [
    { label: 'Tous les raids', href: '/raids' },
    { label: 'Raid sur mesure', href: '/raids/sur-mesure' },
    { label: 'Raids entreprises', href: '/raids/entreprises' },
    { label: 'Excursions à la journée', href: '/raids/excursions-marrakech' },
    { label: 'Destinations', href: '/destinations' },
  ],
  savoir: [
    { label: 'Le Guide — Jean-Luc Miolane', href: '/le-guide' },
    { label: 'Expériences', href: '/experiences' },
    { label: 'Véhicules', href: '/vehicules' },
    { label: 'Infos pratiques Maroc', href: '/le-guide#pratique' },
    { label: 'Témoignages', href: '/le-guide#temoignages' },
    { label: 'Questions fréquentes', href: '/#faq' },
  ],
} as const

/**
 * ✅ RÉEL — page Guide raids 4x4 Maroc, section « Notre philosophie ».
 * Reformulé pour la voix de marque, sens conservé à l'identique.
 */
export const philosophie = [
  {
    index: '01',
    title: 'Professionnalisme',
    body: "Vous méritez mieux qu'un prix. On analyse d'abord ce que vous voulez vraiment vivre, puis on construit une prestation calibrée sur votre niveau et vos exigences.",
  },
  {
    index: '02',
    title: 'Sens du service',
    body: "L'équipe est disponible tous les jours et s'engage à vous recontacter dans les 36 heures. Pas de formulaire dans le vide.",
  },
  {
    index: '03',
    title: "Esprit d'innovation",
    body: "L'aventure ne se vit pas dans les guides. On ouvre des parcours inédits, repérés et remis à jour en permanence sur le terrain.",
  },
] as const

/** ✅ RÉEL — mots-clés d'ambiance issus des pages Contact & Circuits. */
export const terrainWords = [
  'Atlas',
  'Déserts',
  'Canyons',
  'Pistes',
  'Hors-pistes',
  'Oueds',
  'Oasis',
  'Sable',
  'Dunes',
  'Pistes côtières',
  'Plages',
  'Bivouacs',
] as const
