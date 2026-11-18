import { useState } from 'react'
import { ArrowUpRight, ArrowUp, Github, Award } from 'lucide-react'
import { me, asset, projects, certificate } from '../data'

export function Projects() {
  return (
    <section className="section shell" id="projects">
      <div className="section-head">
        <h2>
          Selected work<span>.</span>
        </h2>
        <a className="text-link" href={me.github}>
          GitHub <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="work-grid">
        {projects.map((p) => (
          <article className="work" key={p.id}>
            <a className={'capture ' + p.id} href={p.demo} aria-label={p.action + ' — ' + p.name}>
              <img
                src={asset('work/' + p.id + '.webp')}
                loading="lazy"
                decoding="async"
                width="1280"
                height="800"
                alt={p.alt}
              />
            </a>
            <p className="eyebrow category">{p.field}</p>
            <h3>{p.name}</h3>
            <p className="body-copy">{p.description}</p>
            <ul className="tech" aria-label={'Technologies for ' + p.name}>
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="work-links">
              <a href={p.demo}>
                {p.action} <ArrowUpRight size={15} />
              </a>
              <a href={p.source} aria-label={'Source code for ' + p.name}>
                <Github size={15} /> Source
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function About() {
  return (
    <section className="section shell split" id="about">
      <h2>
        About me<span>.</span>
      </h2>
      <div>
        <p className="statement">
          I build software and make pixels move.
        </p>
        <p className="body-copy">
          I study computer science with a focus on artificial intelligence at {me.college} in
          Mysore. My projects range from Python automation to web interfaces for campus life.
          Outside that work, I experiment with 3D, typography and motion in the browser.
        </p>
        <dl className="facts">
          <div id="journey">
            <dt>Education</dt>
            <dd>
              {me.degree}
              <br />
              {me.college}
            </dd>
          </div>
          <div id="services">
            <dt>Creative tools</dt>
            <dd>Three.js, GSAP, React, Vite and Tailwind CSS</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export function Certifications() {
  return (
    <section className="section shell split" id="certifications">
      <h2>
        Certifications<span>.</span>
      </h2>
      <div className="credential">
        <Award size={26} aria-hidden="true" />
        <p className="eyebrow">{certificate.issuer} · Coursera</p>
        <h3>{certificate.title}</h3>
        <p>
          Completed <time dateTime="2026-01-30">{certificate.date}</time>
        </p>
        <a className="text-link" href={certificate.url}>
          Verify credential <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  )
}

export function Contact() {
  const [status, setStatus] = useState('idle')
  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    setStatus('sending')
    try {
      const response = await fetch('https://formspree.io/f/xzerrjgk', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!response.ok) throw new Error()
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }
  return (
    <section className="section shell split contact" id="contact">
      <div>
        <h2>
          Get in touch<span>.</span>
        </h2>
        <p className="body-copy">
          Have a role, a question about a project, or an idea for a 3D experiment? I’d like to hear
          it.
        </p>
        <a className="mail" href={'mailto:' + me.email}>
          {me.email} <ArrowUpRight size={18} />
        </a>
        <div className="work-links">
          <a href={me.github}>
            GitHub <ArrowUpRight size={14} />
          </a>
          <a href={me.linkedin}>
            LinkedIn <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <form action="https://formspree.io/f/xzerrjgk" method="post" onSubmit={submit}>
        <div className="input-pair">
          <label>
            Your name
            <input required autoComplete="name" name="name" />
          </label>
          <label>
            Email address
            <input required type="email" autoComplete="email" name="email" />
          </label>
        </div>
        <label>
          Message
          <textarea required name="message" rows={3} />
        </label>
        <button className="btn outline" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowUpRight size={16} />
        </button>
        <p role="status">
          {status === 'sent'
            ? 'Message sent. Thank you for getting in touch.'
            : status === 'failed'
              ? 'Your message could not be sent. Please try again or use my email address.'
              : ''}
        </p>
      </form>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="shell">
      <span>Vikas H Y · Mysore, India</span>
      <a href="#home">
        Back to top <ArrowUp size={14} />
      </a>
    </footer>
  )
}
