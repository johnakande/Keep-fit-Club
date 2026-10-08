import Card from '@/components/ui/Card'
import { ListRow } from '@/components/ui/ListCard'
import { coachTip } from '@/lib/content/programs'
import styles from './ProgramCards.module.css'

export default function CoachTipCard() {
  return (
    <Card hover stack="sm">
      <h3 className={styles.cardTitle}>Coach tips and nutrition</h3>
      <figure className={styles.quote}>
        <blockquote>{coachTip.quote}</blockquote>
        <figcaption>{coachTip.by}</figcaption>
      </figure>
      <ul className={styles.guides}>
        {coachTip.guides.map((g) =>
          g.href ? (
            <ListRow key={g.title} title={g.title} href={g.href} linkIcon={g.href.endsWith('.pdf') ? 'download' : 'chevron'} />
          ) : (
            <ListRow key={g.title} title={g.title} stacked />
          ),
        )}
      </ul>
    </Card>
  )
}
