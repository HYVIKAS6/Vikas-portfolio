import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, Download, Pause, Play, MapPin } from 'lucide-react'
import { asset, me } from '../data'

const studies = ['Portrait', 'Helix', 'Orbit']

function ParticleStudy() {
  const stage = useRef(null)
  const engine = useRef(null)
  const [study, setStudy] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [unsupported, setUnsupported] = useState(false)
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setPlaying(!preference.matches && !navigator.connection?.saveData)
    sync()
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])
  useEffect(() => {
    if (!playing || unsupported) return
    let mounted = true
    let scene
    async function start() {
      try {
        const { createStudy } = await import('./particleStudy.js')
        if (!mounted) return
        scene = await createStudy(stage.current, asset('studies/source.webp'))
        if (!mounted) {
          scene.dispose()
          return
        }
        engine.current = scene
        setReady(true)
      } catch {
        if (mounted) {
          setUnsupported(true)
          setPlaying(false)
        }
      }
    }
    start()
    return () => {
      mounted = false
      scene?.dispose()
      engine.current = null
      setReady(false)
    }
  }, [playing, unsupported])
  useEffect(() => {
    if (ready) engine.current?.select(study)
  }, [study, ready])

  return (
    <figure className="study" aria-label="Interactive particle studies">
      <div className="instrument">
        <div className="rings" aria-hidden="true">
          <i />
          <i />
        </div>
        <img
          className={'poster' + (ready ? ' hidden-poster' : '')}
          src={asset('studies/' + studies[study].toLowerCase() + '.webp')}
          width="600"
          height="600"
          alt=""
          fetchpriority="high"
        />
        <div className="particles" ref={stage} aria-hidden="true" />
        <span className="frame-corner tl" aria-hidden="true" />
        <span className="frame-corner br" aria-hidden="true" />
        <span className="study-caption">
          <span className="light" />
          Particle study
        </span>
        <span className="frame-index" aria-hidden="true">
          0{study + 1} / 03
        </span>
      </div>
      <div className="controls" role="group" aria-label="Particle study controls">
        {studies.map((name, i) => (
          <button key={name} aria-pressed={i === study} onClick={() => setStudy(i)}>
            {name}
          </button>
        ))}
        {!unsupported && (
          <button
            className="play"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? 'Pause animation' : 'Play animation'}
            title={playing ? 'Pause animation' : 'Play animation'}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}
      </div>
    </figure>
  )
}

export default function Hero() {
  return (
    <section id="home" className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="orange-line" />
          Full-stack developer
        </p>
        <h1>
          {me.name}
          <span aria-hidden="true">.</span>
        </h1>
        <p className="lead">I build software and make pixels move.</p>
        <p className="intro">
          I’m Vikas, a computer science student in Mysore. I like building tools I can put to work,
          then opening a blank canvas to see what a little code can set in motion.
        </p>
        <div className="actions">
          <a href="#projects" className="btn primary">
            View Projects <ArrowDownRight size={19} />
          </a>
          <a href={me.resume} download className="btn outline">
            Download Resume <Download size={16} />
          </a>
        </div>
        <p className="location">
          <MapPin size={14} /> {me.location}
        </p>
      </div>
      <ParticleStudy />
    </section>
  )
}
