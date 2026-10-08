// Every public page, for the sitemap and llms.txt. When a page ships, add it
// here. Change `updated` only when the page's content really changes; fake
// freshness is a spam signal.

export const pages = [
  { path: '/', name: 'Home', updated: '2026-10-08', priority: 1, summary: 'Club overview, five program pillars, the next events, latest news and sponsors.' },
  { path: '/about', name: 'About the club', updated: '2026-10-08', priority: 0.8, summary: 'Founding story, vision, mission, core values, constitution summary, ANSFA affiliation, past executives and committee chairs.' },
  { path: '/programs', name: 'Programs', updated: '2026-10-08', priority: 0.9, summary: 'Weekly training schedule, match fixtures, savings groups, webinars, eco projects, wellness, voter education, member poll and monthly awards.' },
  { path: '/events', name: 'Events and gallery', updated: '2026-10-08', priority: 0.9, summary: 'Month calendar of training, matches, eco projects, meetings and socials, plus photos and videos.' },
  { path: '/blog', name: 'Club blog and news', updated: '2026-10-08', priority: 0.7, summary: 'Posts by club members on fitness, savings, sustainability, civic life, matches and wellbeing.' },
  { path: '/marketplace', name: 'Member marketplace', updated: '2026-10-08', priority: 0.6, summary: 'Businesses run by registered club members, with owners and phone numbers.' },
  { path: '/join', name: 'Join, donate or contact', updated: '2026-10-08', priority: 0.9, summary: 'Membership registration (₦12,000 a year), donations, sponsorship tiers and contact details.' },
] as const
