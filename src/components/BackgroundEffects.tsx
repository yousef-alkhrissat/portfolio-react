import { useEffect, useRef } from 'react'
import styles from './BackgroundEffects.module.css'

const BackgroundEffects = () => {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (blobRef.current) {
        const { clientX, clientY } = e
        blobRef.current.style.transform = `translate(${clientX - 200}px, ${clientY - 200}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={styles.effects} aria-hidden="true">
      <div ref={blobRef} className={styles.blob} />
      <div className={styles.gradientOrb1} />
      <div className={styles.gradientOrb2} />
      <div className={styles.gridLines} />
    </div>
  )
}

export default BackgroundEffects


