import Card from '@/components/ui/Card'
import ProgressBar from '@/components/ui/ProgressBar'
import Tag from '@/components/ui/Tag'
import { challenge, hasPassed } from '@/lib/content/programs'
import styles from './ProgramCards.module.css'

export default function ChallengeCard() {
  const ended = hasPassed(challenge.ends)
  return (
    <Card tone="dark" tilt stack="sm">
      <Tag tone="red">{`${challenge.tag} · ${ended ? 'Ended' : 'Live'}`}</Tag>
      <h3 className={styles.darkTitle}>{challenge.title}</h3>
      <p className={styles.darkText}>{challenge.text}</p>
      <div className={styles.bottom}>
        <ProgressBar
          tone="dark"
          label={challenge.progressLabel}
          valueLabel={`${challenge.value} of ${challenge.max} ${challenge.unit}`}
          percent={(challenge.value / challenge.max) * 100}
        />
        <span className={styles.darkSmall}>{challenge.participants} members taking part</span>
      </div>
    </Card>
  )
}
