import {
  BackSide,
  Color,
  FogExp2,
  Mesh,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
} from 'three'
import type { SunState } from './timeline'

/**
 * ─────────────────────────────────────────────────────────────────
 *  ATMOSPHÈRE — ciel, diffusion, halo solaire
 *
 *  Le halo autour du soleil est calculé ICI, dans le shader de ciel,
 *  et non par une passe de bloom.
 *
 *  Ce n'est pas une économie : c'est plus juste. Un bloom est un
 *  artefact d'objectif appliqué à l'image entière. Ce qu'on voit
 *  réellement autour d'un soleil rasant dans le désert, c'est de la
 *  diffusion de Mie — la lumière rebondissant sur les poussières en
 *  suspension. Elle dépend de l'angle au soleil et s'étale d'autant
 *  plus que le soleil est bas. C'est exactement ce que fait ce
 *  shader, pour le coût d'une sphère et zéro passe supplémentaire.
 * ─────────────────────────────────────────────────────────────────
 */

const VERT = /* glsl */ `
varying vec3 vDir;
void main(){
  vDir = normalize(position);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_Position.z = gl_Position.w; // le ciel reste toujours au fond
}`

const FRAG = /* glsl */ `
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uLowSun;
varying vec3 vDir;

// Tramage ordonné : supprime le banding sur les grands dégradés de ciel.
float dither(vec2 p){
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main(){
  vec3 d = normalize(vDir);

  // Dégradé vertical. La puissance resserre la bande d'horizon quand
  // le soleil est bas — c'est ce qui donne l'écrasement du couchant.
  float h = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
  float grad = pow(clamp(d.y, 0.0, 1.0), mix(0.62, 0.34, uLowSun));
  vec3 sky = mix(uHorizon, uZenith, grad);

  float cosA = dot(d, normalize(uSunDir));

  // Diffusion de Mie : lobe étroit et intense près du soleil.
  float mie = pow(max(cosA, 0.0), mix(320.0, 90.0, uLowSun));
  // Halo large : la lueur qui envahit le quart de ciel au couchant.
  float halo = pow(max(cosA, 0.0), mix(9.0, 3.2, uLowSun));

  sky += uSunColor * mie * 3.4;
  sky += uSunColor * halo * (0.13 + uLowSun * 0.42);

  // Disque solaire, bord adouci — jamais un cercle découpé au ciseau.
  float disc = smoothstep(0.99955, 0.99987, cosA);
  sky += uSunColor * disc * 7.0;

  // Assombrissement du sol vu depuis l'intérieur du dôme.
  sky *= mix(0.55, 1.0, smoothstep(-0.18, 0.06, d.y));

  sky += (dither(gl_FragCoord.xy) - 0.5) * 0.006;

  gl_FragColor = vec4(sky, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`

export class Atmosphere {
  readonly mesh: Mesh
  private mat: ShaderMaterial
  private fog: FogExp2
  private dir = new Vector3()

  constructor(private scene: Scene, far: number) {
    this.mat = new ShaderMaterial({
      side: BackSide,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uZenith: { value: new Color(0x14192b) },
        uHorizon: { value: new Color(0x6b4f47) },
        uSunDir: { value: new Vector3(0, 0.2, 1) },
        uSunColor: { value: new Color(0xd98547) },
        uLowSun: { value: 1 },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
    })

    // Sphère modeste : la projection la colle au plan lointain de toute façon.
    this.mesh = new Mesh(new SphereGeometry(1, 32, 20), this.mat)
    this.mesh.frustumCulled = false
    this.mesh.renderOrder = -1000
    scene.add(this.mesh)

    // Brouillard exponentiel : la profondeur du Sahara tient à ça.
    // Sans lui, l'horizon est une ligne nette et la scène perd son échelle.
    this.fog = new FogExp2(0x33303a, 0.00095)
    scene.fog = this.fog
    void far
  }

  update(sun: SunState) {
    const u = this.mat.uniforms
    ;(u.uZenith.value as Color).copy(sun.skyZenith)
    ;(u.uHorizon.value as Color).copy(sun.skyHorizon)
    ;(u.uSunColor.value as Color).copy(sun.sunColor)
    u.uLowSun.value = sun.lowSun

    this.dir.set(sun.x, sun.y, sun.z).normalize()
    ;(u.uSunDir.value as Vector3).copy(this.dir)

    this.fog.color.copy(sun.fogColor)
    this.fog.density = sun.fogDensity
  }

  /** Le dôme suit la caméra : l'horizon reste inatteignable. */
  follow(x: number, y: number, z: number) {
    this.mesh.position.set(x, y, z)
  }

  dispose() {
    this.scene.remove(this.mesh)
    this.mesh.geometry.dispose()
    this.mat.dispose()
  }
}
