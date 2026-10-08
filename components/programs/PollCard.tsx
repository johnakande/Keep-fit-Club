import Card from '@/components/ui/Card'
import ProgressBar from '@/components/ui/ProgressBar'
import Tag from '@/components/ui/Tag'
import { hasPassed, poll } from '@/lib/content/programs'
import { dayMonth } from '@/lib/format'
import styles from './ProgramCards.module.css'

// Public results of the current member poll (voting itself is members-only).
export default function PollCard() {
  const closed = hasPassed(poll.closes)
  const closesOn = dayMonth(poll.closes)
  const top = Math.max(...poll.options.map((o) => o.percent))
  return (
    <Card hover stack="sm">
      <Tag tone="navy">{closed ? 'Member poll · Closed' : `Member poll · Closes ${closesOn}`}</Tag>
      <h3 className={styles.pollTitle}>{poll.question}</h3>
      <div className={styles.pollOptions}>
        {poll.options.map((o) => (
          <ProgressBar key={o.label} label={o.label} valueLabel={`${o.percent}%`} percent={o.percent} emphasis={o.percent === top} />
        ))}
      </div>
      <p className={styles.small}>{poll.responses} member responses. Voting is open to members; results are shown publicly for transparency.</p>
    </Card>
  )
}
