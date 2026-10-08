import { ButtonLink } from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { mapsUrl, site, socialLinks } from '@/lib/site'
import styles from './ContactDetails.module.css'

// Map card, address/phone/email and social links beside the contact form.
// The map is a link to Google Maps rather than an embedded iframe: no
// third-party scripts or cookies on page load.
export default function ContactDetails() {
  return (
    <div className={styles.wrap}>
      <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className={styles.map}>
        <Icon name="pin" size={28} strokeWidth={1.5} />
        <span className={styles.mapLabel}>
          {site.address.name}, {site.address.street.replace(/^\d+\s/, '')}, {site.address.city}
        </span>
        <span className={styles.mapCta}>Open in Google Maps</span>
      </a>

      <address className={styles.details}>
        <div className={styles.item}>
          <Icon name="pin" size={22} className={styles.icon} />
          <span className={styles.body}>
            <span className={styles.label}>Address</span>
            <span className={styles.value}>
              {site.address.name}, {site.address.street}, {site.address.city}, {site.address.region}
            </span>
          </span>
        </div>
        <div className={styles.item}>
          <Icon name="phone" size={22} className={styles.icon} />
          <span className={styles.body}>
            <span className={styles.label}>Phone</span>
            <a href={`tel:${site.phone.e164}`} className={styles.value}>
              {site.phone.display}
            </a>
            <span className={styles.hours}>{site.phone.hours}</span>
          </span>
        </div>
        <div className={styles.item}>
          <Icon name="mail" size={22} className={styles.icon} />
          <span className={styles.body}>
            <span className={styles.label}>Email</span>
            <a href={`mailto:${site.email}`} className={styles.value}>
              {site.email}
            </a>
          </span>
        </div>
      </address>

      {socialLinks.length > 0 && (
        <div className={styles.socials}>
          {socialLinks.map((s) => (
            <ButtonLink key={s.key} href={s.href} variant="secondary" size="sm" target="_blank" rel="noopener noreferrer">
              {s.label}
            </ButtonLink>
          ))}
        </div>
      )}
    </div>
  )
}
