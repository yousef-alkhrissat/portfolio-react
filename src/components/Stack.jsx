import { useState } from 'react'
import { stack } from '../data'

const columns = [stack.slice(0, 2), stack.slice(2, 4), stack.slice(4, 6)]

export default function Stack() {
  const [note, setNote] = useState(null)
  const show = (name, line) => () => setNote({ name, line })
  const hide = () => setNote(null)

  return (
    <section id="stack" className="stack" aria-labelledby="stack-title" data-reveal-group>
      <h2 id="stack-title" className="stack-title" data-reveal>What I work with</h2>

      <div className="stack-grid">
        {columns.map((col, ci) => (
          <div className="stack-col" key={ci} data-reveal>
            {col.map(g => (
              <div className="stack-group" key={g.group}>
                <h3>{g.group}</h3>
                <ul role="list">
                  {g.items.map(([name, line]) => (
                    <li key={name}>
                      <button type="button" onMouseEnter={show(name, line)} onFocus={show(name, line)} onMouseLeave={hide} onBlur={hide}>
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="stack-summary">{g.summary}</p>
              </div>
            ))}
          </div>
        ))}

        <p className="stack-note" aria-live="polite">
          {note
            ? <><span className="stack-note-name">{note.name}</span> {note.line}</>
            : <span className="stack-note-idle">Seven years, six kinds of work. Point at a name to see where I used it.</span>}
        </p>
      </div>
    </section>
  )
}
