import { useState, useRef } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { asset } from '../data'

export function Nav() {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  const links = [
    ['Projects', 'projects'],
    ['About', 'about'],
    ['Certifications', 'certifications'],
  ]
  function closeOnEscape(event) {
    if (event.key !== 'Escape' || !open) return
    setOpen(false)
    toggle.current.focus()
  }
  return (
    <header className="site-header" onKeyDown={closeOnEscape}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="shell nav-row">
        <a
          className="brand"
          href="#home"
          onClick={() => setOpen(false)}
          aria-label="Vikas H Y, home"
        >
          <img alt="" src={asset('vh.svg')} width="34" height="34" />
          Vikas H Y
        </a>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav id="site-menu" className={open ? 'is-open' : ''} aria-label="Main navigation">
          {links.map(([name, id]) => (
            <a key={id} href={'#' + id} onClick={() => setOpen(false)}>
              {name}
            </a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>
            Get in touch <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  )
}
