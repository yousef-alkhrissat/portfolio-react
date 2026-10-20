import { useState } from 'react'
import { cases } from '../data'

export default function Cases() {
  const [hot, setHot] = useState(null)

  return (
    <section id="cases" className="cases" aria-labelledby="cases-title" data-reveal-group>
      <h2 id="cases-title" className="cases-title" data-reveal>Four problems, solved</h2>

      <div className="band" data-reveal onMouseLeave={() => setHot(null)}>
        {cases.map((c, i) => (
          <figure
            key={c.id}
            className={`band-panel${hot === c.id ? ' is-hot' : ''}`}
            style={{ '--grow': c.grow }}
            onMouseEnter={() => setHot(c.id)}
          >
            <img src={`/images/projects/${c.id}.jpg`} alt={`${c.where.split(' · ')[0]} home page`} width="1280" height="800" loading="lazy" />
            {i === 0 && <figcaption className="band-title">{c.title}</figcaption>}
          </figure>
        ))}
      </div>

      <div className="case-list">
        {cases.map(c => (
          <article
            key={c.id}
            className={`case${hot && hot !== c.id ? ' is-dim' : ''}`}
            data-reveal
            onMouseEnter={() => setHot(c.id)}
            onMouseLeave={() => setHot(null)}
          >
            <h3>{c.title}</h3>
            <p className="case-where">{c.where}</p>
            <p>{c.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
