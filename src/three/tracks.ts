import {
  AdditiveBlending,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
  LinearFilter,
  ClampToEdgeWrapping,
} from 'three'
import { FIELD_SIZE } from './field'

/**
 * ─────────────────────────────────────────────────────────────────
 *  TRACES DE PNEUS
 *
 *  Un désert sans trace derrière le véhicule est un désert faux. Le
 *  sable garde tout — c'est même la première chose qu'on remarque sur
 *  une photo de raid.
 *
 *  Technique : une carte de trace couvrant le champ, peinte sur le
 *  GPU. À chaque frame on rend deux petits tampons dans une cible,
 *  SANS effacement. La trace s'accumule donc, et rien ne transite par
 *  le CPU — une CanvasTexture aurait imposé un upload de plusieurs
 *  méga-octets par frame.
 *
 *  Le terrain échantillonne cette carte : là où le pneu est passé, le
 *  sable est légèrement plus sombre (compacté, moins de rétrodiffusion)
 *  et surtout moins rugueux. C'est ce second point qui rend la trace
 *  lisible en lumière rasante, exactement comme dans la réalité.
 * ─────────────────────────────────────────────────────────────────
 */

const STAMP_VERT = /* glsl */ `
uniform vec2 uPos;
uniform float uSize;
varying vec2 vUv;
void main(){
  vUv = uv;
  // Le quad est placé directement en espace NDC de la carte.
  vec2 p = uPos + position.xy * uSize;
  gl_Position = vec4(p, 0.0, 1.0);
}`

const STAMP_FRAG = /* glsl */ `
uniform float uStrength;
varying vec2 vUv;
void main(){
  vec2 d = vUv - 0.5;
  float r = length(d) * 2.0;
  // Bord très doux : une trace n'a pas de contour net.
  float a = 1.0 - smoothstep(0.25, 1.0, r);
  a *= a;
  gl_FragColor = vec4(a * uStrength, 0.0, 0.0, 1.0);
}`

export class Tracks {
  private rt: WebGLRenderTarget
  private scene = new Scene()
  private cam = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private stamp: Mesh
  private mat: ShaderMaterial
  private cleared = false

  constructor(size = 1024) {
    this.rt = new WebGLRenderTarget(size, size, {
      format: RGBAFormat,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    })
    this.rt.texture.wrapS = ClampToEdgeWrapping
    this.rt.texture.wrapT = ClampToEdgeWrapping

    this.mat = new ShaderMaterial({
      uniforms: {
        uPos: { value: new Vector2() },
        uSize: { value: 0.008 },
        uStrength: { value: 0.5 },
      },
      vertexShader: STAMP_VERT,
      fragmentShader: STAMP_FRAG,
      blending: AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    })

    this.stamp = new Mesh(new PlaneGeometry(2, 2), this.mat)
    this.stamp.frustumCulled = false
    this.scene.add(this.stamp)
  }

  get texture() {
    return this.rt.texture
  }

  /**
   * Dépose une empreinte aux coordonnées monde données.
   * @param strength 0 → 1, module la profondeur de la trace
   */
  paint(renderer: WebGLRenderer, points: Array<{ x: number; z: number }>, strength: number) {
    const prevTarget = renderer.getRenderTarget()
    renderer.setRenderTarget(this.rt)

    if (!this.cleared) {
      renderer.setClearColor(0x000000, 1)
      renderer.clear(true, false, false)
      this.cleared = true
    }

    const u = this.mat.uniforms
    u.uStrength.value = strength

    for (const p of points) {
      // Monde → NDC de la carte. Le champ est centré sur l'origine.
      const nx = (p.x / (FIELD_SIZE * 0.5))
      const ny = (p.z / (FIELD_SIZE * 0.5))
      if (Math.abs(nx) > 1.02 || Math.abs(ny) > 1.02) continue
      ;(u.uPos.value as Vector2).set(nx, -ny)
      renderer.render(this.scene, this.cam)
    }

    renderer.setRenderTarget(prevTarget)
  }

  dispose() {
    this.rt.dispose()
    this.stamp.geometry.dispose()
    this.mat.dispose()
  }
}
