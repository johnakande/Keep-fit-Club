import type { ReactNode } from 'react'
import styles from './PageHero.module.css'

// Navy hero at the top of every inner page.
export default function PageHero({
  eyebrow,
  title,
  lead,
  titleAs: Title = 'h1',
  children,
  tabs,
}: {
  eyebrow: string
  title: string
  lead?: string
  // Blog articles put the post title in the h1, so the hero title steps down.
  titleAs?: 'h1' | 'p'
  // Extra content under the lead (jump links).
  children?: ReactNode
  // Tabs sit flush with the bottom edge of the hero.
  tabs?: ReactNode
}) {
  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <div className={[styles.inner, tabs && styles.withTabs].filter(Boolean).join(' ')}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <Title id="page-title" className={styles.title}>
          {title}
        </Title>
        {lead && <p className={styles.lead}>{lead}</p>}
        {children}
        {tabs}
      </div>
    </section>
  )
}
