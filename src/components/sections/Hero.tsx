import { useEffect, useState } from 'react'
import { media, heroVideo } from '@/data/medias'
import { site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { useHeroScene } from '@/hooks/useHeroScene'
import { cn } from '@/lib/utils'

/**
 * ─── 01 · HERO ────────────────────────────────────────────────
 *
 * Deux hero en un seul composant, et un seul contenu.
 *
 *  — Si le WebGL est disponible : la section fait 260 svh, un bloc
 *    sticky occupe l'écran, et le scroll traverse une journée dans
 *    les dunes (voir src/three/). Le contenu HTML reste posé par
 *    dessus, inchangé.
 *
 *  — Sinon : exactement le hero d'origine, photo ou vidéo, en 100 svh.
 *
 * Le <h1>, les CTA, le bandeau de spécifications et l'ordre du DOM
 * sont rigoureusement identiques dans les deux cas. La 3D est une
 * couche visuelle ajoutée derrière le contenu, jamais un
 * remplacement : ni le SEO ni l'accessibilité ne dépendent d'elle.
 */
export function Hero() {
  const [mounted, setMounted] = useState(false)
  const { sectionRef, hostRef, canvasRef, enabled, ready } = useHeroScene()
  const hasVideo = Boolean(heroVideo.mp4 || heroVideo.webm)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const enter = (delay: number) => ({
    transitionDelay: `${delay}ms`,
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : 'translateY(26px)',
  })

  const clip = (delay: number) => ({
    clipPath: mounted ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
    transition: `clip-path 1200ms var(--ease-raid) ${delay}ms`,
  })

  /* ═══ CONTENU — identique dans les deux modes ═══════════════ */
  const content = (
    <>
      <div className="container relative z-10 pb-14 pt-32 md:pb-20">
        <p className="eyebrow transition-[opacity,transform] duration-slow ease-raid" style={enter(120)}>
          Maroc — Atlas, Sahara, dunes
        </p>

        <h1 className="mt-7 max-w-[16ch] font-display text-display-xl font-medium">
          <span className="block overflow-hidden" style={clip(200)}>La route</span>
          <span className="block overflow-hidden" style={clip(320)}>s'arrête ici.</span>
          <span className="block overflow-hidden text-muted" style={clip(440)}>L'aventure, non.</span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <p
            className="max-w-measure-tight text-lead text-muted transition-[opacity,transform] duration-slow ease-raid"
            style={enter(760)}
          >
            Des raids 4x4 tracés sur mesure, hors des pistes balisées.
            Vous êtes au volant&nbsp;; Jean-Luc ouvre la piste.
          </p>

          <div
            className="flex flex-wrap gap-3 transition-[opacity,transform] duration-slow ease-raid"
            style={enter(880)}
          >
            <Button to="/raids" size="lg">Explorer les raids</Button>
            <Button to="/contact" variant="ghost" size="lg">Créer mon aventure</Button>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 border-t border-line bg-ink/50 backdrop-blur-md transition-opacity duration-slow ease-raid"
        style={{ opacity: mounted ? 1 : 0, transitionDelay: '1000ms' }}
      >
        <div className="container grid grid-cols-2 divide-x divide-line md:grid-cols-4">
          <Stat label="Départs" value={site.departures.join(' · ')} />
          <Stat label="Formats" value="1 jour → 14 nuits" />
          <Stat label="Engins" value="4x4 · Moto · SSV · Buggy" />
          <Stat label="Réponse" value={`Sous ${site.responseTime}`} />
        </div>
      </div>
    </>
  )

  /* ═══ MODE 3D ══════════════════════════════════════════════ */
  if (enabled) {
    return (
      <section ref={sectionRef} className="relative h-[260svh]">
        <div
          ref={hostRef}
          className="grain sticky top-0 flex h-[100svh] flex-col justify-end overflow-hidden bg-ink"
        >
          {/* Repli affiché pendant le montage de la scène, puis fondu. */}
          <img
            src={media.heroPoster.src}
            alt={media.heroPoster.alt}
            loading="eager"
            // @ts-expect-error — attribut valide
            fetchpriority="high"
            decoding="sync"
            className={cn(
              'absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-[1400ms] ease-raid',
              ready ? 'opacity-0' : 'opacity-100',
            )}
          />

          <canvas
            ref={canvasRef}
            aria-hidden
            className={cn(
              'absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-raid',
              ready ? 'opacity-100' : 'opacity-0',
            )}
          />

          {/* Voile de lisibilité — assez pour le texte, pas assez pour
              éteindre la scène. Le haut est légèrement chargé pour la
              navbar, le bas franchement pour le bandeau de specs. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{
              background:
                'linear-gradient(to top, rgb(var(--ink)) 0%, rgb(var(--ink) / 0.72) 22%, rgb(var(--ink) / 0.18) 52%, transparent 72%, rgb(var(--ink) / 0.42) 100%)',
            }}
          />

          {content}

          {/* Invite au scroll : ici elle a un vrai sens, le scroll
              conduit le voyage. Elle s'efface dès qu'on a compris. */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-28 right-6 z-10 hidden lg:block"
          >
            <div className="h-16 w-px animate-scan bg-gradient-to-b from-transparent via-sand to-transparent" />
          </div>
        </div>
      </section>
    )
  }

  /* ═══ MODE REPLI — le hero d'origine, intact ═══════════════ */
  return (
    <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="media-veil absolute inset-0">
        {hasVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={media.heroPoster.src}
            className="h-full w-full object-cover"
            aria-hidden
          >
            {heroVideo.webm && <source src={heroVideo.webm} type="video/webm" />}
            {heroVideo.mp4 && <source src={heroVideo.mp4} type="video/mp4" />}
          </video>
        ) : (
          <img
            src={media.heroPoster.src}
            alt={media.heroPoster.alt}
            className="h-full w-full scale-105 object-cover"
            loading="eager"
            // @ts-expect-error — attribut valide
            fetchpriority="high"
            decoding="sync"
          />
        )}
      </div>
      {content}
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-5 first:pl-0 md:px-6">
      <p className="font-display text-micro uppercase text-muted">{label}</p>
      <p className="mt-1.5 font-display text-sm text-bone md:text-base">{value}</p>
    </div>
  )
}
