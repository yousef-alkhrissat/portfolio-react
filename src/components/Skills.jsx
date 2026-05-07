const groups = [
  {
    icon: '⚙️', title: 'Backend',
    tags: [
      { icon: <i className="devicon-nodejs-plain colored" />, label: 'Node.js' },
      { icon: <i className="devicon-nestjs-original colored" />, label: 'NestJS' },
      { icon: <i className="devicon-express-original" />, label: 'Express.js' },
      { icon: <i className="devicon-laravel-original colored" />, label: 'Laravel' },
      { icon: <i className="devicon-typescript-plain colored" />, label: 'TypeScript' },
      { icon: <i className="devicon-javascript-plain colored" />, label: 'JavaScript' },
      { icon: <i className="devicon-php-plain colored" />, label: 'PHP' },
    ],
  },
  {
    icon: '🎨', title: 'Frontend',
    tags: [
      { icon: <i className="devicon-react-original colored" />, label: 'React.js' },
      { icon: <i className="devicon-html5-plain colored" />, label: 'HTML5' },
      { icon: <i className="devicon-css3-plain colored" />, label: 'CSS3' },
    ],
  },
  {
    icon: '🗄️', title: 'Databases',
    tags: [
      { icon: <i className="devicon-postgresql-plain colored" />, label: 'PostgreSQL' },
      { icon: <i className="devicon-mysql-plain colored" />, label: 'MySQL' },
      { icon: <i className="devicon-mongodb-plain colored" />, label: 'MongoDB' },
      { icon: <i className="devicon-oracle-original colored" />, label: 'Oracle' },
    ],
  },
  {
    icon: '⚡', title: 'Caching & Messaging',
    tags: [
      { icon: <i className="devicon-redis-plain colored" />, label: 'Redis' },
      { icon: <i className="devicon-rabbitmq-original colored" />, label: 'RabbitMQ' },
    ],
  },
  {
    icon: '🔍', title: 'Search & APIs',
    tags: [
      { icon: <i className="devicon-graphql-plain colored" />, label: 'GraphQL' },
      { icon: <i className="devicon-elasticsearch-plain colored" />, label: 'Elasticsearch' },
      { label: 'REST APIs' },
      { label: 'WebSockets' },
    ],
  },
  {
    icon: '☁️', title: 'Cloud & DevOps',
    tags: [
      { icon: <i className="devicon-amazonwebservices-plain-wordmark colored" />, label: 'AWS' },
      { icon: <i className="devicon-digitalocean-plain colored" />, label: 'DigitalOcean' },
      { icon: <i className="devicon-oracle-original colored" />, label: 'Oracle Cloud' },
      { icon: <i className="devicon-docker-plain colored" />, label: 'Docker' },
      { icon: <i className="devicon-linux-plain" />, label: 'Linux' },
      { icon: <i className="devicon-nginx-original colored" />, label: 'Nginx' },
      { icon: <i className="devicon-apache-plain colored" />, label: 'Apache' },
    ],
  },
  {
    icon: '🏗️', title: 'Architecture & Practices', wide: true,
    tags: [
      { label: 'Microservices' },
      { label: 'Event-Driven Architecture' },
      { label: 'CI/CD' },
      { label: 'Multi-Tenant Systems' },
      { label: 'Performance Tuning' },
      { label: 'Real-Time Systems' },
      { label: 'Domain-Driven Design' },
      { label: 'SOLID Principles' },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Technical Skills</span>
          <h2 className="section-title">Tools &amp; Technologies</h2>
        </div>

        <div className="skills-grid">
          {groups.map((g, gi) => (
            <div
              key={g.title}
              className={`skill-group reveal reveal-delay-${(gi % 4) + 1}`}
              style={g.wide ? { gridColumn: '1 / -1' } : undefined}
            >
              <div className="skill-group-title">
                <span className="group-icon">{g.icon}</span>
                {g.title}
              </div>
              <div className="skill-tags">
                {g.tags.map(t => (
                  <span className="skill-tag" key={t.label}>
                    {t.icon}{t.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
