'use client'

import { useActionState, useState } from 'react'
import { sendMessage } from '@/app/actions'
import { Button } from '@/components/ui/Button'
import { contact } from '@/lib/content/join'
import { initialFormState } from '@/lib/forms'
import { FormAlert, Honeypot, SelectField, SubmitButton, SuccessPanel, TextAreaField, TextField } from './Fields'
import styles from './Forms.module.css'

const subjects = contact.subjects.map((s) => ({ value: s, label: s }))

export default function ContactForm() {
  const [round, setRound] = useState(0)
  return <ContactFormBody key={round} onReset={() => setRound((r) => r + 1)} />
}

function ContactFormBody({ onReset }: { onReset: () => void }) {
  const [state, action] = useActionState(sendMessage, initialFormState)

  if (state.status === 'success') {
    return (
      <SuccessPanel
        compact
        title="Message sent."
        simulated={state.simulated}
        actions={
          <Button variant="secondary" onClick={onReset}>
            Send another
          </Button>
        }
      >
        <p>The Secretariat replies within two working days.</p>
      </SuccessPanel>
    )
  }

  const v = state.values ?? {}
  const str = (k: string) => (typeof v[k] === 'string' ? (v[k] as string) : undefined)
  const bad = (k: string) => state.invalid?.includes(k)

  return (
    <form action={action} noValidate className={[styles.form, styles.narrowCols].join(' ')}>
      <Honeypot />
      <TextField label="Name" name="name" autoComplete="name" defaultValue={str('name')} invalid={bad('name')} required />
      <TextField label="Email" name="email" type="email" autoComplete="email" defaultValue={str('email')} invalid={bad('email')} required />
      <SelectField label="Subject" name="subject" options={subjects} defaultValue={str('subject')} full />
      <TextAreaField label="Message" name="message" defaultValue={str('message')} invalid={bad('message')} required />
      {state.status === 'error' && <FormAlert>{state.message}</FormAlert>}
      <SubmitButton variant="dark">Send message</SubmitButton>
    </form>
  )
}
