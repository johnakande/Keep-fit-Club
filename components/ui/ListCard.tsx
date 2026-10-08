import Link from 'next/link'
import type { ReactNode } from 'react'
import Card from './Card'
import Icon from './Icon'
import styles from './ListCard.module.css'

// A raised card with a heading and divided rows (fixtures, savings groups, guides...).
export default function ListCard({ title, children, hover = true }: { title: string; children: ReactNode; hover?: boolean }) {
  return (
    <Card hover={hover} stack="xs">
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.rows}>{children}</ul>
    </Card>
  )
}

export function ListRow({
  title,
  meta,
  aside,
  badge,
  extra,
  href,
  linkIcon = 'chevron',
  stacked = false,
}: {
  title: ReactNode
  meta?: ReactNode
  // Right-hand value: pool total, Home/Away pill, status.
  aside?: ReactNode
  // Small pill above the title.
  badge?: ReactNode
  // Third line under the meta.
  extra?: ReactNode
  href?: string
  linkIcon?: 'chevron' | 'download'
  // Stack everything in one column (no aside).
  stacked?: boolean
}) {
  const body = (
    <>
      <span className={styles.main}>
        {badge}
        <span className={styles.rowTitle}>{title}</span>
        {meta && <span className={styles.meta}>{meta}</span>}
        {extra && <span className={styles.extra}>{extra}</span>}
      </span>
      {aside && <span className={styles.aside}>{aside}</span>}
    </>
  )
  if (href) {
    return (
      <li className={styles.row}>
        <Link href={href} className={styles.link}>
          {body}
          <Icon name={linkIcon} size={18} strokeWidth={1.8} className={styles.linkIcon} />
        </Link>
      </li>
    )
  }
  return <li className={[styles.row, styles.split, stacked && styles.stacked].filter(Boolean).join(' ')}>{body}</li>
}
