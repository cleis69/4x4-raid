import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three'
import { Atmosphere } from './atmosphere'
import { CinematicCamera } from './camera'
import { Desert } from './desert'
import { Environment } from './env'
import { Lighting } from './lighting'
import { Particles } from './particles'
import { Composite } from './postprocessing'
import type { Quality } from './quality'
import { sampleSun, type SunState } from './timeline'
import { Tracks } from './tracks'
import { Vehicle } from './vehicle'

/**
 * ─────────────────────────────────────────────────────────────────
 *  ORCHESTRATEUR
 *
 *  Le montage reste étalé sur des frames successives pour ne jamais
 *  bloquer le thread principal. Deux étapes s'ajoutent à la passe
 *  précédente : les traces de pneus, montées avant le terrain qui les
 *  échantillonne, et l'environnement PMREM, monté après le ciel dont
 *  il dérive.
 *
 *  L'ordre n'est pas cosmétique : le terrain a besoin de la texture de
 *  traces à la compilation de son shader, et l'IBL a besoin du dôme de
 *  ciel pour exister.
 * ─────────────────────────────────────────────────────────────────
 */

export type Stage =
  | 'idle'
  | 'renderer'
  | 'atmosphere'
  | 'terrain'
  | 'vehicle'
  | 'lighting'
  | 'ready'

const STAGES: Stage[] = ['renderer', 'atmosphere', 'terrain', 'vehicle', 'lighting', 'ready']

export class HeroScene {
  private renderer!: WebGLRenderer
  private scene = new Scene()
  private rig!: CinematicCamera
  private atmosphere?: Atmosphere
  private desert?: Desert
  private vehicle?: Vehicle
  private lighting?: Lighting
  private particles?: Particles
  private composite?: Composite
  private env?: Environment
  private tracks?: Tracks

  private stageIndex = -1
  private raf = 0
  private running = false
  private disposed = false

  private clock = 0
  private last = 0
  private targetP = 0
  private smoothP = 0
  private lastP = 0
  private sun: SunState = sampleSun(0)
  private focus = new Vector3()
  private dpr = 1

  constructor(
    private canvas: HTMLCanvasElement,
    private host: HTMLElement,
    private q: Quality,
    private onStage?: (s: Stage) => void,
  ) {}

