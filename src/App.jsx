import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el))
    }
    observeAll()

    const mutation = new MutationObserver(observeAll)
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => { observer.disconnect(); mutation.disconnect() }
  }, [])

  useEffect(() => {
    const navAnchors = document.querySelectorAll('.nav-links a')
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.style.color = a.getAttribute('href') === '#' + entry.target.id
              ? 'var(--text-primary)' : ''
          })
        }
      })
    }, { rootMargin: '-40% 0px -55% 0px' })

    document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s))
    return () => sectionObserver.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
