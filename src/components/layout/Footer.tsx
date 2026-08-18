import { Link } from 'react-router-dom'
import { site } from '@/data/site'

/**
 * FOOTER — maillage interne vers les 13 pages, en vrais <a href>.
 * Le NAP y est identique à la page Contact et au JSON-LD.
 */
const explorer = [
  { label: 'Circuits raid 4×4 au Maroc', href: '/circuits-raid-4x4-au-maroc/' },
  { label: 'Raid 4×4 sur mesure', href: '/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/' },
  { label: 'Raid 4×4 Marrakech', href: '/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/' },
  { label: 'Raids 4×4 pour entreprises', href: '/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/' },
  { label: 'Excursions 4×4 à Marrakech', href: '/circuits-raid-4x4-au-maroc/3-excursions-4x4-a-marrakech/' },
]

const savoir = [
  { label: 'Votre guide — Jean-Luc Miolane', href: '/guide-raids-4x4-maroc/' },
  { label: 'Découvrir le Maroc en 4×4', href: '/decouvrir-le-maroc-en-4x4/' },
  { label: 'Photos', href: '/photos-raids-4x4-maroc/' },
  { label: 'Témoignages', href: '/temoignages/' },
  { label: 'Partenaires', href: '/partenaires/' },
  { label: 'Actualité', href: '/actualite-raids-4x4-maroc/' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="container py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold tracking-tight">4X4</span>
              <span className="h-4 w-px bg-sand" aria-hidden />
              <span className="font-display text-2xl tracking-[0.2em] text-muted">RAID</span>
            </div>
            <p className="mt-5 max-w-measure-tight text-sm leading-relaxed text-muted">
              Raids 4×4 sur mesure au Maroc. Conception, repérage et accompagnement
              par Jean-Luc Miolane, installé sur place.
            </p>
            <p className="mt-5 font-display text-micro uppercase text-muted">
              Bases&nbsp;: {site.bases.join(' · ')}
            </p>
          </div>

          <nav aria-label="Explorer">
            <h2 className="font-display text-micro uppercase tracking-[0.22em] text-bone">Explorer</h2>
            <ul className="mt-5 space-y-3">
              {explorer.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="link-underline text-sm text-muted hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Savoir">
            <h2 className="font-display text-micro uppercase tracking-[0.22em] text-bone">Savoir</h2>
            <ul className="mt-5 space-y-3">
              {savoir.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="link-underline text-sm text-muted hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-micro uppercase tracking-[0.22em] text-bone">Contact</h2>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed text-muted">
              <p>{site.address.org}</p>
              <p>{site.address.line}</p>
              <p>{site.address.box}</p>
              <p>
                {site.address.city} — {site.address.country}
              </p>
            </address>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`tel:${site.phoneHref}`} className="link-underline block text-bone">
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="link-underline block text-bone">
                {site.email}
              </a>
            </div>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-5 inline-block font-display text-micro uppercase text-muted hover:text-bone"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-line" />

        <div className="flex flex-col gap-4 font-display text-micro uppercase text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {/* ⚠️ À FOURNIR : pages légales (mentions, CGV, confidentialité). */}
            <Link to="/contact/" className="link-underline">Contact</Link>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.22em] whitespace-nowrap text-center font-display text-[clamp(4rem,19vw,17rem)] font-bold leading-none tracking-tighter text-bone/[0.045]">
          4X4-RAID
        </p>
      </div>
    </footer>
  )
}
