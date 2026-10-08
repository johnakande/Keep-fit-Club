import { pillars, stats } from '@/lib/content/club'
import { upcomingEvents } from '@/lib/content/events'
import { membership } from '@/lib/content/join'
import { sortedPosts } from '@/lib/content/posts'
import { schedule } from '@/lib/content/programs'
import { eventWhen } from '@/lib/format'
import { pages } from '@/lib/pages'
import { absoluteUrl, site } from '@/lib/site'

// Plain-text club summary for AI assistants. Google ignores llms.txt; other AI
// tools may read it. Built from the same content as the pages, so it can't drift.
export const revalidate = 3600

export function GET() {
  const events = upcomingEvents()
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description} Founded in ${site.founded}. Motto: ${site.motto} ("to be humble").`,
    '',
    '## Key facts',
    `- Location: ${site.address.name}, ${site.address.street}, ${site.address.city}, ${site.address.region}, Nigeria`,
    `- Founded: ${site.founded}, by eleven friends jogging at Alex Ekwueme Square`,
    ...stats.map((s) => `- ${s.label}: ${s.value}`),
    `- Affiliation: verified partner club of the ${site.affiliation} (registration no. ${site.ansfaRegistration})`,
    `- Membership: ${membership.text} Annual dues ${site.dues.label}.`,
    `- Political neutrality: the club does not endorse parties or candidates`,
    `- Phone: ${site.phone.display} (${site.phone.hours})`,
    `- Email: ${site.email}; sponsorship: ${site.partnersEmail}`,
    '',
    '## Programs',
    ...pillars.map((p) => `- ${p.title}: ${p.summary}`),
    '',
    '## Weekly training schedule',
    ...schedule.map((s) => `- ${s.day}, ${s.time}: ${s.session} (${s.venue})`),
    '',
    '## Upcoming events',
    ...(events.length
      ? events.map((e) => `- ${eventWhen(e.start).full}: ${e.title}, ${e.venue.label}. ${e.description}`)
      : ['- No events scheduled right now.']),
    '',
    '## Pages',
    ...pages.map((p) => `- [${p.name}](${absoluteUrl(p.path)}): ${p.summary}`),
    '',
    '## Blog posts',
    ...sortedPosts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.excerpt}`),
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
