'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { nav, site } from '@/lib/site'
import styles from './Header.module.css'

function under(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function isActive(pathname: string, item: (typeof nav)[number]) {
  if (item.href === '/') return pathname === '/'
  return under(pathname, item.href) || item.match.some((m) => under(pathname, m))
}

export default function Header() {
  const pathname = usePathname()
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenOn(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label={`${site.name}, home`}>
          <span className={styles.crest}>
            <Image src="/images/crest.jpg" alt="" width={46} height={46} sizes="46px" />
          </span>
          <span className={styles.wordmark}>
            <span className={styles.name}>{site.shortName}</span>
            <span className={styles.tagline}>{site.tagline}</span>
          </span>
        </Link>

        <nav aria-label="Main" className={styles.desktopNav}>
          {nav.map((l) => {
            const active = isActive(pathname, l)
            return (
              <Link
                key={l.id}
                href={l.href}
                className={styles.navLink}
                aria-current={active ? 'page' : undefined}
              >
                {l.label}
              </Link>
            )
          })}
          <Link href="/join" className={`btn btn-primary ${styles.joinDesktop}`}>
            Join Now
          </Link>
        </nav>

        <div className={styles.mobileControls}>
          <Link href="/join" className={`btn btn-primary ${styles.joinMobile}`}>
            Join Now
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className={styles.mobileNav}>
          {nav.map((l) => {
            const active = isActive(pathname, l)
            return (
              <Link
                key={l.id}
                href={l.href}
                className={styles.mobileLink}
                aria-current={active ? 'page' : undefined}
              >
                {l.label}
                <Icon name="chevron" size={18} strokeWidth={1.8} className={styles.chevron} />
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
