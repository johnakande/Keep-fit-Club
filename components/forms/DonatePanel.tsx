'use client'

import { useState } from 'react'
import { Button, ButtonLink } from '@/components/ui/Button'
import SegmentedControl from '@/components/ui/SegmentedControl'
import { donate } from '@/lib/content/join'
import { naira } from '@/lib/format'
import { site } from '@/lib/site'
import { SuccessPanel } from './Fields'
import styles from './DonatePanel.module.css'

type Frequency = 'once' | 'monthly'
type Method = (typeof donate.methods)[number]['id']

const { paymentUrl, bank } = site.donations

export default function DonatePanel() {
  const [frequency, setFrequency] = useState<Frequency>('once')
  const [preset, setPreset] = useState<number | 'custom'>(donate.defaultAmount)
  const [custom, setCustom] = useState('')
  // Open on a method that works today: bank transfer until a payment page exists.
  const [method, setMethod] = useState<Method>(paymentUrl ? 'momo' : 'bank')
  const [thanked, setThanked] = useState(false)

  const amount = preset === 'custom' ? Number(custom || 0) : preset
  const label = `${naira(amount)}${frequency === 'monthly' ? ' monthly' : ''}`

  if (thanked) {
    return (
      <SuccessPanel
        compact
        title={`Thank you for your ${naira(amount)} ${frequency === 'monthly' ? 'monthly gift' : 'gift'}.`}
        actions={
          <Button variant="secondary" onClick={() => setThanked(false)}>
            Make another donation
          </Button>
        }
      >
        <p>Your gift will appear in the next quarterly report.</p>
      </SuccessPanel>
    )
  }

  return (
    <div className={styles.panel}>
      <SegmentedControl
        label="Frequency"
        value={frequency}
        onChange={setFrequency}
        options={[
          { value: 'once', label: 'One-time' },
          { value: 'monthly', label: 'Monthly' },
        ]}
      />

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Amount</legend>
        <div className={styles.amounts}>
          {[...donate.amounts, 'custom' as const].map((a) => (
            <label key={a} className={styles.amount}>
              <input type="radio" name="amount" checked={preset === a} onChange={() => setPreset(a)} className={styles.radioInput} />
              <span>{a === 'custom' ? 'Custom' : naira(a)}</span>
            </label>
          ))}
        </div>
        {preset === 'custom' && (
          <label className={styles.customField}>
            <span className={styles.legend}>Custom amount (₦)</span>
            <input
              inputMode="numeric"
              value={custom}
              onChange={(e) => setCustom(e.target.value.replace(/\D/g, '').slice(0, 9))}
              placeholder="e.g. 15000"
              className={styles.input}
            />
          </label>
        )}
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Payment method</legend>
        <div className={styles.methods}>
          {donate.methods.map((m) => (
            <label key={m.id} className={styles.method}>
              <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} className={styles.radioInput} />
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.methodText}>
                <span className={styles.methodLabel}>{m.label}</span>
                <span className={styles.methodSub}>{m.sub}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {method === 'bank' ? (
        <>
          <div className={styles.bank}>
            <dl>
              <div>
                <dt>Account name</dt>
                <dd>{bank.accountName}</dd>
              </div>
              <div>
                <dt>Bank</dt>
                <dd>{bank.bank}</dd>
              </div>
              <div>
                <dt>Account number</dt>
                <dd className={styles.accountNumber}>{bank.accountNumber}</dd>
              </div>
            </dl>
            <p className={styles.bankNote}>
              {bank.note}
              {frequency === 'monthly' && ' For a monthly gift, set up a standing order with your bank using these details.'}
            </p>
          </div>
          <Button size="xl" block disabled={amount <= 0} onClick={() => setThanked(true)}>
            I’ve sent {label}
          </Button>
        </>
      ) : paymentUrl ? (
        <>
          <ButtonLink href={paymentUrl} size="xl" block target="_blank" rel="noopener noreferrer" aria-disabled={amount <= 0}>
            Donate {label}
          </ButtonLink>
          <p className={styles.small}>Opens our secure payment page. Card details are never entered on this site.</p>
        </>
      ) : (
        <div className={styles.notice}>
          <p>
            {method === 'card' ? 'Card' : 'Mobile money'} payments aren’t connected yet. You can give {label} by bank transfer today, or call the
            Treasurer on <a href={`tel:${site.phone.e164}`}>{site.phone.display}</a>.
          </p>
          <Button variant="secondary" onClick={() => setMethod('bank')}>
            Show bank details
          </Button>
        </div>
      )}
    </div>
  )
}
