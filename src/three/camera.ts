import { PerspectiveCamera, Vector3 } from 'three'
import { heightAt } from './field'
import type { Vehicle } from './vehicle'

/**
 * ─────────────────────────────────────────────────────────────────
 *  CAMÉRA — deuxième passe, pensée comme un chef opérateur
 *
 *  CE QUI A CHANGÉ, ET POURQUOI ÇA COMPTE
 *
 *  Avant, chaque plan avait un champ de vision en degrés. C'est une
 *  notion de moteur 3D, pas de cinéma, et elle produit exactement le
 *  défaut qu'on cherchait à corriger : des perspectives qu'aucun
 *  objectif réel ne donnerait.
 *
 *  Chaque plan est maintenant défini par une FOCALE en millimètres
 *  sur un capteur 35 mm. Ce n'est pas cosmétique : un 24 mm et un
 *  85 mm ne diffèrent pas seulement par la largeur du cadre, ils
 *  changent le rapport entre premier plan et arrière-plan. Le 85 mm
 *  empile les dunes les unes sur les autres — c'est LE plan de la
 *  photographie de désert, et il est impossible à obtenir en jouant
 *  sur le FOV sans reculer la caméra en conséquence.
 *
 *  S'y ajoutent deux choses qu'une caméra virtuelle n'a jamais et
 *  qu'une vraie caméra a toujours : un opérateur qui respire, et une
 *  distance de mise au point. Aucune image réelle n'est parfaitement
 *  stable ni nette partout.
 * ─────────────────────────────────────────────────────────────────
 */

export type ShotName = 'wide' | 'tracking' | 'rear' | 'low' | 'vista'

type Rig = 'drone' | 'mount' | 'shoulder'

type Shot = {
  name: ShotName
  label: string
  at: number
  /** Focale en millimètres, capteur 35 mm. */
  focal: number
  /** Nature du support — détermine le tremblement. */
  rig: Rig
  /** Ouverture — pilote la profondeur de champ. */
  aperture: number
  place: (v: Vehicle, out: Vector3, time: number) => void
  aim: (v: Vehicle, out: Vector3) => void
}

const RIGHT = new Vector3()
const UP = new Vector3(0, 1, 0)

function right(v: Vehicle, out: Vector3) {
  return out.copy(v.forward).cross(UP).normalize()
}

const SHOTS: Shot[] = [
  {
    // 24 mm — l'échelle du Sahara. Le véhicule est un détail.
    name: 'wide',
    label: '24 mm · plan large',
    at: 0,
    focal: 24,
    rig: 'drone',
    aperture: 8,
    place: (v, out, time) => {
      right(v, RIGHT)
      out.copy(v.position).addScaledVector(v.forward, -190).addScaledVector(RIGHT, 145)
      out.y = Math.max(out.y, heightAt(out.x, out.z) + 88) + Math.sin(time * 0.15) * 4
    },
    aim: (v, out) => out.copy(v.position).setY(v.position.y + 16),
  },
  {
    // 50 mm — la focale « normale ». Perspective sans effet, c'est
    // précisément ce qui rend le plan crédible.
    name: 'tracking',
    label: '50 mm · travelling',
    at: 0.27,
    focal: 50,
    rig: 'mount',
    aperture: 2.8,
    place: (v, out, time) => {
      right(v, RIGHT)
      out.copy(v.position).addScaledVector(RIGHT, 52).addScaledVector(v.forward, 6)
      out.y = Math.max(v.position.y + 5.5, heightAt(out.x, out.z) + 4.2)
      out.y += Math.sin(time * 0.7) * 0.3
    },
    aim: (v, out) => out.copy(v.position).setY(v.position.y + 3.2),
  },
  {
    // 35 mm — la focale du reportage. On lit le terrain autour.
    name: 'rear',
    label: '35 mm · suivi arrière',
    at: 0.52,
    focal: 35,
    rig: 'drone',
    aperture: 4,
    place: (v, out, time) => {
      out.copy(v.position).addScaledVector(v.forward, -28)
      out.y = Math.max(v.position.y + 8, heightAt(out.x, out.z) + 5)
      out.x += Math.sin(time * 0.42) * 1.6
    },
    aim: (v, out) => out.copy(v.position).addScaledVector(v.forward, 24).setY(v.position.y + 5),
  },
  {
    // 40 mm au ras du sable. Le grain de premier plan passe hors foyer,
    // ce qui creuse la profondeur mieux que n'importe quel effet.
    name: 'low',
    label: '40 mm · contre-plongée',
    at: 0.74,
    focal: 40,
    rig: 'shoulder',
    aperture: 2,
    place: (v, out, time) => {
      right(v, RIGHT)
      out.copy(v.position).addScaledVector(v.forward, -30).addScaledVector(RIGHT, -17)
      out.y = heightAt(out.x, out.z) + 1.5 + Math.sin(time * 0.9) * 0.16
    },
    aim: (v, out) => out.copy(v.position).setY(v.position.y + 3.6),
  },
  {
    // 85 mm de très loin. La compression empile les crêtes : le plan
    // signature de la photographie de désert.
    name: 'vista',
    label: '85 mm · compression',
    at: 1,
    focal: 85,
    rig: 'drone',
    aperture: 5.6,
    place: (v, out, time) => {
      right(v, RIGHT)
      out.copy(v.position).addScaledVector(v.forward, -820).addScaledVector(RIGHT, -420)
      out.y = Math.max(out.y, heightAt(out.x, out.z) + 120) + Math.sin(time * 0.11) * 5
    },
    aim: (v, out) => out.copy(v.position).setY(v.position.y + 14),
  },
]

