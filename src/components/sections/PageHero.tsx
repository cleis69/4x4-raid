import { Picture } from '@/components/Picture'
import type { MediaKey } from '@/data/medias'
import { cn } from '@/lib/utils'

/**
 * HERO DE PAGE INTÉRIEURE
 *
 * Spectaculaire visuellement, sobre sémantiquement : le <h1> est un
 * vrai h1 dans le HTML, l'image et le voile ne sont qu'une couche.
 * Hauteur volontairement inférieure au hero d'accueil — la hiérarchie
 * entre les pages passe aussi par l'échelle.
 */
type Props = {
  eyebrow?: string
  h1: string
  /** Photo de fond, référencée par sa clé de catalogue. */
  media?: MediaKey
  children?: React.ReactNode
  className?: string
}

export function PageHero({ eyebrow, h1, media, children, className }: Props) {
  return (
    <section
      className={cn(
        'grain relative flex min-h-[46svh] flex-col justify-end overflow-hidden md:min-h-[54svh]',
        className,
      )}
    >
      {media && (
        <div className="absolute inset-0">
          <Picture
            media={media}
            sizes="100vw"
            priority
            className="h-full w-full"
            imgClassName="h-full w-full scale-[1.04] object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgb(var(--ink)) 0%, rgb(var(--ink)/0.66) 30%, rgb(var(--ink)/0.15) 66%, rgb(var(--ink)/0.35) 100%)',
            }}
          />
        </div>
      )}

      <div className="container relative z-10 pb-10 pt-24 md:pb-14 md:pt-28">
        {eyebrow && <p className="eyebrow reveal">{eyebrow}</p>}
        <h1
          className="reveal mt-5 max-w-[18ch] font-display text-display-md font-medium"
          style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
        >
          {h1}
        </h1>
        {children}
      </div>
    </section>
  )
}
