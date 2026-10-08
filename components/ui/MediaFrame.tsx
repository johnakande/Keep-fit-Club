import Image from 'next/image'
import Icon, { type IconName } from './Icon'
import styles from './MediaFrame.module.css'

// Photo slot from the design: soft frame, optional 3D tilt. Shows the photo
// when `src` is set, otherwise a quiet branded placeholder (no "insert photo" text).
export default function MediaFrame({
  src,
  alt,
  aspect = '4/3',
  tilt = 'none',
  icon = 'image',
  sizes = '(min-width: 960px) 600px, 100vw',
  preload = false,
  className,
}: {
  src?: string
  alt: string
  aspect?: '4/3' | '16/9'
  // right leans the far edge back (photo on the left), left the opposite.
  tilt?: 'left' | 'right' | 'none'
  icon?: IconName
  sizes?: string
  preload?: boolean
  className?: string
}) {
  const cls = [styles.frame, styles[`a${aspect.replace('/', '-')}`], tilt !== 'none' && styles[`tilt-${tilt}`], className].filter(Boolean).join(' ')
  if (src) {
    return (
      <div className={cls}>
        <Image src={src} alt={alt} fill sizes={sizes} className={styles.img} fetchPriority={preload ? 'high' : undefined} />
      </div>
    )
  }
  return (
    <div className={cls} aria-hidden="true">
      <span className={styles.placeholder}>
        <Icon name={icon} size={40} strokeWidth={1.3} />
      </span>
    </div>
  )
}
