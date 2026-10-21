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
  const shift = offset(AMMAN, at) - offset(tz, at) // Amman minus visitor, in minutes
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
  const [copied, setCopied] = useState(false)

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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* the address stays selectable */ }
  }

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
      <div className="in contact-in">
        <div className="contact-info" data-reveal-group>
          <h2 id="contact-title" className="section-title" data-reveal>Let’s talk</h2>
          <p className="contact-lede" data-reveal>
            Hiring for a senior backend role, or have a system that slows down at peak? I answer within two working days.
          </p>

          <ul className="reach" role="list" data-reveal>
            <li>
              <span className="reach-label">Email</span>
              <span className="reach-row">
                <a href={`mailto:${EMAIL}?subject=Hello%20Yousef`}>{EMAIL}</a>
                <button type="button" className="copy" onClick={copyEmail}>{copied ? 'Copied' : 'Copy'}</button>
              </span>
            </li>
            <li><span className="reach-label">Phone</span><a href={`tel:${PHONE}`}>{PHONE_LABEL}</a></li>
            <li><span className="reach-label">LinkedIn</span><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">in/yousef-alkhrissat</a></li>
          </ul>

          <div className="overlap" data-reveal>
            <p className="overlap-q">
              It’s <strong>{ammanTime}</strong> in Amman now. Where is your team?
            </p>
            <div className="overlap-row">
              <label htmlFor="city" className="sr-only">Your city</label>
              <select id="city" value={tz} onChange={e => setTz(e.target.value)}>
                {options.map(([name, zone]) => <option key={zone} value={zone}>{name}</option>)}
              </select>
              <output htmlFor="city" className="live-out">
                {o.hours > 0 ? <>{hours} shared hours</> : <>no shared hours</>}
              </output>
            </div>
            <p className="row-note">
              {o.hours > 0
                ? <>Our working days overlap from {hhmm(o.from)} to {hhmm(o.to)} your time, against 09:00–18:00 in Amman.</>
                : <>Our 09:00–18:00 days don’t meet. Write anyway and we’ll find a slot.</>}
            </p>
          </div>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <h3>Send a message</h3>
          <label>
            <span>Name</span>
            <input name="name" autoComplete="name" placeholder="Your name" required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          </label>
          <label>
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
