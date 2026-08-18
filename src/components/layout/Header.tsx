import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nav, site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * NAVIGATION — transparente sur le hero, compacte au scroll.
 *
 * Tous les liens sont de vrais <Link> rendus en <a href> : le maillage
 * interne est intact pour le crawl, y compris les sous-menus, qui
 * existent dans le DOM même fermés.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menu, setMenu] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 400 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenu(false)
    setOpen(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menu])

  const active = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''))

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-sand focus:px-4 focus:py-2 focus:font-display focus:text-micro focus:uppercase focus:text-ink"
      >
        Aller au contenu
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-raid',
          hidden && !menu ? '-translate-y-full' : 'translate-y-0',
          scrolled || menu
            ? 'border-b border-line bg-ink/85 backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
        style={{ height: 'var(--header-h)' }}
      >
        <div className="container flex h-full items-center justify-between gap-6">
          <Link to="/" aria-label="4x4-raid — accueil" className="group flex items-baseline gap-2">
            <span className="font-display text-lg font-bold tracking-tight text-bone">4X4</span>
            <span className="h-3 w-px bg-sand" aria-hidden />
            <span className="font-display text-lg tracking-[0.2em] text-muted transition-colors duration-200 group-hover:text-bone">
              RAID
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-7 xl:flex">
            {nav.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpen(item.href)}
                onMouseLeave={() => setOpen(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    'link-underline font-display text-eyebrow uppercase transition-colors duration-200',
                    active(item.href) ? 'text-sand' : 'text-muted hover:text-bone',
                  )}
                  aria-current={active(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>

                {item.children && (
                  <div
                    className={cn(
                      'absolute left-1/2 top-full z-50 min-w-[250px] -translate-x-1/2 border border-line bg-surface p-2',
                      'transition-[opacity,transform,visibility] duration-300 ease-raid',
                      open === item.href
                        ? 'visible translate-y-1 opacity-100'
                        : 'invisible translate-y-3 opacity-0',
                    )}
                  >
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        to={c.href}
                        className="block rounded px-4 py-2.5 text-sm text-muted transition-colors duration-200 hover:bg-ink hover:text-bone"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${site.phoneHref}`}
              className="hidden font-display text-eyebrow uppercase text-muted transition-colors hover:text-bone 2xl:block"
            >
              {site.phoneDisplay}
            </a>
            <Link
              to="/contact/"
              className="hidden h-11 items-center rounded-pill bg-sand px-6 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone sm:inline-flex"
            >
              Réserver
            </Link>

            <button
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-controls="menu-mobile"
              aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] xl:hidden"
            >
              <span
                className={cn(
                  'block h-px w-6 bg-bone transition-transform duration-500 ease-raid',
                  menu && 'translate-y-[3px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-px w-6 bg-bone transition-transform duration-500 ease-raid',
                  menu && '-translate-y-[3px] -rotate-45',
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile — sommaire en grande typo, pas la nav desktop empilée */}
      <div
        id="menu-mobile"
        className={cn(
          'fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink transition-[opacity,visibility] duration-500 ease-raid xl:hidden',
          menu ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        style={{ paddingTop: 'var(--header-h)' }}
        aria-hidden={!menu}
      >
        <nav className="container flex flex-1 flex-col py-8" aria-label="Navigation mobile">
          {nav.map((item, i) => (
            <div key={item.href}>
              <Link
                to={item.href}
                tabIndex={menu ? 0 : -1}
                className="block border-b border-line py-4 font-display text-[clamp(1.6rem,7vw,2.4rem)] leading-none tracking-tight text-bone transition-[color,transform,opacity] duration-500 ease-raid hover:text-sand"
                style={{
                  transitionDelay: menu ? `${i * 45 + 60}ms` : '0ms',
                  transform: menu ? 'none' : 'translateY(14px)',
                  opacity: menu ? 1 : 0,
                }}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="flex flex-col border-b border-line py-2 pl-4">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      to={c.href}
                      tabIndex={menu ? 0 : -1}
                      className="py-2 text-sm text-muted transition-colors hover:text-bone"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="container pb-10">
          <Link
            to="/contact/"
            className="flex h-14 w-full items-center justify-center rounded-pill bg-sand font-display text-eyebrow uppercase text-ink"
          >
            Demandez votre offre personnalisée
          </Link>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-display text-micro uppercase text-muted">
            <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </div>
    </>
  )
}
