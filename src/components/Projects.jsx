import { projects, cases } from '../data'

const told = new Set(cases.map(c => c.id))
// Offline sites go last.
const rest = projects.filter(p => !told.has(p.id)).sort((a, b) => Number(!!a.archived) - Number(!!b.archived))

export default function Projects() {
  return (
    <section className="projects" aria-labelledby="projects-title">
      <div className="in">
        <h2 id="projects-title" className="section-title" data-reveal>More projects</h2>
        <ul className="project-grid" role="list" data-reveal-group>
          {rest.map(p => {
            const body = (
              <>
                <img src={`/images/projects/${p.id}.jpg`} alt="" width="1280" height="800" loading="lazy" />
                <span className="project-name">{p.name}</span>
                <span className="project-kind">{p.kind}</span>
                <span className="project-co">{p.archived ? 'No longer online' : p.company}</span>
              </>
            )
            return (
              <li key={p.id} data-reveal>
                {p.archived
                  ? <div className="project is-archived">{body}</div>
                  : <a className="project" href={p.link} target="_blank" rel="noopener noreferrer">{body}</a>}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
