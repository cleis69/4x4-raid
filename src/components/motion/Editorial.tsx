import { cn } from '@/lib/utils'

/**
 * ─────────────────────────────────────────────────────────────────
 *  BRIQUES ÉDITORIALES
 *
 *  Ce fichier ne contient pas d'animation : il contient de la
 *  COMPOSITION. C'est ce qui différencie une page empilée d'une page
 *  mise en page.
 * ─────────────────────────────────────────────────────────────────
 */

/* ═══ INDEX TYPOGRAPHIQUE ═══════════════════════════════════════
   Le contraste d'échelle du brief : un numéro minuscule, un mot
   immense, une précision fine. Trois tailles dans un rapport de 1
   à 16 — c'est ce rapport qui fait le luxe, pas la couleur.
   ═══════════════════════════════════════════════════════════════ */
export function DisplayIndex({
  index,
  word,
  sub,
  className,
}: {
  index: string
  word: string
  sub?: string
  className?: string
}) {
  return (
    <div className={cn('select-none', className)}>
      <span className="block font-display text-micro uppercase tracking-[0.3em] text-sand">
        {index}
      </span>
      <span className="mt-4 block font-display text-display-lg uppercase leading-[0.85] tracking-tight">
        {word}
      </span>
      {sub && (
        <span className="mt-4 block font-display text-eyebrow uppercase tracking-[0.22em] text-muted">
          {sub}
        </span>
      )}
    </div>
  )
}

/* ═══ BLOC ÉDITORIAL ASYMÉTRIQUE ════════════════════════════════
   Jamais 50/50. Le déséquilibre 40/60 (ou l'inverse) crée une
   tension que la symétrie annule. `offset` fait déborder le média
   hors de la colonne — le « élément qui sort du container ».
   ═══════════════════════════════════════════════════════════════ */
export function SplitEditorial({
  media,
  children,
  reverse = false,
  offset = false,
  className,
}: {
  media: React.ReactNode
  children: React.ReactNode
  reverse?: boolean
  /** Le média déborde vers le bord de l'écran. */
  offset?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid items-center gap-10 lg:grid-cols-12 lg:gap-16',
        className,
      )}
    >
      <div
        className={cn(
          'lg:col-span-7',
          reverse ? 'lg:order-2' : 'lg:order-1',
          // Débord contrôlé : l'image sort de la grille vers le bord.
          offset && !reverse && 'lg:-ml-[max(0px,calc((100vw-1600px)/2+2.5rem))]',
          offset && reverse && 'lg:-mr-[max(0px,calc((100vw-1600px)/2+2.5rem))]',
        )}
      >
        {media}
      </div>
      <div
        className={cn(
          'lg:col-span-5',
          reverse ? 'lg:order-1' : 'lg:order-2',
        )}
      >
        {children}
      </div>
    </div>
  )
}

/* ═══ SECTION ═══════════════════════════════════════════════════
   `bleed` fait continuer le fond dans la section suivante : c'est
   ce qui évite l'effet « tranches empilées ».
   ═══════════════════════════════════════════════════════════════ */
export function Section({
  children,
  id,
  tone = 'ink',
  className,
}: {
  children: React.ReactNode
  id?: string
  tone?: 'ink' | 'surface'
  className?: string
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

/* ═══ EN-TÊTE DE SECTION ════════════════════════════════════════ */
export function SectionHeader({
  eyebrow,
  title,
  sub,
  action,
  className,
}: {
  eyebrow: string
  /** Toujours un vrai <h2> : la hiérarchie HTML ne suit pas la taille visuelle. */
  title: React.ReactNode
  sub?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-8 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-[22ch]">
        <p className="eyebrow reveal">{eyebrow}</p>
        <h2 className="reveal mt-7 text-display-lg" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
          {title}
        </h2>
      </div>
      {(sub || action) && (
        <div className="reveal max-w-measure-tight shrink-0" style={{ '--reveal-delay': '140ms' } as React.CSSProperties}>
          {sub && <p className="text-muted">{sub}</p>}
          {action && <div className={cn(sub && 'mt-6')}>{action}</div>}
        </div>
      )}
    </div>
  )
}

/* ═══ TEXTE INDEXÉ ══════════════════════════════════════════════
   Le contenu que Google lit. Jamais masqué, jamais tronqué,
   jamais dans un canvas. Largeur de lecture confortable.
   ═══════════════════════════════════════════════════════════════ */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-measure text-lead leading-relaxed text-bone/90',
        '[&>p]:mb-6 [&>p:last-child]:mb-0',
        '[&_a]:text-sand [&_a]:underline [&_a]:decoration-sand/40 [&_a]:underline-offset-4',
        '[&_a:hover]:decoration-sand [&_strong]:font-medium [&_strong]:text-bone',
        className,
      )}
    >
      {children}
    </div>
  )
}
