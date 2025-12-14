import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Server, Database, Cloud } from 'lucide-react'
import styles from './About.module.css'

const highlights = [
  {
    icon: Server,
    title: 'Backend Architecture',
    description: 'Building scalable microservices and event-driven systems with NestJS and Node.js'
  },
  {
    icon: Database,
    title: 'Data Management',
    description: 'Designing efficient database schemas with PostgreSQL, MongoDB, and Redis'
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Deploying and managing applications on AWS, Docker, and Linux servers'
  },
  {
    icon: Code2,
    title: 'Full-Stack Capability',
    description: 'Creating complete solutions with React frontend and robust backend APIs'
  }
]

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.sectionNumber}>01.</span>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.line} />
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              I'm a backend-focused senior software engineer with <span className={styles.highlight}>6+ years of experience</span> delivering 
              scalable, event-driven systems. My work spans real-time telecom (VoIP), procurement SaaS, and social platforms.
            </p>
            <p>
              I specialize in <span className={styles.highlight}>high-throughput APIs</span>, microservices architecture, 
              and mentoring junior engineers to build resilient codebases. My passion lies in designing systems 
              that can handle millions of requests while maintaining clean, maintainable code.
            </p>
            <p>
              Currently, I'm focused on building telecom and real-time communication systems at 
              <span className={styles.highlight}> Axelerated Solutions</span>, where I work with cutting-edge 
              technologies like Asterisk-Nami for VoIP, Redis for caching, and RabbitMQ for event-driven processing.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>6+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>7+</span>
                <span className={styles.statLabel}>Companies</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>20+</span>
                <span className={styles.statLabel}>Projects Delivered</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.highlights}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className={styles.highlightCard}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className={styles.iconWrapper}>
                  <item.icon size={24} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About


