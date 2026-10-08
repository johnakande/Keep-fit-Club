import Image from 'next/image'
import { initials } from '@/lib/format'
import styles from './Portrait.module.css'

// A member's photo, or their initials on navy until a photo is added.
export default function Portrait({
  name,
  photo,
  shape = 'card',
  size = 36,
}: {
  name: string
  photo?: string
  // card: 4:5 block at the top of a person card. avatar: small circle.
  shape?: 'card' | 'avatar'
  size?: number
}) {
  const style = shape === 'avatar' ? { width: size, height: size, fontSize: Math.round(size * 0.36) } : undefined
  return (
    <div className={[styles.portrait, styles[shape]].join(' ')} style={style}>
      {photo ? (
        <Image src={photo} alt={name} fill sizes={shape === 'avatar' ? `${size}px` : '(min-width: 960px) 220px, 50vw'} className={styles.img} />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
    </div>
  )
}
