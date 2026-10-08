import styles from './DateBadge.module.css'

// Navy calendar tile: "OCT / 10". Decorative; the full date is written out nearby.
export default function DateBadge({ month, day }: { month: string; day: string }) {
  return (
    <div className={styles.badge} aria-hidden="true">
      <span className={styles.month}>{month}</span>
      <span className={styles.day}>{day}</span>
    </div>
  )
}
