import { useEffect, useRef } from 'react'
import { asset, me } from '../data'

// Every tile samples the registered portrait atlas, textured with the four project screenshots.
function mountTiles(stage, photo, canvas, atlas) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const count = stage.clientWidth < 600 ? 32 : 64
  const sample = document.createElement('canvas')
  sample.width = sample.height = count
  const sampling = sample.getContext('2d', { willReadFrequently: true })
  if (!sampling) return
  sampling.drawImage(atlas, 0, 0, count, count)
  const rgba = sampling.getImageData(0, 0, count, count).data
  const tiles = []
  const cell = atlas.width / count
  for (let i = 0; i < count * count; i++) {
    if (rgba[i * 4 + 3] < 14) continue
    const angle = i * 2.39996
    const radius = 0.35 + ((i * 47) % 101) / 110
    tiles.push({
      col: i % count,
      row: Math.floor(i / count),
      dx: Math.cos(angle) * radius,
      dy: Math.sin(angle) * radius,
    })
  }
  let width, height, left, top, step
  let pointer = null,
    influence = 0,
    frame = 0,
    visible = true,
    previousTime = 0
  const start = performance.now() + 1650
  function schedule() {
    if (!frame && visible && !document.hidden) frame = requestAnimationFrame(paint)
  }
  function resize() {
    const bounds = stage.getBoundingClientRect()
    const rect = photo.getBoundingClientRect()
    width = bounds.width
    height = bounds.height
    left = rect.left - bounds.left
    top = rect.top - bounds.top
    step = rect.width / count
    const dpr = Math.min(devicePixelRatio || 1, 1.5)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    schedule()
  }
  function paint(time) {
    frame = 0
    const elapsed = Math.min(64, time - previousTime)
    previousTime = time
    const progress = Math.min(1, Math.max(0, (time - start) / 1000))
    const scroll = Math.min(1, Math.max(0, -stage.getBoundingClientRect().top / height))
    const spread = (1 - progress) ** 3 + scroll ** 1.5
    const target = pointer?.active ? 1 : 0
    influence += (target - influence) * (1 - Math.exp(-elapsed / 65))
    ctx.clearRect(0, 0, width, height)
    if (progress > 0) {
      const blend = Math.min(1, progress * 4)
      photo.style.opacity = String(1 - blend)
      ctx.globalAlpha = blend * (1 - scroll * 0.8)
      for (const tile of tiles) {
        let x = left + tile.col * step + tile.dx * width * spread
        let y = top + tile.row * step + tile.dy * height * spread
        if (pointer && influence > 0.001) {
          const dx = x + step / 2 - pointer.x,
            dy = y + step / 2 - pointer.y
          const distance = Math.hypot(dx, dy)
          const push = Math.max(0, 1 - distance / 98) ** 2 * 48 * influence
          x += (dx / (distance || 1)) * push
          y += (dy / (distance || 1)) * push
        }
        ctx.drawImage(
          atlas,
          tile.col * cell,
          tile.row * cell,
          cell,
          cell,
          x,
          y,
          step + 0.2,
          step + 0.2,
        )
      }
    }
    if (progress < 1 || Math.abs(target - influence) > 0.002) schedule()
  }
  function move(event) {
    const rect = stage.getBoundingClientRect()
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true }
    schedule()
  }
  function leave() {
    if (pointer) pointer.active = false
    schedule()
  }
  const hero = stage.parentElement
  const observer = new ResizeObserver(resize)
  observer.observe(stage)
  observer.observe(photo)
  const viewport = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    schedule()
  })
  viewport.observe(stage)
  hero.addEventListener('pointermove', move, { passive: true })
  hero.addEventListener('pointerleave', leave)
  hero.addEventListener('pointerup', leave)
  hero.addEventListener('pointercancel', leave)
  window.addEventListener('scroll', schedule, { passive: true })
  document.addEventListener('visibilitychange', schedule)
  resize()
  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    viewport.disconnect()
    hero.removeEventListener('pointermove', move)
    hero.removeEventListener('pointerleave', leave)
    hero.removeEventListener('pointerup', leave)
    hero.removeEventListener('pointercancel', leave)
    window.removeEventListener('scroll', schedule)
    document.removeEventListener('visibilitychange', schedule)
    photo.style.removeProperty('opacity')
    ctx.clearRect(0, 0, width, height)
  }
}

export default function Portrait() {
  const stage = useRef(null),
    photo = useRef(null),
    canvas = useRef(null)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)')
    let dispose,
      revision = 0
    async function sync() {
      const current = ++revision
      dispose?.()
      dispose = undefined
      if (reduce.matches || navigator.connection?.saveData) return
      const atlas = new Image()
      atlas.src = asset('vikas-mosaic.webp')
      try {
        await Promise.all([atlas.decode(), photo.current.decode()])
        if (current === revision)
          dispose = mountTiles(stage.current, photo.current, canvas.current, atlas)
      } catch {
        /* The photograph is already visible if canvas or decoding is unavailable. */
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
    <div ref={stage} className="hero-image">
      <img
        ref={photo}
        src={asset('vikas-portrait.webp')}
        alt={me.name}
        width="920"
        height="920"
        fetchpriority="high"
      />
      <canvas ref={canvas} aria-hidden="true" />
    </div>
  )
}
