import type { CSSProperties } from 'react'
import styles from './ProgressBar.module.css'

// Labelled horizontal bar. The numbers are in the text, so the bar itself is decorative.
export default function ProgressBar({
  label,
  valueLabel,
  percent,
  tone = 'light',
  emphasis = false,
}: {
  label: string
  valueLabel: string
  percent: number
  // light: navy on cloud. dark: white on slate (inside navy cards).
  tone?: 'light' | 'dark'
  // The leading option in a poll gets the darker fill.
  emphasis?: boolean
}) {
  const style = { '--pct': `${Math.max(0, Math.min(100, percent))}%` } as CSSProperties
  return (
    <div className={[styles.wrap, styles[tone], emphasis && styles.emphasis].filter(Boolean).join(' ')}>
      <div className={styles.labels}>
        <span>{label}</span>
        <span className={styles.value}>{valueLabel}</span>
      </div>
      <div className={styles.track} aria-hidden="true">
        <div className={styles.fill} style={style} />
      </div>
    </div>
  )
}
