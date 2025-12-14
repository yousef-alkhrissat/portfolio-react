import { motion } from 'framer-motion'
import { ArrowDown, MapPin, Mail, Linkedin } from 'lucide-react'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className={styles.greeting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={styles.wave}>👋</span> Hi, my name is
          </motion.p>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Yousef <span className="gradient-text">Alkhrissat</span>
          </motion.h1>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Senior Software Engineer
          </motion.h2>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            I build <span className={styles.highlight}>scalable, event-driven systems</span> using 
            NestJS, Node.js, and modern cloud infrastructure. Specializing in 
            high-throughput APIs, microservices architecture, and real-time telecom systems.
          </motion.p>

          <motion.div
            className={styles.info}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className={styles.infoItem}>
              <MapPin size={16} />
              Amman, Jordan
            </span>
            <span className={styles.badge}>EU Blue Card Eligible</span>
          </motion.div>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a href="#contact" className={styles.primaryBtn}>
              <span>Get In Touch</span>
            </a>
            <a href="#experience" className={styles.secondaryBtn}>
              View My Work
            </a>
          </motion.div>

          <motion.div
            className={styles.social}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a
              href="mailto:yousef.alkhrissat@gmail.com"
              className={styles.socialLink}
              aria-label="Email Yousef"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/yousef-alkhrissat"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow} />
            <div className={styles.imageBorder}>
              <img 
                src="/images/portfolio.jpg" 
                alt="Yousef Alkhrissat - Senior Software Engineer"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.floatingBadge}>
              <span className={styles.badgeYears}>6+</span>
              <span className={styles.badgeText}>Years Exp</span>
            </div>
          </div>
          
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.dot} style={{ background: '#ff5f56' }} />
              <span className={styles.dot} style={{ background: '#ffbd2e' }} />
              <span className={styles.dot} style={{ background: '#27c93f' }} />
              <span className={styles.fileName}>developer.ts</span>
            </div>
            <pre className={styles.code}>
              <code>
{`const developer = {
  name: "Yousef Alkhrissat",
  role: "Senior Software Engineer",
  skills: ["NestJS", "Node.js", 
           "React", "PostgreSQL"],
  passion: "Building scalable systems"
};`}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { duration: 0.5, delay: 1 },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        aria-label="Scroll to about section"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  )
}

export default Hero
