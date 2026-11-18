import {
  BufferGeometry,
  Float32BufferAttribute,
  OrthographicCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three'
import gsap from 'gsap'

const vertexShader = `
  attribute vec3 previous;
  attribute vec3 destination;
  attribute float tone;
  uniform float progress, time, size;
  uniform vec2 pointer;
  varying float lightness;
  void main() {
    vec3 p = mix(previous, destination, progress);
    float bend = 0.09 * sin(time * 0.52) + (abs(pointer.x) < 2.0 ? pointer.x * 0.12 : 0.0);
    p.xz = mat2(cos(bend), -sin(bend), sin(bend), cos(bend)) * p.xz;
    vec2 delta = p.xy - pointer;
    float push = 1.0 - smoothstep(0.0, 0.28, length(delta));
    p.xy += normalize(delta + 0.0001) * push * 0.045;
    p.z += 0.016 * sin(time + p.x * 4.0);
    lightness = tone;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = size * (0.66 + tone * 0.78);
  }`
const fragmentShader = `
  varying float lightness;
  void main() {
    float a = 1.0 - smoothstep(0.22, 0.5, length(gl_PointCoord - 0.5));
    vec3 silver = mix(vec3(0.25,0.27,0.28), vec3(0.99,0.95,0.88), lightness);
    gl_FragColor = vec4(silver, a);
  }`

export async function createStudy(el, imageURL) {
  const image = new Image()
  image.src = imageURL
  await image.decode()
  const n = matchMedia('(max-width: 700px)').matches ? 134 : 174
  const sample = document.createElement('canvas')
  sample.width = sample.height = n
  const ctx = sample.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(image, 0, 0, n, n)
  const pixels = ctx.getImageData(0, 0, n, n).data
  const portrait = [],
    helix = [],
    orbit = [],
    tones = []
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const k = (y * n + x) * 4
      if (pixels[k + 3] < 100) continue
      const tone = pixels[k] / 255
      const angle = 2 * Math.PI * ((x / n + (y / n) * 1.7) % 1)
      const band = (x / n - 0.5) * 0.35
      portrait.push((x / n - 0.5) * 1.65, (0.5 - y / n) * 1.65, tone * 0.14)
      helix.push(
        Math.cos((y / n) * 9.5 + (x % 2) * Math.PI) * (0.44 + band),
        (0.5 - y / n) * 1.68,
        Math.sin((y / n) * 9.5 + (x % 2) * Math.PI) * 0.5,
      )
      const radius = 0.48 + (0.28 * x) / n
      orbit.push(
        radius * Math.cos(angle),
        radius * Math.sin(angle) * 0.58 + Math.cos(angle) * 0.18,
        Math.sin(angle) * 0.4,
      )
      tones.push(tone)
    }
  }
  const shapes = [portrait, helix, orbit].map((shape) => new Float32Array(shape))
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
  })
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(portrait, 3))
  geometry.setAttribute('previous', new Float32BufferAttribute(portrait, 3))
  geometry.setAttribute('destination', new Float32BufferAttribute(portrait, 3))
  geometry.setAttribute('tone', new Float32BufferAttribute(tones, 1))
  const uniforms = {
    progress: { value: 1 },
    time: { value: 0 },
    size: { value: 2 },
    pointer: { value: new Vector2(5, 5) },
  }
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
  })
  const scene = new Scene()
  scene.add(new Points(geometry, material))
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 3
  el.appendChild(renderer.domElement)
  function resize() {
    const w = el.clientWidth,
      h = el.clientHeight
    if (!w || !h) return
    const ratio = Math.min(window.devicePixelRatio, 1.5)
    renderer.setPixelRatio(ratio)
    renderer.setSize(w, h, false)
    uniforms.size.value = Math.max(1.4, (Math.min(w, h) / n) * 0.79) * ratio
    camera.left = -w / Math.min(w, h)
    camera.right = -camera.left
    camera.top = h / Math.min(w, h)
    camera.bottom = -camera.top
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el)
  resize()
  let last = 0,
    visible = true,
    tween
  function draw(t) {
    if (t - last < 32) return
    last = t
    uniforms.time.value = t / 1000
    renderer.render(scene, camera)
  }
  function sync() {
    renderer.setAnimationLoop(visible && !document.hidden ? draw : null)
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    sync()
  })
  observer.observe(el)
  document.addEventListener('visibilitychange', sync)
  function point(event) {
    const rect = el.getBoundingClientRect()
    uniforms.pointer.value.set(
      (((event.clientX - rect.left) / rect.width) * 2 - 1) * camera.right,
      (1 - ((event.clientY - rect.top) / rect.height) * 2) * camera.top,
    )
  }
  function leave() {
    uniforms.pointer.value.set(5, 5)
  }
  el.addEventListener('pointermove', point)
  el.addEventListener('pointerleave', leave)
  sync()
  return {
    select(index) {
      tween?.kill()
      const from = geometry.attributes.previous,
        to = geometry.attributes.destination
      const progress = uniforms.progress.value
      for (let i = 0; i < from.array.length; i++)
        from.array[i] += (to.array[i] - from.array[i]) * progress
      to.array.set(shapes[index])
      from.needsUpdate = to.needsUpdate = true
      uniforms.progress.value = 0
      tween = gsap.to(uniforms.progress, { value: 1, duration: 0.7, ease: 'power2.inOut' })
    },
    dispose() {
      tween?.kill()
      observer.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', sync)
      el.removeEventListener('pointermove', point)
      el.removeEventListener('pointerleave', leave)
      renderer.setAnimationLoop(null)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
