import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { StickyCta } from './StickyCta'
import { useReveal } from '@/hooks/useReveal'

export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  useReveal()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="contenu" className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-ink" aria-busy="true" />}>
          <Outlet key={pathname} />
        </Suspense>
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
