import Card from '@/components/ui/Card'
import Portrait from '@/components/ui/Portrait'
import Tag from '@/components/ui/Tag'
import styles from './PersonCard.module.css'

// Executives (name, role, years) and award honourees (award, name, note).
export default function PersonCard({
  name,
  badge,
  note,
  photo,
  badgeFirst = false,
  headingLevel: Heading = 'h3',
}: {
  name: string
  badge: string
  note: string
  photo?: string
  badgeFirst?: boolean
  headingLevel?: 'h3' | 'h4'
}) {
  const badgeEl = (
    <Tag tone="red" wrap>
      {badge}
    </Tag>
  )
  return (
    <Card hover padding="none" stack="none">
      <Portrait name={name} photo={photo} />
      <div className={styles.body}>
        {badgeFirst && badgeEl}
        <Heading className={styles.name}>{name}</Heading>
        {!badgeFirst && badgeEl}
        <p className={badgeFirst ? styles.note : styles.years}>{note}</p>
      </div>
    </Card>
  )
}
