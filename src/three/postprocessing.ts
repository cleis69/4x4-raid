import {
  Camera,
  Color,
  DepthTexture,
  FloatType,
  LinearFilter,
  Matrix4,
  Mesh,
  NearestFilter,
  OrthographicCamera,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  UnsignedShortType,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three'
import type { SunState } from './timeline'

/**
 * ─────────────────────────────────────────────────────────────────
 *  PASSE FINALE — optique et pellicule
 *
 *  Trois choses, dans une seule passe :
 *
 *  1. PROFONDEUR DE CHAMP, calculée depuis le tampon de profondeur.
 *     Le rayon de flou vient de la formule du cercle de confusion —
 *     focale, ouverture et distance de mise au point réelles. Ce n'est
 *     pas un flou décoratif : à 40 mm f/2 au ras du sable, le premier
 *     plan part réellement hors foyer, et c'est ce dégradé qui creuse
 *     l'image.
 *
 *  2. FLOU DE MOUVEMENT PAR REPROJECTION. On reconstruit la position
 *     monde de chaque pixel, on la reprojette avec la matrice de la
 *     frame précédente, et on étale le long du vecteur obtenu. C'est
 *     la vraie technique — pas un flou radial appliqué au jugé.
 *
 *  3. ÉTALONNAGE. Noirs relevés, hautes lumières qui roulent et se
 *     désaturent. Une pellicule ne tient jamais la saturation dans les
 *     hautes lumières ; un moteur 3D, si. C'est un des signaux les
 *     plus fiables du rendu de synthèse, et l'un des plus faciles à
 *     corriger.
 *
 *  Le tone mapping ACES reste appliqué en amont par le renderer.
 *  Cette passe travaille après lui, comme un étalonnage sur un master.
 * ─────────────────────────────────────────────────────────────────
 */

const VERT = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`

const FRAG = /* glsl */ `
uniform sampler2D uScene;
uniform sampler2D uDepth;
uniform vec2 uResolution;
uniform float uNear, uFar;
uniform float uFocus, uAperture, uFocal;
uniform float uTime, uGrain, uVignette, uShutter;
uniform vec3 uShadowTint, uHighlightTint;
uniform mat4 uInvViewProj, uPrevViewProj;
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

/** Profondeur non linéaire -> distance en unités monde. */
float linearDepth(float d){
  float z = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear));
}

/**
 * Cercle de confusion, en pixels.
 * c = |A · f · (S − D)| / (D · (S − f))   avec A = f / N
 */
float coc(float dist){
  float f = uFocal * 0.001;
  float A = f / max(uAperture, 0.7);
  float c = abs(A * f * (uFocus - dist)) / max(dist * (uFocus - f), 1e-5);
  // Du plan capteur (35 mm de large) vers les pixels.
  return clamp(c / 0.035 * uResolution.x, 0.0, 14.0);
}

// Disque de Poisson : 12 directions réparties sans motif visible.
const vec2 POISSON[12] = vec2[12](
  vec2(-0.326, -0.406), vec2(-0.840, -0.074), vec2(-0.696,  0.457),
  vec2(-0.203,  0.621), vec2( 0.962, -0.195), vec2( 0.473, -0.480),
  vec2( 0.519,  0.767), vec2( 0.185, -0.893), vec2( 0.507,  0.064),
  vec2( 0.896,  0.412), vec2(-0.322, -0.933), vec2(-0.792, -0.598)
);

