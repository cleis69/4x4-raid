import { useDunes } from '@/hooks/useDunes'
import { Reveal } from '@/components/ui/Primitives'
import { cn } from '@/lib/utils'

/**
 * ─── 06 · RELEVÉ DE TERRAIN ───────────────────────────────────
 *
 * La traduction littérale de la tension fondatrice de la DA :
 * Désert × Instrument. Le sable n'est pas photographié, il est
 * *relevé* — comme une carte topographique, en filaire sable.
 *
 * Cette section est aussi la seule du site à charger une librairie
 * tierce (Three.js). Elle est donc construite pour se passer d'elle :
 * le contenu éditorial est du DOM normal et reste intégralement
 * lisible si le WebGL ne démarre pas. Voir hooks/useDunes.ts.
 *
 * ✅ Les quatre chiffres affichés sont réels, relevés sur
 *    4x4-raid.com (pages Circuits et Découvrir le Maroc).
 */

const releve = [
  { label: 'Amplitude', value: '4 168 m', note: "Point culminant de l'Atlas" },
  { label: 'Boucle Sud', value: '1 500 km', note: 'Distance annoncée' },
  { label: 'Jour 04', value: '50 km', note: 'Franchissement de dunes' },
  { label: 'Bivouacs', value: '2 nuits', note: 'Chegaga · Merzouga' },
]

export function Dunes() {
  const { hostRef, canvasRef, live } = useDunes()

  return (
    <section
      ref={hostRef}
      className="relative h-[105svh] min-h-[560px] overflow-hidden bg-ink"
      aria-label="Relevé de terrain"
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          'absolute inset-0 h-full w-full transition-opacity duration-slow ease-raid',
          live ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Vignettage : dissout les bords du maillage dans le fond */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, transparent 20%, rgb(var(--ink)) 78%)',
        }}
      />

      {/* Le suivi souris écoute sur window : le texte reste sélectionnable. */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Relevé de terrain</p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-7 max-w-[16ch] text-display-md">
              Le sable se lit
              <br />
              <span className="text-muted">avant de se conduire.</span>
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {releve.map((r) => (
                <div key={r.label} className="bg-ink px-5 py-5">
                  <dt className="font-display text-micro uppercase text-muted">{r.label}</dt>
                  <dd className="mt-2 font-display text-display-sm text-sand">{r.value}</dd>
                  <p className="mt-2 text-xs leading-snug text-muted">{r.note}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
