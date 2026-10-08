// Shared form types, initial state and validation (used by the server actions
// in app/actions.ts and the client form components).

export type FormStatus = 'idle' | 'error' | 'success'

export type FormState = {
  status: FormStatus
  message?: string
  // Field names that failed validation.
  invalid?: string[]
  // Echo of what was typed, so an error never wipes the form.
  values?: Record<string, string | string[]>
  // Preview mode: the success screen shows but nothing was sent.
  simulated?: boolean
  // For personalised success messages.
  firstName?: string
  phone?: string
}

export const initialFormState: FormState = { status: 'idle' }

// The hidden spam-trap field. People never see or fill it; bots usually do.
export const HONEYPOT = 'website'

export function text(formData: FormData, name: string, max = 200) {
  const v = formData.get(name)
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

export function list(formData: FormData, name: string, allowed: readonly string[]) {
  return formData
    .getAll(name)
    .filter((v): v is string => typeof v === 'string' && allowed.includes(v))
}

export const isFullName = (v: string) => v.split(/\s+/).filter(Boolean).length >= 2
export const isPhone = (v: string) => v.replace(/\D/g, '').length >= 10
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
