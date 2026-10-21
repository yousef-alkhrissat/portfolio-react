import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Cases from './components/Cases'
import Projects from './components/Projects'
import Experience from './components/Experience'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Every [data-reveal] element rises in once, as its section enters.
// Siblings inside one [data-reveal-group] are staggered by 70ms.
function useReveal() {
  useEffect(() => {
    document.querySelectorAll('[data-reveal-group]').forEach(g => {
      g.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.setProperty('--d', `${Math.min(i, 6) * 70}ms`))
    })
    // Checked on scroll rather than with an IntersectionObserver: a jump
    // (anchor link, End key) can carry an element from below the screen to
    // above it without it ever intersecting, and it would stay hidden.
    let pending = [...document.querySelectorAll('[data-reveal]')]
    let frame = 0
    const check = () => {
      frame = 0
      const line = window.innerHeight * 0.9
      pending = pending.filter(el => {
        const r = el.getBoundingClientRect()
        if (r.top > line) return true
        // Already scrolled past (a jump to a later section): show it at once.
        if (r.bottom < 0) el.style.transition = 'none'
        el.classList.add('is-in')
        return false
      })
      if (!pending.length) window.removeEventListener('scroll', onScroll)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    check()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Cases />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
