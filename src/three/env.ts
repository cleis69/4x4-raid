import {
  CubeCamera,
  Mesh,
  PMREMGenerator,
  Scene,
  Texture,
  WebGLCubeRenderTarget,
  WebGLRenderer,
  HalfFloatType,
  LinearFilter,
} from 'three'

/**
 * ─────────────────────────────────────────────────────────────────
 *  ENVIRONNEMENT — IBL généré depuis notre propre ciel
 *
 *  C'EST LA CORRECTION LA PLUS IMPORTANTE DE CETTE PASSE.
 *
 *  Le problème du rendu précédent n'était pas le nombre de lumières :
 *  c'était qu'il n'y en avait que deux. Un objet réel n'est jamais
 *  éclairé par un soleil et un hémisphère — il est éclairé par tout
 *  ce qui l'entoure. La carrosserie renvoie le ciel au-dessus, le
 *  sable en dessous, le halo solaire d'un côté. Sans cela, une
 *  peinture automobile ressemble à du plastique. C'est exactement ce
 *  qu'on voyait.
 *
 *  La solution habituelle est un HDRI téléchargé. On fait mieux ici :
 *  on rend NOTRE ciel — celui du shader d'atmosphère, avec sa
 *  diffusion de Mie et son disque solaire — dans une cube map, puis
 *  on la convolue en PMREM. L'éclairage d'environnement correspond
 *  alors exactement au ciel visible, à toute heure du cycle. Un HDRI
 *  du commerce ne pourrait pas suivre le soleil qui se couche.
 *
 *  COÛT : la régénération est trop chère pour être faite chaque frame.
 *  On ne la refait que lorsque la lumière a réellement changé — en
 *  pratique quelques dizaines de fois sur toute la traversée, et
 *  jamais deux frames de suite.
 * ─────────────────────────────────────────────────────────────────
 */

export class Environment {
  private pmrem: PMREMGenerator
  private cubeRT: WebGLCubeRenderTarget
  private cubeCam: CubeCamera
  private current: Texture | null = null
  private lastKey = -1

  constructor(
    private renderer: WebGLRenderer,
    private resolution = 128,
  ) {
    this.pmrem = new PMREMGenerator(renderer)
    this.pmrem.compileEquirectangularShader()

    this.cubeRT = new WebGLCubeRenderTarget(this.resolution, {
      type: HalfFloatType,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
    })
    this.cubeCam = new CubeCamera(1, 10000, this.cubeRT)
  }

  /**
   * Régénère l'environnement si la lumière a suffisamment bougé.
   *
   * @param scene   la scène — seul le dôme de ciel sera capté
   * @param skyMesh le dôme, temporairement isolé pour la capture
   * @param key     signature de l'état solaire (progression quantifiée)
   */
  refresh(scene: Scene, skyMesh: Mesh, key: number) {
    if (key === this.lastKey) return
    this.lastKey = key

    // On ne capte que le ciel : ni le terrain, ni le véhicule, ni la
    // poussière n'ont à figurer dans une carte d'environnement — ils
    // produiraient un doublon d'occlusion et un halo sale.
    const hidden: Mesh[] = []
    scene.traverse((o) => {
      if (o !== skyMesh && (o as Mesh).isMesh && o.visible) {
        hidden.push(o as Mesh)
        o.visible = false
      }
    })

    const prevBg = scene.background
    scene.background = null

    // Le dôme suit la caméra : on le recentre le temps de la capture.
    const prevPos = skyMesh.position.clone()
    skyMesh.position.set(0, 0, 0)

    this.cubeCam.position.set(0, 0, 0)
    this.cubeCam.update(this.renderer, scene)

    skyMesh.position.copy(prevPos)
    scene.background = prevBg
    hidden.forEach((o) => (o.visible = true))

    const next = this.pmrem.fromCubemap(this.cubeRT.texture).texture
    this.current?.dispose()
    this.current = next
    scene.environment = next
  }

  /**
   * Quantification de la progression : une régénération tous les 2 %
   * du voyage. Assez fin pour que le passage du jour à la nuit soit
   * continu, assez grossier pour que le coût reste marginal.
   */
  static keyFor(progress: number) {
    return Math.round(progress * 50)
  }

  dispose() {
    this.current?.dispose()
    this.cubeRT.dispose()
    this.pmrem.dispose()
  }
}
