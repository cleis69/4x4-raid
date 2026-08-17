import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

/**
 * Home est chargée dans le bundle initial (c'est le LCP).
 * Les autres pages sont découpées en chunks : elles ne pèsent
 * rien tant que l'utilisateur n'y va pas.
 */
const Raids = lazy(() => import('@/pages/Raids'))
const RaidDetail = lazy(() => import('@/pages/RaidDetail'))
const Destinations = lazy(() => import('@/pages/Destinations'))
const DestinationDetail = lazy(() => import('@/pages/DestinationDetail'))
const ExperiencesPage = lazy(() => import('@/pages/ExperiencesPage'))
const Vehicules = lazy(() => import('@/pages/Vehicules'))
const Guide = lazy(() => import('@/pages/Guide'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

/** Fallback neutre : évite le flash blanc entre deux chunks. */
const Fallback = () => <div className="min-h-screen bg-ink" aria-busy="true" />

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="raids" element={<Raids />} />
            <Route path="raids/:slug" element={<RaidDetail />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="destinations/:id" element={<DestinationDetail />} />
            <Route path="experiences" element={<ExperiencesPage />} />
            <Route path="vehicules" element={<Vehicules />} />
            <Route path="le-guide" element={<Guide />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
