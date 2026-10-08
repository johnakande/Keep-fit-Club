import type { Stat } from '@/lib/content/club'
import styles from './StatsBar.module.css'

// Frosted card that overlaps the bottom of the hero.
export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className={styles.wrap} aria-label="Club in numbers">
      <dl className={styles.stats}>
        {stats.map((s) => (
          // Label first in the markup for screen readers; CSS shows the number first.
          <div key={s.label} className={styles.stat}>
            <dt className={styles.label}>{s.label}</dt>
            <dd className={styles.value}>{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
