import { useEffect, useRef } from 'react'
import { asset, me } from '../data'

const GRID = 230
const CELL = 4

// Sample the centers of the dots in the settled portrait so the fallback matches the animation.
function sampleParticles(image) {
  const source = document.createElement('canvas')
  source.width = image.naturalWidth
  source.height = image.naturalHeight
  const ctx = source.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []
  ctx.drawImage(image, 0, 0)
  const pixels = ctx.getImageData(0, 0, source.width, source.height).data
  const particles = []
  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const index = 4 * ((row * CELL + 1) * source.width + col * CELL + 1)
      if (!pixels[index + 3]) continue
      const shade = Math.round(pixels[index] / 8) * 8
      const angle = Math.random() * Math.PI * 2
      const radius = 0.65 + Math.random() * 1.2
      particles.push({
        x: (col + 0.5) / GRID, y: (row + 0.5) / GRID,
        startX: Math.cos(angle) * radius, startY: Math.sin(angle) * radius,
        shade, row,
      })
    }
  }
  return particles.sort((a, b) => a.shade - b.shade)
}

function animatePortrait(stage, image, canvas) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const particles = sampleParticles(image)
  if (!particles.length) return
  const hero = stage.parentElement
  let frame = 0, wakeTimer = 0, visible = true, pointer = null
  let width, height, left, top, size, dot, scale
  let elapsed = 0, previous = null, nextGlitch = 5400
  const displacedRows = new Float32Array(GRID)

  function resize() {
    const bounds = stage.getBoundingClientRect()
    const rect = image.getBoundingClientRect()
    width = bounds.width
    height = bounds.height
    size = rect.width
    left = rect.left - bounds.left
    top = rect.top - bounds.top
    scale = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)
    ctx.setTransform(scale, 0, 0, scale, 0, 0)
    dot = Math.max(0.65, size / GRID * 0.45)
    schedule()
  }

  function draw(time) {
    frame = 0
    if (!visible || document.hidden || !width || !height) return
    if (previous !== null) elapsed += time - previous
    previous = time
    const t = Math.min(1, elapsed / 3200)
    const spread = t < 0.5 ? 1 - 8 * t ** 4 : 8 * (1 - t) ** 4
    if (elapsed > nextGlitch + 180) nextGlitch = elapsed + 2500 + Math.random() * 2500
    const glitch = elapsed >= nextGlitch
    for (let row = 0; row < GRID; row++) {
      const band = Math.floor((0.5 - row / GRID) * 67 + Math.floor(elapsed * 0.009))
      const hash = Math.sin(band) * 43758.5
      displacedRows[row] = glitch && hash - Math.floor(hash) > 0.96 ? size * 0.075 : 0
    }
    ctx.clearRect(0, 0, width, height)
    const radius = size * 0.155
    let lastShade = -1
    for (const p of particles) {
      let x = left + size * (p.x + p.startX * spread) + displacedRows[p.row]
      let y = top + size * (p.y + p.startY * spread)
      let pointSize = dot
      if (pointer) {
        const dx = x - pointer.x, dy = y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (distance < radius) {
          const u = 1 - distance / radius
          const force = u * u * (3 - 2 * u) * (1 - spread)
          const push = size * 0.09 * force / (distance || 1)
          x += dx * push
          y += dy * push
          pointSize *= 1 + force
        }
      }
      if (p.shade !== lastShade) {
        ctx.fillStyle = 'rgb(' + p.shade + ' ' + p.shade + ' ' + p.shade + ')'
        lastShade = p.shade
      }
      ctx.fillRect(x - pointSize / 2, y - pointSize / 2, pointSize, pointSize)
    }
    image.style.visibility = 'hidden'
    if (t < 1 || glitch) schedule()
    else wakeTimer = window.setTimeout(schedule, Math.max(1, nextGlitch - elapsed))
  }

  function schedule() {
    clearTimeout(wakeTimer)
    if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw)
  }
  function move(event) {
    const rect = stage.getBoundingClientRect()
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    schedule()
  }
  function leave() { pointer = null; schedule() }
  function visibility() { previous = null; schedule() }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(stage)
  resizeObserver.observe(image)
  const viewport = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    visibility()
  })
  viewport.observe(stage)
  hero.addEventListener('pointermove', move, { passive: true })
  hero.addEventListener('pointerdown', move, { passive: true })
  hero.addEventListener('pointerleave', leave)
  hero.addEventListener('pointercancel', leave)
  hero.addEventListener('pointerup', leave)
  document.addEventListener('visibilitychange', visibility)
  resize()
  return () => {
    clearTimeout(wakeTimer)
    cancelAnimationFrame(frame)
    viewport.disconnect()
    resizeObserver.disconnect()
    hero.removeEventListener('pointermove', move)
    hero.removeEventListener('pointerdown', move)
    hero.removeEventListener('pointerleave', leave)
    hero.removeEventListener('pointercancel', leave)
    hero.removeEventListener('pointerup', leave)
    document.removeEventListener('visibilitychange', visibility)
    ctx.clearRect(0, 0, width, height)
    image.style.removeProperty('visibility')
  }
}

export default function Portrait() {
  const stage = useRef(null), photo = useRef(null), canvas = useRef(null)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)')
    let dispose, revision = 0
    async function sync() {
      const current = ++revision
      dispose?.()
      dispose = undefined
      if (reduce.matches || navigator.connection?.saveData) return
      try {
        await photo.current.decode()
        if (current === revision) dispose = animatePortrait(stage.current, photo.current, canvas.current)
      } catch {
        // Keep the settled pixel portrait visible if canvas or decoding is unavailable.
      }
    }
    sync()
    reduce.addEventListener('change', sync)
    return () => {
      revision++
      dispose?.()
      reduce.removeEventListener('change', sync)
    }
  }, [])
  return (
    <div ref={stage} className="hero-image" role="img" aria-label={me.name}>
      <img ref={photo} src={asset('vikas-particles.png')} alt="" width="920" height="920"
        fetchpriority="high" style={{ animation: 'none' }} />
      <canvas ref={canvas} aria-hidden="true" />
    </div>
  )
}
