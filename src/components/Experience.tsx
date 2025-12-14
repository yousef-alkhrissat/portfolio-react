import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Calendar, MapPin } from 'lucide-react'
import styles from './Experience.module.css'

const experiences = [
  {
    id: 1,
    title: 'Senior Back-End Developer',
    company: 'Axelerated Solutions',
    location: 'Amman, Jordan',
    period: 'Apr 2025 - Present',
    description: [
      'Building telecom and real-time communication systems using NestJS and Asterisk-Nami',
      'Integrated Redis, MySQL, and RabbitMQ for efficient event-driven processing',
      'Designed scalable multi-tenant architecture for telecom clients',
      'Implemented structured TTL and caching strategies using Redis',
      'Led architectural planning for system decoupling and service-oriented restructuring'
    ],
    technologies: ['NestJS', 'Asterisk-Nami', 'Redis', 'MySQL', 'RabbitMQ', 'VoIP']
  },
  {
    id: 2,
    title: 'Senior Fullstack Software Engineer',
    company: 'UBA (United Business Applications)',
    location: 'Amman, Jordan',
    period: 'May 2024 - Dec 2024',
    description: [
      'Full-stack development using NestJS, Node.js Express, and React',
      'Integrated MongoDB, Redis, GraphQL, and Elasticsearch for optimized data retrieval',
      'Designed scalable microservices architecture with RabbitMQ',
      'Reduced API response times by 30% through debugging and optimization',
      'Conducted technical mentorship and onboarding sessions for junior developers'
    ],
    technologies: ['NestJS', 'React', 'MongoDB', 'GraphQL', 'Elasticsearch', 'AWS']
  },
  {
    id: 3,
    title: 'Fullstack Software Engineer',
    company: 'Baaz',
    location: 'Amman, Jordan',
    period: 'Nov 2023 - May 2024',
    description: [
      'Backend development using Yii framework and React.js',
      'Built RESTful and GraphQL APIs for seamless frontend-backend communication',
      'Improved application scalability with Redis caching and Elasticsearch',
      'Led technical workshops focusing on Node.js and React best practices'
    ],
    technologies: ['Yii', 'React.js', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL']
  },
  {
    id: 4,
    title: 'Senior Software Engineer',
    company: 'Hello World Kids',
    location: 'Amman, Jordan',
    period: 'Feb 2023 - Nov 2023',
    description: [
      'Led backend development using PHP Laravel on AWS infrastructure',
      'Integrated RabbitMQ for improved message queuing and async processing',
      'Designed mentorship program for new developer onboarding',
      'Collaborated with DevOps to optimize CI/CD pipelines and AWS deployments'
    ],
    technologies: ['Laravel', 'AWS', 'RabbitMQ', 'GraphQL', 'CI/CD']
  },
  {
    id: 5,
    title: 'Senior Software Engineer',
    company: 'Rhinosoft',
    location: 'Amman, Jordan',
    period: 'Feb 2022 - Nov 2022',
    description: [
      'Developed and optimized Node.js microservices using NestJS and Express',
      'Implemented MongoDB, Redis, Elasticsearch, and RabbitMQ for scalability',
      'Led weekly code review sessions, mentoring junior engineers',
      'Designed and developed GraphQL APIs for client-side data efficiency'
    ],
    technologies: ['NestJS', 'Express', 'MongoDB', 'Redis', 'Elasticsearch']
  },
  {
    id: 6,
    title: 'Software Engineer',
    company: 'Aspire IT Services',
    location: 'Amman, Jordan',
    period: 'Nov 2019 - Nov 2021',
    description: [
      'Full-stack development using NestJS, Node.js Express, and React',
      'Designed and optimized PostgreSQL and MongoDB database schemas',
      'Implemented RabbitMQ and Redis for real-time event handling',
      'Led technical onboarding for new engineers'
    ],
    technologies: ['NestJS', 'React', 'PostgreSQL', 'MongoDB', 'RabbitMQ']
  },
  {
    id: 7,
    title: 'Software Engineer',
    company: 'NCIT Solutions',
    location: 'Amman, Jordan',
    period: 'Feb 2019 - Nov 2019',
    description: [
      'Developed full-stack applications using NestJS, Node.js Express, and React',
      'Built real-time features with WebSockets and Redis',
      'Participated in mentorship programs for junior developers'
    ],
    technologies: ['NestJS', 'React', 'WebSockets', 'Redis']
  }
]

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeId, setActiveId] = useState(1)

  const activeExperience = experiences.find(exp => exp.id === activeId)

  return (
    <section className={styles.experience} id="experience" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.sectionNumber}>02.</span>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.line} />
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Company Tabs */}
          <div className={styles.tabs} role="tablist" aria-label="Experience timeline">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                className={`${styles.tab} ${activeId === exp.id ? styles.active : ''}`}
                onClick={() => setActiveId(exp.id)}
                role="tab"
                aria-selected={activeId === exp.id}
                aria-controls={`panel-${exp.id}`}
              >
                {exp.company}
              </button>
            ))}
            <motion.div
              className={styles.tabIndicator}
              layoutId="tabIndicator"
              style={{
                top: `${(activeId - 1) * 48}px`
              }}
            />
          </div>

          {/* Experience Details */}
          {activeExperience && (
            <motion.div
              key={activeExperience.id}
              className={styles.details}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              role="tabpanel"
              id={`panel-${activeExperience.id}`}
            >
              <h3 className={styles.jobTitle}>
                {activeExperience.title}
                <span className={styles.companyName}> @ {activeExperience.company}</span>
              </h3>

              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <Calendar size={16} />
                  {activeExperience.period}
                </span>
                <span className={styles.metaItem}>
                  <MapPin size={16} />
                  {activeExperience.location}
                </span>
              </div>

              <ul className={styles.responsibilities}>
                {activeExperience.description.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className={styles.bullet}>▹</span>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className={styles.technologies}>
                {activeExperience.technologies.map((tech) => (
                  <span key={tech} className={styles.tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Timeline for mobile */}
        <motion.div
          className={styles.timeline}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={styles.timelineItem}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <p className={styles.timelinePeriod}>{exp.period}</p>
                <ul>
                  {exp.description.slice(0, 3).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className={styles.technologies}>
                  {exp.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Experience


