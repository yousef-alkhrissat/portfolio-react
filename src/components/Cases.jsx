import { cases } from '../data'

export default function Cases() {
  return (
    <section id="work" className="cases" aria-labelledby="work-title">
      <div className="in">
        <h2 id="work-title" className="section-title" data-reveal>Selected work</h2>
        <p className="section-lede" data-reveal>Four problems from real products, and what I did about them.</p>

        {cases.map(c => (
          <article key={c.id} className="case" data-reveal-group>
            <a className="case-shot" href={c.link} target="_blank" rel="noopener noreferrer" data-reveal>
              <img src={`/images/projects/${c.id}.jpg`} alt={`${c.where} website`} width="1280" height="800" loading="lazy" />
            </a>
            <div className="case-text" data-reveal>
              <p className="case-where">{c.where} · {c.company}</p>
              <h3>{c.title}</h3>
              <dl>
                <dt>The problem</dt><dd>{c.problem}</dd>
                <dt>What I did</dt><dd>{c.did}</dd>
                <dt>The result</dt><dd>{c.result}</dd>
              </dl>
              <a className="link" href={c.link} target="_blank" rel="noopener noreferrer">Visit {c.where}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
