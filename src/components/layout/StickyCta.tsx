import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * Barre d'action mobile — apparaît après le Hero, disparaît au contact
 * du footer. Deux actions seulement : appeler, ou lancer la demande.
 * Absente sur la page Contact (le formulaire est déjà là).
 */
export function StickyCta() {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const bottom = document.body.scrollHeight - window.innerHeight - 640
      setShow(y > window.innerHeight * 0.85 && y < bottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  if (pathname === '/contact') return null

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 backdrop-blur-xl transition-transform duration-base ease-raid xl:hidden',
        show ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="container grid grid-cols-[auto_1fr] items-center gap-3 py-3">
        <a
          href={`tel:${site.contact.phoneHref}`}
          aria-label="Appeler 4x4-raid"
          className="flex h-12 w-12 items-center justify-center rounded-pill border border-line-strong text-bone"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
          </svg>
        </a>
        <Link
          to="/contact"
          className="flex h-12 items-center justify-center gap-2 rounded-pill bg-sand font-display text-eyebrow uppercase text-ink"
        >
          Créer mon aventure <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}
