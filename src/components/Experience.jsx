import { useState } from 'react'
import { jobs, TRACE_START, TRACE_END } from '../data'

const span = TRACE_END - TRACE_START
const years = Array.from({ length: 8 }, (_, i) => TRACE_START + i)
const pct = v => `${((v - TRACE_START) / span) * 100}%`

const facts = [
  ['Based in', 'Amman, Jordan (UTC+3)'],
  ['Working since', 'February 2019'],
  ['Teams in', 'The US, the EU and MENA'],
  ['Eligible for', 'The EU Blue Card'],
  ['Studied', 'Computer Technology, Al Balqaa Applied University, 2015–2019'],
]

// The career drawn as a request trace: one span per job on a shared time axis.
export default function Experience() {
  const [open, setOpen] = useState(() => new Set())
  const toggle = id => e => {
    const isOpen = e.currentTarget.open
    setOpen(prev => {
      const next = new Set(prev)
      isOpen ? next.add(id) : next.delete(id)
      return next
    })
  }

  return (
    <section id="experience" className="xp" aria-labelledby="xp-title" data-reveal-group>
      <dl className="xp-facts" data-reveal>
        {facts.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>

      <div className="xp-about" data-reveal>
        <p>
          I work close to the product. I audit feature requests with stakeholders so engineering
          time goes to the workflows that matter, and I test like QA because I have done the job:
          Selenium (Java), Postman, JMeter, and training QA engineers on several teams.
        </p>
        <p>
          I have worked AI-first since Copilot was only an autocomplete. Today LLM features in
          production backends and agentic coding and testing loops are part of how I ship.
        </p>
      </div>

      <div className="trace" data-reveal>
        <h2 id="xp-title" className="trace-title">Ten roles since 2019</h2>

        <div className="trace-axis" aria-hidden="true">
          {years.map(y => <span key={y} style={{ left: pct(y) }}>{y}</span>)}
        </div>

        <ol className="trace-list" role="list">
          {jobs.map(j => (
            <li key={j.company + j.dates}>
              <details className={`trace-row${j.to ? '' : ' is-now'}`} onToggle={toggle(j.company)}>
                <summary>
                  <span className="trace-who">
                    <span className="trace-company">{j.company}</span>
                    <span className="trace-role">{j.role}</span>
                  </span>
                  <span className="trace-track" aria-hidden="true">
                    <span className="trace-span" style={{ left: pct(j.from), width: `calc(${pct(j.to ?? TRACE_END)} - ${pct(j.from)})` }} />
                  </span>
                  <span className="trace-dates">{j.dates}</span>
                </summary>
                {open.has(j.company) && (
                  <div className="trace-detail">
                    <p>{j.text}</p>
                    <p className="trace-tags">{[j.where, j.tags.join(', ')].filter(Boolean).join(' · ')}</p>
                  </div>
                )}
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
