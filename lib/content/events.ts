// Club calendar and gallery, from Events.dc.html (the homepage shows the next three).
// Start times are ISO 8601 with the Lagos offset (+01:00) so display and schema agree.
import { dateKey } from '../format'

export const eventCategories = ['Training', 'Matches', 'Eco-projects', 'Meetings', 'Socials'] as const
export type EventCategory = (typeof eventCategories)[number]

export type Venue =
  | { online?: false; label: string; name: string; street?: string; locality: string }
  | { online: true; label: string }

export type ClubEvent = {
  slug: string
  category: EventCategory
  title: string
  description: string
  start: string
  venue: Venue
  // Matches: both sides, for SportsEvent schema.
  match?: { home: string; away: string }
}

const CLUB = 'KeepFit Noble Friends Club'

export const events: ClubEvent[] = [
  {
    slug: 'saturday-fitness-walk-and-jog-2026-10-10',
    category: 'Training',
    title: 'Saturday Fitness Walk and Jog',
    description: 'Our signature 7km route with three pace groups. Beginners welcome, water provided.',
    start: '2026-10-10T06:30:00+01:00',
    venue: { label: 'Alex Ekwueme Square, Awka', name: 'Alex Ekwueme Square', locality: 'Awka' },
  },
  {
    slug: 'midweek-circuit-night-2026-10-14',
    category: 'Training',
    title: 'Midweek Circuit Night',
    description: 'Eight stations, 40 seconds each. Bring a towel and a friend.',
    start: '2026-10-14T18:00:00+01:00',
    venue: { label: 'Club pitch, Zik Avenue', name: 'KeepFit club pitch', street: 'Zik Avenue', locality: 'Awka' },
  },
  {
    slug: 'keepfit-vs-amawbia-veterans-fc-2026-10-18',
    category: 'Matches',
    title: 'KeepFit vs Amawbia Veterans FC',
    description: 'Home friendly in the ANSFA veterans calendar. Come support the squad.',
    start: '2026-10-18T16:00:00+01:00',
    venue: { label: 'Awka Township Stadium, Awka', name: 'Awka Township Stadium', locality: 'Awka' },
    match: { home: CLUB, away: 'Amawbia Veterans FC' },
  },
  {
    slug: 'amansea-road-tree-planting-2026-10-24',
    category: 'Eco-projects',
    title: 'Amansea Road Tree Planting',
    description: '300 seedlings along the school corridor with Anambra Green Initiative.',
    start: '2026-10-24T07:30:00+01:00',
    venue: { label: 'Amansea Road, Awka', name: 'Amansea Road', street: 'Amansea Road', locality: 'Awka' },
  },
  {
    slug: 'webinar-smart-savings-for-2027-2026-10-29',
    category: 'Meetings',
    title: 'Webinar: Smart Savings for 2027',
    description: 'Amaka Nwosu walks through budgeting, ajo circles and safe investment options.',
    start: '2026-10-29T19:00:00+01:00',
    venue: { online: true, label: 'Online, link sent on registration' },
  },
  {
    slug: 'nibo-old-boys-vs-keepfit-2026-11-01',
    category: 'Matches',
    title: 'Nibo Old Boys vs KeepFit',
    description: 'Away fixture. Club bus leaves the Secretariat at 2:30 PM.',
    start: '2026-11-01T16:00:00+01:00',
    venue: { label: 'Nibo Community Field', name: 'Nibo Community Field', locality: 'Nibo' },
    match: { home: 'Nibo Old Boys', away: CLUB },
  },
  {
    slug: 'monthly-general-meeting-2026-11-07',
    category: 'Meetings',
    title: 'Monthly General Meeting',
    description: 'Treasurer’s report, committee updates and September awards.',
    start: '2026-11-07T10:00:00+01:00',
    venue: { label: 'Club Secretariat, 14 Zik Avenue', name: 'KeepFit Club Secretariat', street: '14 Zik Avenue', locality: 'Awka' },
  },
  {
    slug: 'eke-awka-market-clean-up-2026-11-14',
    category: 'Eco-projects',
    title: 'Eke Awka Market Clean-up',
    description: 'Joint clean-up with the market union. Gloves and bags provided.',
    start: '2026-11-14T07:00:00+01:00',
    venue: { label: 'Eke Awka Market', name: 'Eke Awka Market', locality: 'Awka' },
  },
  {
    slug: 'voter-education-town-hall-2026-11-22',
    category: 'Meetings',
    title: 'Voter Education Town Hall',
    description: 'Non-partisan session on registration, PVC collection and polling units.',
    start: '2026-11-22T15:00:00+01:00',
    venue: { label: 'Awka Town Hall', name: 'Awka Town Hall', locality: 'Awka' },
  },
  {
    slug: 'end-of-year-fellowship-dinner-2026-11-28',
    category: 'Socials',
    title: 'End-of-Year Fellowship Dinner',
    description: 'Dinner, music and the 2026 member awards. Families welcome.',
    start: '2026-11-28T18:00:00+01:00',
    venue: { label: 'Kings Garden Event Centre, Awka', name: 'Kings Garden Event Centre', locality: 'Awka' },
  },
  {
    slug: 'year-end-fitness-test-2026-12-05',
    category: 'Training',
    title: 'Year-End Fitness Test',
    description: 'Beep test, push-ups and a 2.4km run. Compare with your January results.',
    start: '2026-12-05T06:30:00+01:00',
    venue: { label: 'Awka Township Stadium, Awka', name: 'Awka Township Stadium', locality: 'Awka' },
  },
  {
    slug: 'christmas-five-a-side-and-picnic-2026-12-19',
    category: 'Socials',
    title: 'Christmas Five-a-side and Picnic',
    description: 'Mixed teams, jollof and a children’s penalty shoot-out.',
    start: '2026-12-19T15:00:00+01:00',
    venue: { label: 'Club pitch, Zik Avenue', name: 'KeepFit club pitch', street: 'Zik Avenue', locality: 'Awka' },
  },
]

