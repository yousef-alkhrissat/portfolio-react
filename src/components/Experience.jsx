import { useState } from 'react'
import { jobs } from '../data'

const FIRST = 5

export default function Experience() {
  const [all, setAll] = useState(false)
  const shown = all ? jobs : jobs.slice(0, FIRST)

  return (
    <section id="experience" className="xp" aria-labelledby="xp-title">
      <div className="in">
        <h2 id="xp-title" className="section-title" data-reveal>Experience</h2>
        <p className="section-lede" data-reveal>Ten roles since February 2019, most of them in Amman.</p>

        <ol className="jobs" role="list">
          {shown.map((j, i) => (
            <li key={j.company + j.dates} className="job" data-reveal={i < FIRST ? '' : undefined}>
              <p className="job-when">{j.dates}{j.to ? '' : <span className="job-now">Current</span>}</p>
              <div>
                <h3>{j.role} <span className="job-co">· {j.company}</span></h3>
                <p className="job-where">{j.where}</p>
                <p>{j.text}</p>
                {j.tags.length > 0 && <p className="job-tags">{j.tags.join(' · ')}</p>}
              </div>
            </li>
          ))}
        </ol>

        <button className="btn btn-quiet" onClick={() => setAll(v => !v)} aria-expanded={all}>
          {all ? 'Show fewer roles' : `Show all ${jobs.length} roles`}
        </button>
      </div>
    </section>
  )
}
