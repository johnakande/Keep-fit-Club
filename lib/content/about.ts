// About page copy, from About.dc.html.

export const aboutHero = {
  eyebrow: 'About the club',
  title: 'Friends first. Fitness always. Humble by design.',
  lead: 'Founded in Awka in 2022, KeepFit Noble Friends Club brings people together around exercise, fellowship and service to Anambra State.',
}

export const story = {
  eyebrow: 'Our story',
  title: 'Eleven friends, one Saturday jog',
  paragraphs: [
    'In early 2022, eleven friends started meeting at dawn to jog around Alex Ekwueme Square. Within months the group had a name, a football side and a savings circle. By the end of the first year, more than a hundred people were turning up.',
    'Today the club has 312 active members, runs 48 sessions a month and is a verified partner club of the Anambra State Football Association. Our motto, Humilem Esse, means "to be humble". It reminds us that nobody here is above the warm-up.',
  ],
  image: { src: '', alt: 'Founding members at Alex Ekwueme Square, 2022' },
}

export const vision = 'A healthy, prosperous and engaged community where every member is fit to lead.'
export const mission = 'To build fitness, wealth and wellbeing through fellowship, and to give our members a clear voice in civic life.'

export const values = [
  { number: '01', title: 'Humility', text: 'Humilem Esse. Titles stay at the gate; everyone trains, everyone serves.' },
  { number: '02', title: 'Discipline', text: 'We show up on time, in season and out of season.' },
  { number: '03', title: 'Fellowship', text: 'We look out for one another on the pitch and beyond it.' },
  { number: '04', title: 'Integrity', text: 'Every naira saved or donated is recorded and reported.' },
  { number: '05', title: 'Service', text: 'Our fitness is for our community, not just ourselves.' },
  { number: '06', title: 'Inclusion', text: 'Every age, every fitness level, every background.' },
]

export const constitution = {
  eyebrow: 'Governance',
  title: 'Constitution summary',
  text: 'Adopted at the inaugural general meeting in 2022 and amended in 2024. The full document sets out membership, elections, finances and discipline.',
  // Put the PDF in /public/docs and set href to show the download button.
  pdf: { href: '', pages: 24, size: '1.2 MB', amended: 'June 2024' },
  articles: [
    { number: 'Art. 1', title: 'Name, motto and objectives', text: 'Establishes the club, its motto and its five pillars.' },
    { number: 'Art. 3', title: 'Membership', text: 'Open to residents aged 18 and above. Annual dues of ₦12,000.' },
    { number: 'Art. 5', title: 'Executive council', text: 'Eight elected officers serving a two-year term, renewable once.' },
    { number: 'Art. 7', title: 'Finances', text: 'Quarterly reports to members and an independent annual audit.' },
    { number: 'Art. 9', title: 'Political neutrality', text: 'The club does not endorse parties or candidates.' },
    { number: 'Art. 11', title: 'Discipline and amendments', text: 'Grievance process and a two-thirds vote for changes.' },
  ],
}

export const ansfa = {
  title: 'In affiliation with the Anambra State Football Association',
  badge: 'Verified Partner Club',
  // Set to a file in /public/images when ANSFA's crest is approved for use.
  crestSrc: '',
  facts: [
    { title: 'Registered since 2023', text: 'Club registration no. ANSFA/VC/2023/041.' },
    { title: 'Veterans league', text: 'Our squad plays sanctioned fixtures in the ANSFA veterans calendar.' },
    { title: 'Certified coaching', text: 'Two club coaches hold ANSFA grassroots coaching certificates.' },
  ],
}

export type ExecutiveTerm = {
  title: string
  years: string
  people: { name: string; role: string; photo?: string }[]
}

export const executiveTerms: ExecutiveTerm[] = [
  {
    title: 'Second Executive Term',
    years: '2024 to 2025',
    people: [
      { name: 'Chinedu Okafor', role: 'President' },
      { name: 'Amaka Nwosu', role: 'Vice President' },
      { name: 'Tunde Bello', role: 'General Secretary' },
      { name: 'Ifeoma Eze', role: 'Financial Secretary' },
      { name: 'Emeka Nnamdi', role: 'Treasurer' },
      { name: 'Kelechi Madu', role: 'Director of Sports' },
    ],
  },
  {
    title: 'Pioneer Executive Term',
    years: '2022 to 2023',
    people: [
      { name: 'Uche Anyanwu', role: 'Pioneer President' },
      { name: 'Adaeze Okoro', role: 'Vice President' },
      { name: 'Chinedu Okafor', role: 'General Secretary' },
      { name: 'Nkem Ibe', role: 'Financial Secretary' },
      { name: 'Somto Chukwu', role: 'Treasurer' },
      { name: 'Ikenna Udeh', role: 'Director of Sports' },
    ],
  },
]

export const committees = {
  eyebrow: '2026 to 2027',
  title: 'Current committee officials',
  rows: [
    { name: 'Sports and Fitness', chair: 'Kelechi Madu', members: 14 },
    { name: 'Finance and Investment', chair: 'Emeka Nnamdi', members: 9 },
    { name: 'Welfare', chair: 'Ngozi Okeke', members: 11 },
    { name: 'Environment and Sustainability', chair: 'Ifeoma Eze', members: 12 },
    { name: 'Civic and Advocacy', chair: 'Obinna Okonkwo', members: 7 },
    { name: 'Media and Publicity', chair: 'Chiamaka Obi', members: 8 },
    { name: 'Events and Social', chair: 'Adaeze Okoro', members: 10 },
    { name: 'Disciplinary', chair: 'Barr. Somto Chukwu', members: 5 },
  ],
}
