import { site } from './site'

// Sends a form submission to the club by email through Resend (resend.com).
//
// Environment variables:
//   RESEND_API_KEY     API key from resend.com
//   FORMS_FROM_EMAIL   verified sender, e.g. "KeepFit website <forms@keepfitnoble.ng>"
//   FORMS_TO_EMAIL     inbox that receives submissions (defaults to the club email)
//   FORMS_PREVIEW=1    show the success screen without sending (local preview)
//
// In `next dev` and preview mode nothing is sent and the result says so. In
// production without a key, forms tell the visitor to call or email instead,
// so no registration is silently lost.

export type DeliveryResult = { ok: true; simulated: boolean } | { ok: false; reason: 'not-configured' | 'failed' }

export async function deliver({
  subject,
  replyTo,
  fields,
}: {
  subject: string
  replyTo?: string
  fields: [label: string, value: string | string[]][]
}): Promise<DeliveryResult> {
  const body = fields
    .map(([label, value]) => `${label}: ${Array.isArray(value) ? value.join(', ') || '-' : value || '-'}`)
    .join('\n')

  const key = process.env.RESEND_API_KEY
  const from = process.env.FORMS_FROM_EMAIL
  const to = process.env.FORMS_TO_EMAIL || site.email
  const preview = process.env.FORMS_PREVIEW === '1' || process.env.NODE_ENV === 'development'

  if (!key || !from) {
    if (preview) {
      console.info(`[forms] preview, not sent: ${subject}\n${body}`)
      return { ok: true, simulated: true }
    }
    console.error('[forms] RESEND_API_KEY / FORMS_FROM_EMAIL not set; submission not delivered:', subject)
    return { ok: false, reason: 'not-configured' }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], subject, text: `${body}\n\nSent from ${site.url}`, ...(replyTo ? { reply_to: replyTo } : {}) }),
    })
    if (!res.ok) {
      console.error('[forms] Resend error', res.status, await res.text())
      return { ok: false, reason: 'failed' }
    }
    return { ok: true, simulated: false }
  } catch (err) {
    console.error('[forms] delivery failed', err)
    return { ok: false, reason: 'failed' }
  }
}

export function deliveryError(result: Extract<DeliveryResult, { ok: false }>) {
  const fallback = `call ${site.phone.display} or email ${site.email}`
  return result.reason === 'not-configured'
    ? `Online forms aren't switched on yet. Please ${fallback}.`
    : `Something went wrong sending this. Please try again, or ${fallback}.`
}
