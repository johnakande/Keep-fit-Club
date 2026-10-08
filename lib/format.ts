import { site } from './site'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Read the wall-clock parts in Lagos time, whatever timezone the server runs in.
function partsInClubTime(iso: string) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: site.timeZone,
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  const parts = Object.fromEntries(fmt.formatToParts(new Date(iso)).map((p) => [p.type, p.value]))
  const monthIndex = Number(parts.month) - 1
  return {
    weekday: parts.weekday,
    day: parts.day,
    monthIndex,
    month: MONTHS[monthIndex],
    year: parts.year,
    time: `${parts.hour}:${parts.minute} ${parts.dayPeriod}`,
  }
}

// "Sat 10 Oct · 6:30 AM" for cards, "Sat 10 Oct 2026, 6:30 AM WAT" where the
// text stands alone (llms.txt), plus the calendar-badge parts.
export function eventWhen(iso: string) {
  const p = partsInClubTime(iso)
  return {
    badgeMonth: p.month.toUpperCase(),
    badgeDay: p.day,
    label: `${p.weekday} ${p.day} ${p.month} · ${p.time}`,
    full: `${p.weekday} ${p.day} ${p.month} ${p.year}, ${p.time} WAT`,
  }
}

// "Thu 29 Oct, 7:00 PM"
export function dayTime(iso: string) {
  const p = partsInClubTime(iso)
  return `${p.weekday} ${p.day} ${p.month}, ${p.time}`
}

// "31 Oct"
export function dayMonth(iso: string) {
  const p = partsInClubTime(iso)
  return `${p.day} ${p.month}`
}

// "2026-10-10": the Lagos calendar day an event falls on.
export function dateKey(iso: string) {
  const p = partsInClubTime(iso)
  return `${p.year}-${String(p.monthIndex + 1).padStart(2, '0')}-${p.day.padStart(2, '0')}`
}

// "Saturday 10 October" from a YYYY-MM-DD key.
export function longDay(key: string) {
  const [y, m, d] = key.split('-').map(Number)
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  return `${DAYS_LONG[weekday]} ${d} ${MONTHS_LONG[m - 1]}`
}

export function monthName(monthIndex: number) {
  return MONTHS_LONG[monthIndex]
}

export function monthShort(monthIndex: number) {
  return MONTHS[monthIndex]
}

// "28 Sep 2026" from a plain YYYY-MM-DD date.
export function postDate(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

// "₦10,000"
export function naira(amount: number) {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`
}

export function initials(name: string) {
  const words = name.replace(/^(Barr|Dr|Mr|Mrs|Ms|Chief|Engr)\.?\s+/i, '').split(/\s+/)
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase()
}
