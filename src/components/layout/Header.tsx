import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nav, site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/**
 * Navbar : transparente au-dessus du Hero, puis fond sombre + filet
 * au scroll. Se rétracte vers le bas, réapparaît vers le haut.
 * Un seul listener passif, aucune animation coûteuse.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 320 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermeture du menu à chaque navigation + blocage du scroll body
  useEffect(() => setMenu(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menu])

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
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-base ease-raid',
          hidden && !menu ? '-translate-y-full' : 'translate-y-0',
          scrolled || menu
            ? 'border-b border-line bg-ink/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
        style={{ height: 'var(--header-h)' }}
      >
        <div className="container flex h-full items-center justify-between gap-8">
          <Link to="/" aria-label="4x4-raid — accueil" className="group flex items-baseline gap-2">
            <span className="font-display text-lg font-bold tracking-tight text-bone">4X4</span>
            <span className="h-3 w-px bg-sand" aria-hidden />
            <span className="font-display text-lg font-medium tracking-[0.2em] text-muted transition-colors duration-fast group-hover:text-bone">
              RAID
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-7 xl:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'link-underline font-display text-eyebrow uppercase transition-colors duration-fast',
                  pathname === item.href ? 'text-sand' : 'text-muted hover:text-bone',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="hidden font-display text-eyebrow uppercase text-muted transition-colors hover:text-bone 2xl:block"
            >
              {site.contact.phoneDisplay}
            </a>
            <Button to="/contact" variant="primary" className="hidden sm:inline-flex">
              Réserver
            </Button>

            <button
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-label={menu ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] xl:hidden"
            >
              <span className={cn('block h-px w-6 bg-bone transition-transform duration-base ease-raid', menu && 'translate-y-[3px] rotate-45')} />
              <span className={cn('block h-px w-6 bg-bone transition-transform duration-base ease-raid', menu && '-translate-y-[3px] -rotate-45')} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Menu mobile plein écran ─────────────────────────────
          Repensé pour le mobile : ce n'est pas la nav desktop
          empilée, c'est un sommaire en très grande typo. */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-ink transition-[opacity,visibility] duration-base ease-raid xl:hidden',
          menu ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        style={{ paddingTop: 'var(--header-h)' }}
        aria-hidden={!menu}
      >
        <nav className="container flex flex-1 flex-col justify-center gap-1" aria-label="Navigation mobile">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              to={item.href}
              tabIndex={menu ? 0 : -1}
              className="border-b border-line py-5 font-display text-[clamp(2rem,10vw,3.25rem)] leading-none tracking-tight text-bone transition-[color,transform] duration-base ease-raid hover:text-sand"
              style={{
                transitionDelay: menu ? `${i * 45 + 60}ms` : '0ms',
                transform: menu ? 'none' : 'translateY(14px)',
                opacity: menu ? 1 : 0,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="container pb-10">
          <Button to="/contact" size="lg" className="w-full">Créer mon aventure</Button>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-display text-micro uppercase text-muted">
            <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phoneDisplay}</a>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
        </div>
      </div>
    </>
  )
}
