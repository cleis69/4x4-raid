import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * ─────────────────────────────────────────────────────────────────
 *  HERO
 *
 *  Photographie plein écran, zoom très lent, titre monumental.
 *  Le mouvement de fond dure 20 secondes : à cette vitesse on ne le
 *  perçoit pas comme une animation, seulement comme une image qui
 *  respire. C'est la différence entre cinématique et gadget.
 *
 *  ── SEO ───────────────────────────────────────────────────────
 *  Le <h1> est un vrai h1, découpé en mots pour l'animation en
 *  cascade. Chaque mot reste du texte : le titre est lu intact par
 *  Google et les lecteurs d'écran, l'animation n'est qu'une couche
 *  de style. Aucun texte dans un canvas.
 * ─────────────────────────────────────────────────────────────────
 */

const TITLE = 'Les raids de 4×4-raid au Maroc'

export function Hero() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const words = TITLE.split(' ')

  return (
    <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Fond : zoom lent, jamais perceptible consciemment */}
      <div className="absolute inset-0">
        <img
          src="/media/hero-piste-coucher-soleil.jpg"
          alt="4x4 en progression sur une piste du Sud marocain au coucher du soleil"
          width={1920}
          height={1280}
          loading="eager"
          decoding="sync"
          className={cn(
            'h-full w-full object-cover transition-transform duration-[20000ms] ease-out',
            ready ? 'scale-100' : 'scale-[1.12]',
          )}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgb(var(--ink)) 0%, rgb(var(--ink)/0.72) 24%, rgb(var(--ink)/0.15) 58%, transparent 76%, rgb(var(--ink)/0.4) 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 pb-10 pt-28 md:pb-14">
        <p
          className="eyebrow transition-[opacity,transform] duration-[900ms] ease-raid"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? 'none' : 'translateY(18px)',
            transitionDelay: '120ms',
          }}
        >
          Maroc — Marrakech · Agadir · Ouarzazate
        </p>

        {/* H1 réel, animé mot par mot */}
        <h1 className="mt-6 max-w-[15ch] font-display text-display-xl font-medium">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span
                className="inline-block transition-transform duration-[1100ms] ease-raid"
                style={{
                  transform: ready ? 'none' : 'translateY(105%)',
                  transitionDelay: `${200 + i * 70}ms`,
                }}
              >
                {w}
                {i < words.length - 1 && ' '}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p
            className="max-w-measure-tight text-lead text-bone/85 transition-[opacity,transform] duration-[900ms] ease-raid"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? 'none' : 'translateY(20px)',
              transitionDelay: '760ms',
            }}
          >
            Le montage et la réalisation de votre raid 4×4 au Maroc, de la
            planification jusqu'à la fin de votre aventure. En 4×4, moto, SSV ou buggy.
          </p>

          <div
            className="flex flex-wrap gap-3 transition-[opacity,transform] duration-[900ms] ease-raid"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? 'none' : 'translateY(20px)',
              transitionDelay: '880ms',
            }}
          >
            <Link
              to="/circuits-raid-4x4-au-maroc/"
              className="group inline-flex h-14 items-center gap-3 rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone"
            >
              Explorer les raids
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact/"
              className="group inline-flex h-14 items-center gap-3 rounded-pill border border-line-strong px-9 font-display text-eyebrow uppercase text-bone transition-colors duration-200 hover:border-sand hover:text-sand"
            >
              Offre personnalisée
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bandeau de spécifications — ancre le hero dans le concret */}
      <div
        className="relative z-10 border-t border-line bg-ink/50 backdrop-blur-md transition-opacity duration-[900ms]"
        style={{ opacity: ready ? 1 : 0, transitionDelay: '1000ms' }}
      >
        <div className="container grid grid-cols-2 divide-x divide-line md:grid-cols-4">
          <Stat label="Départs" value={site.departures.join(' · ')} />
          <Stat label="Formats" value="1 jour → 14 nuits" />
          <Stat label="Engins" value="4×4 · Moto · SSV · Buggy" />
          <Stat label="Réponse" value={`Sous ${site.responseTime}`} />
        </div>
      </div>

      {/* Indicateur de scroll minimaliste */}
      <div aria-hidden className="pointer-events-none absolute bottom-28 right-6 z-10 hidden lg:block">
        <div className="h-16 w-px animate-scan bg-gradient-to-b from-transparent via-sand to-transparent" />
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-4 first:pl-0 md:px-6">
      <p className="font-display text-micro uppercase text-muted">{label}</p>
      <p className="mt-1.5 font-display text-sm text-bone md:text-base">{value}</p>
    </div>
  )
}
