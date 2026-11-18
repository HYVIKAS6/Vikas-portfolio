import { ArrowDownRight, Download } from 'lucide-react'
import { me } from '../data'
import Portrait from './Portrait'

function Lettering({ word, className }) {
  return (
    <span className={className} aria-hidden="true">
      {Array.from(word, (letter, index) => (
        <span
          key={index}
          className="hero-letter"
          style={{ '--i': index, '--spin': (index % 2 ? 1 : -1) * (18 + index * 4) + 'deg' }}
        >
          {letter === ' ' ? '\u00a0' : letter}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <Portrait />
      <div className="hero-bottom shell">
        <h1 id="hero-title" aria-label={me.name + ' — Portfolio'}>
          <Lettering word={me.name.toUpperCase()} className="intro-name" />
          <Lettering word="PORTFOLIO" className="portfolio-title" />
        </h1>
        <div className="hero-details">
          <div className="signature">
            <p>
              Full-stack <em>developer</em>
            </p>
            <span>
              {me.name} · {me.location}
            </span>
          </div>
          <div className="actions">
            <a href="#projects" className="btn primary">
              View Projects <ArrowDownRight size={17} />
            </a>
            <a href={me.resume} download className="btn outline">
              Download Resume <Download size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
