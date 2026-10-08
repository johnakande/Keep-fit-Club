// Blog posts, from Blog.dc.html. Each post gets its own page at /blog/<slug>.

export const postCategories = ['Fitness', 'Wealth', 'Sustainability', 'Civic Voice', 'Matches', 'Wellbeing'] as const
export type PostCategory = (typeof postCategories)[number]

export type Post = {
  slug: string
  category: PostCategory
  title: string
  // One-sentence summary for cards, meta descriptions and schema.
  excerpt: string
  date: string
  author: string
  coverAlt: string
  coverSrc?: string
  body: string[]
}

export const posts: Post[] = [
  {
    slug: 'how-48-sessions-a-month-changed-our-members-mornings',
    category: 'Fitness',
    title: 'How 48 sessions a month changed our members’ mornings',
    excerpt: 'More sessions gave members more choice, and the ones who booked two fixed sessions a week kept training.',
    date: '2026-09-28',
    author: 'Tunde Bello',
    coverAlt: 'Early-morning jog group',
    body: [
      'When we started in 2022 there was one session a week. Today the calendar holds 48 a month, and the change is less about volume than about choice: a nurse coming off a night shift can make Sunday yoga, a trader can make the Wednesday circuit.',
      'We asked 60 regulars what changed after six months. Most mentioned sleep first, then energy at work. A few mentioned blood pressure readings their doctors were pleased with.',
      'The harder lesson was consistency. Members who booked two fixed sessions a week were far more likely to still be training a year later than those who came "when free".',
      'If you are new, pick two sessions from the schedule and treat them like appointments. The coaches will handle the rest.',
    ],
  },
  {
    slug: 'inside-our-savings-circle',
    category: 'Wealth',
    title: 'Inside our savings circle: ₦2.1M and counting',
    excerpt: 'How the club’s three savings groups work, and what members did with their payouts this month.',
    date: '2026-09-21',
    author: 'Amaka Nwosu',
    coverAlt: 'Savings group meeting',
    body: [
      'Our three savings groups now hold ₦2.1M between them. Every contribution is logged by the Finance Committee and reported at the monthly general meeting.',
      'Ajo Circle A rotates payouts among 42 members. The Investment Club pools funds into low-risk instruments chosen by vote. The Starter Pot exists for members who want to begin with ₦5,000 a month.',
      'This month two members used their payout to restock market stalls ahead of the festive season. Another cleared school fees in one go.',
      'Join a circle at the next general meeting. Bring a valid ID and your membership number.',
    ],
  },
  {
    slug: '22-eco-projects-what-cleaning-up-awka-taught-us',
    category: 'Sustainability',
    title: '22 eco projects later: what cleaning up Awka taught us',
    excerpt: 'From nine bags at the first clean-up to 420kg of plastic in September, and why working with market unions matters.',
    date: '2026-09-14',
    author: 'Ifeoma Eze',
    coverAlt: 'Market clean-up',
    body: [
      'Our first clean-up drew eleven people and filled nine bags. The September plastic drive collected 420kg for recycling.',
      'The biggest shift came from working with market unions instead of around them. When traders choose the collection points, the points get used.',
      'Next up is tree planting along Amansea Road on 24 October. Gloves, seedlings and breakfast are provided.',
    ],
  },
  {
    slug: 'your-voter-card-explained-2027',
    category: 'Civic Voice',
    title: 'Your voter card, explained: dates and documents for 2027',
    excerpt: 'How to check your PVC status, transfer your registration and find collection points in Awka South and Awka North.',
    date: '2026-09-07',
    author: 'Obinna Okonkwo',
    coverAlt: 'Voter education session',
    body: [
      'This guide covers how to check your PVC status, what to bring if you need to transfer your registration, and where collection points are in Awka South and Awka North.',
      'The club does not endorse any party or candidate. Our aim is that every member who wants to vote is able to.',
      'Our next voter education town hall is on 22 November at Awka Town Hall.',
    ],
  },
  {
    slug: 'match-report-keepfit-2-1-nibo-veterans',
    category: 'Matches',
    title: 'Match report: KeepFit 2–1 Nibo Veterans',
    excerpt: 'A second-half header from Emeka Nnamdi sealed a hard-fought home win.',
    date: '2026-08-31',
    author: 'Kelechi Madu',
    coverAlt: 'Match day squad',
    body: [
      'A second-half header from Emeka Nnamdi sealed a hard-fought win in front of a loud home crowd.',
      'Nibo pressed early and led at the break, but a switch to a back three settled the game. Ikenna Udeh equalised on 58 minutes.',
      'The return fixture is away on 1 November. The club bus leaves the Secretariat at 2:30 PM.',
    ],
  },
  {
    slug: 'coach-tip-staying-hydrated-through-the-harmattan',
    category: 'Wellbeing',
    title: 'Coach’s tip: staying hydrated through the harmattan',
    excerpt: 'Dry harmattan air dehydrates you even when you don’t feel hot. Here is how much to drink and what to watch for.',
    date: '2026-08-24',
    author: 'Ngozi Okeke',
    coverAlt: 'Water station at training',
    body: [
      'Dry harmattan air pulls moisture from your body even when you do not feel hot. Drink before you are thirsty.',
      'Aim for a glass of water before every session and small sips every fifteen minutes during it. Zobo without added sugar counts.',
      'Watch for headaches and dark urine. Both are early signs you need more fluids.',
    ],
  },
]

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

// Reading time from the real text (about 200 words a minute), so it stays honest
// as posts grow.
export function readMinutes(post: Post) {
  const words = post.body.join(' ').split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function wordCount(post: Post) {
  return post.body.join(' ').split(/\s+/).length
}
