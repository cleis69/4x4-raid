/**
 * ─────────────────────────────────────────────────────────────────
 *  QUALITÉ — détection du palier de rendu
 *
 *  Un seul endroit décide de tout ce qui coûte cher. Chaque module
 *  lit ce profil ; aucun ne fait sa propre détection.
 * ─────────────────────────────────────────────────────────────────
 */

export type Tier = 'none' | 'mobile' | 'tablet' | 'desktop'

export type Quality = {
  tier: Tier
  /** Segments du maillage de terrain (par côté). */
  terrainSegments: number
  /** Nombre de particules de poussière. */
  dust: number
  /** Ombres portées du soleil. */
  shadows: boolean
  shadowMapSize: number
  /** Passe de composition (DOF, flou de mouvement, étalonnage). */
  post: boolean
  /** Éclairage par image généré depuis le ciel. Décisif sur la carrosserie. */
  env: boolean
  /** Résolution de la cube map d'environnement. */
  envResolution: number
  /** Tampon de profondeur en float — nécessaire à une DOF propre. */
  highPrecisionDepth: boolean
  /** Traces de pneus persistantes. */
  tracks: boolean
  /** Plafond de devicePixelRatio. */
  dpr: number
  /** Distance de rendu — pilote aussi la densité du brouillard. */
  far: number
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    const gl = (c.getContext('webgl2') ||
      c.getContext('webgl') ||
      c.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return false
    // Un contexte logiciel (SwiftShader) rend la scène à 5 fps : on refuse.
    const dbg = gl.getExtension('WEBGL_debug_renderer_info')
    if (dbg) {
      const r = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) ?? '')
      if (/swiftshader|llvmpipe|software/i.test(r)) return false
    }
    return true
  } catch {
    return false
  }
}

export function detectQuality(): Quality {
  const off: Quality = {
    tier: 'none',
    terrainSegments: 0,
    dust: 0,
    shadows: false,
    shadowMapSize: 0,
    post: false,
    env: false,
    envResolution: 0,
    highPrecisionDepth: false,
    tracks: false,
    dpr: 1,
    far: 0,
  }

  if (typeof window === 'undefined') return off
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return off
  if (!hasWebGL()) return off

  // Save-Data : l'utilisateur a demandé à économiser. On respecte.
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (conn?.saveData) return off

  const w = window.innerWidth
  const cores = navigator.hardwareConcurrency ?? 4
  const coarse = window.matchMedia('(pointer: coarse)').matches

  if (w < 768 || (coarse && cores <= 4)) {
    return {
      tier: 'mobile',
      terrainSegments: 96,
      dust: 220,
      shadows: false,
      shadowMapSize: 0,
      post: false,
      // L'IBL est conservée même sur mobile, en basse résolution :
      // c'est le poste qui rapporte le plus de réalisme par milliseconde.
      env: true,
      envResolution: 64,
      highPrecisionDepth: false,
      tracks: false,
      dpr: 1.25,
      far: 1400,
    }
  }

  if (w < 1280 || cores <= 6) {
    return {
      tier: 'tablet',
      terrainSegments: 160,
      dust: 420,
      shadows: true,
      shadowMapSize: 1024,
      post: true,
      env: true,
      envResolution: 96,
      highPrecisionDepth: false,
      tracks: true,
      dpr: 1.5,
      far: 1900,
    }
  }

  return {
    tier: 'desktop',
    terrainSegments: 256,
    dust: 800,
    shadows: true,
    shadowMapSize: 2048,
    post: true,
    env: true,
    envResolution: 128,
    highPrecisionDepth: true,
    tracks: true,
    dpr: 2,
    far: 2400,
  }
}
