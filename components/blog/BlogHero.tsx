import PageHero from '@/components/ui/PageHero'
import SectionTabs from '@/components/ui/SectionTabs'

const tabs = [
  { id: 'blog', label: 'Club Blog and News', href: '/blog' },
  { id: 'market', label: 'Member Marketplace', href: '/marketplace' },
]

// Shared hero for the blog, its articles and the marketplace.
export default function BlogHero({ active, titleAs = 'h1' }: { active: 'blog' | 'market'; titleAs?: 'h1' | 'p' }) {
  return (
    <PageHero
      eyebrow="Blog and marketplace"
      title="Club news, and the businesses behind our members."
      titleAs={titleAs}
      tabs={<SectionTabs label="Sections" items={tabs} active={active} />}
    />
  )
}
