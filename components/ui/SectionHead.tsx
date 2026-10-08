import type { ReactNode } from 'react'
import { ButtonLink } from './Button'
import styles from './SectionHead.module.css'

// Eyebrow + heading, with an optional "see all" button on the right.
export default function SectionHead({
  id,
  eyebrow,
  title,
  cta,
  as: Heading = 'h2',
  spaced = false,
  children,
}: {
  id?: string
  eyebrow?: string
  title: ReactNode
  cta?: { label: string; href: string }
  as?: 'h2' | 'h3'
  // Adds the design's space below the head (when the parent doesn't set a gap).
  spaced?: boolean
  // Extra content under the heading (intro paragraph).
  children?: ReactNode
}) {
  return (
    <div className={[styles.head, cta && styles.withCta, spaced && styles.spaced].filter(Boolean).join(' ')}>
      <div className={styles.text}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading id={id} className="section-title">
          {title}
        </Heading>
        {children}
      </div>
      {cta && (
        <ButtonLink href={cta.href} variant="secondary">
          {cta.label}
        </ButtonLink>
      )}
    </div>
  )
}
