import type { CSSProperties, ReactNode } from 'react'
import styles from './Grid.module.css'

// Responsive card grid: as many columns of at least `min` px as fit.
// `fit` stretches a short last row; `fill` keeps column widths steady.
export default function Grid({
  min,
  mode = 'fill',
  gap = 'md',
  as: As = 'ul',
  className,
  children,
}: {
  min: number
  mode?: 'fill' | 'fit'
  gap?: 'sm' | 'md' | 'lg'
  as?: 'ul' | 'div' | 'ol'
  className?: string
  children: ReactNode
}) {
  const style = { '--grid-min': `${min}px` } as CSSProperties
  return (
    <As className={[styles.grid, styles[mode], styles[`gap-${gap}`], className].filter(Boolean).join(' ')} style={style}>
      {children}
    </As>
  )
}
