'use client'

import { useActionState, useState } from 'react'
import { submitJoin } from '@/app/actions'
import { Button, ButtonLink } from '@/components/ui/Button'
import { joinOptions } from '@/lib/content/join'
import { initialFormState } from '@/lib/forms'
import { ChipCheckboxes, FormAlert, Honeypot, SelectField, SubmitButton, SuccessPanel, TextField } from './Fields'
import styles from './Forms.module.css'

// Remounting with a new key resets the form after "Register someone else".
export default function JoinForm() {
  const [round, setRound] = useState(0)
  return <JoinFormBody key={round} onReset={() => setRound((r) => r + 1)} />
}

function JoinFormBody({ onReset }: { onReset: () => void }) {
  const [state, action] = useActionState(submitJoin, initialFormState)

  if (state.status === 'success') {
    return (
      <SuccessPanel
        title={`Welcome, ${state.firstName}.`}
        simulated={state.simulated}
        actions={
          <>
            <ButtonLink href="/events" variant="dark">
              See upcoming sessions
            </ButtonLink>
            <Button variant="secondary" onClick={onReset}>
              Register someone else
            </Button>
          </>
        }
      >
        <p>
          Your registration is in. Our Membership Secretary will call {state.phone} within two working days with dues details and your first
          session.
        </p>
      </SuccessPanel>
    )
  }

  const v = state.values ?? {}
  const str = (k: string) => (typeof v[k] === 'string' ? (v[k] as string) : undefined)
  const arr = (k: string) => (Array.isArray(v[k]) ? (v[k] as string[]) : [])
  const bad = (k: string) => state.invalid?.includes(k)

  return (
    <form action={action} noValidate className={styles.form}>
      <Honeypot />
      <TextField label="Full name" name="name" autoComplete="name" placeholder="e.g. Chinedu Okafor" defaultValue={str('name')} invalid={bad('name')} required full />
      <TextField label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="+234 803 000 0000" defaultValue={str('phone')} invalid={bad('phone')} required />
      <TextField label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" defaultValue={str('email')} invalid={bad('email')} required />
      <SelectField label="Location" name="location" options={joinOptions.locations} defaultValue={str('location') ?? 'Awka'} full />
      <ChipCheckboxes legend="Fitness goals" name="goals" options={joinOptions.goals} defaultValues={arr('goals')} />
      <TextField label="Skills you could share" name="skills" optional placeholder="e.g. Accounting, first aid, photography" defaultValue={str('skills')} full />
      <ChipCheckboxes legend="Interests" name="interests" options={joinOptions.interests} defaultValues={arr('interests')} />
      {state.status === 'error' && <FormAlert>{state.message}</FormAlert>}
      <SubmitButton>Submit registration</SubmitButton>
    </form>
  )
}
