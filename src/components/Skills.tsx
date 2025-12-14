import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './Skills.module.css'

const skillCategories = [
  {
    title: 'Languages & Frameworks',
    skills: [
      { name: 'Node.js', level: 95 },
      { name: 'NestJS', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'React.js', level: 85 },
      { name: 'Express.js', level: 90 },
      { name: 'PHP / Laravel', level: 75 },
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 90 },
      { name: 'MySQL', level: 85 },
      { name: 'Redis', level: 90 },
      { name: 'Elasticsearch', level: 80 },
    ]
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS (S3, EC2, RDS)', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'Linux Servers', level: 85 },
      { name: 'CI/CD', level: 75 },
      { name: 'Nginx / Apache', level: 80 },
    ]
  },
  {
    title: 'Messaging & APIs',
    skills: [
      { name: 'RabbitMQ', level: 90 },
      { name: 'GraphQL', level: 85 },
      { name: 'RESTful APIs', level: 95 },
      { name: 'WebSockets', level: 85 },
    ]
  }
]

const softSkills = [
  'Problem Solving',
  'Leadership',
  'Mentorship & Training',
  'Communication',
  'Project Management',
  'Critical Thinking',
  'Teamwork',
  'Flexibility'
]

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className={styles.skills} id="skills" ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.sectionNumber}>03.</span>
          <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
          <div className={styles.line} />
        </motion.div>

        <div className={styles.grid}>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className={styles.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + categoryIndex * 0.1 }}
            >
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.skillsList}>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className={styles.skill}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <motion.div
                        className={styles.progress}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ 
                          duration: 1, 
                          delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.softSkillsSection}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className={styles.softSkillsTitle}>Soft Skills</h3>
          <div className={styles.softSkills}>
            {softSkills.map((skill, index) => (
              <motion.span
                key={skill}
                className={styles.softSkill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.languages}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className={styles.languagesTitle}>Languages</h3>
          <div className={styles.languagesList}>
            <div className={styles.language}>
              <span className={styles.languageName}>Arabic</span>
              <span className={styles.languageLevel}>Native</span>
            </div>
            <div className={styles.language}>
              <span className={styles.languageName}>English</span>
              <span className={styles.languageLevel}>Advanced</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

