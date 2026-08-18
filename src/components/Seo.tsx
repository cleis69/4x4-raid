import { Head } from 'vite-react-ssg'
import { site } from '@/data/site'
import type { PageSeo } from '@/data/seo'

/**
 * ─────────────────────────────────────────────────────────────────
 *  SEO — métadonnées rendues DANS L'ARBRE, pas via useEffect
 *
 *  ⚠️ POINT CRITIQUE DU PRÉRENDU
 *  Un `useEffect` ne s'exécute jamais pendant la génération statique :
 *  il n'y a pas de navigateur au build. Des métadonnées posées via
 *  useEffect seraient donc ABSENTES du HTML servi — exactement le
 *  défaut qu'on cherche à corriger.
 *
 *  <Head> de vite-react-ssg remonte ses enfants dans le <head> à la
 *  fois au build et à la navigation côté client. Le title, la
 *  description, le canonical et le JSON-LD sont donc dans le fichier
 *  HTML, lisibles par Google sans exécuter une ligne de script.
 * ─────────────────────────────────────────────────────────────────
 */

type Props = {
  seo: PageSeo
  /** Données structurées propres à la page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/** Balisage de l'organisation, présent sur toutes les pages. */
const organisationLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: '4x4-raid',
  alternateName: 'Africamiol & J.L.M Organisations',
  url: site.url,
  email: site.email,
  telephone: '+212661085550',
  founder: { '@type': 'Person', name: 'Jean-Luc Miolane' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Douar Sugtana / Agafay — BP 21042 AZLI',
    postalCode: '40019',
    addressLocality: 'Marrakech',
    addressCountry: 'MA',
  },
  areaServed: { '@type': 'Country', name: 'Maroc' },
  sameAs: [site.facebook],
}

export function Seo({ seo, jsonLd }: Props) {
  const canonical = site.url + seo.path
  const ogImage = seo.ogImage ? site.url + seo.ogImage : undefined

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="4x4-raid.com" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />

      <script type="application/ld+json">{JSON.stringify(organisationLd)}</script>
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Head>
  )
}
