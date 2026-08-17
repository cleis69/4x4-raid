import { cn } from '@/lib/utils'
import type { Media } from '@/data/medias'

/* ═══ REVEAL ═══════════════════════════════════════════════════
   Enveloppe déclarative autour des utilitaires CSS .reveal*.
   L'observer est monté une seule fois au niveau du Layout.
   ═══════════════════════════════════════════════════════════════ */
type RevealProps = {
  children: React.ReactNode
  /** 'up' = translation · 'mask' = clip-path · 'scale' = zoom média */
  as?: 'up' | 'mask' | 'scale'
  delay?: number
  className?: string
}

export function Reveal({ children, as = 'up', delay = 0, className }: RevealProps) {
  const variant = as === 'mask' ? 'reveal-mask' : as === 'scale' ? 'reveal-scale' : 'reveal'
  return (
    <div
      className={cn(variant, className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}

/* ═══ EYEBROW ═════════════════════════════════════════════════ */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('eyebrow', className)}>{children}</p>
}

/* ═══ TAG ═════════════════════════════════════════════════════ */
export function Tag({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill border px-3 py-1.5 font-display text-micro uppercase',
        active ? 'border-sand bg-sand/10 text-sand' : 'border-line text-muted',
      )}
    >
      {children}
    </span>
  )
}

/* ═══ FIGURE ══════════════════════════════════════════════════
   Image responsive : ratio réservé (zéro CLS), lazy par défaut,
   décodage asynchrone. `priority` pour le LCP du Hero uniquement.
   ═══════════════════════════════════════════════════════════════ */
export function Figure({
  media,
  className,
  imgClassName,
  priority = false,
  sizes = '100vw',
}: {
  media: Media
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <div className={cn('relative overflow-hidden bg-surface', className)} style={{ aspectRatio: media.ratio }}>
      <img
        src={media.src}
        alt={media.alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        // @ts-expect-error — attribut valide, typé tardivement par React
        fetchpriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </div>
  )
}

/* ═══ PLACEHOLDER ═════════════════════════════════════════════
   Le composant le plus important du système.
   Aucune donnée n'est inventée : quand une information manque,
   on l'affiche comme un trou identifié, pas comme un faux contenu.
   Visible en dev, discret en production (voir variant).
   ═══════════════════════════════════════════════════════════════ */
export function Placeholder({
  label,
  children,
  variant = 'inline',
}: {
  /** Ce que le client doit fournir. */
  label: string
  /** Formulation destinée au visiteur final. */
  children?: React.ReactNode
  variant?: 'inline' | 'block'
}) {
  const isDev = import.meta.env.DEV

  if (variant === 'block') {
    return (
      <div
        className={cn(
          'rounded-card border border-dashed p-6',
          isDev ? 'border-sand/50 bg-sand/[0.04]' : 'border-line bg-surface',
        )}
      >
        {isDev && (
          <p className="mb-2 font-display text-micro uppercase text-sand">À fournir — {label}</p>
        )}
        <div className="text-muted">{children}</div>
      </div>
    )
  }

  return (
    <span
      className={cn('inline-flex items-center gap-2', isDev && 'text-sand')}
      title={isDev ? `À FOURNIR : ${label}` : undefined}
    >
      {isDev && <span aria-hidden className="text-[0.6em]">◆</span>}
      <span className={isDev ? undefined : 'text-muted'}>{children}</span>
    </span>
  )
}

/* ═══ RULE ════════════════════════════════════════════════════ */
export function Rule({ className }: { className?: string }) {
  return <div className={cn('rule', className)} />
}

/* ═══ SECTION ═════════════════════════════════════════════════ */
export function Section({
  children,
  id,
  className,
  tone = 'ink',
}: {
  children: React.ReactNode
  id?: string
  className?: string
  tone?: 'ink' | 'surface'
}) {
  return (
    <section
      id={id}
      className={cn('relative py-section', tone === 'surface' && 'bg-surface', className)}
    >
      {children}
    </section>
  )
}
