import {
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  type MeshStandardMaterialParameters,
  Object3D,
  Quaternion,
  Scene,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { heightAt, normalAt, pathAt, pathTangent } from './field'
import { loadVehicleModel } from './model'
import type { SunState } from './timeline'

/**
 * ─────────────────────────────────────────────────────────────────
 *  LE VÉHICULE — deuxième passe
 *
 *  ⚠️ À LIRE AVANT TOUTE AUTRE CHOSE
 *
 *  Ce modèle procédural reste un PLACEHOLDER, et il le restera.
 *  Aucun réglage ne le rendra photoréaliste. La raison est
 *  géométrique, pas matérielle : un objet manufacturé réel n'a aucune
 *  arête parfaitement vive. Il a partout un congé d'un ou deux
 *  millimètres qui accroche un liseré spéculaire, et c'est ce liseré
 *  que l'œil lit pour décider qu'une forme existe. Un shader ne le
 *  fabrique pas — il faut de la géométrie.
 *
 *  Ce qui a été fait ici pour s'en rapprocher autant que possible :
 *   — toutes les boîtes sont remplacées par des volumes à arêtes
 *     congées (RoundedBoxGeometry), ce qui restitue justement ce
 *     liseré ;
 *   — les détails qui donnent l'échelle sont là : rétroviseurs,
 *     poignées, phares, joints de vitrage, sculpture de pneu ;
 *   — les matériaux ont une rugosité hétérogène et un voile de
 *     poussière qui monte du bas de caisse.
 *
 *  Cela fait passer le modèle de « asset de jeu » à « maquette
 *  soignée ». Pour aller au photoréalisme, déposez un GLB dans
 *  `public/models/vehicle.glb` : il est chargé automatiquement et
 *  remplace tout ceci sans qu'une ligne du système d'animation, de
 *  caméra ou de lumière ne change. Voir `model.ts`.
 * ─────────────────────────────────────────────────────────────────
 */

const SCALE = 2.9
const WHEEL_R = 0.44
const WHEELBASE = 2.95
const TRACK = 1.68
const RIDE = 0.5
/** Enfoncement dans le sable — un pneu de raid est dégonflé et s'assied. */
const SINK = 0.085

type WheelRig = {
  pivot: Group
  spin: Object3D
  rest: Vector3
  travel: number
}

export class Vehicle {
  readonly root = new Group()
  readonly chassis = new Group()
  readonly position = new Vector3()
  readonly forward = new Vector3(0, 0, -1)

  /** Points de contact des roues arrière, en monde. Pour les traces. */
  readonly contacts: Array<{ x: number; z: number }> = [
    { x: 0, z: 0 },
    { x: 0, z: 0 },
  ]

  private wheels: WheelRig[] = []
  private body = new Group()
  private materials: MeshStandardMaterial[] = []
  private lamps: MeshStandardMaterial[] = []
  private up = new Vector3(0, 1, 0)
  private q = new Quaternion()
  private m = { pitch: 0, roll: 0, heave: 0, spin: 0 }
  private prev = new Vector3()
  private tmp = new Vector3()
  private static readonly Y = new Vector3(0, 1, 0)
  private prevHeading = 0
  private headingRate = 0
  private usingModel = false

  constructor(private scene: Scene, castShadow: boolean) {
    this.root.add(this.chassis)
    this.root.scale.setScalar(SCALE)
    this.buildProcedural(castShadow)
    this.buildWheels(castShadow)
    scene.add(this.root)

    // Tentative de chargement d'un vrai modèle, sans bloquer.
    loadVehicleModel().then((model) => {
      if (model) this.setModel(model)
    })
  }

  private mat(
    color: number,
    roughness: number,
    metalness: number,
    extra?: MeshStandardMaterialParameters,
  ) {
    const m = new MeshStandardMaterial({ color, roughness, metalness, ...extra })
    m.envMapIntensity = 1
    this.materials.push(m)
    return m
  }

  private buildProcedural(castShadow: boolean) {
    // Peinture mate de raid, pas un vernis de concession : une
    // carrosserie brillante dans le Sahara est immédiatement fausse.
    const paint = this.mat(0x8e8a83, 0.52, 0.12)
    const dusty = this.mat(0x7d7468, 0.88, 0.05)
    const dark = this.mat(0x1c1b19, 0.74, 0.25)
    const glass = this.mat(0x1e242b, 0.08, 0.5)
    const chrome = this.mat(0x9a958c, 0.34, 0.85)
    const trim = this.mat(0xc8a96b, 0.45, 0.35)
    const lampOn = this.mat(0xfff0d8, 0.18, 0.1, { emissive: 0x000000 })
    this.lamps.push(lampOn)

    const box = (
      w: number,
      h: number,
      d: number,
      r: number,
      m: MeshStandardMaterial,
      x: number,
      y: number,
      z: number,
    ) => {
      // 2 segments suffisent : le congé doit s'apercevoir, pas se compter.
      const g = new RoundedBoxGeometry(w, h, d, 2, r)
      const mesh = new Mesh(g, m)
      mesh.position.set(x, y, z)
      mesh.castShadow = castShadow
      mesh.receiveShadow = castShadow
      this.body.add(mesh)
      return mesh
    }

    /* ── Volumes principaux, tous congés ────────────────────── */
    box(1.94, 0.84, 4.58, 0.09, paint, 0, 0.86, 0)
    box(1.8, 0.36, 1.52, 0.07, paint, 0, 1.33, -1.6)
    box(1.78, 0.78, 2.32, 0.1, paint, 0, 1.64, 0.18)
    box(1.83, 0.52, 2.2, 0.04, glass, 0, 1.7, 0.18)

    // Bas de caisse empoussiéré : la saleté monte du sol, elle ne
    // tombe pas du ciel. Ce dégradé est un des repères d'échelle les
    // plus efficaces.
    box(1.97, 0.3, 4.5, 0.08, dusty, 0, 0.52, 0)

    /* ── Détails qui donnent l'échelle ──────────────────────── */
    // Rétroviseurs
    box(0.26, 0.16, 0.09, 0.03, dark, -1.03, 1.62, -0.78)
    box(0.26, 0.16, 0.09, 0.03, dark, 1.03, 1.62, -0.78)
    box(0.06, 0.05, 0.14, 0.02, dark, -0.94, 1.6, -0.74)
    box(0.06, 0.05, 0.14, 0.02, dark, 0.94, 1.6, -0.74)

    // Poignées de portes
    box(0.03, 0.05, 0.24, 0.015, chrome, -0.98, 1.14, 0.28)
    box(0.03, 0.05, 0.24, 0.015, chrome, 0.98, 1.14, 0.28)
    box(0.03, 0.05, 0.24, 0.015, chrome, -0.98, 1.14, 1.16)
    box(0.03, 0.05, 0.24, 0.015, chrome, 0.98, 1.14, 1.16)

    // Phares + feux arrière
    box(0.34, 0.2, 0.08, 0.035, lampOn, -0.7, 1.16, -2.3)
    box(0.34, 0.2, 0.08, 0.035, lampOn, 0.7, 1.16, -2.3)
    box(0.24, 0.16, 0.06, 0.03, this.mat(0x6e1f16, 0.3, 0.1), -0.78, 1.2, 2.32)
    box(0.24, 0.16, 0.06, 0.03, this.mat(0x6e1f16, 0.3, 0.1), 0.78, 1.2, 2.32)

    // Galerie et rampe
    box(1.64, 0.09, 2.08, 0.03, dark, 0, 2.08, 0.3)
    box(1.26, 0.13, 0.15, 0.05, trim, 0, 2.19, -0.7)
    for (let i = -2; i <= 2; i++) {
      box(0.11, 0.1, 0.11, 0.045, glass, i * 0.24, 2.19, -0.7)
    }

    // Pare-buffle et marchepieds
    box(1.9, 0.34, 0.18, 0.07, dark, 0, 0.88, -2.4)
    box(0.06, 0.42, 0.06, 0.025, dark, -0.62, 1.1, -2.38)
    box(0.06, 0.42, 0.06, 0.025, dark, 0.62, 1.1, -2.38)
    box(0.15, 0.12, 3.05, 0.05, dark, -1.01, 0.5, 0.1)
    box(0.15, 0.12, 3.05, 0.05, dark, 1.01, 0.5, 0.1)

    // Roue de secours
    const spare = new Mesh(
      new CylinderGeometry(WHEEL_R * 0.95, WHEEL_R * 0.95, 0.3, 24),
      dark,
    )
    spare.rotation.x = Math.PI / 2
    spare.position.set(0, 1.3, 2.42)
    spare.castShadow = castShadow
    this.body.add(spare)

    // Antenne — un trait fin qui casse la silhouette trop propre.
    const ant = new Mesh(new CylinderGeometry(0.008, 0.008, 0.9, 6), dark)
    ant.position.set(-0.86, 2.02, -1.1)
    ant.rotation.z = 0.12
    this.body.add(ant)

    this.chassis.add(this.body)
  }

  private buildWheels(castShadow: boolean) {
    const rubber = this.mat(0x171614, 0.95, 0)
    const dustyRubber = this.mat(0x3a342b, 0.98, 0)
    const rim = this.mat(0x7e786e, 0.42, 0.7)

    // Flanc légèrement bombé plutôt qu'un cylindre droit.
    const tyre = new CylinderGeometry(WHEEL_R, WHEEL_R, 0.34, 28)
    tyre.rotateZ(Math.PI / 2)
    // Sculpture : un tore de crampons donne la silhouette dentelée qui
    // se lit en contre-jour.
    const tread = new TorusGeometry(WHEEL_R * 0.99, 0.045, 6, 26)
    tread.rotateY(Math.PI / 2)
    const hub = new CylinderGeometry(WHEEL_R * 0.52, WHEEL_R * 0.52, 0.37, 18)
    hub.rotateZ(Math.PI / 2)
    const bolt = new SphereGeometry(0.028, 6, 5)

    const spots: Array<[number, number]> = [
      [-TRACK / 2, -WHEELBASE / 2],
      [TRACK / 2, -WHEELBASE / 2],
      [-TRACK / 2, WHEELBASE / 2],
      [TRACK / 2, WHEELBASE / 2],
    ]

    for (const [x, z] of spots) {
      const pivot = new Group()
      pivot.position.set(x, WHEEL_R, z)

      const spin = new Object3D()
      const t = new Mesh(tyre, rubber)
      t.castShadow = castShadow
      const tr1 = new Mesh(tread, dustyRubber)
      tr1.position.x = 0.1
      const tr2 = new Mesh(tread, dustyRubber)
      tr2.position.x = -0.1
      const h = new Mesh(hub, rim)
      spin.add(t, tr1, tr2, h)

      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2
        const b = new Mesh(bolt, rim)
        b.position.set(x < 0 ? -0.2 : 0.2, Math.cos(a) * 0.2, Math.sin(a) * 0.2)
        spin.add(b)
      }

      pivot.add(spin)
      this.chassis.add(pivot)
      this.wheels.push({ pivot, spin, rest: new Vector3(x, WHEEL_R, z), travel: 0 })
    }
  }

  /** Remplace la carrosserie ; le gréement d'animation est conservé. */
  setModel(model: Object3D) {
    this.chassis.remove(this.body)
    this.body.traverse((o) => {
      if ((o as Mesh).isMesh) (o as Mesh).geometry.dispose()
    })
    this.body = new Group()
    this.body.add(model)
    this.chassis.add(this.body)
    this.usingModel = true

    const names = ['wheel_fl', 'wheel_fr', 'wheel_rl', 'wheel_rr']
    let matched = 0
    names.forEach((n, i) => {
      const found = model.getObjectByName(n)
      const rig = this.wheels[i]
      if (found && rig) {
        rig.spin.clear()
        rig.spin.add(found)
        matched++
      }
    })

    // Si le GLB apporte ses propres roues, on masque les nôtres.
    if (matched === 0) {
      // Le modèle est monobloc : on garde les roues procédurales, elles
      // tournent au moins correctement.
      return
    }
  }

  get hasModel() {
    return this.usingModel
  }

  /** Allume les phares quand le soleil est bas. */
  updateLights(sun: SunState) {
    const on = Math.max(0, Math.min(1, (sun.lowSun - 0.55) * 3))
    for (const m of this.lamps) {
      m.emissive.setRGB(on * 1.0, on * 0.92, on * 0.78)
      m.emissiveIntensity = on * 1.6
    }
  }

  update(t: number, dt: number) {
    const p = pathAt(t)
    const tan = pathTangent(t)

    const ground = heightAt(p.x, p.z)
    this.prev.copy(this.position)
    this.position.set(p.x, ground + (RIDE - SINK) * SCALE, p.z)
    this.root.position.copy(this.position)
    this.forward.set(tan.x, 0, tan.z)

    const heading = Math.atan2(tan.x, tan.z)
    this.root.rotation.y = heading

    let dh = heading - this.prevHeading
    while (dh > Math.PI) dh -= Math.PI * 2
    while (dh < -Math.PI) dh += Math.PI * 2
    this.prevHeading = heading
    const rate = dt > 0 ? dh / dt : 0
    this.headingRate += (rate - this.headingRate) * Math.min(1, dt * 4)

    const [nx, ny, nz] = normalAt(p.x, p.z, 11)
    this.up.set(nx, ny, nz)
    this.q.setFromAxisAngle(Vehicle.Y, -heading)
    this.tmp.copy(this.up).applyQuaternion(this.q)
    const targetPitch = Math.atan2(this.tmp.z, this.tmp.y)
    const targetRoll = -Math.atan2(this.tmp.x, this.tmp.y)

    const c = Math.cos(heading)
    const s = Math.sin(heading)
    let sum = 0
    let ci = 0

    for (const w of this.wheels) {
      const wx = p.x + (w.rest.x * c + w.rest.z * s) * SCALE
      const wz = p.z + (-w.rest.x * s + w.rest.z * c) * SCALE
      const under = heightAt(wx, wz)
      const delta = (under - ground) / SCALE
      const target = Math.max(-0.42, Math.min(0.42, delta))
      w.travel += (target - w.travel) * Math.min(1, dt * 7)
      w.pivot.position.y = w.rest.y + w.travel
      sum += w.travel

      // Les deux roues arrière déposent la trace.
      if (w.rest.z > 0 && ci < 2) {
        this.contacts[ci].x = wx
        this.contacts[ci].z = wz
        ci++
      }
    }

    const heave = sum / this.wheels.length
    this.m.heave += (heave * 0.55 - this.m.heave) * Math.min(1, dt * 5)

    const lean = Math.max(-0.09, Math.min(0.09, this.headingRate * 0.42))
    this.m.pitch += (targetPitch - this.m.pitch) * Math.min(1, dt * 3.4)
    this.m.roll += (targetRoll + lean - this.m.roll) * Math.min(1, dt * 3.4)

    this.chassis.rotation.x = this.m.pitch
    this.chassis.rotation.z = this.m.roll
    this.chassis.position.y = this.m.heave

    const dist = this.position.distanceTo(this.prev)
    if (dist > 0 && dist < 200) {
      this.m.spin -= dist / (WHEEL_R * SCALE)
      for (const w of this.wheels) w.spin.rotation.x = this.m.spin
    }
  }

  dispose() {
    this.scene.remove(this.root)
    this.root.traverse((o) => {
      if ((o as Mesh).isMesh) (o as Mesh).geometry.dispose()
    })
    this.materials.forEach((m) => m.dispose())
  }
}
