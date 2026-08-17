/**
 * ─────────────────────────────────────────────────────────────────
 *  CHAMP DE HAUTEUR — la pièce structurante de toute la scène
 *
 *  DÉCISION TECHNIQUE CENTRALE
 *  Le relief est calculé en JavaScript, une seule fois, PAS dans un
 *  vertex shader.
 *
 *  Pourquoi : le véhicule doit reposer exactement sur le sable. Si le
 *  terrain était déplacé sur le GPU et la position du véhicule
 *  calculée sur le CPU, les deux divergeraient — le GPU travaille en
 *  float32 et sa fonction sin() n'a pas la même précision que celle
 *  de JavaScript. Résultat : un 4x4 qui flotte ou s'enfonce. C'est
 *  exactement le défaut que le brief interdit.
 *
 *  Ici, terrain et véhicule lisent LA MÊME fonction. L'accord est
 *  exact par construction, et le coût est nul par frame puisque les
 *  dunes ne bougent pas.
 *
 *  Elles n'en sont pas mortes pour autant : ce qui vit dans cette
 *  scène, c'est la lumière, la poussière et la caméra. De vraies
 *  dunes ne se déforment pas en quinze secondes non plus.
 * ─────────────────────────────────────────────────────────────────
 */

/** Emprise du terrain, en unités monde (1 unité ≈ 1 mètre). */
export const FIELD_SIZE = 2400

function hash(x: number, y: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return n - Math.floor(n)
}

/** Bruit de valeur, interpolation quintique (dérivée seconde continue). */
function noise(x: number, y: number): number {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const ux = fx * fx * fx * (fx * (fx * 6 - 15) + 10)
  const uy = fy * fy * fy * (fy * (fy * 6 - 15) + 10)

  const a = hash(ix, iy)
  const b = hash(ix + 1, iy)
  const c = hash(ix, iy + 1)
  const d = hash(ix + 1, iy + 1)

  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}

function fbm(x: number, y: number, octaves: number): number {
  let v = 0
  let amp = 0.5
  let px = x
  let py = y
  for (let i = 0; i < octaves; i++) {
    v += amp * noise(px, py)
    px *= 2.03
    py *= 2.03
    amp *= 0.5
  }
  return v
}

/**
 * Altitude du sable au point (x, z).
 *
 * Trois échelles superposées, plus un cisaillement de domaine qui
 * casse la symétrie des crêtes. C'est ce cisaillement qui fait lire
 * « dune » plutôt que « colline » : le vent creuse une face douce au
 * levant et une face raide sous le vent, comme sur un barkhane.
 */
export function heightAt(x: number, z: number): number {
  // Cisaillement du domaine — la signature morphologique des dunes.
  const wx = x + fbm(x * 0.0011, z * 0.0011, 3) * 120 - 60

  let h = 0
  h += fbm(wx * 0.00085, z * 0.00085, 4) * 155 // grandes dunes
  h += fbm(wx * 0.0042, z * 0.0042, 4) * 26 // dunes secondaires
  h += fbm(wx * 0.021, z * 0.021, 2) * 2.6 // ondulations de surface

  // Accentuation des crêtes : le sable s'accumule en haut, pas en bas.
  const t = Math.max(0, Math.min(1, h / 150))
  h += t * t * 16

  return h - 46
}

/**
 * Normale du terrain, par différences finies.
 * `eps` large = normale lissée, ce qu'on veut pour asseoir un châssis
 * sans qu'il réagisse à chaque ondulation de surface.
 */
export function normalAt(x: number, z: number, eps = 6): [number, number, number] {
  const hL = heightAt(x - eps, z)
  const hR = heightAt(x + eps, z)
  const hD = heightAt(x, z - eps)
  const hU = heightAt(x, z + eps)

  let nx = hL - hR
  let ny = 2 * eps
  let nz = hD - hU

  const len = Math.hypot(nx, ny, nz) || 1
  nx /= len
  ny /= len
  nz /= len
  return [nx, ny, nz]
}

/**
 * TRAJECTOIRE DU VÉHICULE
 *
 * Une courbe traversant tout le champ, du fond vers l'avant, avec un
 * louvoiement qui ne se répète pas. Deux sinusoïdes de périodes
 * incommensurables : l'œil n'y perçoit aucun motif.
 *
 * @param t 0 → 1, progression du voyage
 */
export function pathAt(t: number): { x: number; z: number } {
  const x = Math.sin(t * Math.PI * 1.35) * 210 + Math.sin(t * Math.PI * 3.7) * 46 - 30
  const z = 760 - t * 1620
  return { x, z }
}

/** Vecteur tangent normalisé de la trajectoire (direction de marche). */
export function pathTangent(t: number): { x: number; z: number } {
  const d = 0.0025
  const a = pathAt(Math.max(0, t - d))
  const b = pathAt(Math.min(1, t + d))
  const dx = b.x - a.x
  const dz = b.z - a.z
  const len = Math.hypot(dx, dz) || 1
  return { x: dx / len, z: dz / len }
}
