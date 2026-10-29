'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const copy = {
  privacy: {
    eyebrow: 'Your privacy & trust',
    title: 'Privacy Policy',
    description: 'How WiseGrid collects, uses, and safeguards the information you share with us.',
    heading: 'Information We Collect',
    body: 'We collect information you voluntarily provide through our comparison calculators and quotation forms, including your name, email, phone number, and location (City, State, ZIP/PIN). We use this information strictly to provide personalized comparison reports, connect you with verified financial and service advisors, and improve our analytical tools.',
  },
  disclaimer: {
    eyebrow: 'Mandatory Policy Disclosure',
    title: 'Independent Comparison & Trademark Disclaimer',
    description: 'Please read this statement carefully before using our calculators, comparison tools, or request forms.',
    heading: 'Independent Platform Status',
    body: 'Disclaimer: We are an independent financial, technology, and home comparison platform. We are not affiliated with, endorsed by, or official support for Citigroup Inc., Capital One, American Express, PayPal, Fidelity Investments, Charles Schwab, McAfee Corp., Dell Technologies, Apple (iOS), or Amazon. All trademarks belong to their respective owners.',
  },
  terms: {
    eyebrow: 'Terms of Service',
    title: 'Terms of Use',
    description: 'The terms and guidelines governing your use of WiseGrid comparison engines and calculators.',
    heading: 'Acceptable Use Policy',
    body: 'WiseGrid is provided for personal and business evaluation, research, and rate estimation purposes. Users agree not to misuse lead submission forms, scrape pricing models without permission, or misrepresent their identity when requesting quotes.',
  },
} as const

export function LegalPage({ type }: { type: keyof typeof copy }) {
  const item = copy[type]
  return (
    <div className="portal-shell">
      <Navbar />

      <main className="main-content">
        <section className="page-hero">
          <span className="eyebrow">{item.eyebrow}</span>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </section>

        <div className="legal-content content-card">
          <h2>{item.heading}</h2>
          <p>{item.body}</p>

          <h2>
            {type === 'privacy'
              ? 'Data Usage & Security'
              : type === 'disclaimer'
              ? 'Not Official Technical Support or Direct Lender'
              : 'Indicative Calculations & Estimates'}
          </h2>
          <p>
            {type === 'privacy'
              ? 'Your contact details are processed securely and shared solely with relevant licensed partners for the explicit service requested. We do not sell personal data to unauthorized third parties or send unsolicited telemarketing messages.'
              : type === 'disclaimer'
              ? 'WiseGrid does NOT provide official customer care, account recovery, password resets, or third-party remote technical support for McAfee, Dell, Apple, PayPal, or any financial institution. We are purely an independent rate comparison, fee estimation, and quotation matching portal.'
              : 'All rates, rewards projections, APR percentages, and renovation cost calculations are indicative estimates derived from public data and user inputs. Actual figures depend on final credit assessment, provider terms, and local contractor specifications.'}
          </p>

          <div style={{ marginTop: '30px' }}>
            <Link href="/" className="primary-button">
              Back to Comparison Portal <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </main>

      <Footer showDisclaimerBanner={true} />
    </div>
  )
}
