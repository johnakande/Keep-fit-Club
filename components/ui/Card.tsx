import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Card.module.css'

export type CardOptions = {
  // light: raised white surface. dark: navy feature card.
  tone?: 'light' | 'dark'
  // raised: small cards. panel: forms, tables and feature blocks.
  elevation?: 'raised' | 'panel'
  padding?: 'none' | 'md' | 'lg' | 'xl'
  // Lift on hover (the design's interaction for browsable cards).
  hover?: boolean
  // Slight 3D tilt that straightens on hover (dark feature cards).
  tilt?: boolean
  bordered?: boolean
  stack?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
}

export function cardClass({
  tone = 'light',
  elevation = 'raised',
  padding = 'md',
  hover = false,
  tilt = false,
  bordered = false,
  stack = 'sm',
  className,
}: CardOptions & { className?: string } = {}) {
  return [
    styles.card,
    styles[tone],
    styles[elevation],
    styles[`pad-${padding}`],
    stack !== 'none' && styles[`stack-${stack}`],
    hover && styles.hover,
    tilt && styles.tilt,
    bordered && styles.bordered,
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

type Tag = 'div' | 'article' | 'section' | 'aside' | 'li'

export default function Card({
  as: As = 'div',
  tone,
  elevation,
  padding,
  hover,
  tilt,
  bordered,
  stack,
  className,
  children,
  ...rest
}: CardOptions & { as?: Tag; className?: string; children: ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <As className={cardClass({ tone, elevation, padding, hover, tilt, bordered, stack, className })} {...rest}>
      {children}
    </As>
  )
}
