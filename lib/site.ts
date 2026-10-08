// Club facts used by the header, footer, metadata, JSON-LD and llms.txt.
// Edit here once; every surface picks it up.

export const site = {
  name: 'KeepFit Noble Friends Club',
  shortName: 'KeepFit',
  tagline: 'Noble Friends Club',
  motto: 'Humilem Esse',
  founded: '2022',
  // Override per environment with NEXT_PUBLIC_SITE_URL (no trailing slash).
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://keepfitnobleclub.com').replace(/\/$/, ''),
  locale: 'en_NG',
  language: 'en-NG',
  description:
    'A fitness and fellowship club in Awka, Anambra State. We train together, save together and show up for our community.',
  address: {
    name: 'Club Secretariat',
    street: '14 Zik Avenue',
    city: 'Awka',
    region: 'Anambra State',
    country: 'NG',
  },
  phone: { display: '+234 803 412 7790', e164: '+2348034127790', hours: 'Mon to Fri, 9 AM to 5 PM' },
  email: 'hello@keepfitnobleclub.com',
  partnersEmail: 'partners@keepfitnobleclub.com',
  affiliation: 'Anambra State Football Association',
  affiliationShort: 'ANSFA',
  ansfaRegistration: 'ANSFA/VC/2023/041',
  dues: { amount: 12000, label: '₦12,000', period: 'year' },
  timeZone: 'Africa/Lagos',
  // Add each profile URL when the club has it. Empty entries stay hidden on the
  // site and out of the schema `sameAs` list.
  social: {
    facebook: '',
    instagram: '',
    x: '',
    youtube: '',
    whatsapp: '',
  },
  donations: {
    // A hosted payment page (Paystack, Flutterwave...) for card and mobile money.
    // Card details are never typed into this site; empty keeps those options in
    // "contact the Treasurer" mode.
    paymentUrl: '',
    bank: {
      accountName: 'KeepFit Noble Friends Club',
      bank: 'Zenith Bank',
      accountNumber: '1014 552 908',
      note: 'Use your full name as the transfer reference.',
    },
  },
} as const

export type SocialKey = keyof typeof site.social

export const socialLabels: Record<SocialKey, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  x: 'X',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
}

// Only profiles that have a URL.
export const socialLinks = (Object.keys(site.social) as SocialKey[])
  .filter((key) => site.social[key])
  .map((key) => ({ key, label: socialLabels[key], href: site.social[key] as string }))

// "Join" lives in the header as the Join Now button, so it isn't repeated here.
// `match` lists extra paths that light up the item (the marketplace sits under Blog).
export const nav = [
  { id: 'home', label: 'Home', href: '/', match: [] },
  { id: 'about', label: 'About', href: '/about', match: [] },
  { id: 'programs', label: 'Programs', href: '/programs', match: [] },
  { id: 'events', label: 'Events', href: '/events', match: [] },
  { id: 'blog', label: 'Blog', href: '/blog', match: ['/marketplace'] },
] as const

export const footerLinks = [
  { label: 'About the club', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Events and gallery', href: '/events' },
  { label: 'Blog and marketplace', href: '/blog' },
  { label: 'Join, donate or contact', href: '/join' },
] as const

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function mapsUrl() {
  const q = `${site.address.street}, ${site.address.city}, ${site.address.region}, Nigeria`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
}
