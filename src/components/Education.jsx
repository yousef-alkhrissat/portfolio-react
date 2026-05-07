export default function Education() {
  return (
    <section id="education" aria-label="Education">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic Background</h2>
        </div>

        <div className="edu-card reveal reveal-delay-1">
          <div className="edu-icon">🎓</div>
          <div className="edu-details">
            <div className="edu-degree">Associate's Degree in Computer Technology</div>
            <div className="edu-uni">Al Balqaa Applied University</div>
            <div className="edu-location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'inline',verticalAlign:'middle',marginRight:'4px'}}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Zarqa, Jordan
            </div>
            <div className="edu-years">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              2015 — 2019
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
