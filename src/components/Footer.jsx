import { EMAIL, PHONE, PHONE_LABEL, LINKEDIN, CV, credits } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-invite">
          <p className="footer-line">Need a backend that holds?</p>
          <a className="btn btn-dark" href={`mailto:${EMAIL}?subject=A%20backend%20that%20holds`}>Email Yousef</a>
        </div>
        <ul className="footer-links" role="list">
          <li><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href={`mailto:${EMAIL}`}>Email</a></li>
          <li><a href={`tel:${PHONE}`}>{PHONE_LABEL}</a></li>
          <li><a href={CV} download>Download CV</a></li>
        </ul>
      </div>

      <div className="footer-legal">
        <p>© {new Date().getFullYear()} Yousef Alkhrissat</p>
        <p className="footer-credits">
          Photographs:{' '}
          {credits.map((c, i) => (
            <span key={c.page}>
              <a href={c.page} target="_blank" rel="noopener noreferrer">{c.title}</a> by {c.by}, {c.licence}
              {i < credits.length - 1 ? '; ' : '.'}
            </span>
          ))}
        </p>
      </div>

      <p className="footer-mark" aria-hidden="true">Alkhrissat</p>
    </footer>
  )
}
