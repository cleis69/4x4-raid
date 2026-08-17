import { useState } from 'react'
import { experiences } from '@/data/contenu'
import { Button } from '@/components/ui/Button'
import { Figure, Reveal, Section } from '@/components/ui/Primitives'
import { cn } from '@/lib/utils'

/**
 * ─── 03 · EXPÉRIENCES ─────────────────────────────────────────
 * On ne vend pas des destinations, on vend des sensations.
 * Desktop : liste hover → média sticky à droite.
 * Mobile  : cartes empilées, chaque média visible (pas de hover
 *           à simuler au doigt).
 */
export function Experiences() {
  const [active, setActive] = useState(0)

  return (
    <Section id="experiences" tone="surface">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Expériences</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 max-w-[14ch] text-display-lg">Ce que vous allez ressentir</h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Button to="/experiences" variant="ghost">Toutes les expériences</Button>
          </Reveal>
        </div>

        {/* ─── Desktop ─────────────────────────────────────── */}
        <div className="mt-16 hidden gap-16 lg:grid lg:grid-cols-[1fr_0.9fr]">
          <ul className="border-t border-line">
            {experiences.map((exp, i) => (
              <li key={exp.id}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group block w-full border-b border-line py-9 text-left"
                  aria-describedby={`exp-${exp.id}`}
                >
                  <div className="flex items-baseline gap-6">
                    <span
                      className={cn(
                        'font-display text-micro uppercase transition-colors duration-fast',
                        active === i ? 'text-sand' : 'text-muted',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={cn(
                        'text-display-md transition-[color,transform] duration-base ease-raid',
                        active === i ? 'translate-x-2 text-bone' : 'text-muted',
                      )}
                    >
                      {exp.titre}
                    </h3>
                  </div>

                  <div
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-base ease-raid',
                      active === i ? 'mt-5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden pl-[3.6rem]">
                      <p id={`exp-${exp.id}`} className="max-w-measure text-muted">{exp.texte}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.mots.map((m) => (
                          <span key={m} className="rounded-pill border border-line px-3 py-1 font-display text-micro uppercase text-muted">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {/* Média sticky : une seule image montée, on croise les opacités */}
          <div className="sticky top-32 h-fit">
            <div className="relative overflow-hidden rounded-card" style={{ aspectRatio: '4/5' }}>
              {experiences.map((exp, i) => (
                <img
                  key={exp.id}
                  src={exp.image.src}
                  alt={exp.image.alt}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-slow ease-raid',
                    active === i ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
                  )}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
          </div>
        </div>

        {/* ─── Mobile ──────────────────────────────────────── */}
        <div className="mt-12 space-y-14 lg:hidden">
          {experiences.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 60}>
              <article>
                <Figure media={exp.image} className="rounded-card" sizes="100vw" />
                <div className="mt-5 flex items-baseline gap-4">
                  <span className="font-display text-micro uppercase text-sand">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-display-sm">{exp.titre}</h3>
                </div>
                <p className="mt-3 text-muted">{exp.texte}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.mots.map((m) => (
                    <span key={m} className="rounded-pill border border-line px-3 py-1 font-display text-micro uppercase text-muted">
                      {m}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