void main(){
  vec2 texel = 1.0 / uResolution;
  float depthRaw = texture2D(uDepth, vUv).x;
  float dist = linearDepth(depthRaw);

  /* ─── Vitesse écran, par reprojection ─────────────────────── */
  vec4 ndc = vec4(vUv * 2.0 - 1.0, depthRaw * 2.0 - 1.0, 1.0);
  vec4 world = uInvViewProj * ndc;
  world /= world.w;
  vec4 prev = uPrevViewProj * world;
  vec2 prevUv = (prev.xy / prev.w) * 0.5 + 0.5;
  vec2 velocity = (vUv - prevUv) * uShutter;
  // Bride : au-delà, le flou devient une traînée, pas un mouvement.
  float vlen = length(velocity);
  if (vlen > 0.028) velocity *= 0.028 / vlen;

  float radius = coc(dist);
  float jitter = hash(vUv * uResolution + uTime);

  vec3 acc = texture2D(uScene, vUv).rgb;
  float weight = 1.0;

  for (int i = 0; i < 12; i++) {
    float t = (float(i) + jitter) / 12.0;
    // Chaque échantillon combine un décalage de mise au point et un
    // décalage temporel : un seul parcours pour les deux effets.
    vec2 off = POISSON[i] * radius * texel + velocity * (t - 0.5);
    vec2 uv = clamp(vUv + off, vec2(0.001), vec2(0.999));

    // On rejette les échantillons nettement plus proches que le pixel
    // courant : c'est ce qui évite qu'un objet net « bave » sur un
    // fond flou, l'artefact classique de la DOF en une passe.
    float sd = linearDepth(texture2D(uDepth, uv).x);
    float w = (sd > dist - 4.0) ? 1.0 : 0.25;

    acc += texture2D(uScene, uv).rgb * w;
    weight += w;
  }

  vec3 c = acc / weight;

  /* ─── Étalonnage ──────────────────────────────────────────── */
  float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));

  // Noirs relevés : aucun négatif ne descend à zéro. Le noir absolu
  // est un tell de rendu 3D.
  c = c * 0.965 + 0.021;

  // Les hautes lumières perdent leur saturation, comme une émulsion
  // qui sature.
  float hi = smoothstep(0.55, 1.0, lum);
  c = mix(c, vec3(lum), hi * 0.3);

  // Bascule chaud/froid par luminance.
  c = mix(c * uShadowTint, c * uHighlightTint, smoothstep(0.1, 0.75, lum));

  // Épaulement doux sur les très hautes lumières.
  c = c / (1.0 + max(vec3(0.0), c - 0.86) * 0.55);

  /* ─── Objectif ────────────────────────────────────────────── */
  vec2 q = vUv - 0.5;
  float vig = 1.0 - dot(q, q) * uVignette;
  c *= clamp(vig, 0.0, 1.0);

  float g = hash(vUv * 900.0 + uTime * 31.0) - 0.5;
  c += g * uGrain * (0.3 + (1.0 - lum) * 0.7);

  gl_FragColor = vec4(c, 1.0);
}`

export class Composite {
  private rt: WebGLRenderTarget
  private mat: ShaderMaterial
  private quad: Mesh
  private scene = new Scene()
  private cam = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private shadow = new Color()
  private high = new Color()
  private white = new Color(1, 1, 1)
  private invViewProj = new Matrix4()
  private prevViewProj = new Matrix4()
  private viewProj = new Matrix4()
  private firstFrame = true

  constructor(w: number, h: number, dpr: number, highPrecisionDepth: boolean) {
    const pw = Math.max(2, Math.floor(w * dpr))
    const ph = Math.max(2, Math.floor(h * dpr))

    const depth = new DepthTexture(pw, ph)
    // Float là où c'est possible : en 16 bits, la profondeur d'un
    // désert de 2 km se quantifie et la mise au point « marche ».
    depth.type = highPrecisionDepth ? FloatType : UnsignedShortType
    depth.minFilter = NearestFilter
    depth.magFilter = NearestFilter

    this.rt = new WebGLRenderTarget(pw, ph, {
      format: RGBAFormat,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      depthBuffer: true,
      stencilBuffer: false,
      depthTexture: depth,
    })
    this.rt.texture.colorSpace = SRGBColorSpace

    this.mat = new ShaderMaterial({
      uniforms: {
        uScene: { value: this.rt.texture },
        uDepth: { value: depth },
        uResolution: { value: new Vector2(pw, ph) },
        uNear: { value: 0.8 },
        uFar: { value: 2400 },
        uFocus: { value: 60 },
        uAperture: { value: 4 },
        uFocal: { value: 35 },
        uTime: { value: 0 },
        uGrain: { value: 0.03 },
        uVignette: { value: 0.5 },
        uShutter: { value: 0.55 },
        uShadowTint: { value: new Color(0.94, 0.97, 1.06) },
        uHighlightTint: { value: new Color(1.05, 1.0, 0.94) },
        uInvViewProj: { value: new Matrix4() },
        uPrevViewProj: { value: new Matrix4() },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    })

    this.quad = new Mesh(new PlaneGeometry(2, 2), this.mat)
    this.quad.frustumCulled = false
    this.scene.add(this.quad)
  }

  get target() {
    return this.rt
  }

  /**
   * @param focus    distance de mise au point, en unités monde
   * @param aperture ouverture (f/N)
   * @param focal    focale en millimètres
   */
  update(
    sun: SunState,
    time: number,
    camera: Camera & { near: number; far: number },
    focus: number,
    aperture: number,
    focal: number,
  ) {
    const u = this.mat.uniforms
    u.uTime.value = time
    u.uNear.value = camera.near
    u.uFar.value = camera.far
    u.uFocus.value = focus
    u.uAperture.value = aperture
    u.uFocal.value = focal

    // Matrices de reprojection.
    this.viewProj.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    this.invViewProj.copy(this.viewProj).invert()
    if (this.firstFrame) {
      this.prevViewProj.copy(this.viewProj)
      this.firstFrame = false
    }
    ;(u.uInvViewProj.value as Matrix4).copy(this.invViewProj)
    ;(u.uPrevViewProj.value as Matrix4).copy(this.prevViewProj)
    this.prevViewProj.copy(this.viewProj)

    const cold = sun.lowSun
    this.shadow.setRGB(1 - cold * 0.09, 1 - cold * 0.035, 1 + cold * 0.11)
    this.high.copy(sun.sunColor).lerp(this.white, 0.66).multiplyScalar(1.03)
    ;(u.uShadowTint.value as Color).copy(this.shadow)
    ;(u.uHighlightTint.value as Color).copy(this.high)

    u.uGrain.value = 0.022 + cold * 0.022
  }

  render(renderer: WebGLRenderer) {
    renderer.setRenderTarget(null)
    renderer.render(this.scene, this.cam)
  }

  resize(w: number, h: number, dpr: number) {
    const pw = Math.max(2, Math.floor(w * dpr))
    const ph = Math.max(2, Math.floor(h * dpr))
    this.rt.setSize(pw, ph)
    ;(this.mat.uniforms.uResolution.value as Vector2).set(pw, ph)
    this.firstFrame = true
  }

  dispose() {
    this.rt.depthTexture?.dispose()
    this.rt.dispose()
    this.quad.geometry.dispose()
    this.mat.dispose()
  }
}
