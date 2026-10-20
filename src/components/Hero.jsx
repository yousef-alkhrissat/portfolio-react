import { EMAIL, CV } from '../data'

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero-photo">
        <img
          src="/images/world/amman-dusk.jpg"
          alt="Amman at dusk, the Jordan Gate towers lit above the city"
          width="2400" height="1600"
          fetchpriority="high"
        />
      </div>

      <div className="hero-body">
        <div className="hero-aside">
          <p className="hero-lead">
            Senior backend engineer in Amman. I build the queues, caches and call routing
            behind products for teams in the US, EU and MENA.
          </p>
          <div className="hero-actions">
            <a className="btn" href={`mailto:${EMAIL}?subject=Hello%20Yousef`}>Email me</a>
            <a className="link" href={CV} download>Download CV</a>
          </div>
        </div>

        <h1 className="monument" aria-label="Yousef Alkhrissat">
          <span className="monument-line">Yousef</span>
          <span className="monument-line">Alkhrissat</span>
        </h1>
      </div>
    </header>
  )
}
