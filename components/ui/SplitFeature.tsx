import type { ReactNode } from 'react'
import MediaFrame from './MediaFrame'
import type { IconName } from './Icon'
import styles from './SplitFeature.module.css'

// Photo beside a block of text; `reverse` puts the photo on the right.
// Stacks on narrow screens. Used by the About story and each Programs pillar.
export default function SplitFeature({
  image,
  icon,
  reverse = false,
  children,
}: {
  image: { src?: string; alt: string }
  icon?: IconName
  reverse?: boolean
  children: ReactNode
}) {
  return (
    <div className={[styles.split, reverse && styles.reverse].filter(Boolean).join(' ')}>
      <div className={styles.media}>
        <MediaFrame src={image.src || undefined} alt={image.alt} icon={icon} tilt={reverse ? 'left' : 'right'} />
      </div>
      <div className={styles.text}>{children}</div>
    </div>
  )
}

// Eyebrow, heading and body paragraphs in the design's long-form style.
export function FeatureText({ eyebrow, title, id, paragraphs, children }: { eyebrow?: string; title: string; id?: string; paragraphs?: string[]; children?: ReactNode }) {
  return (
    <div className={styles.feature}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {paragraphs?.map((p) => (
        <p key={p.slice(0, 40)} className={styles.body}>
          {p}
        </p>
      ))}
      {children}
    </div>
  )
}
