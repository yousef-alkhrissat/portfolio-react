import { useEffect, useRef, useState } from 'react'
import { projects } from '../data'

// The names scroll past a frame held at the centre of the screen; whichever
// name crosses the middle of the viewport puts its screenshot in the frame.
export default function Work() {
  const [current, setCurrent] = useState(0)
  const listRef = useRef(null)

  useEffect(() => {
    const items = listRef.current.querySelectorAll('[data-index]')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setCurrent(Number(e.target.dataset.index))
      })
    }, { rootMargin: '-49% 0px -49% 0px' })
    items.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const p = projects[current]

  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="work-stage" aria-hidden="true">
        <p className="work-fact work-fact-left">{p.company}<br />{p.kind}</p>
        <div className="work-frame">
          {projects.map((q, i) => (
            <img
              key={q.id}
              src={`/images/projects/${q.id}.jpg`}
              alt=""
              width="1280" height="800"
              loading="lazy"
              className={i === current ? 'is-current' : ''}
            />
          ))}
        </div>
        <p className="work-fact work-fact-right">{p.archived ? `${p.year}, now offline` : p.year}</p>
      </div>

      <ol className="work-list" ref={listRef} role="list">
        <li className="work-title"><h2 id="work-title">Selected work</h2></li>
        {projects.map((q, i) => (
          <li key={q.id} data-index={i} className={i === current ? 'is-current' : ''}>
            {q.archived
              ? <span className="work-name">{q.name}</span>
              : <a className="work-name" href={q.link} target="_blank" rel="noopener noreferrer">{q.name}</a>}
            <span className="work-meta">{q.company} · {q.kind}{q.year !== q.company ? ` · ${q.year}` : ''}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
