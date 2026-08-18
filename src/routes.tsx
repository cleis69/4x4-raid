import { lazy } from 'react'
import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

/**
 * ─────────────────────────────────────────────────────────────────
 *  ROUTES — les 13 URLs de WordPress, au caractère près
 *
 *  ⚠️ RÈGLE ABSOLUE : ne jamais modifier un `path` de ce fichier.
 *  Le site est déjà positionné sur ces URLs. Toute modification
 *  exigerait une redirection 301 et ferait perdre du signal.
 *
 *  Chaque route est prérendue en HTML statique au build par
 *  vite-react-ssg. Concrètement : React reste React, mais Google
 *  reçoit une page complète — comme avec WordPress — au lieu d'un
 *  <div id="root"> vide. C'est la correction SEO de fond.
 * ─────────────────────────────────────────────────────────────────
 */

const Circuits = lazy(() => import('@/pages/Circuits'))
const SurMesure = lazy(() => import('@/pages/SurMesure'))
const Entreprises = lazy(() => import('@/pages/Entreprises'))
const Marrakech = lazy(() => import('@/pages/Marrakech'))
const Excursions = lazy(() => import('@/pages/Excursions'))
const Guide = lazy(() => import('@/pages/Guide'))
const Decouvrir = lazy(() => import('@/pages/Decouvrir'))
const Actualite = lazy(() => import('@/pages/Actualite'))
const Photos = lazy(() => import('@/pages/Photos'))
const Temoignages = lazy(() => import('@/pages/Temoignages'))
const Partenaires = lazy(() => import('@/pages/Partenaires'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home />, entry: 'src/pages/Home.tsx' },

      // ─── Famille « Circuits » — l'arborescence WordPress ───────
      {
        path: 'circuits-raid-4x4-au-maroc',
        children: [
          { index: true, element: <Circuits /> },
          { path: 'raid-4x4-sur-mesure', element: <SurMesure /> },
          { path: 'raids-4x4-pour-entreprises', element: <Entreprises /> },
          { path: 'raid-4x4-marrakech', element: <Marrakech /> },
          { path: '3-excursions-4x4-a-marrakech', element: <Excursions /> },
        ],
      },

      { path: 'guide-raids-4x4-maroc', element: <Guide /> },
      { path: 'decouvrir-le-maroc-en-4x4', element: <Decouvrir /> },
      { path: 'actualite-raids-4x4-maroc', element: <Actualite /> },
      { path: 'photos-raids-4x4-maroc', element: <Photos /> },
      { path: 'temoignages', element: <Temoignages /> },
      { path: 'partenaires', element: <Partenaires /> },
      { path: 'contact', element: <Contact /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]
