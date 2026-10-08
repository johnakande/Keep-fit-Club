import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import Tag from '@/components/ui/Tag'
import { ansfa } from '@/lib/content/about'
import styles from './AnsfaCard.module.css'

// Affiliation panel in ANSFA's green and gold.
export default function AnsfaCard() {
  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        <div className={styles.crest}>
          {ansfa.crestSrc ? (
            <Image src={ansfa.crestSrc} alt="Anambra State Football Association crest" width={88} height={88} />
          ) : (
            <Icon name="shield" size={40} strokeWidth={1.5} />
          )}
        </div>
        <div className={styles.heading}>
          <h2 className={styles.title}>{ansfa.title}</h2>
          <Tag tone="gold" size="lg">
            <Icon name="check" size={14} strokeWidth={2.4} />
            {ansfa.badge}
          </Tag>
        </div>
      </div>
      <dl className={styles.facts}>
        {ansfa.facts.map((f) => (
          <div key={f.title} className={styles.fact}>
            <dt className={styles.factTitle}>{f.title}</dt>
            <dd className={styles.factText}>{f.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
