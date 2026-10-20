import { useEffect, useMemo, useState } from 'react'
import { EMAIL, PHONE, PHONE_LABEL, LINKEDIN } from '../data'

const AMMAN = 'Asia/Amman'
const DAY_START = 9 * 60
const DAY_END = 18 * 60

const cities = [
  ['San Francisco', 'America/Los_Angeles'],
  ['New York', 'America/New_York'],
  ['London', 'Europe/London'],
  ['Berlin', 'Europe/Berlin'],
  ['Amsterdam', 'Europe/Amsterdam'],
  ['Stockholm', 'Europe/Stockholm'],
  ['Cairo', 'Africa/Cairo'],
  ['Riyadh', 'Asia/Riyadh'],
  ['Dubai', 'Asia/Dubai'],
  ['Amman', AMMAN],
]

// Minutes the zone is ahead of UTC at the given moment.
function offset(tz, at) {
  const local = new Date(at.toLocaleString('en-US', { timeZone: tz }))
  const utc = new Date(at.toLocaleString('en-US', { timeZone: 'UTC' }))
  return Math.round((local - utc) / 60000)
}

const hhmm = m => {
  const v = ((m % 1440) + 1440) % 1440
  return `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`
}

// Shared 09:00–18:00 working hours between Amman and the visitor's city.
function overlap(tz, at) {
  const a = offset(AMMAN, at)
  const v = offset(tz, at)
  const shift = a - v // Amman minus visitor, in minutes
  let best = { hours: 0 }
  for (const day of [-1440, 0, 1440]) {
    const start = Math.max(DAY_START, DAY_START - shift + day)
    const end = Math.min(DAY_END, DAY_END - shift + day)
    if (end - start > best.hours * 60) best = { hours: (end - start) / 60, from: start + shift - day, to: end + shift - day }
  }
  return best
}

// Starts on the visitor's own city. A visitor already on Amman time
// learns nothing from that, so they start on Berlin instead.
function guessCity() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const now = new Date()
    if (offset(tz, now) === offset(AMMAN, now)) return 'Europe/Berlin'
    return cities.find(c => c[1] === tz)?.[1] ?? tz
  } catch {
    return 'Europe/Berlin'
  }
}

export default function Contact() {
  const [now, setNow] = useState(() => new Date())
  const [tz, setTz] = useState(guessCity)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  const options = useMemo(() => (
    cities.some(c => c[1] === tz) ? cities : [['Your time zone', tz], ...cities]
  ), [tz])

  const ammanTime = now.toLocaleTimeString('en-GB', { timeZone: AMMAN, hour: '2-digit', minute: '2-digit' })
  const o = overlap(tz, now)
  const hours = Number.isInteger(o.hours) ? o.hours : o.hours.toFixed(1)

  const onSubmit = async e => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) { form.reportValidity(); return }
    setStatus('sending')
    const data = new FormData(form)
    data.append('access_key', '858177ec-ae75-49e2-ad96-5923a1b38a05')
    data.append('subject', `Portfolio message from ${data.get('name')}`)
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="rows">
        <h2 id="contact-title" className="row row-title" data-reveal>Reach me</h2>
        <a className="row" href={`mailto:${EMAIL}?subject=Hello%20Yousef`} data-reveal>
          yousef.alkhrissat<wbr />@gmail.com
        </a>
        <a className="row" href={`tel:${PHONE}`} data-reveal>{PHONE_LABEL}</a>
        <a className="row" href={LINKEDIN} target="_blank" rel="noopener noreferrer" data-reveal>LinkedIn</a>
        <p className="row" data-reveal>Amman, {ammanTime} now</p>
        <div className="row row-live" data-reveal>
          <label htmlFor="city">From</label>
          {/* The visible label sizes the control; the select lies over it, unseen. */}
          <span className="select-wrap">
            <span className="select-label" aria-hidden="true">{options.find(c => c[1] === tz)?.[0]}</span>
            <select id="city" value={tz} onChange={e => setTz(e.target.value)}>
              {options.map(([name, zone]) => <option key={zone} value={zone}>{name}</option>)}
            </select>
          </span>
          <output htmlFor="city" className="live-out">
            {o.hours > 0
              ? <>{hours} shared hours</>
              : <>no shared hours</>}
          </output>
        </div>
        <p className="row-note" data-reveal>
          {o.hours > 0
            ? <>Our working days overlap from {hhmm(o.from)} to {hhmm(o.to)} your time, against 09:00–18:00 in Amman.</>
            : <>Our 09:00–18:00 days don’t meet. Write anyway and we’ll find a slot.</>}
        </p>
      </div>

      <div className="message" data-reveal-group>
        <div className="message-intro" data-reveal>
          <h3>Or leave a message</h3>
          <p>A role, a contract, or a system that falls over at peak. I answer within two working days.</p>
        </div>
        <form className="form" onSubmit={onSubmit} noValidate>
          <label>
            <span>Name</span>
            <input name="name" autoComplete="name" placeholder="Your name" required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          </label>
          <label className="form-wide">
            <span>Message</span>
            <textarea name="message" rows="5" placeholder="What are you building, and where does it hurt?" required />
          </label>
          <div className="form-foot">
            <button className="btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <p className="form-status" role="status">
              {status === 'sent' && 'Sent. Thank you, I’ll reply soon.'}
              {status === 'error' && <>That didn’t go through. Email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</>}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
