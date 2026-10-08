// Programs page copy, from Programs.dc.html. Dated items use ISO dates so
// finished ones drop off on their own.
import type { PillarId } from './club'

export const programsHero = {
  eyebrow: 'Programs',
  title: 'Five pillars, one club calendar.',
  lead: 'Every member can take part in every pillar. Pick where to start.',
}

export const pillarIntros: Record<PillarId, { text: string; image: { src: string; alt: string } }> = {
  fitness: {
    text: 'Coached sessions for every level, from a first slow jog to full match fitness. Training is free for members and led by ANSFA-certified coaches.',
    image: { src: '', alt: 'Circuit training on the club pitch' },
  },
  wealth: {
    text: 'Members save together in supervised circles, learn from monthly webinars and open doors for one another through the mentorship board. Group savings stand at ₦2.1M.',
    image: { src: '', alt: 'Members at a financial literacy session' },
  },
  lifestyle: {
    text: '22 eco projects so far: market clean-ups, tree planting and plastic collection across Awka. Alongside them, practical support for mental health and everyday wellbeing.',
    image: { src: '', alt: 'Tree planting on Amansea Road' },
  },
  civic: {
    text: 'Clear, non-partisan information so members can take part in civic life with confidence. The club does not endorse parties or candidates.',
    image: { src: '', alt: 'Community town hall meeting' },
  },
  awards: {
    text: 'Each month we honour the members who showed up most and gave most. September 2026 honourees are below.',
    image: { src: '', alt: 'Monthly recognition at the general meeting' },
  },
}

export const schedule = [
  { day: 'Monday', session: 'Morning jog, three pace groups', time: '6:00 AM', venue: 'Alex Ekwueme Square' },
  { day: 'Wednesday', session: 'Circuit training', time: '6:00 PM', venue: 'Club pitch, Zik Avenue' },
  { day: 'Friday', session: 'Five-a-side football', time: '6:00 PM', venue: 'Awka Township Stadium' },
  { day: 'Saturday', session: 'Long walk, jog and stretch', time: '6:30 AM', venue: 'Alex Ekwueme Square' },
  { day: 'Sunday', session: 'Recovery yoga and mobility', time: '4:00 PM', venue: 'Club Secretariat' },
]

export const fixtures = [
  { opponent: 'vs Amawbia Veterans FC', start: '2026-10-18T16:00:00+01:00', venue: 'Home' as const },
  { opponent: 'vs Nibo Old Boys', start: '2026-11-01T16:00:00+01:00', venue: 'Away' as const },
  { opponent: 'vs Okpuno Masters', start: '2026-11-15T16:00:00+01:00', venue: 'Home' as const },
]

// Dated items drop off (or close) on their own. Called from ISR renders, so
// reading the clock here is intended.
export function stillAhead<T extends { start: string }>(items: T[], now = Date.now()) {
  return items.filter((i) => new Date(i.start).getTime() > now)
}

export function hasPassed(iso: string, now = Date.now()) {
  return new Date(iso).getTime() < now
}

export const challenge = {
  tag: 'Fitness challenge',
  ends: '2026-10-31T23:59:00+01:00',
  title: 'October 100km Challenge',
  text: 'Walk, jog or cycle 100km before 31 October. Log distance at any session.',
  progressLabel: 'Club average',
  value: 62,
  max: 100,
  unit: 'km',
  participants: 148,
}

export const coachTip = {
  quote: '“Ten minutes of warm-up saves ten weeks of injury.”',
  by: 'Coach Kelechi Madu',
  // Add a PDF link to make each guide downloadable.
  guides: [
    { title: 'Eating for early training: akara, pap and fruit', href: '' },
    { title: 'Hydration guide for the harmattan season', href: '/blog/coach-tip-staying-hydrated-through-the-harmattan' },
  ],
}

export const savingsGroups = [
  { name: 'Ajo Circle A', members: '42 members', dues: '₦10,000 monthly', pool: '₦1.12M' },
  { name: 'Investment Club', members: '18 members', dues: '₦25,000 monthly', pool: '₦720K' },
  { name: 'Starter Pot', members: '30 members', dues: '₦5,000 monthly', pool: '₦260K' },
]

