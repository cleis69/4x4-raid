import { useEffect, useRef, useState } from 'react'
import { detectQuality, type Tier } from '@/three/quality'

/**
 * ─────────────────────────────────────────────────────────────────
 *  PONT REACT ↔ WEBGL
 *
 *  React ne pilote rien de la scène. Il monte un canvas, passe une
 *  valeur de scroll, et se retire. Aucun état 3D ne remonte dans le
 *  cycle de rendu React — un re-render par frame à 60 fps serait
 *  exactement la mauvaise architecture.
 *
 *  Le seul état exposé est `ready`, qui bascule une fois, pour le
 *  fondu entre la photo de repli et la scène.
 *
 *  Trois garanties tenues ici :
 *   — three n'est jamais dans le bundle initial (import dynamique)
 *   — rien ne se charge si le palier est 'none' (voir quality.ts)
 *   — la boucle s'arrête dès que le hero quitte l'écran
 * ─────────────────────────────────────────────────────────────────
 */

type SceneApi = {
  boot(): void
  setProgress(p: number): void
  start(): void
  stop(): void
  resize(): void
  dispose(): void
}

export function useHeroScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Décidé une seule fois : évite tout changement de layout au montage.
  const [tier] = useState<Tier>(() => detectQuality().tier)
  const [ready, setReady] = useState(false)

  const enabled = tier !== 'none'

  useEffect(() => {
    if (!enabled) return
    const section = sectionRef.current
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!section || !host || !canvas) return

    let scene: SceneApi | null = null
    let disposed = false
    let ro: ResizeObserver | null = null
    let cleanupExtras: (() => void) | undefined

    // Le scroll est lu ici et poussé dans la scène ; l'amortissement
    // se fait côté WebGL, à la fréquence de rafraîchissement.
    const readProgress = () => {
      const rect = section.getBoundingClientRect()
      const span = section.offsetHeight - window.innerHeight
      if (span <= 0) return 0
      return Math.max(0, Math.min(1, -rect.top / span))
    }

    const onScroll = () => scene?.setProgress(readProgress())

    Promise.all([import('@/three/scene'), import('@/three/quality')])
      .then(([{ HeroScene }, { detectQuality: dq }]) => {
        if (disposed) return

        const instance = new HeroScene(canvas, host, dq(), (stage) => {
          if (stage === 'ready') setReady(true)
        })
        scene = instance as unknown as SceneApi

        instance.setProgress(readProgress())
        instance.boot()

        window.addEventListener('scroll', onScroll, { passive: true })

        ro = new ResizeObserver(() => instance.resize())
        ro.observe(host)

        // Hors écran : on rend la main au GPU.
        const io = new IntersectionObserver(
          ([e]) => (e.isIntersecting ? instance.start() : instance.stop()),
          { threshold: 0 },
        )
        io.observe(section)

        // Onglet caché : idem.
        const onVis = () => {
          if (document.hidden) instance.stop()
          else if (section.getBoundingClientRect().bottom > 0) instance.start()
        }
        document.addEventListener('visibilitychange', onVis)

        cleanupExtras = () => {
          io.disconnect()
          document.removeEventListener('visibilitychange', onVis)
        }
      })
      .catch(() => {
        // three indisponible : le repli photo reste affiché, rien ne casse.
      })

    return () => {
      disposed = true
      window.removeEventListener('scroll', onScroll)
      ro?.disconnect()
      cleanupExtras?.()
      scene?.dispose()
      scene = null
    }
  }, [enabled])

  return { sectionRef, hostRef, canvasRef, enabled, ready, tier }
}
