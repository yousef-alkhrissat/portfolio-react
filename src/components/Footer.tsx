import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Mail } from 'lucide-react'
import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              <span className={styles.logoIcon}>Y</span>
              <span className={styles.logoText}>ousef Alkhrissat</span>
            </a>
            <p className={styles.tagline}>
              Building scalable systems that make a difference
            </p>
          </div>

          <div className={styles.links}>
            <h4>Quick Links</h4>
            <nav aria-label="Footer navigation">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>

          <div className={styles.social}>
            <h4>Connect</h4>
            <div className={styles.socialLinks}>
              <a 
                href="mailto:yousef.alkhrissat@gmail.com"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/yousef-alkhrissat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/yousef-alkhrissat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.bottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className={styles.copyright}>
            © {currentYear} Yousef Alkhrissat. All rights reserved.
          </p>
          <p className={styles.built}>
            Designed & Built with <Heart size={14} className={styles.heart} /> using React & TypeScript
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

