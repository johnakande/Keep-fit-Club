// Join, donate and contact copy, from Join.dc.html.

export const joinHero = {
  eyebrow: 'Join, donate, contact',
  title: 'Your first session is this Saturday.',
  lead: 'Register below and the Membership Secretary will call you within two days. Annual dues are ₦12,000.',
  chips: [
    { label: 'Join Now', href: '#join' },
    { label: 'Donate or sponsor', href: '#donate' },
    { label: 'Contact', href: '#contact' },
  ],
}

export const membership = {
  eyebrow: 'Membership',
  title: 'Join Now',
  text: 'Open to anyone aged 18 and above living in or around Anambra State. No fitness level required.',
  benefits: [
    'All 48 monthly training sessions',
    'Access to savings circles and webinars',
    'A free listing in the member marketplace',
    'A vote at every general meeting',
  ],
}

export const joinOptions = {
  locations: [
    { value: 'Awka', label: 'Awka' },
    { value: 'Onitsha', label: 'Onitsha' },
    { value: 'Nnewi', label: 'Nnewi' },
    { value: 'Ekwulobia', label: 'Ekwulobia' },
    { value: 'Amawbia', label: 'Amawbia' },
    { value: 'Other', label: 'Elsewhere in Anambra' },
  ],
  goals: ['Lose weight', 'Build strength', 'Improve stamina', 'Play football', 'Stay active'],
  interests: ['Fitness and Sport', 'Wealth Creation', 'Lifestyle and Sustainability', 'Civic Voice', 'Volunteering'],
}

export const donate = {
  title: 'Donate',
  text: 'Donations fund seedlings, match kits and free health screenings. Every naira is reported at the general meeting.',
  amounts: [5000, 10000, 25000, 50000],
  defaultAmount: 10000,
  methods: [
    { id: 'momo', label: 'Mobile money', sub: 'MoMo, OPay, PalmPay' },
    { id: 'card', label: 'Card', sub: 'Visa, Mastercard, Verve' },
    { id: 'bank', label: 'Bank transfer', sub: 'Direct to club account' },
  ],
}

export const sponsorship = {
  tag: 'Partnerships',
  title: 'Become a sponsor',
  text: 'Put your brand in front of 312 active members and thousands of event visitors across Awka each year.',
  tiers: [
    { name: 'Event partner', perks: 'Logo on one event, social mention', price: 'from ₦150K' },
    { name: 'Season sponsor', perks: 'Kit branding, website and fixtures', price: 'from ₦750K' },
    { name: 'Pillar partner', perks: 'Name a programme for a full year', price: 'from ₦2M' },
  ],
  cta: 'Request the sponsor pack',
}

export const contact = {
  eyebrow: 'Get in touch',
  title: 'Contact',
  subjects: ['General enquiry', 'Membership', 'Sponsorship and partnerships', 'Marketplace listing', 'Media and press'],
}
