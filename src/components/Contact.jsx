import { useState } from 'react'

const contacts = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: <a href="mailto:yousef.alkhrissat@gmail.com">yousef.alkhrissat@gmail.com</a>,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.38-.35a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: <a href="tel:+962793773311">+962 7 9377 3311</a>,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#00d4ff">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: <a href="https://linkedin.com/in/yousef-alkhrissat" target="_blank" rel="noopener noreferrer">linkedin.com/in/yousef-alkhrissat</a>,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Amman, Jordan',
  },
]

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.target)
    formData.append('access_key', '858177ec-ae75-49e2-ad96-5923a1b38a05')

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        e.target.reset()
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const busy = status === 'loading' || status === 'success'

  return (
    <section id="contact" aria-label="Contact">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
        </div>

        <div className="contact-grid">
          <div className="reveal reveal-delay-1">
            <p className="contact-tagline">
              Open to senior backend roles, remote contracts, and exciting distributed-system
              challenges. Whether you have a project in mind or just want to say hello — my
              inbox is always open.
            </p>
            <div className="contact-items">
              {contacts.map(c => (
                <div className="contact-item" key={c.label}>
                  <div className="contact-item-icon">{c.icon}</div>
                  <div>
                    <div className="contact-item-label">{c.label}</div>
                    <div className="contact-item-value">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form reveal reveal-delay-2">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" name="firstName" placeholder="John" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" name="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Project inquiry / Job opportunity..." />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell me about your project or opportunity..." required />
              </div>
              {status === 'error' && (
                <p style={{ color: '#f87171', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
              <button type="submit" className="btn-submit" disabled={busy}
                style={status === 'success' ? { background: 'linear-gradient(135deg,#10b981,#059669)' } : undefined}
              >
                {status === 'success' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Message Sent!
                  </>
                ) : status === 'loading' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round"/>
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
