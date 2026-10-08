// Club-wide facts shared by several pages. From the Claude Design project.

export type Stat = { value: string; label: string }

export type PillarId = 'fitness' | 'wealth' | 'lifestyle' | 'civic' | 'awards'

export type Pillar = {
  id: PillarId
  number: string
  title: string
  summary: string
  href: string
}

export type Sponsor = { name: string; logoSrc?: string; url?: string }

export const stats: Stat[] = [
  { value: '312', label: 'Active members' },
  { value: '48', label: 'Sessions per month' },
  { value: '₦2.1M', label: 'Group savings' },
  { value: '22', label: 'Eco projects' },
]

export const pillars: Pillar[] = [
  { id: 'fitness', number: '01', title: 'Fitness and Sport', summary: 'Coached training, five-a-side fixtures and monthly fitness challenges.', href: '/programs#fitness' },
  { id: 'wealth', number: '02', title: 'Wealth Creation', summary: 'Savings circles, financial literacy webinars and a member mentorship board.', href: '/programs#wealth' },
  { id: 'lifestyle', number: '03', title: 'Lifestyle and Sustainability', summary: 'Clean-ups, tree planting and wellness resources for body and mind.', href: '/programs#lifestyle' },
  { id: 'civic', number: '04', title: 'Civic Voice', summary: 'Voter education, member polls and neutral, informed advocacy.', href: '/programs#civic' },
  { id: 'awards', number: '05', title: 'Awards and Recognition', summary: 'Monthly honours for our most consistent attendees and contributors.', href: '/programs#awards' },
]

export const sponsors: Sponsor[] = [
  { name: 'Okafor Logistics' },
  { name: 'Nwosu Fresh Farms' },
  { name: 'Bello Fitness Gear' },
  { name: 'Anambra Green Initiative' },
  { name: 'Awka Diagnostics' },
  { name: 'Udeh Solar Solutions' },
]
