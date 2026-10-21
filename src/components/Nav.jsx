import { useEffect, useState } from 'react'
import { CV } from '../data'

const links = [
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

// One bar: transparent over the hero photo, then solid once the hero has gone.
export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), { rootMargin: '-72px 0px 0px 0px' })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav className={`nav${solid ? ' is-solid' : ''}`} aria-label="Main">
        <div className="in nav-in">
          <a href="#top" className="nav-name">Yousef Alkhrissat</a>
          <ul className="nav-links" role="list">
            {links.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}
            <li><a href={CV} download>CV</a></li>
          </ul>
          <a href="#contact" className="btn btn-sm nav-cta">Hire me</a>
          <button className="nav-menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu">Menu</button>
        </div>
      </nav>

      <div id="menu" className={`menu${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" inert={open ? undefined : ''}>
        <button className="menu-close" onClick={() => setOpen(false)}>Close</button>
        <ul role="list">
          {links.map(([label, href]) => (
            <li key={href}><a href={href} onClick={() => setOpen(false)}>{label}</a></li>
          ))}
          <li><a href={CV} download onClick={() => setOpen(false)}>Download CV</a></li>
        </ul>
      </div>
    </>
  )
}
