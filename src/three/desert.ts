import {
  BufferAttribute,
  Color,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  Scene,
  Texture,
  Vector3,
} from 'three'
import { FIELD_SIZE, heightAt } from './field'
import type { SunState } from './timeline'

/**
 * ─────────────────────────────────────────────────────────────────
 *  LE DÉSERT — deuxième passe, orientée photoréalisme
 *
 *  Trois choses manquaient au rendu précédent, dans cet ordre
 *  d'importance :
 *
 *  1. LA PERSPECTIVE AÉRIENNE. Un brouillard classique interpole vers
 *     une couleur. L'atmosphère réelle fait trois choses distinctes :
 *     elle réduit le contraste, elle DÉSATURE, et elle ajoute de la
 *     lumière diffusée qui dépend de l'angle au soleil. C'est ce qui
 *     donne à une photo de désert sa profondeur — les dunes du fond
 *     ne sont pas « plus claires », elles sont plus pâles et plus
 *     bleues. Un simple mix vers une couleur ne produit jamais ça.
 *
 *  2. LE MICRO-RELIEF. Du sable parfaitement lisse n'existe pas. Le
 *     vent y grave des rides perpendiculaires à sa direction, à
 *     l'échelle de quelques dizaines de centimètres. On les génère
 *     dans le fragment shader en perturbant la normale — inutile de
 *     les mettre dans la géométrie, elles sont trop fines pour ça.
 *
 *  3. LA RUGOSITÉ VARIABLE. Le sable des crêtes est poudreux et diffus ;
 *     celui des creux, tassé, renvoie un léger éclat rasant. Une
 *     rugosité uniforme aplatit tout.
 *
 *  Tout passe par onBeforeCompile plutôt que par un ShaderMaterial
 *  maison : on conserve ainsi les ombres, l'IBL et le tone mapping de
 *  Three.js, qui sont précisément ce qu'on veut garder.
 * ─────────────────────────────────────────────────────────────────
 */

const NOISE_GLSL = /* glsl */ `
float dHash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float dNoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(dHash(i), dHash(i+vec2(1,0)), f.x),
             mix(dHash(i+vec2(0,1)), dHash(i+vec2(1,1)), f.x), f.y);
}
float dFbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i = 0; i < 4; i++){ v += a * dNoise(p); p *= 2.07; a *= 0.5; }
  return v;
}
// Rides éoliennes : ondes directionnelles dont la direction dérive
// lentement, comme un vent qui n'est jamais parfaitement constant.
float ripples(vec2 p){
  float drift = dFbm(p * 0.012) * 2.4;
  vec2 dir = vec2(cos(drift), sin(drift));
  float w = dot(p, dir);
  float r = sin(w * 1.35) * 0.5 + 0.5;
  r = pow(r, 1.7);
  return r + dFbm(p * 0.32) * 0.35;
}`

export class Desert {
  readonly mesh: Mesh
  private mat: MeshStandardMaterial
  private uni: Record<string, { value: unknown }> = {}
  private horizon = new Color()
  private sunDir = new Vector3()

