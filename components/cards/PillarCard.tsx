import Link from 'next/link'
import { cardClass } from '@/components/ui/Card'
import Icon from '@/components/ui/Icon'
import type { Pillar } from '@/lib/content/club'
import styles from './PillarCard.module.css'

export default function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <Link href={pillar.href} className={cardClass({ hover: true, bordered: true, className: styles.card })}>
      <span className={styles.icon}>
        <Icon name={pillar.id} />
      </span>
      <h3 className={styles.title}>{pillar.title}</h3>
      <p className={styles.text}>{pillar.summary}</p>
      <span className={styles.more}>
        Learn more <Icon name="arrow" size={16} strokeWidth={1.8} />
      </span>
    </Link>
  )
}
