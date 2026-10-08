import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { site } from './site'

// Branded 1200x630 social card shared by the site-wide and per-post images.
export const ogSize = { width: 1200, height: 630 }

const assets = Promise.all([
  readFile(join(process.cwd(), 'public/images/crest-512.png'), 'base64'),
  // Poppins (SIL OFL, see assets/fonts/OFL.txt). ImageResponse needs TTF/OTF, not woff2.
  readFile(join(process.cwd(), 'assets/fonts/Poppins-Bold.ttf')),
  readFile(join(process.cwd(), 'assets/fonts/Poppins-Medium.ttf')),
  // Poppins has no naira sign (₦); Noto Sans (SIL OFL) fills in missing glyphs.
  readFile(join(process.cwd(), 'assets/fonts/NotoSans-Bold.ttf')),
])

export async function ogCard({ eyebrow, title, subtitle, footer }: { eyebrow: string; title: string; subtitle?: string; footer: string }) {
  const [crestB64, bold, medium, noto] = await assets
  const crest = `data:image/png;base64,${crestB64}`
  const titleSize = title.length > 60 ? 52 : title.length > 36 ? 60 : 68
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          padding: '0 88px',
          background: 'linear-gradient(135deg, #182236 0%, #24324F 60%, #3E5278 100%)',
          color: '#FFFFFF',
          fontFamily: 'Poppins',
          fontWeight: 500,
        }}
      >
        {/* ImageResponse renders plain <img>; next/image does not apply here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={crest} width={300} height={300} alt="" style={{ borderRadius: 150, boxShadow: '0 20px 60px rgba(5,10,20,0.5)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, flex: 1 }}>
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', color: '#C9D2E0' }}>{eyebrow}</div>
          <div style={{ display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.08 }}>{title}</div>
          {subtitle && <div style={{ display: 'flex', fontSize: 30, lineHeight: 1.3, color: '#DCE2EC' }}>{subtitle}</div>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8, fontSize: 24, color: '#FFFFFF' }}>
            <div style={{ display: 'flex', width: 48, height: 6, borderRadius: 3, background: '#D42821' }} />
            {footer}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Poppins', data: medium, weight: 500, style: 'normal' },
        { name: 'Poppins', data: bold, weight: 700, style: 'normal' },
        { name: 'Noto Sans', data: noto, weight: 700, style: 'normal' },
      ],
    },
  )
}

export const ogFooter = `${site.address.city}, ${site.address.region}`
