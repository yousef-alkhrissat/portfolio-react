import { useState } from 'react'

const projectsByCompany = [
  {
    company: 'Aspire IT Services',
    projects: [
      {
        id: 'epic-academy', icon: '🎓',
        name: 'Epic Academy',
        desc: 'Tech education platform offering structured programs for aspiring software engineers and IT professionals.',
        link: 'https://aspire.jo/careers/epic-academy/',
        screenshot: '/images/projects/epic-academy.jpg',
      },
      {
        id: 'weight-watchers', icon: '⚖️',
        name: 'Weight Watchers',
        desc: 'Global wellness and weight-management platform serving millions of users with personalised health programs.',
        link: 'https://www.weightwatchers.com/us',
        screenshot: '/images/projects/weight-watchers.jpg',
      },
      {
        id: 'scholastic', icon: '📚',
        name: 'Scholastic',
        desc: 'International educational publisher and content distributor delivering books and learning resources worldwide.',
        link: 'https://export.scholastic.com/en',
        screenshot: '/images/projects/scholastic.jpg',
      },
    ],
  },
  {
    company: 'Rhinosoft',
    projects: [
      {
        id: 'zalatimo', icon: '🍬',
        name: 'Zalatimo',
        desc: 'E-commerce platform for one of Jordan\'s most iconic traditional sweets brands, with online ordering and delivery.',
        link: 'https://zalatimo.com/en',
        screenshot: '/images/projects/zalatimo.jpg',
      },
      {
        id: 'himam', icon: '🧠',
        name: 'Himam',
        desc: 'Arabic-first learning and human-development platform offering coaching, assessments, and professional growth tools.',
        link: 'https://hla.himam.com/landing-page',
        screenshot: '/images/projects/himam.jpg',
      },
    ],
  },
  {
    company: 'Hello World Kids',
    projects: [
      {
        id: 'hellocode', icon: '💻',
        name: 'Hellocode',
        desc: 'Coding education platform for kids, providing interactive programming courses and projects in Arabic and English.',
        link: 'https://hellocode.me/en/',
        screenshot: '/images/projects/hellocode.jpg',
      },
    ],
  },
  {
    company: 'Baaz',
    projects: [
      {
        id: 'baaz-portal', icon: '🌐',
        name: 'Baaz Web Portal',
        desc: 'Social discovery and content platform built for MENA audiences — now archived after platform sunset.',
        link: 'https://www.baaz.com/',
        screenshot: '/images/projects/baaz-portal.jpg',
        deleted: true,
      },
    ],
  },
  {
    company: 'UBA',
    projects: [
      {
        id: 'shooty', icon: '📸',
        name: 'Shooty',
        desc: 'Photography booking and marketplace platform connecting clients with professional photographers across the region.',
        link: 'https://shooty.com/',
        screenshot: '/images/projects/shooty.jpg',
      },
    ],
  },
  {
    company: 'Axelerated Solutions',
    projects: [
      {
        id: 'sowtek', icon: '📞',
        name: 'Sowtek',
        desc: 'Enterprise VoIP and unified communications platform delivering telecom solutions across the MENA region.',
        link: 'https://sowtek.com/',
        screenshot: '/images/projects/sowtek.jpg',
      },
    ],
  },
  {
    company: 'Freelance & Personal',
    projects: [
      {
        id: 'point-trader-group', icon: '📈',
        name: 'Point Trader Group',
        desc: 'Forex and financial trading services platform providing brokerage, market insights, and account management.',
        link: 'https://www.pointfxltd.com/',
        screenshot: '/images/projects/point-trader-group.jpg',
      },
      {
        id: 'yousef-alkhrissat', icon: '👨‍💻',
        name: 'Yousef Alkhrissat',
        desc: 'Personal portfolio website showcasing projects, skills, and professional background as a senior backend engineer.',
        link: 'https://yousefalkhrissat.com/',
        screenshot: '/images/projects/yousef-alkhrissat.jpg',
      },
      {
        id: 'null-tech', icon: '⚡',
        name: 'Null Tech',
        desc: 'Technology consultancy and digital solutions company offering software development and IT services.',
        link: 'https://null-tech.net/',
        screenshot: '/images/projects/null-tech.jpg',
      },
      {
        id: 'rateme', icon: '⭐',
        name: 'RateMe',
        desc: 'Rating and peer-review platform enabling users to evaluate and discover professionals and services.',
        link: 'https://rateme.gaztech.io/',
        screenshot: '/images/projects/rateme.jpg',
      },
    ],
  },
]

const ALL = 'All'
const companies = [ALL, ...projectsByCompany.map(g => g.company)]
const totalCount = projectsByCompany.reduce((n, g) => n + g.projects.length, 0)

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

export default function Projects() {
  const [active, setActive] = useState(ALL)

  const filtered = active === ALL
    ? projectsByCompany
    : projectsByCompany.filter(g => g.company === active)

  return (
    <section id="projects" aria-label="Projects">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div className="projects-filters reveal reveal-delay-1">
          {companies.map(c => (
            <button
              key={c}
              className={`filter-btn ${active === c ? 'active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c === ALL ? `All (${totalCount})` : c}
            </button>
          ))}
        </div>

        {filtered.map((group, gi) => (
          <div key={group.company} className="project-group">
            <div className="project-group-header reveal">
              <span className="project-group-name">{group.company}</span>
              <span className="project-group-count">
                {group.projects.length} project{group.projects.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="projects-grid">
              {group.projects.map((p, pi) => (
                <div
                  key={p.id}
                  className={`project-card reveal reveal-delay-${(pi % 3) + 1}`}
                >
                  <div className="project-icon">{p.icon}</div>

                  <div className="project-card-top">
                    <span className="project-company-badge">{group.company}</span>
                    {p.deleted && <span className="project-archived-pill">Archived</span>}
                  </div>

                  <div className="project-title">{p.name}</div>
                  <p className="project-desc">{p.desc}</p>

                  {p.deleted ? (
                    <span className="project-no-link">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      Site no longer live
                    </span>
                  ) : (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-visit-link"
                    >
                      Visit Site <ExternalIcon />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
