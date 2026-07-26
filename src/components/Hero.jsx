import { useEffect, useRef, useState } from 'react'

const TITLES = [
  'Senior Backend Engineer',
  'Node.js / NestJS Specialist',
  'Microservices Architect',
  'Distributed Systems Engineer',
  'AI-First Engineer',
  'Product Collaborator',
  'TypeScript Enthusiast',
]

export default function Hero() {
  const canvasRef = useRef(null)
  const [typed, setTyped] = useState('')
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    let titleIdx = 0, charIdx = 0, isDeleting = false
    let timer

    const tick = () => {
      const cur = TITLES[titleIdx]
      if (isDeleting) {
        setTyped(cur.substring(0, charIdx - 1))
        charIdx--
      } else {
        setTyped(cur.substring(0, charIdx + 1))
        charIdx++
      }
      let delay = isDeleting ? 55 : 90
      if (!isDeleting && charIdx === cur.length) { delay = 2200; isDeleting = true }
      else if (isDeleting && charIdx === 0) { isDeleting = false; titleIdx = (titleIdx + 1) % TITLES.length; delay = 400 }
      timer = setTimeout(tick, delay)
    }
    const start = setTimeout(tick, 1800)
    return () => { clearTimeout(start); clearTimeout(timer) }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, particles, raf
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    const rnd = (a, b) => Math.random() * (b - a) + a
    const init = () => {
      const count = Math.floor((W * H) / 14000)
      particles = Array.from({ length: count }, () => ({
        x: rnd(0, W), y: rnd(0, H),
        vx: rnd(-0.25, 0.25), vy: rnd(-0.25, 0.25),
        r: rnd(1, 2.2), alpha: rnd(0.2, 0.65),
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx*dx + dy*dy)
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${0.12*(1-d/110)})`; ctx.lineWidth = 0.7; ctx.stroke()
          }
        }
      }
      particles.forEach(p => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d = Math.sqrt(dx*dx + dy*dy)
        if (d < 140) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(59,130,246,${0.18*(1-d/140)})`; ctx.lineWidth = 0.7; ctx.stroke()
        }
      })
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`; ctx.fill()
      })
    }
    const update = () => particles.forEach(p => {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
    })
    const loop = () => { update(); draw(); raf = requestAnimationFrame(loop) }

    const hero = canvas.parentElement
    const onMove = e => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    const onResize = () => { resize(); init() }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)

    resize(); init(); loop()
    return () => {
      cancelAnimationFrame(raf)
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section id="hero" aria-label="Hero">
      <div className="hero-bg" />
      <canvas id="heroCanvas" ref={canvasRef} />
      <div className="hero-grid" />

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-greeting">
            <span className="dot" />
            Available for new opportunities
          </div>
          <h1 className="hero-name">Yousef<br />Alkhrissat</h1>
          <div className="hero-title-line">
            <span className="typed-text">{typed}</span>
            <span className="cursor" />
          </div>
          <p className="hero-tagline">
            Senior Backend Engineer with 6+ years architecting scalable APIs, microservices, and
            real-time platforms across telecom, EdTech, SaaS, and social products — bridging business
            intent and technical execution for teams across the US, EU, and MENA.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contact Me
            </a>
            <a href="/Yousef Alkhrissat - CV.pdf" className="btn-secondary" download="Yousef Alkhrissat - CV.pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo-frame">
            {!imgError
              ? <img src="/portfolio.jpg" alt="Yousef Alkhrissat" onError={() => setImgError(true)} />
              : (
                <div className="hero-photo-placeholder">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
              )
            }
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-arrow" />
        <span>scroll</span>
      </div>
    </section>
  )
}
