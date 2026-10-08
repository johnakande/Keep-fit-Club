import Image from 'next/image'
import { ButtonLink } from '@/components/ui/Button'
import { hero } from '@/lib/content/home'
import { site } from '@/lib/site'
import styles from './HomeHero.module.css'

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {hero.title}
          </h1>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.actions}>
            <ButtonLink href="/join" size="lg">
              Become a Member
            </ButtonLink>
            <ButtonLink href="/programs" variant="secondary" size="lg">
              Explore programs
            </ButtonLink>
          </div>
        </div>

        <div className={styles.visual}>
          {hero.image.src ? (
            <Image src={hero.image.src} alt={hero.image.alt} fill sizes="(min-width: 960px) 580px, 100vw" fetchPriority="high" className={styles.photo} />
          ) : (
            <div className={styles.chip} aria-hidden="true">
              <span className={styles.crest}>
                <Image src="/images/crest.jpg" alt="" width={88} height={88} sizes="88px" />
              </span>
              <span className={styles.chipName}>{site.name}</span>
              <span className={styles.chipMeta}>
                {site.motto} · {site.address.city}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
