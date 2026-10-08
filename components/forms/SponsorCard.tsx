import { ButtonLink } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import { sponsorship } from '@/lib/content/join'
import { site } from '@/lib/site'
import styles from './SponsorCard.module.css'

export default function SponsorCard() {
  return (
    <Card tone="dark" tilt padding="lg" stack="md">
      <Tag>{sponsorship.tag}</Tag>
      <h2 className={styles.title}>{sponsorship.title}</h2>
      <p className={styles.text}>{sponsorship.text}</p>
      <ul className={styles.tiers}>
        {sponsorship.tiers.map((t) => (
          <li key={t.name}>
            <span className={styles.tier}>
              <span className={styles.name}>{t.name}</span>
              <span className={styles.perks}>{t.perks}</span>
            </span>
            <span className={styles.price}>{t.price}</span>
          </li>
        ))}
      </ul>
      <ButtonLink href={`mailto:${site.partnersEmail}?subject=Sponsor%20pack%20request`} variant="secondary" size="lg" className={styles.cta}>
        {sponsorship.cta}
      </ButtonLink>
    </Card>
  )
}