  boot() {
    if (this.disposed) return
    const step = () => {
      if (this.disposed) return
      this.stageIndex++
      const stage = STAGES[this.stageIndex]
      if (!stage) return

      this.build(stage)
      this.onStage?.(stage)

      if (stage === 'atmosphere') this.start()
      if (this.stageIndex < STAGES.length - 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  private build(stage: Stage) {
    const { clientWidth: w, clientHeight: h } = this.host
    const aspect = Math.max(0.1, w / Math.max(1, h))

    switch (stage) {
      case 'renderer': {
        this.dpr = Math.min(window.devicePixelRatio, this.q.dpr)
        this.renderer = new WebGLRenderer({
          canvas: this.canvas,
          antialias: this.q.tier === 'desktop',
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        })
        this.renderer.setPixelRatio(this.dpr)
        this.renderer.setSize(w, h, false)
        this.renderer.outputColorSpace = SRGBColorSpace
        this.renderer.toneMapping = ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 1
        if (this.q.shadows) {
          this.renderer.shadowMap.enabled = true
          this.renderer.shadowMap.type = PCFSoftShadowMap
        }
        this.rig = new CinematicCamera(aspect, this.q.far)
        break
      }

      case 'atmosphere':
        this.atmosphere = new Atmosphere(this.scene, this.q.far)
        if (this.q.env) this.env = new Environment(this.renderer, this.q.envResolution)
        if (this.q.post) {
          this.composite = new Composite(w, h, this.dpr, this.q.highPrecisionDepth)
        }
        break

      case 'terrain':
        // Les traces doivent exister avant le terrain : son shader les
        // échantillonne dès sa compilation.
        if (this.q.tracks) this.tracks = new Tracks(1024)
        this.desert = new Desert(
          this.scene,
          this.q.terrainSegments,
          this.q.shadows,
          this.tracks?.texture ?? null,
        )
        break

      case 'vehicle':
        this.vehicle = new Vehicle(this.scene, this.q.shadows)
        break

      case 'lighting':
        this.lighting = new Lighting(this.scene, this.q)
        break

      case 'ready':
        this.particles = new Particles(this.scene, this.q.dust, this.dpr)
        break
    }
  }

  setProgress(p: number) {
    this.targetP = Math.max(0, Math.min(1, p))
  }

  start() {
    if (this.running || this.disposed) return
    this.running = true
    this.last = performance.now()
    this.loop()
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  private loop = () => {
    if (!this.running || this.disposed) return
    this.raf = requestAnimationFrame(this.loop)

    const now = performance.now()
    const dt = Math.min(0.05, (now - this.last) / 1000)
    this.last = now
    this.clock += dt

    this.smoothP += (this.targetP - this.smoothP) * (1 - Math.exp(-dt * 2.6))
    const moving = Math.abs(this.smoothP - this.lastP) > 0.00004
    this.lastP = this.smoothP

    this.sun = sampleSun(this.smoothP)

    if (this.vehicle) {
      this.vehicle.update(this.smoothP, dt)
      this.vehicle.updateLights(this.sun)
      this.focus.copy(this.vehicle.position)
    }

    this.rig.update(this.smoothP, this.vehicle ?? this.fallbackTarget(), this.clock, dt)
    const cam = this.rig.camera

    this.atmosphere?.update(this.sun)
    this.atmosphere?.follow(cam.position.x, cam.position.y, cam.position.z)
    this.desert?.update(this.sun)
    this.lighting?.update(this.sun, this.focus)

    if (this.vehicle) {
      this.particles?.update(dt, cam.position, this.vehicle, this.sun, moving)
      // Les roues arrière impriment le sable. On ne peint qu'en mouvement :
      // un véhicule à l'arrêt ne creuse pas.
      if (moving && this.tracks) {
        this.tracks.paint(this.renderer, this.vehicle.contacts, 0.34)
      }
    }

    // Régénération de l'IBL, seulement quand la lumière a bougé.
    if (this.env && this.atmosphere) {
      this.env.refresh(this.scene, this.atmosphere.mesh, Environment.keyFor(this.smoothP))
    }

    this.renderer.toneMappingExposure = this.sun.exposure

    if (this.composite) {
      this.composite.update(
        this.sun,
        this.clock,
        cam,
        this.rig.focusDistance,
        this.rig.aperture,
        cam.getFocalLength(),
      )
      this.renderer.setRenderTarget(this.composite.target)
      this.renderer.render(this.scene, cam)
      this.composite.render(this.renderer)
    } else {
      this.renderer.setRenderTarget(null)
      this.renderer.render(this.scene, cam)
    }
  }

  private fallbackTarget(): Vehicle {
    return {
      position: this.focus,
      forward: new Vector3(0, 0, -1),
    } as Vehicle
  }

  /** Libellé du plan courant — « 50 mm · travelling ». */
  get shotLabel() {
    return this.rig?.label ?? ''
  }

  resize() {
    if (!this.renderer) return
    const w = this.host.clientWidth
    const h = this.host.clientHeight
    if (w === 0 || h === 0) return
    this.renderer.setSize(w, h, false)
    this.rig.resize(w / h)
    this.composite?.resize(w, h, this.dpr)
    this.particles?.setPixelRatio(this.dpr)
  }

  dispose() {
    this.disposed = true
    this.stop()
    this.particles?.dispose()
    this.vehicle?.dispose()
    this.desert?.dispose()
    this.atmosphere?.dispose()
    this.lighting?.dispose()
    this.composite?.dispose()
    this.tracks?.dispose()
    this.env?.dispose()
    this.renderer?.dispose()
    this.scene.clear()
  }
}
