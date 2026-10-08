'use client'

import { useActionState, useState } from 'react'
import { registerInterest } from '@/app/actions'
import { Button } from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { initialFormState } from '@/lib/forms'
import { FormAlert, Honeypot, SubmitButton, TextField } from './Fields'
import styles from './Forms.module.css'

// "Register Interest" opens a two-field form inside the event card, so the
// club actually receives the name and number (the design's toggle sent nothing).
export default function EventInterest({ slug, title }: { slug: string; title: string }) {
  const [open, setOpen] = useState(false)
  const [state, action] = useActionState(registerInterest, initialFormState)

  if (state.status === 'success') {
    return (
      <p role="status" className={styles.registered}>
        <Icon name="check" size={18} strokeWidth={2} />
        Interest registered
        {state.simulated && <span className={styles.registeredNote}>Preview: not sent</span>}
      </p>
    )
  }

  if (!open) {
    return (
      <Button variant="dark" block onClick={() => setOpen(true)} aria-expanded={false}>
        Register Interest<span className="sr-only">: {title}</span>
      </Button>
    )
  }

  const v = state.values ?? {}
  const str = (k: string) => (typeof v[k] === 'string' ? (v[k] as string) : undefined)
  const bad = (k: string) => state.invalid?.includes(k)

  return (
    <form action={action} noValidate className={styles.interest} aria-label={`Register interest: ${title}`}>
      <input type="hidden" name="event" value={slug} />
      <Honeypot />
      {/* The visitor just asked for this form, so moving focus into it is expected. */}
      <TextField label="Your name" name="name" autoComplete="name" defaultValue={str('name')} invalid={bad('name')} autoFocus required full />
      <TextField label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="+234 803 000 0000" defaultValue={str('phone')} invalid={bad('phone')} required full />
      {state.status === 'error' && <FormAlert>{state.message}</FormAlert>}
      <div className={styles.interestActions}>
        <SubmitButton variant="dark" size="md">
          Send
        </SubmitButton>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
