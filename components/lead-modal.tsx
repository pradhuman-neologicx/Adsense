'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Check, ShieldCheck, X } from 'lucide-react'

interface LeadModalProps {
  onClose: () => void
  hubType: string
  value: number
  brand?: string
  region: 'US' | 'IN'
  keyword?: string
}

export function LeadModal({ onClose, hubType, value, brand, region, keyword }: LeadModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)

  // Lock body scroll and handle Escape key
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const phonePattern = region === 'US' ? /^\d{10}$/ : /^[6-9]\d{9}$/
  const phonePrefix = region === 'US' ? '+1' : '+91'

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!phonePattern.test(phone) || !consent) return
    setStatus('loading')
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          Phone: `${phonePrefix}${phone}`,
          Country: region,
          CategoryHub: hubType,
          TargetKeyword: keyword || brand || 'Direct',
          EstimatedValue: value,
        }),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-title"
      onClick={onClose}
    >
      <div className="lead-modal" onClick={e => e.stopPropagation()}>
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>
        {status === 'success' ? (
          <div className="success-state">
            <div className="success-icon"><Check size={28} /></div>
            <h2>Thank You!</h2>
            <p>Your detailed comparison is unlocked. Our advisor will contact you shortly.</p>
            <button className="primary-button" onClick={onClose}>
              Continue exploring <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="eyebrow"><ShieldCheck size={14} /> Free &amp; confidential</div>
            <h2 id="lead-title">Unlock your personalised report</h2>
            <p className="modal-copy">Get your detailed comparison PDF, custom quote and expert guidance — all free.</p>
            <form onSubmit={submit} className="lead-form">
              <label>Full name<input name="FullName" placeholder="Your name" required /></label>
              <label>Email address<input name="Email" type="email" placeholder="you@email.com" required /></label>
              <label>Phone number
                <div className="phone-field">
                  <span>{phonePrefix}</span>
                  <input
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    inputMode="numeric"
                    placeholder="10-digit number"
                    required
                  />
                </div>
                {phone.length > 0 && !phonePattern.test(phone) && (
                  <small className="error-copy">Enter a valid 10-digit phone number</small>
                )}
              </label>
              <div className="modal-row-2">
                <label>{region === 'US' ? 'City / State' : 'City'}<input name="City" placeholder={region === 'US' ? 'e.g. New York, NY' : 'e.g. Mumbai'} required /></label>
                <label>{region === 'US' ? 'ZIP Code' : 'PIN Code'}<input name="PostalCode" placeholder={region === 'US' ? 'e.g. 10001' : 'e.g. 400001'} required /></label>
              </div>
              {brand && <div className="selected-bank"><ShieldCheck size={16} /> Enquiring about <strong>{brand}</strong></div>}
              <label className="consent-check">
                <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} />
                <span className="custom-check">{consent && <Check size={13} />}</span>
                <small>I consent to receive communications regarding my inquiry. I understand this is an independent comparison platform, not affiliated with any listed brand.</small>
              </label>
              <button
                type="submit"
                className="primary-button submit-button"
                disabled={status === 'loading' || !phonePattern.test(phone) || !consent}
              >
                {status === 'loading' ? 'Sending securely…' : 'Unlock my report'} <ArrowRight size={16} />
              </button>
              {status === 'error' && <small className="error-copy">Something went wrong. Please try again.</small>}
              <small className="privacy-note">By continuing, you agree to our privacy policy. No spam, ever.</small>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
