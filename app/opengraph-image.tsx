import { ogCard, ogFooter } from '@/lib/og'
import { site } from '@/lib/site'

export const alt = `${site.name}, a fitness and fellowship club in Awka, Anambra State`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return ogCard({
    eyebrow: `${site.motto} · Est. ${site.founded}`,
    title: site.name,
    subtitle: 'A fitter body, a stronger circle, a louder voice.',
    footer: ogFooter,
  })
}
