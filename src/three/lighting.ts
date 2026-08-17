import { DirectionalLight, HemisphereLight, Object3D, Scene, Vector3 } from 'three'
import type { Quality } from './quality'
import type { SunState } from './timeline'

/**
 * ─────────────────────────────────────────────────────────────────
 *  ÉCLAIRAGE
 *
 *  Deux sources seulement : le soleil et le ciel. C'est la réalité
 *  physique d'un désert, et c'est aussi ce qui garantit que la scène
 *  ne « s'éclaire » jamais artificiellement.
 *
 *  Le point délicat est l'ombre portée. Une ombre couvrant tout le
 *  terrain à 2048 px donnerait une texelle de plus d'un mètre —
 *  inexploitable. On concentre donc le frustum d'ombre sur une boîte
 *  serrée autour du véhicule, qui se déplace avec lui. Le 4x4 garde
 *  une ombre nette ; les dunes lointaines n'en ont pas besoin, leur
 *  modelé vient de leurs propres normales.
 * ─────────────────────────────────────────────────────────────────
 */

const SHADOW_EXTENT = 190

export class Lighting {
  readonly sun: DirectionalLight
  readonly sky: HemisphereLight
  private target: Object3D
  private dir = new Vector3()

  constructor(private scene: Scene, q: Quality) {
    this.sun = new DirectionalLight(0xffffff, 1)
    this.sun.castShadow = q.shadows

    if (q.shadows) {
      const cam = this.sun.shadow.camera
      cam.left = -SHADOW_EXTENT
      cam.right = SHADOW_EXTENT
      cam.top = SHADOW_EXTENT
      cam.bottom = -SHADOW_EXTENT
      cam.near = 40
      cam.far = 1000
      cam.updateProjectionMatrix()
      this.sun.shadow.mapSize.set(q.shadowMapSize, q.shadowMapSize)
      // Le sable est presque plat : un biais mal réglé produit soit du
      // peter-panning, soit du shadow acne en bandes sur les crêtes.
      this.sun.shadow.bias = -0.0006
      this.sun.shadow.normalBias = 1.4
      // Le soleil n'est pas une source ponctuelle : il couvre un demi-
      // degré de ciel. Ses ombres ont donc toujours une pénombre. Une
      // ombre à bord net est l'un des signaux « jeu vidéo » les plus
      // immédiats — d'où ce rayon de filtrage.
      this.sun.shadow.radius = 4.5
      this.sun.shadow.blurSamples = 12
    }

    this.target = new Object3D()
    scene.add(this.target)
    this.sun.target = this.target
    scene.add(this.sun)

    // Lumière du ciel : bleue au zénith, renvoi du sable au sol.
    this.sky = new HemisphereLight(0x8fa8c8, 0x6b5334, 0.5)
    scene.add(this.sky)
  }

  /**
   * @param focus point que l'ombre doit couvrir — la position du véhicule
   */
  update(sun: SunState, focus: Vector3) {
    this.dir.set(sun.x, sun.y, sun.z).normalize()

    // Le soleil est projeté à distance fixe du point d'intérêt : le
    // frustum d'ombre reste centré quoi qu'il arrive.
    this.sun.position.copy(focus).addScaledVector(this.dir, 420)
    this.target.position.copy(focus)
    this.target.updateMatrixWorld()

    this.sun.color.copy(sun.sunColor)
    this.sun.intensity = sun.sunIntensity

    this.sky.color.copy(sun.skyZenith).multiplyScalar(1.35)
    this.sky.groundColor.copy(sun.sandTint).multiplyScalar(0.5)
    this.sky.intensity = sun.ambientIntensity
  }

  dispose() {
    this.scene.remove(this.sun)
    this.scene.remove(this.sky)
    this.scene.remove(this.target)
    this.sun.dispose()
    this.sky.dispose()
  }
}
