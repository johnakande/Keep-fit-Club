import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/lib/site'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className={styles.wrap} aria-labelledby="nf-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>404</p>
        <h1 id="nf-title" className={styles.title}>
          This page isn’t here yet.
        </h1>
        <p className={styles.lead}>
          The link may be old, or the page is still being built. Call {site.phone.display} or email{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a> and the secretariat will help.
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          Back to the homepage
        </Link>
      </div>
    </section>
  )
}
