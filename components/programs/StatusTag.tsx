import Tag, { type TagTone } from '@/components/ui/Tag'
import type { EcoStatus } from '@/lib/content/programs'

const tone: Record<EcoStatus, TagTone> = { Upcoming: 'navy', Completed: 'cloud', Ongoing: 'red' }

export default function StatusTag({ status }: { status: EcoStatus }) {
  return <Tag tone={tone[status]}>{status}</Tag>
}
