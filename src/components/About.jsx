const stats = [
  { num: '6+', label: 'Years Experience' },
  { num: '8+', label: 'Companies' },
  { num: '3',  label: 'Regions (US/EU/MENA)' },
  { num: '30%', label: 'API Perf. Gains' },
]

export default function About() {
  return (
    <section id="about" aria-label="About">
      <div className="container">
        <div className="reveal">
          <span className="section-label">About Me</span>
          <h2 className="section-title">The Engineer Behind the Code</h2>
        </div>

        <div className="about-grid">
          <div className="reveal reveal-delay-1">
            <div className="about-bio">
              <p>
                I'm a <strong>Senior Backend Engineer &amp; Product Collaborator</strong> passionate about
                building high-performance, scalable systems that power real-world products. With over
                <strong> 6 years</strong> of professional experience across 8+ companies in Jordan and
                globally, I specialize in architecting <strong>microservices</strong>, event-driven
                systems, real-time platforms, and multi-tenant SaaS.
              </p>
              <p>
                My stack of choice is <strong>Node.js / NestJS</strong>, complemented by TypeScript,
                Laravel, GraphQL, and a solid foundation in cloud infrastructure (AWS, DigitalOcean,
                Oracle Cloud). I've led backend teams, mentored engineers, and delivered 30%+ API
                performance improvements in production environments under real load.
              </p>
              <p>
                I work close to the product — auditing feature requests with business stakeholders to
                keep engineering effort on the workflows that matter. That quality-first instinct extends
                to testing: I've done hands-on <strong>QA automation</strong> with Selenium (Java), Postman,
                and JMeter, and trained QA engineers on automation, performance, and manual testing across
                multiple teams.
              </p>
              <p>
                I've been building with AI since before it was a category — an early adopter back when
                <strong> GitHub Copilot was still just an autocomplete extension</strong>. Today I work
                <strong> AI-first</strong>: LLM integrations wired into production backends, agentic coding
                and testing loops as part of my daily delivery workflow, and automation that takes
                repetitive work off the team's plate.
              </p>
              <p>
                I thrive in cross-functional, distributed teams — having worked with teams across the
                <strong> US, EU, and MENA</strong> regions — and hold a strong track record of translating
                complex business requirements into clean, maintainable architectures.
              </p>
              <div className="about-badges">
                <div className="about-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20M2 12h20M12 2c-2.8 3-4.5 6.8-4.5 10s1.7 7 4.5 10"/>
                  </svg>
                  EU Blue Card Eligible
                </div>
                <div className="about-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/>
                    <path d="M18.6 15.4l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"/>
                  </svg>
                  AI-First Since 2021
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid reveal reveal-delay-2">
            {stats.map(s => (
              <div className="stat-card" key={s.label}>
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
