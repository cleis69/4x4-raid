import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
} from 'three'
import { heightAt } from './field'
import type { SunState } from './timeline'
import type { Vehicle } from './vehicle'

/**
 * ─────────────────────────────────────────────────────────────────
 *  POUSSIÈRE — deux populations, un seul système
 *
 *  1. AMBIANTE — particules en suspension, portées par le vent. Elles
 *     vivent dans une boîte qui suit la caméra et se rebouclent à ses
 *     bords : on ne peut jamais atteindre le bord du nuage.
 *
 *  2. SILLAGE — sable soulevé par les roues arrière. Émission
 *     continue au contact du sol, ascension courte, extinction.
 *
 *  Les deux partagent un unique buffer et une unique draw call. La
 *  distinction se fait par un simple index de partition.
 *
 *  Le réglage important n'est pas le nombre mais l'opacité : la
 *  poussière doit se sentir plutôt que se voir. Dès qu'on distingue
 *  des points individuels, la scène bascule dans le jeu vidéo.
 * ─────────────────────────────────────────────────────────────────
 */

const VERT = /* glsl */ `
attribute float aLife;
attribute float aSize;
attribute float aSeed;
uniform float uPixelRatio;
uniform float uLowSun;
varying float vAlpha;
varying float vSeed;

void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;

  float dist = -mv.z;
  // Atténuation de taille avec la distance, plancher pour rester visible.
  gl_PointSize = aSize * uPixelRatio * (260.0 / max(dist, 24.0));
  gl_PointSize = clamp(gl_PointSize, 1.0, 26.0);

  // Fondu de proximité : rien ne doit apparaître dans le nez de la caméra.
  float near = smoothstep(6.0, 40.0, dist);
  float far  = 1.0 - smoothstep(400.0, 1100.0, dist);

  // Le soleil rasant révèle la poussière : elle se voit à contre-jour.
  vAlpha = aLife * near * far * (0.35 + uLowSun * 0.65);
  vSeed = aSeed;
}`

const FRAG = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
varying float vSeed;