export const webinars = [
  { title: 'Smart savings for 2027', start: '2026-10-29T19:00:00+01:00', host: 'Amaka Nwosu' },
  { title: 'Starting a small business in Anambra', start: '2026-11-26T19:00:00+01:00', host: 'Chinedu Okafor' },
  { title: 'Understanding cooperative loans', start: '2026-12-17T19:00:00+01:00', host: 'Emeka Nnamdi' },
]

export const opportunities = [
  { type: 'Mentorship', title: 'Logistics mentor for two members', by: 'Okafor Logistics' },
  { type: 'Internship', title: 'Farm operations, three months', by: 'Nwosu Fresh Farms' },
  { type: 'Part-time', title: 'Weekend sales representative', by: 'Bello Fitness Gear' },
]

export type EcoStatus = 'Upcoming' | 'Ongoing' | 'Completed'

export const ecoProjects: { title: string; meta: string; status: EcoStatus }[] = [
  { title: 'Amansea Road tree planting', meta: 'Sat 24 Oct · 300 seedlings', status: 'Upcoming' },
  { title: 'Eke Awka market clean-up', meta: 'Sat 14 Nov · with market union', status: 'Upcoming' },
  { title: 'Plastic collection drive', meta: 'September · 420kg recycled', status: 'Completed' },
  { title: 'School garden, Community Primary School', meta: 'Weekly · since July', status: 'Ongoing' },
]

export const wellness = [
  { title: 'Monthly check-in circle', meta: 'Second Thursday, 6:30 PM. A confidential peer group led by a trained facilitator.' },
  { title: 'Counselling referral partner', meta: 'Free first session for members through our partner clinic in Awka.' },
  { title: 'Sleep and stress guide', meta: 'Two-page PDF from the Welfare Committee.' },
  { title: 'Health screening day', meta: 'Blood pressure and sugar checks, quarterly at the Secretariat.' },
]

// All three are covered by the voter card guide on the blog.
const voterGuide = '/blog/your-voter-card-explained-2027'
export const voterEducation = [
  { title: 'How to check your PVC status', meta: 'Step-by-step guide', href: voterGuide },
  { title: 'Key dates for the 2027 general elections', meta: 'Official timetable summary', href: voterGuide },
  { title: 'Finding your polling unit', meta: 'Awka South and Awka North', href: voterGuide },
]

export const poll = {
  question: 'Which community issue should the club focus on next quarter?',
  closes: '2026-10-31T23:59:00+01:00',
  responses: 214,
  options: [
    { label: 'Road safety near schools', percent: 38 },
    { label: 'Youth employment', percent: 31 },
    { label: 'Waste management', percent: 21 },
    { label: 'Public health outreach', percent: 10 },
  ],
}

export const campaigns = [
  { title: 'Safe Roads Awka', text: 'Requesting pedestrian crossings near four primary schools on Zik Avenue.', meta: '1,280 signatures' },
  { title: 'Clean Markets Initiative', text: 'Working with market unions on weekly waste collection points.', meta: 'In talks with 3 market unions' },
]

export const honourees = [
  { award: 'Top Attendee · Sept', name: 'Tunde Bello', note: '26 sessions attended' },
  { award: 'Top Attendee · Sept', name: 'Ngozi Okeke', note: '24 sessions attended' },
  { award: 'Top Attendee · Sept', name: 'Kelechi Madu', note: '23 sessions attended' },
  { award: 'Top Contributor · Sept', name: 'Amaka Nwosu', note: 'Led the savings circle drive' },
  { award: 'Top Contributor · Sept', name: 'Ifeoma Eze', note: 'Organised the plastic drive' },
  { award: 'Top Contributor · Sept', name: 'Chinedu Okafor', note: 'Mentored four members' },
]

export const programsCta = {
  title: 'Every pillar is open to every member.',
  text: 'Annual dues are ₦12,000. Training, webinars and eco projects are included.',
}
