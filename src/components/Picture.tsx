import { MEDIAS, mediaSrc, mediaSrcSet, type MediaKey } from '@/data/medias'
import { cn } from '@/lib/utils'

/**
 * ─────────────────────────────────────────────────────────────────
 *  PICTURE — le seul composant autorisé à écrire un <img>
 *
 *  Il garantit trois choses qu'on oublie une fois sur deux quand on
 *  écrit les <img> à la main :
 *
 *  1. `srcset` + `sizes` ENSEMBLE. Un `sizes` seul ne sert à rien :
 *     sans jeu de largeurs à comparer, le navigateur télécharge de
 *     toute façon l'unique fichier fourni. C'était le défaut de la
 *     version précédente — 1920 px servis à un téléphone de 390 px.
 *
 *  2. `width` / `height` intrinsèques, donc place réservée avant le
 *     chargement. Pas de saut de mise en page (CLS).
 *
 *  3. `alt` issu du catalogue, jamais du contexte d'appel — la même
 *     photo garde partout une description correcte.
 *
 *  ── Sur `sizes` ───────────────────────────────────────────────
 *  C'est la seule valeur à réfléchir à chaque appel : elle décrit la
 *  largeur AFFICHÉE de l'image, pas sa largeur de fichier. Un `100vw`
 *  posé sur une carte d'un tiers de large fait télécharger trois fois
 *  trop de pixels.
 * ─────────────────────────────────────────────────────────────────
 */

type Props = {
  media: MediaKey
  /** Largeur d'affichage, en syntaxe media-condition. Cf. ci-dessus. */
  sizes: string
  /** Image au-dessus de la ligne de flottaison : chargée sans délai. */
  priority?: boolean
  /**
   * Ratio du cadre (`'3/2'`, `'4/5'`…). Fourni, l'image est recadrée
   * en `object-cover` dans un cadre de ce ratio. Omis, l'image occupe
   * son ratio naturel.
   */
  ratio?: string
  /** Classes du cadre. */
  className?: string
  /** Classes de l'`<img>` lui-même. */
  imgClassName?: string
  /** Alternative textuelle de remplacement — à n'utiliser qu'à bon escient. */
  alt?: string
}

export function Picture({
  media,
  sizes,
  priority = false,
  ratio,
  className,
  imgClassName,
  alt,
}: Props) {
  const m = MEDIAS[media]

  const img = (
    <img
      src={mediaSrc(media)}
      srcSet={mediaSrcSet(media)}
      sizes={sizes}
      alt={alt ?? m.alt}
      width={m.w}
      height={m.h}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // fetchPriority n'est pas encore typé par @types/react 18.
      {...(priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {})}
      className={cn(
        ratio ? 'h-full w-full object-cover' : 'h-auto w-full',
        imgClassName,
      )}
    />
  )

  if (!ratio) return className ? <div className={className}>{img}</div> : img

  return (
    <div
      className={cn('relative overflow-hidden bg-surface', className)}
      style={{ aspectRatio: ratio }}
    >
      {img}
    </div>
  )
}
