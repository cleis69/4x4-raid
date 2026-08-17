import { Link } from 'react-router-dom'
import { site, footerNav } from '@/data/site'
import { Rule } from '@/components/ui/Primitives'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="container py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Identité */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold tracking-tight">4X4</span>
              <span className="h-4 w-px bg-sand" aria-hidden />
              <span className="font-display text-2xl tracking-[0.2em] text-muted">RAID</span>
            </div>
            <p className="mt-5 max-w-measure-tight text-sm leading-relaxed text-muted">
              Raids 4x4 sur mesure au Maroc. Conception, repérage et accompagnement par
              Jean-Luc Miolane, installé sur place.
            </p>
            <p className="mt-5 font-display text-micro uppercase text-muted">
              Bases&nbsp;: {site.bases.join(' · ')}
            </p>
          </div>

          <FooterCol title="Explorer" links={footerNav.explorer} />
          <FooterCol title="Savoir" links={footerNav.savoir} />

          {/* Contact */}
          <div>
            <h2 className="font-display text-micro uppercase tracking-[0.22em] text-bone">Contact</h2>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed text-muted">
              <p>{site.address.line1}</p>
              <p>{site.address.line2}</p>
              <p>{site.address.line3}</p>
              <p>{site.address.line4}</p>
            </address>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`tel:${site.contact.phoneHref}`} className="link-underline block text-bone">
                {site.contact.phoneDisplay}
              </a>
              <a href={`mailto:${site.contact.email}`} className="link-underline block text-bone">
                {site.contact.email}
              </a>
            </div>
            <div className="mt-5 flex gap-5">
              {site.social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline font-display text-micro uppercase text-muted hover:text-bone"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Rule className="my-10" />

        <div className="flex flex-col gap-4 font-display text-micro uppercase text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {/* ⚠️ À FOURNIR : pages légales (mentions, CGV, confidentialité). */}
            <Link to="/mentions-legales" className="link-underline">Mentions légales</Link>
            <Link to="/cgv" className="link-underline">CGV</Link>
            <Link to="/confidentialite" className="link-underline">Confidentialité</Link>
          </div>
        </div>
      </div>

      {/* Signature typographique — grande, discrète, coupée par le bas */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.22em] whitespace-nowrap text-center font-display text-[clamp(4rem,19vw,17rem)] font-bold leading-none tracking-tighter text-bone/[0.045]">
          4X4-RAID
        </p>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-micro uppercase tracking-[0.22em] text-bone">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link to={l.href} className="link-underline text-sm text-muted hover:text-bone">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