  constructor(
    private scene: Scene,
    segments: number,
    shadows: boolean,
    tracks: Texture | null,
  ) {
    const geo = new PlaneGeometry(FIELD_SIZE, FIELD_SIZE, segments, segments)
    geo.rotateX(-Math.PI / 2)

    const pos = geo.attributes.position as BufferAttribute
    const count = pos.count
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)))
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()

    // Variation macro cuite dans les sommets — les grandes taches de
    // couleur qu'on voit sur une photo d'erg, indépendantes de la
    // lumière : sable plus clair sur les crêtes balayées, plus sombre
    // et plus terreux dans les cuvettes.
    const nrm = geo.attributes.normal as BufferAttribute
    const c = new Color()
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i)
      const ny = nrm.getY(i)
      const nx = nrm.getX(i)
      const alt = Math.max(0, Math.min(1, (y + 60) / 190))
      const slope = Math.max(0, Math.min(1, (1 - ny) * 2.6))
      const facing = nx * 0.5 + 0.5

      const l = 0.86 + alt * 0.22 - slope * 0.18 + (facing - 0.5) * 0.05
      c.setRGB(l * (1 + slope * 0.1), l * (1 - slope * 0.03), l * (1 - slope * 0.1))
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    geo.setAttribute('color', new BufferAttribute(colors, 3))

    this.mat = new MeshStandardMaterial({
      color: 0xc8a96b,
      vertexColors: true,
      roughness: 0.94,
      metalness: 0,
      dithering: true,
      // Le fog natif est désactivé : on le remplace par une vraie
      // perspective aérienne dans le shader.
      fog: false,
    })

    this.mat.onBeforeCompile = (shader) => {
      shader.uniforms.uHorizon = { value: new Color(0x8d7462) }
      shader.uniforms.uSunDir = { value: new Vector3(0, 1, 0) }
      shader.uniforms.uSunColor = { value: new Color(0xffffff) }
      shader.uniforms.uDensity = { value: 0.00082 }
      shader.uniforms.uLowSun = { value: 1 }
      shader.uniforms.uTracks = { value: tracks }
      shader.uniforms.uHasTracks = { value: tracks ? 1 : 0 }
      shader.uniforms.uFieldSize = { value: FIELD_SIZE }
      this.uni = shader.uniforms as unknown as Record<string, { value: unknown }>

      /* ─── VERTEX : on remonte la position monde ─────────────── */
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
        .replace(
          '#include <worldpos_vertex>',
          '#include <worldpos_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;',
        )

      /* ─── FRAGMENT ─────────────────────────────────────────── */
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
           varying vec3 vWPos;
           uniform vec3 uHorizon, uSunDir, uSunColor;
           uniform float uDensity, uLowSun, uHasTracks, uFieldSize;
           uniform sampler2D uTracks;
           ${NOISE_GLSL}`,
        )

        // ── Micro-relief : rides de sable ────────────────────
        .replace(
          '#include <normal_fragment_maps>',
          `#include <normal_fragment_maps>
           {
             float dist = length(vWPos - cameraPosition);
             // Les rides s'effacent avec la distance : au-delà, elles
             // ne seraient plus qu'un scintillement d'aliasing.
             float detail = 1.0 - smoothstep(40.0, 340.0, dist);
             if (detail > 0.001) {
               vec2 sp = vWPos.xz;
               float e = 0.55;
               float hC = ripples(sp);
               float hX = ripples(sp + vec2(e, 0.0));
               float hZ = ripples(sp + vec2(0.0, e));
               vec3 bump = normalize(vec3(hC - hX, 1.6, hC - hZ));
               normal = normalize(mix(normal, normalize(normal + bump * 0.55), detail * 0.62));
             }
           }`,
        )

        // ── Rugosité variable + traces de pneus ──────────────
        .replace(
          '#include <roughnessmap_fragment>',
          `#include <roughnessmap_fragment>
           {
             float grain = dFbm(vWPos.xz * 0.06);
             // Crêtes poudreuses, creux tassés.
             roughnessFactor = clamp(roughnessFactor - 0.1 + grain * 0.16, 0.55, 1.0);

             if (uHasTracks > 0.5) {
               vec2 tuv = vWPos.xz / uFieldSize + 0.5;
               tuv.y = 1.0 - tuv.y;
               float tr = clamp(texture2D(uTracks, tuv).r, 0.0, 1.0);
               // Le sable compacté par un pneu est plus lisse : c'est
               // ce contraste de rugosité, pas la couleur, qui rend la
               // trace visible en lumière rasante.
               roughnessFactor = mix(roughnessFactor, 0.42, tr * 0.8);
               diffuseColor.rgb *= 1.0 - tr * 0.18;
             }
           }`,
        )

        // ── Perspective aérienne ─────────────────────────────
        // Injectée juste après opaque_fragment, donc AVANT le tone
        // mapping : la diffusion atmosphérique est un phénomène
        // lumineux, elle doit traverser la courbe ACES comme le reste
        // de la lumière. Appliquée après, elle produirait des halos
        // plats et délavés.
        .replace(
          '#include <opaque_fragment>',
          `#include <opaque_fragment>
           {
             float dist = length(vWPos - cameraPosition);
             float f = 1.0 - exp(-dist * dist * uDensity * uDensity);

             vec3 col = gl_FragColor.rgb;

             // 1. Désaturation — l'atmosphère lave la couleur avant
             //    d'en ajouter. C'est l'étape que le fog classique oublie.
             float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
             col = mix(col, vec3(lum), f * 0.55);

             // 2. Réduction de contraste, autour d'un gris moyen
             //    exprimé en linéaire (0.18 ≈ 46 % en sRGB).
             col = mix(col, mix(col, vec3(0.18), 0.5), f * 0.4);

             // 3. Lumière diffusée entrante, renforcée vers le soleil.
             vec3 view = normalize(vWPos - cameraPosition);
             float toSun = max(dot(view, normalize(uSunDir)), 0.0);
             vec3 inScatter = mix(uHorizon, uSunColor, pow(toSun, 4.0) * (0.3 + uLowSun * 0.5));

             gl_FragColor.rgb = mix(col, inScatter, f);
           }`,
        )
    }

    this.mesh = new Mesh(geo, this.mat)
    this.mesh.receiveShadow = shadows
    this.mesh.castShadow = false
    this.mesh.matrixAutoUpdate = false
    this.mesh.updateMatrix()
    scene.add(this.mesh)
  }

  update(sun: SunState) {
    this.mat.color.copy(sun.sandTint)

    const u = this.uni
    if (!u.uHorizon) return
    this.horizon.copy(sun.fogColor)
    ;(u.uHorizon.value as Color).copy(this.horizon)
    ;(u.uSunColor.value as Color).copy(sun.sunColor)
    this.sunDir.set(sun.x, sun.y, sun.z).normalize()
    ;(u.uSunDir.value as Vector3).copy(this.sunDir)
    u.uDensity.value = sun.fogDensity
    u.uLowSun.value = sun.lowSun
  }

  dispose() {
    this.scene.remove(this.mesh)
    this.mesh.geometry.dispose()
    this.mat.dispose()
  }
}
