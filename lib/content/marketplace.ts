// Member business marketplace, from Blog.dc.html (Member Marketplace tab).

export const marketplaceIntro = {
  title: 'Member Business Marketplace',
  text: 'Buy from the people you train with. Every listing belongs to a registered club member.',
  cta: 'Advertise My Business',
  note: 'Listings are reviewed by a club admin before they appear, usually within three working days.',
}

export const businessCategories = [
  'Food and Agric',
  'Sports and Fitness',
  'Logistics',
  'Health and Beauty',
  'Services',
  'Automotive',
  'Energy and Tech',
] as const

export type BusinessCategory = (typeof businessCategories)[number]

export type Business = {
  name: string
  category: BusinessCategory
  owner: string
  phone: string
  description: string
  featured?: boolean
  logoSrc?: string
}

export const businesses: Business[] = [
  { name: 'Nwosu Fresh Farms', category: 'Food and Agric', owner: 'Amaka Nwosu', phone: '+234 803 551 2044', description: 'Fresh vegetables, eggs and poultry from our farm in Amansea. Weekly delivery across Awka.', featured: true },
  { name: 'Bello Fitness Gear', category: 'Sports and Fitness', owner: 'Tunde Bello', phone: '+234 806 220 1187', description: 'Running shoes, jerseys, resistance bands and club kit. Members get 10% off.' },
  { name: 'Okafor Logistics', category: 'Logistics', owner: 'Chinedu Okafor', phone: '+234 802 907 3310', description: 'Same-day dispatch within Anambra and interstate haulage to Onitsha, Enugu and Lagos.' },
  { name: 'Eze Wellness Studio', category: 'Health and Beauty', owner: 'Ifeoma Eze', phone: '+234 815 448 9021', description: 'Sports massage, physiotherapy referrals and natural skincare.' },
  { name: 'Obi Prints and Branding', category: 'Services', owner: 'Chiamaka Obi', phone: '+234 809 330 7745', description: 'Event banners, T-shirts and business cards. Fast turnaround.' },
  { name: 'Madu Auto Care', category: 'Automotive', owner: 'Kelechi Madu', phone: '+234 803 776 5402', description: 'Servicing, diagnostics and tyres at our Zik Avenue workshop.' },
  { name: 'Okoro Kitchen', category: 'Food and Agric', owner: 'Adaeze Okoro', phone: '+234 816 205 9938', description: 'Healthy meal prep, small chops and event catering.' },
  { name: 'Udeh Solar Solutions', category: 'Energy and Tech', owner: 'Ikenna Udeh', phone: '+234 807 412 6650', description: 'Solar installation and inverter maintenance for homes and shops.' },
]

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}
