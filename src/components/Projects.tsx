import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import styles from './Projects.module.css'

export type ProjectItem = {
  id: string
  name: string
  link: string
  /** Only set when we have a real screenshot image; otherwise placeholder is shown */
  screenshot?: string
  deleted?: boolean
}

export type CompanyProjects = {
  company: string
  projects: ProjectItem[]
}

const projectsByCompany: CompanyProjects[] = [
  {
    company: 'Aspire IT Services',
    projects: [
      { id: 'epic-academy', name: 'Epic Academy', link: 'https://aspire.jo/careers/epic-academy/', screenshot: '/images/projects/epic-academy.jpg' },
      { id: 'weight-watchers', name: 'Weight Watchers', link: 'https://www.weightwatchers.com/us', screenshot: '/images/projects/weight-watchers.jpg' },
      { id: 'scholastic', name: 'Scholastic', link: 'https://export.scholastic.com/en', screenshot: '/images/projects/scholastic.jpg' },
    ],
  },
  {
    company: 'Rhinosoft',
    projects: [
      { id: 'zalatimo', name: 'Zalatimo', link: 'https://zalatimo.com/en', screenshot: '/images/projects/zalatimo.jpg' },
      { id: 'himam', name: 'Himam', link: 'https://hla.himam.com/landing-page', screenshot: '/images/projects/himam.jpg' },
    ],
  },
  {
    company: 'Hello World Kids',
    projects: [
      { id: 'hellocode', name: 'Hellocode', link: 'https://hellocode.me/en/', screenshot: '/images/projects/hellocode.jpg' },
    ],
  },
  {
    company: 'Baaz',
    projects: [
      { id: 'baaz-portal', name: 'Baaz Web Portal', link: 'https://www.baaz.com/', screenshot: '/images/projects/baaz-portal.jpg', deleted: true },
    ],
  },
  {
    company: 'UBA',
    projects: [
      { id: 'shooty', name: 'Shooty', link: 'https://shooty.com/', screenshot: '/images/projects/shooty.jpg' },
    ],
  },
  {
    company: 'Axelerated Solutions',
    projects: [
      { id: 'sowtek', name: 'Sowtek', link: 'https://sowtek.com/', screenshot: '/images/projects/sowtek.jpg' },
    ],
  },
  {
    company: 'Freelance, Consultant & Personal',
    projects: [
      { id: 'point-trader-group', name: 'Point Trader Group', link: 'https://www.pointfxltd.com/', screenshot: '/images/projects/point-trader-group.jpg' },
      { id: 'yousef-alkhrissat', name: 'Yousef Alkhrissat', link: 'https://yousefalkhrissat.com/', screenshot: '/images/projects/yousef-alkhrissat.jpg' },
      { id: 'null-tech', name: 'Null Tech', link: 'https://null-tech.net/', screenshot: '/images/projects/null-tech.jpg' },
      { id: 'rateme', name: 'RateMe', link: 'https://rateme.gaztech.io/', screenshot: '/images/projects/rateme.jpg' },
    ],
  },
]

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className={styles.projects} id="projects" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.sectionNumber}>03.</span>
          <h2 className={styles.sectionTitle}>Projects</h2>
          <div className={styles.line} />
        </motion.div>

        <div className={styles.companyList}>
          {projectsByCompany.map((group, groupIndex) => (
            <motion.div
              key={group.company}
              className={styles.companyBlock}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
            >
              <h3 className={styles.companyName}>{group.company}</h3>
              <div className={styles.projectGrid}>
                {group.projects.map((project, projectIndex) => (
                  <motion.article
                    key={project.id}
                    className={`${styles.card} ${!project.link ? styles.noLink : ''}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, delay: groupIndex * 0.1 + projectIndex * 0.08 }}
                  >
                    <a
                      href={project.link || undefined}
                      className={styles.cardLink}
                      target={project.link ? '_blank' : undefined}
                      rel={project.link ? 'noopener noreferrer' : undefined}
                      aria-label={`${project.name}${project.link ? ' (opens in new tab)' : ''}`}
                      onClick={(e) => !project.link && e.preventDefault()}
                    >
                      <div className={styles.screenshotWrap}>
                        {project.screenshot ? (
                          <>
                            <img
                              src={project.screenshot}
                              alt={`${project.name} screenshot`}
                              className={styles.screenshot}
                              loading="lazy"
                              onError={(e) => {
                                const target = e.currentTarget
                                target.style.display = 'none'
                                target.nextElementSibling?.classList.add(styles.placeholderVisible)
                              }}
                            />
                            <div className={styles.placeholder} aria-hidden="true">
                              <span className={styles.placeholderText}>{project.name}</span>
                            </div>
                          </>
                        ) : (
                          <div className={`${styles.placeholder} ${styles.placeholderVisible} ${styles.placeholderOnly}`} aria-hidden="true">
                            <span className={styles.placeholderText}>{project.name}</span>
                          </div>
                        )}
                        {project.link && (
                          <span className={styles.externalIcon} aria-hidden="true">
                            <ExternalLink size={18} />
                          </span>
                        )}
                        {project.deleted && (
                          <span className={styles.deletedBadge}>Deleted</span>
                        )}
                      </div>
                      <div className={styles.cardFooter}>
                        <span className={styles.projectName}>{project.name}</span>
                        {project.link && (
                          <span className={styles.visitText}>Visit</span>
                        )}
                      </div>
                    </a>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
