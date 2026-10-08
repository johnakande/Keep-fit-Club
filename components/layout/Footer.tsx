import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import { footerLinks, site, socialLinks as socials } from '@/lib/site'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.about}>
          <span className={styles.crest}>
            <Image src="/images/crest.jpg" alt={`${site.name} crest`} width={72} height={72} sizes="72px" />
          </span>
          <p className={styles.name}>{site.name}</p>
          <p className={styles.blurb}>
            {site.description} {site.motto}.
          </p>
        </div>

        <nav aria-labelledby="footer-links" className={styles.col}>
          <h2 id="footer-links" className={styles.heading}>
            Quick links
          </h2>
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>Contact</h2>
          <address className={styles.address}>
            <p>
              {site.address.name}, {site.address.street},
              <br />
              {site.address.city}, {site.address.region}
            </p>
            <a href={`tel:${site.phone.e164}`} className={styles.contactLink}>
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className={styles.contactLink}>
              {site.email}
            </a>
          </address>
        </div>

        {socials.length > 0 && (
          <div className={styles.col}>
            <h2 className={styles.heading}>Follow the club</h2>
            <ul className={styles.socials}>
              {socials.map((s) => (
                <li key={s.key}>
                  <a href={s.href} className={styles.social} aria-label={s.label} rel="noopener noreferrer" target="_blank">
                    <Icon name={s.key} size={s.key === 'x' ? 18 : 20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.legal}>
        <div className={styles.legalInner}>
          <span>Affiliated with the {site.affiliation}</span>
          <span>
            © {year} {site.name}. Est. {site.founded}.
          </span>
        </div>
      </div>
    </footer>
  )
}
