import { site, absoluteUrl, socialLinks } from './site'
import { pillars } from './content/club'
import type { ClubEvent } from './content/events'
import { type Post, wordCount } from './content/posts'
import type { Business } from './content/marketplace'

export const ids = {
  organization: absoluteUrl('/#organization'),
  website: absoluteUrl('/#website'),
  webpage: (path: string) => `${absoluteUrl(path)}#webpage`,
}

const logo = {
  '@type': 'ImageObject',
  url: absoluteUrl('/images/crest-512.png'),
  width: 512,
  height: 512,
  caption: `${site.name} crest`,
}

const FOOTBALL = 'https://en.wikipedia.org/wiki/Association_football'

function postalAddress(street: string | undefined, locality: string) {
  return {
    '@type': 'PostalAddress',
    ...(street ? { streetAddress: street } : {}),
    addressLocality: locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  }
}

export function organizationSchema() {
  const sameAs = socialLinks.map((s) => s.href)
  return {
    '@type': 'SportsOrganization',
    '@id': ids.organization,
    name: site.name,
    alternateName: [site.shortName, 'Keep Fit Club'],
    url: absoluteUrl('/'),
    logo,
    image: logo,
    description: site.description,
    slogan: site.motto,
    foundingDate: site.founded,
    foundingLocation: { '@type': 'Place', name: `${site.address.city}, ${site.address.region}, Nigeria` },
    sport: FOOTBALL,
    address: postalAddress(site.address.street, site.address.city),
    telephone: site.phone.e164,
    email: site.email,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'general enquiries',
      telephone: site.phone.e164,
      email: site.email,
      areaServed: 'NG',
      availableLanguage: 'English',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    },
    areaServed: [
      { '@type': 'City', name: site.address.city },
      { '@type': 'AdministrativeArea', name: site.address.region },
    ],
    memberOf: { '@type': 'SportsOrganization', name: site.affiliation },
    identifier: { '@type': 'PropertyValue', propertyID: `${site.affiliationShort} club registration`, value: site.ansfaRegistration },
    makesOffer: {
      '@type': 'Offer',
      name: 'Annual club membership',
      description: 'All 48 monthly training sessions, savings circles and webinars, a marketplace listing and a vote at general meetings.',
      price: site.dues.amount,
      priceCurrency: 'NGN',
      eligibleRegion: { '@type': 'AdministrativeArea', name: site.address.region },
      url: absoluteUrl('/join'),
    },
    knowsAbout: pillars.map((p) => p.title),
    ...(sameAs.length ? { sameAs } : {}),
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: absoluteUrl('/'),
    name: site.name,
    alternateName: site.shortName,
    inLanguage: site.language,
    publisher: { '@id': ids.organization },
  }
}

export function webPageSchema(path: string, name: string, description: string, type = 'WebPage') {
  return {
    '@type': type,
    '@id': ids.webpage(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: site.language,
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.organization },
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  }
}

function team(name: string) {
  return name === site.name
    ? { '@type': 'SportsTeam', name, parentOrganization: { '@id': ids.organization } }
    : { '@type': 'SportsTeam', name }
}

export function eventSchema(e: ClubEvent) {
  const location = e.venue.online
    ? { '@type': 'VirtualLocation', name: e.venue.label }
    : { '@type': 'Place', name: e.venue.name, address: postalAddress(e.venue.street, e.venue.locality) }
  return {
    '@type': e.match ? 'SportsEvent' : 'Event',
    '@id': absoluteUrl(`/events#${e.slug}`),
    name: e.title,
    description: e.description,
    startDate: e.start,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: e.venue.online ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
    location,
    image: logo.url,
    organizer: { '@id': ids.organization },
    ...(e.match ? { sport: FOOTBALL, homeTeam: team(e.match.home), awayTeam: team(e.match.away) } : {}),
  }
}

export function blogPostingSchema(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: { '@id': ids.webpage(`/blog/${post.slug}`) },
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    datePublished: post.date,
    dateModified: post.date,
    wordCount: wordCount(post),
    inLanguage: site.language,
    image: `${url}/opengraph-image`,
    author: { '@type': 'Person', name: post.author, memberOf: { '@id': ids.organization } },
    publisher: { '@id': ids.organization },
  }
}

export function marketplaceSchema(list: Business[]) {
  return {
    '@type': 'ItemList',
    name: 'KeepFit member business marketplace',
    numberOfItems: list.length,
    itemListElement: list.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'LocalBusiness',
        name: b.name,
        description: b.description,
        telephone: b.phone.replace(/\s/g, ''),
        areaServed: { '@type': 'AdministrativeArea', name: site.address.region },
      },
    })),
  }
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
