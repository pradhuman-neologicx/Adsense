'use client'

import Link from 'next/link'
import { BarChart3, ShieldCheck } from 'lucide-react'

interface FooterProps {
  showDisclaimerBanner?: boolean
}

export function Footer({ showDisclaimerBanner = true }: FooterProps) {
  return (
    <>
      {/* ── Mandatory Trademark & Editorial Disclaimer Banner (Rule 3) ── */}
      {showDisclaimerBanner && (
        <div className="disclaimer-banner">
          <ShieldCheck size={16} />
          <span>
            <strong>Editorial &amp; Trademark Disclaimer:</strong> We are an independent financial, technology, and home comparison platform.
            We are not affiliated with, endorsed by, or official support for Citigroup Inc., Capital One,
            American Express, PayPal, Fidelity Investments, Charles Schwab, McAfee Corp., Dell Technologies,
            Apple (iOS), or Amazon. All trademarks belong to their respective owners.
          </span>
        </div>
      )}

      {/* ── Site Footer ── */}
      <footer className="site-footer">
        <div className="footer-brand">
          <Link href="/" className="brand-logo-link" aria-label="WiseGrid Home">
            <img
              src="/logo.png"
              alt="WiseGrid"
              className="brand-logo-img"
              style={{ height: '32px' }}
            />
          </Link>
          <p>
            Independent consumer comparison &amp; interactive financial, tech, and home calculators for the United States &amp; India.
          </p>
        </div>

        <div className="footer-links">
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Advisor</Link>
          <Link href="/articles">Guides &amp; Articles</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>

        <span className="footer-copy">© 2026 WiseGrid. All rights reserved.</span>
      </footer>
    </>
  )
}

