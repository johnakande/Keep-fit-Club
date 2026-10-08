import Image from 'next/image'
import Card from '@/components/ui/Card'
import Icon from '@/components/ui/Icon'
import Tag from '@/components/ui/Tag'
import { type Business, telHref } from '@/lib/content/marketplace'
import { initials } from '@/lib/format'
import styles from './BusinessCard.module.css'

export default function BusinessCard({ business: b, headingLevel: Heading = 'h3' }: { business: Business; headingLevel?: 'h2' | 'h3' }) {
  return (
    <Card as="article" hover className={b.featured ? styles.featured : undefined}>
      <div className={styles.top}>
        <div className={styles.logo}>
          {b.logoSrc ? <Image src={b.logoSrc} alt={`${b.name} logo`} width={64} height={64} /> : <span aria-hidden="true">{initials(b.name)}</span>}
        </div>
        {b.featured && <Tag tone="red">Featured</Tag>}
      </div>
      <div className={styles.heading}>
        <Heading className={styles.name}>{b.name}</Heading>
        <Tag size="sm">{b.category}</Tag>
      </div>
      <p className={styles.text}>{b.description}</p>
      <div className={styles.foot}>
        <span>
          <span className={styles.muted}>Owner</span> · <strong>{b.owner}</strong>
        </span>
        <a href={telHref(b.phone)} className={styles.phone}>
          <Icon name="phone" size={16} />
          {b.phone}
          <span className="sr-only">, call {b.name}</span>
        </a>
      </div>
    </Card>
  )
}
