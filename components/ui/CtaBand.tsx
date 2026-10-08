import { ButtonLink } from './Button'
import styles from './CtaBand.module.css'

// Navy closing band with one red call to action.
export default function CtaBand({
  title,
  text,
  cta = { label: 'Become a Member', href: '/join' },
}: {
  title: string
  text: string
  cta?: { label: string; href: string }
}) {
  return (
    <section className={styles.band} aria-labelledby="cta-title">
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 id="cta-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.lead}>{text}</p>
        </div>
        <ButtonLink href={cta.href} size="xl">
          {cta.label}
        </ButtonLink>
      </div>
    </section>
  )
}
