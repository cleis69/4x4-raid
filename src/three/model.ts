import { Box3, Mesh, MeshStandardMaterial, Object3D, Vector3 } from 'three'

/**
 * ─────────────────────────────────────────────────────────────────
 *  PIPELINE DE CHARGEMENT DU VÉHICULE
 *
 *  ⚠️ LE POINT LE PLUS IMPORTANT DE CE FICHIER
 *
 *  Le 4x4 procédural de `vehicle.ts` est un PLACEHOLDER. Il ne peut
 *  pas être photoréaliste et aucun réglage de matériau n'y changera
 *  rien : ce sont ses arêtes vives qui le trahissent. Un objet réel
 *  n'a pas d'arête parfaitement nette — il a un congé de un à deux
 *  millimètres qui accroche un liseré spéculaire. C'est ce liseré,
 *  et lui seul, que l'œil utilise pour juger qu'une forme est réelle.
 *  Aucune quantité de shader ne le fabrique.
 *
 *  Pour atteindre le rendu demandé, il faut un vrai GLB. Ce module
 *  existe pour que son intégration ne demande aucune réécriture.
 *
 *  ── MODE D'EMPLOI ─────────────────────────────────────────────
 *
 *  1. Déposer le fichier dans `public/models/vehicle.glb`
 *  2. C'est tout — il est détecté et chargé automatiquement.
 *
 *  ── CAHIER DES CHARGES DE L'ASSET ─────────────────────────────
 *
 *  Orientation      +Z vers l'avant, +Y vers le haut
 *  Origine          centre de l'empattement, au niveau du sol
 *  Échelle          mètres (un 4x4 fait ~4,8 m de long)
 *  Budget           150 k à 400 k triangles — inutile d'aller plus haut
 *  Matériaux        PBR metallic-roughness, textures en KTX2 de préférence
 *  Roues nommées    wheel_fl · wheel_fr · wheel_rl · wheel_rr
 *                   (origine au centre de rotation, sinon elles vibrent)
 *  Compression      Draco pour la géométrie, KTX2 pour les textures
 *
 *  Sources d'assets adaptées : Sketchfab (filtrer sur licence
 *  commerciale), Quixel, Turbosquid, ou un modèle CAD décimé.
 *  Vérifier impérativement la licence pour un usage commercial.
 *
 *  ── SI LE GLB N'EST PAS LÀ ────────────────────────────────────
 *  Le placeholder reste affiché. Rien ne casse, rien n'attend.
 * ─────────────────────────────────────────────────────────────────
 */

export const VEHICLE_URL = '/models/vehicle.glb'

/** Longueur cible en mètres — sert à normaliser l'échelle du GLB. */
const TARGET_LENGTH = 4.8

/**
 * Charge le modèle si présent. Le loader et ses décodeurs sont eux
 * aussi importés dynamiquement : ils ne pèsent rien tant qu'aucun
 * GLB n'existe.
 */
export async function loadVehicleModel(): Promise<Object3D | null> {
  // Sonde légère : évite de tirer 200 Ko de loader pour un 404.
  try {
    const probe = await fetch(VEHICLE_URL, { method: 'HEAD' })
    if (!probe.ok) return null
  } catch {
    return null
  }

  try {
    const [{ GLTFLoader }, { DRACOLoader }, { KTX2Loader }, { MeshoptDecoder }] =
      await Promise.all([
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/examples/jsm/loaders/DRACOLoader.js'),
        import('three/examples/jsm/loaders/KTX2Loader.js'),
        import('three/examples/jsm/libs/meshopt_decoder.module.js'),
      ])

    const loader = new GLTFLoader()

    const draco = new DRACOLoader()
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
    loader.setDRACOLoader(draco)

    const ktx2 = new KTX2Loader().setTranscoderPath(
      'https://cdn.jsdelivr.net/npm/three/examples/jsm/libs/basis/',
    )
    loader.setKTX2Loader(ktx2)
    loader.setMeshoptDecoder(MeshoptDecoder)

    const gltf = await loader.loadAsync(VEHICLE_URL)
    const model = gltf.scene

    normalise(model)
    prepare(model)

    draco.dispose()
    ktx2.dispose()
    return model
  } catch {
    return null
  }
}

/** Ramène le modèle à l'échelle et à l'origine attendues. */
function normalise(model: Object3D) {
  const box = new Box3().setFromObject(model)
  const size = box.getSize(new Vector3())
  const length = Math.max(size.z, size.x)

  if (length > 0.01) {
    const k = TARGET_LENGTH / length
    // On ne corrige que si l'asset est manifestement à une autre échelle
    // (centimètres, pouces…). Un GLB déjà en mètres est laissé intact.
    if (k < 0.5 || k > 2) model.scale.setScalar(k)
  }

  const after = new Box3().setFromObject(model)
  const centre = after.getCenter(new Vector3())
  // Recentrage horizontal, et pose au sol.
  model.position.x -= centre.x
  model.position.z -= centre.z
  model.position.y -= after.min.y
}

/** Réglages communs : ombres, et un voile de poussière sur les surfaces. */
function prepare(model: Object3D) {
  model.traverse((o) => {
    const mesh = o as Mesh
    if (!mesh.isMesh) return
    mesh.castShadow = true
    mesh.receiveShadow = true

    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    for (const m of mats) {
      const std = m as MeshStandardMaterial
      if (!std || !('roughness' in std)) continue

      // Le désert salit tout. Une carrosserie parfaitement lisse dans
      // le Sahara est le second signal « image de synthèse » après les
      // arêtes vives. On remonte le plancher de rugosité.
      std.roughness = Math.min(1, Math.max(std.roughness, 0.28) + 0.14)
      std.envMapIntensity = 1
      std.needsUpdate = true
    }
  })
}
