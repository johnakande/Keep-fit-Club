'use client'

import { useFormStatus } from 'react-dom'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { Button } from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { HONEYPOT } from '@/lib/forms'
import styles from './Fields.module.css'

type Base = {
  label: string
  name: string
  invalid?: boolean
  optional?: boolean
  // Span the full width of the form grid.
  full?: boolean
}

function Label({ label, optional }: { label: string; optional?: boolean }) {
  return (
    <span className={styles.label}>
      {label} {optional && <span className={styles.optional}>(optional)</span>}
    </span>
  )
}

export function TextField({
  label,
  name,
  invalid,
  optional,
  full,
  ...input
}: Base & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>) {
  return (
    <label className={[styles.field, full && styles.full].filter(Boolean).join(' ')}>
      <Label label={label} optional={optional} />
      <input name={name} className={styles.control} aria-invalid={invalid || undefined} {...input} />
    </label>
  )
}

export function TextAreaField({ label, name, invalid, optional, full = true, ...area }: Base & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>) {
  return (
    <label className={[styles.field, full && styles.full].filter(Boolean).join(' ')}>
      <Label label={label} optional={optional} />
      <textarea name={name} className={[styles.control, styles.area].join(' ')} aria-invalid={invalid || undefined} rows={5} {...area} />
    </label>
  )
}

export function SelectField({
  label,
  name,
  options,
  full,
  ...select
}: Base & { options: { value: string; label: string }[] } & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'>) {
  return (
    <label className={[styles.field, full && styles.full].filter(Boolean).join(' ')}>
      <Label label={label} />
      <select name={name} className={[styles.control, styles.select].join(' ')} {...select}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

// Multi-choice pills backed by real checkboxes, so they submit with the form.
export function ChipCheckboxes({ legend, name, options, defaultValues = [] }: { legend: string; name: string; options: string[]; defaultValues?: string[] }) {
  return (
    <fieldset className={[styles.fieldset, styles.full].join(' ')}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.chips}>
        {options.map((o) => (
          <label key={o} className={styles.chip}>
            <input type="checkbox" name={name} value={o} defaultChecked={defaultValues.includes(o)} className={styles.chipInput} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className={[styles.alert, styles.full].join(' ')}>
      {children}
    </div>
  )
}

// Off-screen field that only bots fill in.
export function Honeypot() {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label>
        Leave this empty
        <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}

export function SubmitButton({
  children,
  pendingLabel = 'Sending…',
  variant = 'primary',
  size = 'xl',
}: {
  children: ReactNode
  pendingLabel?: string
  variant?: 'primary' | 'dark'
  size?: 'md' | 'xl'
}) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant={variant} size={size} block={size === 'xl'} disabled={pending} className={size === 'xl' ? styles.full : undefined}>
      {pending ? pendingLabel : children}
    </Button>
  )
}

export function SuccessPanel({
  title,
  children,
  actions,
  simulated,
  compact = false,
}: {
  title: string
  children: ReactNode
  actions?: ReactNode
  simulated?: boolean
  compact?: boolean
}) {
  return (
    <div role="status" className={[styles.success, compact && styles.compact].filter(Boolean).join(' ')}>
      <span className={styles.tick}>
        <Icon name="check" size={28} strokeWidth={2} />
      </span>
      <h3 className={styles.successTitle}>{title}</h3>
      <div className={styles.successText}>{children}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
      {simulated && <p className={styles.previewNote}>Preview mode: nothing was sent.</p>}
    </div>
  )
}
