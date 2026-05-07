import { useState, useEffect } from 'react'

const jobs = [
  {
    date: 'Apr 2025 — Present',
    role: 'Senior Back-End Developer',
    current: true,
    company: 'Axelerated Solutions',
    location: 'Amman, Jordan',
    desc: 'Building telecom and real-time communication systems. Architecting multi-tenant NestJS microservices integrated with Asterisk VoIP, Redis pub/sub, RabbitMQ message queues, and MySQL — delivering high-availability solutions for enterprise telecom clients.',
    tags: ['NestJS', 'Asterisk', 'Multi-Tenant', 'Redis', 'RabbitMQ', 'MySQL'],
  },
  {
    date: 'Dec 2024 — Feb 2025',
    role: 'Fullstack Software Engineer',
    company: 'FGI Worldwide · Remote (US)',
    desc: 'Developed and maintained fullstack features for a US-based client on a fully remote contract engagement. Implemented PHP Laravel backend APIs and React.js frontend components, collaborating asynchronously across time zones.',
    tags: ['Laravel', 'React.js', 'PHP', 'Remote'],
  },
  {
    date: 'May 2024 — Dec 2024',
    role: 'Senior Fullstack Software Engineer',
    company: 'UBA (Unified Business Applications)',
    location: 'Amman, Jordan',
    desc: 'Led backend architecture of a procurement SaaS platform. Achieved a 30% API performance improvement through strategic caching, query optimization, and Elasticsearch-powered search. Built scalable GraphQL APIs, event-driven pipelines with RabbitMQ, and multi-cloud deployments on AWS, Oracle Cloud, and DigitalOcean.',
    tags: ['GraphQL', 'Elasticsearch', 'Redis', 'RabbitMQ', 'AWS', 'Oracle Cloud'],
  },
  {
    date: 'Nov 2023 — May 2024',
    role: 'Fullstack Software Engineer',
    company: 'Baaz',
    location: 'Amman, Jordan',
    desc: 'Engineered core features for a social platform with hybrid REST/GraphQL APIs, real-time feeds powered by Redis and Elasticsearch, and dual-database architecture using PostgreSQL for structured data and MongoDB for flexible content storage.',
    tags: ['REST', 'GraphQL', 'Redis', 'Elasticsearch', 'PostgreSQL', 'MongoDB'],
  },
  {
    date: 'Feb 2023 — Nov 2023',
    role: 'Senior Software Engineer',
    company: 'Hello World Kids',
    location: 'Amman, Jordan',
    desc: 'Delivered full-cycle backend engineering on Laravel-based platform with AWS infrastructure. Built automated CI/CD pipelines, integrated RabbitMQ for asynchronous job processing, and implemented GraphQL APIs for mobile and web clients.',
    tags: ['Laravel', 'AWS', 'RabbitMQ', 'GraphQL', 'CI/CD'],
  },
  {
    date: 'Feb 2022 — Nov 2022',
    role: 'Senior Software Engineer',
    company: 'Rhinosoft',
    location: 'Amman, Jordan',
    desc: 'Led backend development using NestJS and Express microservices with MongoDB, Redis caching, Elasticsearch full-text search, and RabbitMQ messaging. Mentored junior engineers and conducted code reviews to uphold engineering quality.',
    tags: ['NestJS', 'Express', 'MongoDB', 'Redis', 'Elasticsearch', 'RabbitMQ'],
  },
  {
    date: 'Nov 2021 — Feb 2022',
    role: 'Software Engineer',
    company: 'Luminus Education Group',
    location: 'Amman, Jordan',
    desc: 'Built and maintained internal enterprise systems using Node.js, streamlining administrative workflows for one of Jordan\'s leading private education groups.',
    tags: ['Node.js', 'Internal Systems'],
  },
  {
    date: 'Nov 2019 — Nov 2021',
    role: 'Software Engineer',
    company: 'Aspire IT Services',
    location: 'Amman, Jordan',
    desc: 'Worked across the full stack building NestJS and Express backends with React.js frontends. Managed multi-database environments (PostgreSQL, MongoDB), implemented Redis caching strategies, and set up RabbitMQ message brokers for async workflows.',
    tags: ['NestJS', 'Express', 'React.js', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    date: 'Feb 2019 — Nov 2019',
    role: 'Software Engineer',
    company: 'NCIT Solutions',
    location: 'Amman, Jordan',
    desc: 'Started professional career building real-time web applications with Node.js, React, and NestJS. Implemented WebSocket-based features for live data streaming and Redis for session and cache management.',
    tags: ['Node.js', 'React', 'NestJS', 'WebSockets', 'Redis'],
  },
]

const INITIAL_COUNT = 4

function TimelineItem({ job, index }) {
  const delay = index % 3
  return (
    <div className={`timeline-item reveal${delay ? ` reveal-delay-${delay}` : ''}`}>
      <div className="timeline-card">
        <div className="timeline-date">{job.date}</div>
        <div className="timeline-role">
          {job.role}
          {job.current && <span className="badge-current">Current</span>}
        </div>
        <div className="timeline-company">{job.company}</div>
        <p className="timeline-desc">{job.desc}</p>
        <div className="timeline-tags">
          {job.tags.map(t => <span className="tl-tag" key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? jobs : jobs.slice(0, INITIAL_COUNT)
  const remaining = jobs.length - INITIAL_COUNT

  useEffect(() => {
    if (showAll) {
      const els = document.querySelectorAll('.timeline-item.reveal:not(.is-visible)')
      els.forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 80)
      })
    }
  }, [showAll])

  return (
    <section id="experience" aria-label="Experience">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Work History</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>

        <div className="timeline">
          {visible.map((job, i) => (
            <TimelineItem key={job.company + job.date} job={job} index={i} />
          ))}
        </div>

        <div className="see-more-wrap">
          <button
            className={`btn-see-more ${showAll ? 'expanded' : ''}`}
            onClick={() => setShowAll(v => !v)}
          >
            <svg className="see-more-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {showAll ? 'Show Less' : `See ${remaining} More Positions`}
          </button>
        </div>
      </div>
    </section>
  )
}
