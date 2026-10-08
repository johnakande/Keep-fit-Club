import type { ReactNode } from 'react'
import styles from './Tag.module.css'

export type TagTone = 'cloud' | 'red' | 'navy' | 'gold'

// Pill label: categories, statuses, roles.
export default function Tag({
  tone = 'cloud',
  size = 'md',
  wrap = false,
  children,
  className,
}: {
  tone?: TagTone
  size?: 'sm' | 'md' | 'lg'
  // Roles can run to two lines; let them grow instead of clipping.
  wrap?: boolean
  children: ReactNode
  className?: string
}) {
  return <span className={[styles.tag, styles[tone], styles[size], wrap && styles.wrap, className].filter(Boolean).join(' ')}>{children}</span>
}