function weight(shot: Shot, p: number): number {
  const d = Math.abs(p - shot.at)
  const w = 1 - d / 0.3
  return w <= 0 ? 0 : w * w * (3 - 2 * w)
}

/** Bruit lisse, somme de sinus de périodes incommensurables. */
function drift(t: number, seed: number) {
  return (
    Math.sin(t * 1.13 + seed) * 0.5 +
    Math.sin(t * 2.71 + seed * 2.3) * 0.3 +
    Math.sin(t * 5.17 + seed * 3.7) * 0.2
  )
}

/** Amplitude du tremblement selon le support, en radians. */
const SHAKE: Record<Rig, { amp: number; freq: number }> = {
  drone: { amp: 0.00085, freq: 0.55 },
  mount: { amp: 0.0016, freq: 2.4 },
  shoulder: { amp: 0.0031, freq: 1.5 },
}

export class CinematicCamera {
  readonly camera: PerspectiveCamera

  private wantPos = new Vector3()
  private wantAim = new Vector3()
  private pos = new Vector3()
  private aim = new Vector3()
  private tmp = new Vector3()
  private focal = 35
  private started = false

  /** Distance de mise au point — consommée par la profondeur de champ. */
  focusDistance = 60
  /** Ouverture courante. */
  aperture = 4
  /** Libellé du plan dominant. */
  label = SHOTS[0].label

  constructor(aspect: number, far: number) {
    this.camera = new PerspectiveCamera(40, aspect, 0.8, far)
    // Capteur 35 mm : la référence qui donne son sens aux focales.
    this.camera.filmGauge = 35
    this.camera.setFocalLength(35)
  }

  current(p: number): ShotName {
    let best = SHOTS[0]
    let bw = -1
    for (const s of SHOTS) {
      const w = weight(s, p)
      if (w > bw) {
        bw = w
        best = s
      }
    }
    return best.name
  }

  update(p: number, v: Vehicle, time: number, dt: number) {
    this.wantPos.set(0, 0, 0)
    this.wantAim.set(0, 0, 0)
    let total = 0
    let focal = 0
    let aperture = 0
    let shakeAmp = 0
    let shakeFreq = 0
    let best = SHOTS[0]
    let bw = -1

    for (const shot of SHOTS) {
      const w = weight(shot, p)
      if (w > bw) {
        bw = w
        best = shot
      }
      if (w <= 0.0001) continue
      total += w

      shot.place(v, this.tmp, time)
      this.wantPos.addScaledVector(this.tmp, w)
      shot.aim(v, this.tmp)
      this.wantAim.addScaledVector(this.tmp, w)

      focal += shot.focal * w
      aperture += shot.aperture * w
      shakeAmp += SHAKE[shot.rig].amp * w
      shakeFreq += SHAKE[shot.rig].freq * w
    }

    if (total > 0) {
      this.wantPos.divideScalar(total)
      this.wantAim.divideScalar(total)
      focal /= total
      aperture /= total
      shakeAmp /= total
      shakeFreq /= total
    } else {
      this.wantPos.copy(this.camera.position)
      this.wantAim.copy(v.position)
      focal = this.focal
      aperture = 4
    }

    this.label = best.label

    const floor = heightAt(this.wantPos.x, this.wantPos.z) + 1.2
    if (this.wantPos.y < floor) this.wantPos.y = floor

    if (!this.started) {
      this.pos.copy(this.wantPos)
      this.aim.copy(this.wantAim)
      this.focal = focal
      this.started = true
    } else {
      this.pos.lerp(this.wantPos, 1 - Math.exp(-dt * 1.9))
      this.aim.lerp(this.wantAim, 1 - Math.exp(-dt * 3.1))
      // La focale bouge plus lentement que tout le reste : un zoom
      // rapide est le geste le plus amateur qui soit.
      this.focal += (focal - this.focal) * (1 - Math.exp(-dt * 1.4))
    }

    this.camera.position.copy(this.pos)
    this.camera.lookAt(this.aim)

    // Respiration de l'opérateur, appliquée après le cadrage.
    const ft = time * shakeFreq
    this.camera.rotateX(drift(ft, 0.7) * shakeAmp)
    this.camera.rotateY(drift(ft, 2.9) * shakeAmp * 1.3)
    this.camera.rotateZ(drift(ft, 5.1) * shakeAmp * 0.5)

    if (Math.abs(this.camera.getFocalLength() - this.focal) > 0.05) {
      this.camera.setFocalLength(this.focal)
    }

    // Le point est fait sur le véhicule — comme un assistant opérateur
    // qui suit son sujet, jamais sur un plan fixe.
    this.focusDistance = this.camera.position.distanceTo(v.position)
    this.aperture = aperture
  }

  resize(aspect: number) {
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }
}
