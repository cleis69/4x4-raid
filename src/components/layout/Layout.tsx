import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { StickyCta } from './StickyCta'
import { useReveal } from '@/hooks/useReveal'

export function Layout() {
  const { pathname, hash, key } = useLocation()

  // Remonte en haut à chaque changement de page, sauf ancre explicite.
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash, key])

  // Un observer unique pour toutes les animations de la page courante.
  useReveal()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="contenu" className="flex-1">
        {/* `key` force le remontage : les reveals rejouent proprement */}
        <Outlet key={pathname} />
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
