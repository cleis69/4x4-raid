import { useEffect, useRef, useState } from 'react'

/**
 * ─────────────────────────────────────────────────────────────────
 *  TERRAIN DE DUNES — WebGL
 *
 *  Three.js pèse ~150 Ko gzip. Il n'entre JAMAIS dans le bundle
 *  initial : l'import est dynamique et n'est déclenché qu'au moment
 *  où la section approche du viewport (rootMargin 200px).
 *
 *  Trois portes de sortie avant tout chargement :
 *    1. prefers-reduced-motion  → aucun WebGL
 *    2. écran < 768 px          → aucun WebGL (coût GPU/batterie)
 *    3. contexte WebGL absent   → aucun WebGL
 *  Dans ces trois cas la section reste parfaitement lisible : le
 *  contenu éditorial est du DOM normal, le canvas n'est qu'une couche.
 *
 *  Le shader génère un bruit fractal (5 octaves) déplacé en Y, rendu
 *  en filaire. Couleur interpolée terre → sable selon l'altitude,
 *  alpha décroissant avec la distance : l'horizon se dissout dans
 *  le fond au lieu d'être coupé net.
 * ─────────────────────────────────────────────────────────────────
 */

const VERT = `
uniform float uT;
varying float vH;
varying float vD;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1,0)), f.x), mix(h(i + vec2(0,1)), h(i + vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int k = 0; k < 5; k++) { v += a * n(p); p *= 2.03; a *= 0.5; }
  return v;
}
void main(){
  vec3 q = position;
  vec2 uvp = q.xz * 0.012 + vec2(0.0, uT * 0.035);
  float d = fbm(uvp) * 26.0 + fbm(uvp * 3.1) * 6.0 + sin(q.x * 0.02 + uT * 0.25) * 3.0;
  q.y += d;
  vH = d;
  vec4 mv = modelViewMatrix * vec4(q, 1.0);
  vD = -mv.z;
  gl_Position = projectionMatrix * mv;
}`

const FRAG = `
uniform vec3 uSand;
uniform vec3 uEarth;
varying float vH;
varying float vD;
void main(){
  float t = clamp(vH / 26.0, 0.0, 1.0);
  vec3 c = mix(uEarth, uSand, t);
  float fade = 1.0 - smoothstep(70.0, 290.0, vD);
  float crest = smoothstep(0.55, 1.0, t) * 0.5;
  gl_FragColor = vec4(c, (0.10 + crest) * fade);
}`

function webglOk() {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export function useDunes() {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  /** Vrai dès que la scène tourne — sert à faire apparaître le canvas en fondu. */
  const [live, setLive] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 768) return
    if (!webglOk()) return

    let disposed = false
    let cleanup: (() => void) | undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        // Le seul endroit du site où l'on charge une librairie tierce.
        import('three')
          .then((THREE) => {
            if (disposed) return

            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

            // Pas de scene.fog : un ShaderMaterial custom n'applique pas
            // le brouillard de Three.js sans ses chunks dédiés. La
            // dissolution de l'horizon est faite à la main dans le
            // fragment shader, via l'alpha calculé sur vD.
            const scene = new THREE.Scene()

            const camera = new THREE.PerspectiveCamera(55, 1, 1, 600)
            camera.position.set(0, 26, 90)

            const segments = window.innerWidth > 1440 ? 150 : 110
            const geometry = new THREE.PlaneGeometry(600, 600, segments, segments)
            geometry.rotateX(-Math.PI / 2)

            const material = new THREE.ShaderMaterial({
              wireframe: true,
              transparent: true,
              uniforms: {
                uT: { value: 0 },
                uSand: { value: new THREE.Color(0xc8a96b) },
                uEarth: { value: new THREE.Color(0x8a5a3b) },
              },
              vertexShader: VERT,
              fragmentShader: FRAG,
            })

            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.z = -120
            scene.add(mesh)

            const resize = () => {
              const w = host.clientWidth
              const h = host.clientHeight
              renderer.setSize(w, h, false)
              camera.aspect = w / h
              camera.updateProjectionMatrix()
            }
            resize()
            window.addEventListener('resize', resize)

            // La caméra suit la souris de très loin — présence, pas pilotage.
            let mx = 0
            const onMove = (e: MouseEvent) => { mx = e.clientX / window.innerWidth - 0.5 }
            window.addEventListener('mousemove', onMove, { passive: true })

            // On ne dessine que si la section est à l'écran.
            let visible = true
            const vio = new IntersectionObserver(([e]) => {
              visible = e.isIntersecting
              if (visible) loop()
            })
            vio.observe(host)

            let raf = 0
            const t0 = performance.now()
            const loop = () => {
              if (disposed || !visible) return
              const t = (performance.now() - t0) / 1000
              material.uniforms.uT.value = t
              camera.position.x += (mx * 18 - camera.position.x) * 0.03
              camera.position.y = 26 + Math.sin(t * 0.22) * 2.5
              camera.lookAt(0, 4, -60)
              renderer.render(scene, camera)
              raf = requestAnimationFrame(loop)
            }
            loop()
            setLive(true)

            cleanup = () => {
              cancelAnimationFrame(raf)
              vio.disconnect()
              window.removeEventListener('resize', resize)
              window.removeEventListener('mousemove', onMove)
              geometry.dispose()
              material.dispose()
              renderer.dispose()
            }
          })
          .catch(() => {
            // Three.js indisponible : la section reste lisible sans canvas.
          })
      },
      { rootMargin: '200px' },
    )

    io.observe(host)

    return () => {
      disposed = true
      io.disconnect()
      cleanup?.()
    }
  }, [])

  return { hostRef, canvasRef, live }
}
