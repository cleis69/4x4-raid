import type { Etape } from '@/data/raids'

/**
 * CARTE SCHÉMATIQUE
 *
 * ⚠️ CE N'EST PAS UNE CARTE GÉOGRAPHIQUE.
 * Aucune coordonnée GPS n'est publiée sur le site actuel : dessiner
 * un tracé réel reviendrait à inventer des données. Ce composant est
 * donc un DIAGRAMME d'étapes — il restitue la séquence et le rythme
 * du raid, pas sa géométrie. Le libellé le dit explicitement.
 *
 * Pour une vraie carte : récupérer les traces GPX auprès de Jean-Luc,
 * puis brancher MapLibre GL avec un fond sombre personnalisé
 * (surtout pas le style Google Maps par défaut).
 * Voir CONTENU-A-FOURNIR.md § 5.
 */
export function RouteMap({ etapes }: { etapes: Etape[] }) {
  if (etapes.length < 2) return null

  const W = 1000
  const H = 260
  const pad = 60
  const step = (W - pad * 2) / (etapes.length - 1)

  // Ondulation déterministe : le tracé "respire" sans être aléatoire.
  const pts = etapes.map((_, i) => ({
    x: pad + i * step,
    y: H / 2 + Math.sin(i * 1.15) * 46,
  }))

  const d = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = pts[i - 1]
    const cx = (prev.x + p.x) / 2
    return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`
  }, '')

  return (
    <figure className="overflow-hidden rounded-card border border-line bg-surface">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Séquence des ${etapes.length} étapes du raid`}>
        <defs>
          <linearGradient id="routeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="rgb(var(--sand))" stopOpacity="0.25" />
            <stop offset="50%" stopColor="rgb(var(--sand))" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(var(--earth))" stopOpacity="0.6" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(var(--bone))" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width={W} height={H} fill="url(#grid)" />

        {/* Tracé fantôme + tracé actif */}
        <path d={d} fill="none" stroke="rgb(var(--bone))" strokeOpacity="0.1" strokeWidth="10" strokeLinecap="round" />
        <path
          d={d}
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="7 9"
        />

        {pts.map((p, i) => {
          const last = i === etapes.length - 1
          const first = i === 0
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={first || last ? 8 : 5} fill="rgb(var(--ink))" stroke="rgb(var(--sand))" strokeWidth="1.5" />
              {(first || last) && <circle cx={p.x} cy={p.y} r="3" fill="rgb(var(--sand))" />}
              <text
                x={p.x}
                y={p.y - 22}
                textAnchor="middle"
                fill="rgb(var(--muted))"
                fontSize="11"
                fontFamily="'Space Grotesk', sans-serif"
                letterSpacing="2"
              >
                J{String(i + 1).padStart(2, '0')}
              </text>
            </g>
          )
        })}
      </svg>

      <figcaption className="border-t border-line px-5 py-3 font-display text-micro uppercase text-muted">
        Diagramme d'étapes — représentation schématique, non géographique
      </figcaption>
    </figure>
  )
}
