import { Color } from 'three'

/**
 * ─────────────────────────────────────────────────────────────────
 *  TIMELINE SOLAIRE — sept états, une seule interpolation
 *
 *  Le scroll ne déclenche pas des animations : il déplace un curseur
 *  sur une journée. Chaque grandeur visible de la scène — azimut et
 *  élévation du soleil, couleur et intensité de la lumière, teinte du
 *  ciel au zénith et à l'horizon, densité et couleur du brouillard,
 *  exposition — est une fonction continue de ce curseur.
 *
 *  Conséquence : aucun raccord à gérer, aucune transition à écrire.
 *  Le lever de soleil n'est pas un « effet », c'est l'état 0 d'un
 *  système qui en traverse sept.
 *
 *  Les couleurs sont dérivées de la palette de marque (sable #C8A96B,
 *  terre #8A5A3B, encre #0B0B0A) plutôt que d'un ciel photographique.
 *  C'est ce qui garde la scène cohérente avec le reste du site.
 * ─────────────────────────────────────────────────────────────────
 */

export type Phase = {
  key: string
  label: string
  /** Élévation du soleil en degrés — négatif = sous l'horizon. */
  elevation: number
  /** Azimut en degrés. Le soleil traverse réellement le ciel. */
  azimuth: number
  sunColor: number
  sunIntensity: number
  ambientColor: number
  ambientIntensity: number
  skyZenith: number
  skyHorizon: number
  fogColor: number
  /** Densité du brouillard exponentiel. */
  fogDensity: number
  /** Exposition du tone mapping ACES. */
  exposure: number
  /** Teinte du sable — le sable ne renvoie pas la même couleur à 6 h et à 14 h. */
  sandTint: number
}

export const PHASES: Phase[] = [
  {
    key: 'dawn',
    label: 'Aube',
    elevation: -2.5,
    azimuth: 96,
    sunColor: 0x6b4a3a,
    sunIntensity: 0.35,
    ambientColor: 0x2a3346,
    ambientIntensity: 0.55,
    skyZenith: 0x14192b,
    skyHorizon: 0x6b4f47,
    fogColor: 0x33303a,
    fogDensity: 0.00095,
    exposure: 0.72,
    sandTint: 0x6f6558,
  },
  {
    key: 'sunrise',
    label: 'Lever',
    elevation: 4,
    azimuth: 92,
    sunColor: 0xd98547,
    sunIntensity: 1.5,
    ambientColor: 0x3c4258,
    ambientIntensity: 0.45,
    skyZenith: 0x2c3a56,
    skyHorizon: 0xd9885a,
    fogColor: 0x8d7462,
    fogDensity: 0.00082,
    exposure: 0.9,
    sandTint: 0xb08b62,
  },
  {
    key: 'golden-am',
    label: 'Heure dorée',
    elevation: 14,
    azimuth: 84,
    sunColor: 0xf0b878,
    sunIntensity: 2.5,
    ambientColor: 0x53617e,
    ambientIntensity: 0.4,
    skyZenith: 0x3f5c86,
    skyHorizon: 0xe8b184,
    fogColor: 0xa48c72,
    fogDensity: 0.00062,
    exposure: 1,
    sandTint: 0xc8a96b,
  },
  {
    key: 'daylight',
    label: 'Plein jour',
    elevation: 62,
    azimuth: 40,
    sunColor: 0xfff4e0,
    sunIntensity: 3.1,
    ambientColor: 0x8ea6c4,
    ambientIntensity: 0.5,
    skyZenith: 0x3d74b4,
    skyHorizon: 0xbcd2e6,
    fogColor: 0xc3cbd2,
    fogDensity: 0.00042,
    exposure: 1.06,
    sandTint: 0xd8c9a4,
  },
  {
    key: 'afternoon',
    label: 'Après-midi',
    elevation: 34,
    azimuth: -32,
    sunColor: 0xffe2b4,
    sunIntensity: 2.8,
    ambientColor: 0x7d90ad,
    ambientIntensity: 0.45,
    skyZenith: 0x3e6ba4,
    skyHorizon: 0xdcc7ab,
    fogColor: 0xb9b09e,
    fogDensity: 0.00052,
    exposure: 1.02,
    sandTint: 0xd2b98a,
  },
  {
    key: 'sunset',
    label: 'Coucher',
    elevation: 3,
    azimuth: -86,
    sunColor: 0xff8a3c,
    sunIntensity: 2.1,
    ambientColor: 0x4a4258,
    ambientIntensity: 0.4,
    skyZenith: 0x2b3558,
    skyHorizon: 0xe8763a,
    fogColor: 0x8f6046,
    fogDensity: 0.00088,
    exposure: 0.94,
    sandTint: 0xa97748,
  },
  {
    key: 'blue-hour',
    label: 'Heure bleue',
    elevation: -6,
    azimuth: -96,
    sunColor: 0x3d4a72,
    sunIntensity: 0.28,
    ambientColor: 0x24304c,
    ambientIntensity: 0.6,
    skyZenith: 0x0d1220,
    skyHorizon: 0x2c3c62,
    fogColor: 0x1d2438,
    fogDensity: 0.00115,
    exposure: 0.66,
    sandTint: 0x4a4c55,
  },
]

