import Image from 'next/image'
import Section from '@/components/ui/Section'
import type { Sponsor } from '@/lib/content/club'
import styles from './SponsorStrip.module.css'

// Shows each sponsor's logo when added, otherwise the name as a text wordmark.
export default function SponsorStrip({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <Section space="tight" divided labelledBy="sponsors-title" gap="sm">
      <h2 id="sponsors-title" className={`eyebrow ${styles.label}`}>
        Sponsors and partners
      </h2>
      <ul className={styles.grid}>
        {sponsors.map((s) => (
          <li key={s.name} className={styles.tile}>
            {s.logoSrc ? <Image src={s.logoSrc} alt={s.name} width={180} height={60} className={styles.logo} /> : <span className={styles.name}>{s.name}</span>}
          </li>
        ))}
      </ul>
    </Section>
  )
}
