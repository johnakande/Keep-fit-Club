'use server'

import { deliver, deliveryError } from '@/lib/deliver'
import { events } from '@/lib/content/events'
import { contact, joinOptions } from '@/lib/content/join'
import { type FormState, HONEYPOT, isEmail, isFullName, isPhone, list, text } from '@/lib/forms'

// Server actions are public endpoints: every field is re-validated here,
// whatever the browser already checked.

const locationValues = joinOptions.locations.map((l) => l.value)

export async function submitJoin(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = {
    name: text(formData, 'name', 120),
    phone: text(formData, 'phone', 40),
    email: text(formData, 'email', 160),
    location: text(formData, 'location', 40),
    skills: text(formData, 'skills', 300),
    goals: list(formData, 'goals', joinOptions.goals),
    interests: list(formData, 'interests', joinOptions.interests),
  }
  const firstName = values.name.split(/\s+/)[0] || 'friend'
  if (text(formData, HONEYPOT)) return { status: 'success', firstName, phone: values.phone }

  const invalid = [!isFullName(values.name) && 'name', !isPhone(values.phone) && 'phone', !isEmail(values.email) && 'email'].filter(Boolean) as string[]
  if (invalid.length) {
    return { status: 'error', invalid, values, message: 'Please add your full name, a phone number and a valid email.' }
  }

  const result = await deliver({
    subject: `New membership registration: ${values.name}`,
    replyTo: values.email,
    fields: [
      ['Name', values.name],
      ['Phone', values.phone],
      ['Email', values.email],
      ['Location', locationValues.includes(values.location) ? values.location : 'Not given'],
      ['Fitness goals', values.goals],
      ['Skills to share', values.skills],
      ['Interests', values.interests],
    ],
  })
  if (!result.ok) return { status: 'error', values, message: deliveryError(result) }
  return { status: 'success', simulated: result.simulated, firstName, phone: values.phone }
}

export async function sendMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = {
    name: text(formData, 'name', 120),
    email: text(formData, 'email', 160),
    subject: text(formData, 'subject', 80),
    message: text(formData, 'message', 4000),
  }
  if (text(formData, HONEYPOT)) return { status: 'success' }

  const invalid = [!values.name && 'name', !isEmail(values.email) && 'email', values.message.length < 2 && 'message'].filter(Boolean) as string[]
  if (invalid.length) {
    return { status: 'error', invalid, values, message: 'Please add your name, a valid email and a message.' }
  }

  const subject = contact.subjects.includes(values.subject) ? values.subject : contact.subjects[0]
  const result = await deliver({
    subject: `Website message (${subject}): ${values.name}`,
    replyTo: values.email,
    fields: [
      ['Name', values.name],
      ['Email', values.email],
      ['Subject', subject],
      ['Message', values.message],
    ],
  })
  if (!result.ok) return { status: 'error', values, message: deliveryError(result) }
  return { status: 'success', simulated: result.simulated }
}

export async function registerInterest(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = {
    name: text(formData, 'name', 120),
    phone: text(formData, 'phone', 40),
    event: text(formData, 'event', 120),
  }
  if (text(formData, HONEYPOT)) return { status: 'success' }

  const event = events.find((e) => e.slug === values.event)
  if (!event) return { status: 'error', message: 'That event is no longer listed.' }

  const invalid = [!values.name && 'name', !isPhone(values.phone) && 'phone'].filter(Boolean) as string[]
  if (invalid.length) return { status: 'error', invalid, values, message: 'Please add your name and a phone number.' }

  const result = await deliver({
    subject: `Event interest: ${event.title}`,
    fields: [
      ['Event', `${event.title} (${event.start})`],
      ['Name', values.name],
      ['Phone', values.phone],
    ],
  })
  if (!result.ok) return { status: 'error', values, message: deliveryError(result) }
  return { status: 'success', simulated: result.simulated }
}
