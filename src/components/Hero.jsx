import { CV } from '../data'

const facts = [
  ['7 years', 'building backends since 2019'],
  ['10 roles', 'across Amman and remote'],
  ['30%', 'faster API responses at UBA'],
  ['3 regions', 'teams in the US, EU and MENA'],
]

export default function Hero() {
  return (
    <>
      <header id="top" className="hero">
        <img
          className="hero-img"
          src="/images/world/amman-dusk.jpg"
          alt=""
          width="2400" height="1600"
          fetchpriority="high"
        />
        <div className="in hero-in">
          <p className="hero-who">Yousef Alkhrissat · Senior backend engineer in Amman</p>
          <h1>I build the systems behind online stores, phone platforms and learning apps.</h1>
          <p className="hero-sub">
            APIs, queues and real-time services in NestJS, TypeScript and Laravel. Right now
            I’m working on e-commerce and loyalty points at Merit Incentives.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#work">See my work</a>
            <a className="btn btn-ghost" href={CV} download>Download CV</a>
          </div>
        </div>
      </header>

      <section className="facts" aria-label="At a glance">
        <dl className="in facts-in">
          {facts.map(([num, label]) => (
            <div key={num}>
              <dt>{num}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