void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d = dot(uv, uv);
  if (d > 0.25) discard;
  // Grain doux : pas de cercle net, pas de sprite carré.
  float a = (1.0 - d * 4.0);
  a *= a;
  gl_FragColor = vec4(uColor * (0.7 + vSeed * 0.5), a * vAlpha * 0.19);
}`

export class Particles {
  readonly points: Points
  private geo: BufferGeometry
  private mat: ShaderMaterial

  private pos: Float32Array
  private vel: Float32Array
  private life: Float32Array
  private seed: Float32Array

  private count: number
  private wakeStart: number
  private wakeCursor: number

  private tmp = new Vector3()
  private color = new Color()

  constructor(private scene: Scene, count: number, pixelRatio: number) {
    this.count = count
    // Le dernier tiers est réservé au sillage du véhicule.
    this.wakeStart = Math.floor(count * 0.68)
    this.wakeCursor = this.wakeStart

    this.pos = new Float32Array(count * 3)
    this.vel = new Float32Array(count * 3)
    this.life = new Float32Array(count)
    this.seed = new Float32Array(count)

    const size = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      this.seed[i] = Math.random()
      if (i < this.wakeStart) {
        this.respawnAmbient(i, 0, 0, 0, true)
        size[i] = 1.6 + Math.random() * 2.6
      } else {
        this.life[i] = 0
        size[i] = 2.6 + Math.random() * 4.2
      }
    }

    this.geo = new BufferGeometry()
    this.geo.setAttribute('position', new BufferAttribute(this.pos, 3))
    this.geo.setAttribute('aLife', new BufferAttribute(this.life, 1))
    this.geo.setAttribute('aSize', new BufferAttribute(size, 1))
    this.geo.setAttribute('aSeed', new BufferAttribute(this.seed, 1))
    this.geo.boundingSphere = null

    this.mat = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uColor: { value: new Color(0xc8a96b) },
        uPixelRatio: { value: pixelRatio },
        uLowSun: { value: 1 },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
    })

    this.points = new Points(this.geo, this.mat)
    this.points.frustumCulled = false
    scene.add(this.points)
  }

  /** Repositionne une particule ambiante dans la boîte autour de la caméra. */
  private respawnAmbient(i: number, cx: number, cy: number, cz: number, initial = false) {
    const i3 = i * 3
    const R = 340
    this.pos[i3] = cx + (Math.random() - 0.5) * R * 2
    this.pos[i3 + 1] = cy + (Math.random() - 0.5) * 90 + 10
    this.pos[i3 + 2] = cz + (Math.random() - 0.5) * R * 2

    this.vel[i3] = 5 + Math.random() * 9
    this.vel[i3 + 1] = (Math.random() - 0.3) * 1.4
    this.vel[i3 + 2] = (Math.random() - 0.5) * 3.4

    this.life[i] = initial ? Math.random() : 1
  }

  /** Émet une bouffée de sable sous une roue arrière. */
  private emitWake(x: number, y: number, z: number) {
    const i = this.wakeCursor
    const i3 = i * 3
    this.pos[i3] = x + (Math.random() - 0.5) * 2.4
    this.pos[i3 + 1] = y + Math.random() * 0.6
    this.pos[i3 + 2] = z + (Math.random() - 0.5) * 2.4

    this.vel[i3] = (Math.random() - 0.5) * 5
    this.vel[i3 + 1] = 3.5 + Math.random() * 5
    this.vel[i3 + 2] = (Math.random() - 0.5) * 5

    this.life[i] = 1

    this.wakeCursor++
    if (this.wakeCursor >= this.count) this.wakeCursor = this.wakeStart
  }

  update(dt: number, camPos: Vector3, vehicle: Vehicle, sun: SunState, moving: boolean) {
    const p = this.pos
    const v = this.vel
    const l = this.life

    // ─── Ambiante ────────────────────────────────────────────
    for (let i = 0; i < this.wakeStart; i++) {
      const i3 = i * 3
      p[i3] += v[i3] * dt
      p[i3 + 1] += v[i3 + 1] * dt
      p[i3 + 2] += v[i3 + 2] * dt

      // Reboucle si la particule sort de la boîte suiveuse.
      const dx = p[i3] - camPos.x
      const dz = p[i3 + 2] - camPos.z
      const dy = p[i3 + 1] - camPos.y
      if (Math.abs(dx) > 340 || Math.abs(dz) > 340 || Math.abs(dy) > 110) {
        this.respawnAmbient(i, camPos.x, camPos.y, camPos.z)
      }
    }

    // ─── Sillage ─────────────────────────────────────────────
    if (moving) {
      // Deux bouffées par frame sous l'essieu arrière.
      this.tmp.copy(vehicle.position).addScaledVector(vehicle.forward, -4)
      const gy = heightAt(this.tmp.x, this.tmp.z)
      this.emitWake(this.tmp.x, gy, this.tmp.z)
      this.emitWake(this.tmp.x, gy, this.tmp.z)
    }

    for (let i = this.wakeStart; i < this.count; i++) {
      if (l[i] <= 0) continue
      const i3 = i * 3
      // Le sable retombe : gravité + traînée.
      v[i3 + 1] -= 7.5 * dt
      v[i3] *= 1 - dt * 1.6
      v[i3 + 2] *= 1 - dt * 1.6

      p[i3] += v[i3] * dt
      p[i3 + 1] += v[i3 + 1] * dt
      p[i3 + 2] += v[i3 + 2] * dt

      l[i] -= dt * 0.75
      if (l[i] < 0) l[i] = 0
    }

    ;(this.geo.attributes.position as BufferAttribute).needsUpdate = true
    ;(this.geo.attributes.aLife as BufferAttribute).needsUpdate = true

    // La poussière prend la couleur de la lumière, pas la sienne.
    this.color.copy(sun.sunColor).lerp(sun.sandTint, 0.4)
    ;(this.mat.uniforms.uColor.value as Color).copy(this.color)
    this.mat.uniforms.uLowSun.value = sun.lowSun
  }

  setPixelRatio(r: number) {
    this.mat.uniforms.uPixelRatio.value = r
  }

  dispose() {
    this.scene.remove(this.points)
    this.geo.dispose()
    this.mat.dispose()
  }
}