/** État interpolé, reconstruit à chaque frame. */
export type SunState = {
  /** Position cartésienne du soleil, rayon fixe. */
  x: number
  y: number
  z: number
  sunColor: Color
  sunIntensity: number
  ambientColor: Color
  ambientIntensity: number
  skyZenith: Color
  skyHorizon: Color
  fogColor: Color
  fogDensity: number
  exposure: number
  sandTint: Color
  label: string
  /** 0 → 1 : à quel point le soleil est bas. Pilote le halo atmosphérique. */
  lowSun: number
}

const SUN_RADIUS = 3200
const DEG = Math.PI / 180

// Instances réutilisées : zéro allocation dans la boucle de rendu.
const _sun = new Color()
const _amb = new Color()
const _zen = new Color()
const _hor = new Color()
const _fog = new Color()
const _sand = new Color()
const _a = new Color()
const _b = new Color()

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function mixInto(target: Color, ca: number, cb: number, t: number) {
  _a.setHex(ca)
  _b.setHex(cb)
  target.copy(_a).lerp(_b, t)
}

/**
 * Échantillonne la journée.
 * @param p progression 0 → 1 (pilotée par le scroll, amortie en amont)
 */
export function sampleSun(p: number): SunState {
  const clamped = Math.max(0, Math.min(0.9999, p))
  const scaled = clamped * (PHASES.length - 1)
  const i = Math.floor(scaled)
  const t = scaled - i
  const A = PHASES[i]
  const B = PHASES[Math.min(PHASES.length - 1, i + 1)]

  // Adoucissement aux raccords : la lumière ne change jamais par paliers.
  const s = t * t * (3 - 2 * t)

  const elev = lerp(A.elevation, B.elevation, s) * DEG
  const azim = lerp(A.azimuth, B.azimuth, s) * DEG

  mixInto(_sun, A.sunColor, B.sunColor, s)
  mixInto(_amb, A.ambientColor, B.ambientColor, s)
  mixInto(_zen, A.skyZenith, B.skyZenith, s)
  mixInto(_hor, A.skyHorizon, B.skyHorizon, s)
  mixInto(_fog, A.fogColor, B.fogColor, s)
  mixInto(_sand, A.sandTint, B.sandTint, s)

  const cosE = Math.cos(elev)

  return {
    x: Math.sin(azim) * cosE * SUN_RADIUS,
    y: Math.sin(elev) * SUN_RADIUS,
    z: Math.cos(azim) * cosE * SUN_RADIUS,
    sunColor: _sun,
    sunIntensity: lerp(A.sunIntensity, B.sunIntensity, s),
    ambientColor: _amb,
    ambientIntensity: lerp(A.ambientIntensity, B.ambientIntensity, s),
    skyZenith: _zen,
    skyHorizon: _hor,
    fogColor: _fog,
    fogDensity: lerp(A.fogDensity, B.fogDensity, s),
    exposure: lerp(A.exposure, B.exposure, s),
    sandTint: _sand,
    label: s < 0.5 ? A.label : B.label,
    lowSun: 1 - Math.min(1, Math.max(0, Math.sin(elev) * 3.2)),
  }
}
