import { useEffect, useState } from 'react'
import { CV } from '../data'

const links = [
  ['Work', '#work'],
  ['Stack', '#stack'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

// Two bars share these links: one laid over the hero photograph, and a plain
// fixed bar that slides in once the hero has left the screen.
export default function Nav() {
  const [docked, setDocked] = useState(false)
  const [open, setOpen] = useState(false)

  // Docked once the hero has gone, and stowed again while the work names
  // pass under the top of the screen, so nothing covers them.
  useEffect(() => {
    const hero = document.getElementById('top')
    const work = document.getElementById('work')
    if (!hero || !work) return
    let pastHero = false, overWork = false
    const sync = () => setDocked(pastHero && !overWork)
    const heroIo = new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; sync() }, { threshold: 0.08 })
    const workIo = new IntersectionObserver(([e]) => { overWork = e.isIntersecting; sync() }, { rootMargin: '0px 0px -92% 0px' })
    heroIo.observe(hero)
    workIo.observe(work)
    return () => { heroIo.disconnect(); workIo.disconnect() }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const list = (
    <ul className="nav-links" role="list">
      {links.map(([label, href]) => (
        <li key={href}><a href={href}>{label}</a></li>
      ))}
      <li><a href={CV} download>CV</a></li>
    </ul>
  )

  return (
    <>
      <nav className="nav nav-over" aria-label="Main">
        {list}
        <button className="nav-menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu">Menu</button>
      </nav>

      <nav className={`nav nav-dock${docked ? ' is-on' : ''}`} aria-label="Sticky" aria-hidden={!docked} inert={docked ? undefined : ''}>
        <a href="#top" className="nav-name">Yousef Alkhrissat</a>
        {list}
        <button className="nav-menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu">Menu</button>
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
