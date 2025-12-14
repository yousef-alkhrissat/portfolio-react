import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import styles from './Header.module.css'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <nav className={styles.nav} aria-label="Main navigation">
        <a href="#" className={styles.logo} aria-label="Yousef Alkhrissat - Home">
          <span className={styles.logoIcon}>Y</span>
          <span className={styles.logoText}>ousef</span>
        </a>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          {navLinks.map((link, index) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <a href={link.href} className={styles.navLink}>
                <span className={styles.navNumber}>0{index + 1}.</span>
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="/Yousef-Alkhrissat-CV.pdf"
          className={styles.resumeBtn}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          download
        >
          Resume
        </motion.a>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.menuToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <ul className={styles.mobileNavLinks}>
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className={styles.mobileNavLink}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className={styles.navNumber}>0{index + 1}.</span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="/Yousef-Alkhrissat-CV.pdf"
                className={styles.mobileResumeBtn}
                download
              >
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Header

