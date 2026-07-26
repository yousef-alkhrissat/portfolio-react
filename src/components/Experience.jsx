import { useState, useEffect } from 'react'

const jobs = [
  {
    date: 'Apr 2025 — Present',
    role: 'Senior Back-End Developer',
    current: true,
    company: 'Axelerated Solutions',
    location: 'Amman, Jordan',
    desc: 'Architecting multi-tenant backend infrastructure with NestJS and Asterisk, enforcing strict data isolation while optimizing resource allocation across client environments. Engineered real-time call-state tracking with Redis TTL and session strategies to cut database overhead during peak traffic, and streamlined event-driven processing with RabbitMQ and MySQL for high-volume telecom data. Led a modular redesign across VoIP, Ticketing, and Social modules, audited feature requests with product stakeholders to keep engineering effort on core workflows, and trained QA engineers on automation, performance, and manual testing.',
    tags: ['NestJS', 'Asterisk', 'Multi-Tenant', 'Redis', 'RabbitMQ', 'MySQL', 'VoIP'],
  },
  {
    date: 'Dec 2024 — Feb 2025',
    role: 'Fullstack Software Engineer',
    company: 'FGI Worldwide',
    location: 'Remote (US)',
    desc: 'Developed and maintained fullstack features for a US-based client on a fully remote contract engagement. Implemented PHP Laravel backend APIs and React.js frontend components, collaborating asynchronously across time zones.',
    tags: ['Laravel', 'React.js', 'PHP', 'Remote'],
  },
  {
    date: 'May 2024 — Dec 2024',
    role: 'Senior Fullstack Software Engineer',
    company: 'UBA (United Business Applications)',
    location: 'Amman, Jordan',
    desc: 'Built core backend features and React modules for high-volume procurement SaaS platforms, keeping client workflows and system capabilities aligned. Delivered high-performance GraphQL APIs and optimized data retrieval pipelines with Elasticsearch and Redis, reducing API response times by 30% platform-wide, and designed a decoupled microservices architecture over RabbitMQ to isolate heavy transaction loads.',
    tags: ['GraphQL', 'Elasticsearch', 'Redis', 'RabbitMQ', 'React.js', 'Microservices'],
  },
  {
    date: 'Nov 2023 — May 2024',
    role: 'Fullstack Software Engineer',
    company: 'Baaz',
    location: 'Amman, Jordan',
    note: 'Role ended — company shut down its regional platform operations',
    desc: 'Engineered scalable backend and frontend features for a high-concurrency social platform using REST and GraphQL APIs. Improved scaling and data availability through Redis caching layers and optimized Elasticsearch indices, while maintaining complex PostgreSQL and MongoDB data models across fast-evolving user features.',
    tags: ['REST', 'GraphQL', 'Redis', 'Elasticsearch', 'PostgreSQL', 'MongoDB'],
  },
  {
    date: 'Feb 2023 — Nov 2023',
    role: 'Senior Software Engineer',
    company: 'Hello World Kids',
    location: 'Amman, Jordan',
    desc: 'Conceived and architected an interactive coding-platform feature (modeled after LeetCode) that gamifies learning and evaluates student code submissions in real time. Led backend development on Laravel and AWS, running student scripts safely on isolated infrastructure, and used RabbitMQ queues to absorb heavy asynchronous evaluation workloads while holding sub-second responsiveness during peak classroom hours.',
    tags: ['Laravel', 'AWS', 'RabbitMQ', 'Code Execution', 'EdTech'],
  },
  {
    date: 'Feb 2022 — Nov 2022',
    role: 'Senior Software Engineer',
    company: 'Rhinosoft',
    location: 'Amman, Jordan',
    desc: 'Resolved a critical DHL international shipping bottleneck for Zalatimo.com by architecting a dynamic, locale-triggered calculation matrix (Fixed Fee × Weight) that bypassed rigid third-party billing constraints. Built Node.js microservices with NestJS and Express on MongoDB, Redis, and RabbitMQ, led code reviews and mentored junior engineers, and trained QA engineers on automation, performance, and manual testing.',
    tags: ['NestJS', 'Express', 'MongoDB', 'Redis', 'RabbitMQ', 'Mentoring'],
  },
  {
    date: 'Nov 2021 — Feb 2022',
    role: 'Software Engineer',
    company: 'Luminus Education Group',
    location: 'Amman, Jordan',
    desc: 'Developed internal systems on the Node.js stack, automating business processes and delivering platform features that improved operational workflows for one of Jordan\'s leading private education groups.',
    tags: ['Node.js', 'Internal Systems', 'Automation'],
  },
  {
    date: 'Nov 2019 — Nov 2021',
    role: 'Software Engineer',
    company: 'Aspire IT Services',
    location: 'Amman, Jordan',
    desc: 'Served as a foundational technical and business strategist for EPIC Academy, defining both the product\'s functional architecture and its underlying software specifications. Engineered core full-stack systems with NestJS, Express, and React, designed PostgreSQL and MongoDB schemas alongside Redis/RabbitMQ workflows for high-concurrency real-time classrooms, and ran QA automation with Selenium (Java) plus Postman/JMeter for API and load testing.',
    tags: ['NestJS', 'Express', 'React.js', 'PostgreSQL', 'MongoDB', 'Selenium', 'JMeter'],
  },
  {
    date: 'Feb 2019 — Nov 2019',
    role: 'Software Engineer',
    company: 'NCIT Solutions',
    location: 'Amman, Jordan',
    desc: 'Started professional career building applications with Node.js, React, and NestJS, implementing real-time features on WebSockets and Redis.',
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
        <div className={`timeline-company${job.note ? ' has-note' : ''}`}>
          {job.company}
          {job.location && <span className="timeline-location"> · {job.location}</span>}
        </div>
        {job.note && <div className="timeline-note">{job.note}</div>}
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
