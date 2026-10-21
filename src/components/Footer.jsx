import { EMAIL, LINKEDIN, CV, credits } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="in footer-in">
        <div>
          <p className="footer-name">Yousef Alkhrissat</p>
          <p>Senior backend engineer in Amman, Jordan.</p>
        </div>
        <ul className="footer-links" role="list">
          <li><a href={`mailto:${EMAIL}`}>Email</a></li>
          <li><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href={CV} download>Download CV</a></li>
        </ul>
      </div>
      <div className="in footer-legal">
        <p>© {new Date().getFullYear()} Yousef Alkhrissat</p>
        <p>
          Photograph:{' '}
          {credits.map(c => (
            <span key={c.page}><a href={c.page} target="_blank" rel="noopener noreferrer">{c.title}</a> by {c.by}, {c.licence}.</span>
          ))}
        </p>
      </div>
    </footer>
  )
}
