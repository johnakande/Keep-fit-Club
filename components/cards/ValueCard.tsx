import Card from '@/components/ui/Card'
import styles from './ValueCard.module.css'

export default function ValueCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <Card hover stack="none" className={styles.card}>
      <span className={styles.number}>{number}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </Card>
  )
}