// Today's date in Lagos, e.g. "2026-10-08". Passed from the server to the
// calendar so server and browser render the same month.
export function clubToday(now = Date.now()) {
  return dateKey(new Date(now).toISOString())
}

// Events stay listed as upcoming until three hours after they start.
const LISTED_FOR_MS = 3 * 60 * 60 * 1000

export function isUpcoming(e: ClubEvent, now: number) {
  return new Date(e.start).getTime() + LISTED_FOR_MS > now
}

// Called from ISR renders (pages revalidate hourly), so reading the clock here is intended.
export function upcomingEvents(now = Date.now()) {
  return events.filter((e) => isUpcoming(e, now)).sort((a, b) => a.start.localeCompare(b.start))
}

// Every event with its Lagos calendar day, for the events calendar.
export type CalendarItem = { event: ClubEvent; day: string; ended: boolean }

export function calendarItems(now = Date.now()): CalendarItem[] {
  return events
    .map((event) => ({ event, day: dateKey(event.start), ended: !isUpcoming(event, now) }))
    .sort((a, b) => a.event.start.localeCompare(b.event.start))
}

export type GalleryItem = {
  category: EventCategory
  type: 'photo' | 'video'
  title: string
  date: string
  // A file in /public/images (photo) or a YouTube/MP4 URL (video).
  src?: string
}

export const gallery: GalleryItem[] = [
  { category: 'Training', type: 'photo', title: 'Dawn jog at Ekwueme Square', date: 'Sep 2026' },
  { category: 'Matches', type: 'video', title: 'Highlights vs Nibo Old Boys', date: 'Aug 2026' },
  { category: 'Eco-projects', type: 'photo', title: 'Plastic collection drive', date: 'Sep 2026' },
  { category: 'Meetings', type: 'photo', title: 'September general meeting', date: 'Sep 2026' },
  { category: 'Socials', type: 'photo', title: 'Independence Day picnic', date: 'Oct 2026' },
  { category: 'Training', type: 'video', title: 'Circuit night, eight stations', date: 'Sep 2026' },
  { category: 'Matches', type: 'photo', title: 'Squad photo, ANSFA veterans day', date: 'Jul 2026' },
  { category: 'Eco-projects', type: 'video', title: 'School garden time-lapse', date: 'Aug 2026' },
  { category: 'Training', type: 'photo', title: 'Recovery yoga session', date: 'Aug 2026' },
  { category: 'Socials', type: 'photo', title: 'Member birthday celebration', date: 'Jul 2026' },
  { category: 'Meetings', type: 'photo', title: 'Financial literacy webinar', date: 'Jun 2026' },
  { category: 'Eco-projects', type: 'photo', title: 'Tree planting, first 100 seedlings', date: 'Jun 2026' },
]
