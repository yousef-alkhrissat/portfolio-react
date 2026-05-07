import { useEffect, useState } from 'react'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => {
    setOpen(false)
    document.body.style.overflow = ''
  }

  const toggle = () => {
    const next = !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">YA<span>.</span></a>
          <ul className="nav-links" role="list">
            {links.map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>
          <button
            className={`hamburger ${open ? 'open' : ''}`}
            onClick={toggle}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <nav className={`mobile-menu ${open ? 'open' : ''}`} aria-label="Mobile navigation">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={close}>{l}</a>
        ))}
      </nav>
    </>
  )
}
