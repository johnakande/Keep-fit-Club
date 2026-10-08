import type { ReactNode } from 'react'
import styles from './Section.module.css'

// One page band: background tone, vertical rhythm, and the centred container.
export default function Section({
  id,
  tone = 'plain',
  space = 'md',
  noTop = false,
  divided = false,
  gap,
  labelledBy,
  label,
  className,
  innerClassName,
  children,
}: {
  id?: string
  // plain: white. band: the soft grey gradient used to alternate sections.
  tone?: 'plain' | 'band'
  space?: 'md' | 'sm' | 'xs' | 'tight'
  noTop?: boolean
  // Thin top rule (sponsor strip).
  divided?: boolean
  // Stack the children vertically with this gap.
  gap?: 'sm' | 'md' | 'lg'
  labelledBy?: string
  label?: string
  className?: string
  innerClassName?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={[styles.section, styles[tone], styles[space], noTop && styles.noTop, divided && styles.divided, className].filter(Boolean).join(' ')}
    >
      <div className={['container', gap && styles[`gap-${gap}`], innerClassName].filter(Boolean).join(' ')}>{children}</div>
    </section>
  )
}
