'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BarChart3,
  CreditCard,
  Landmark,
  Monitor,
  Home,
  Globe,
  Phone,
  Menu,
  X,
} from 'lucide-react'
import { useRegion, type Region } from '@/lib/region'

export const navHubs = [
  { id: 'banking', label: 'Banking', icon: CreditCard },
  { id: 'wealth', label: 'Wealth', icon: Landmark },
  { id: 'tech', label: 'Tech', icon: Monitor },
  { id: 'home', label: 'Mortgage', icon: Home },
] as const

export type NavHubId = (typeof navHubs)[number]['id']

interface NavbarProps {
  region?: Region
  setRegion?: (region: Region) => void
  activeHub?: string
  onSelectHub?: (hubId: NavHubId) => void
  onOpenLead?: (hubType: string, value: number, brand?: string) => void
}

export function Navbar({
  region: propRegion,
  setRegion: propSetRegion,
  activeHub = 'banking',
  onSelectHub,
  onOpenLead,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  // Use the global/persisted auto-detecting region hook
  const { region: hookRegion, setRegion: hookSetRegion } = useRegion(propRegion)
  const currentRegion: Region = propRegion || hookRegion
  const handleSetRegion = propSetRegion || hookSetRegion

  const handleHubClick = (hubId: NavHubId) => {
    if (onSelectHub) {
      onSelectHub(hubId)
    } else {
      router.push(`/?hub=${hubId}`)
    }
    setMobileOpen(false)
  }

  const handleCtaClick = () => {
    if (onOpenLead) {
      onOpenLead('General Consultation', 0)
    } else {
      router.push('/contact')
    }
  }

  const toggleRegion = () => {
    handleSetRegion(currentRegion === 'US' ? 'IN' : 'US')
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <Link href="/" className="brand-mark">
          <div className="brand-mark-icon">
            <BarChart3 size={17} strokeWidth={2.4} />
          </div>
          <span>Compare<span className="brand-dot">.</span>Grid</span>
        </Link>

        {/* Desktop Hub Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <div className="hub-pills-group">
            {navHubs.map(hub => {
              const isActive = activeHub === hub.id
              return (
                <button
                  key={hub.id}
                  type="button"
                  className={`nav-hub-btn${isActive ? ' active' : ''}`}
                  onClick={() => handleHubClick(hub.id)}
                >
                  <hub.icon size={15} />
                  <span>{hub.label}</span>
                </button>
              )
            })}
          </div>

          <div className="nav-divider" />

          <div className="sub-links-group">
            <Link className="nav-sub-link" href="/articles">Articles</Link>
            <Link className="nav-sub-link" href="/about">About</Link>
            <Link className="nav-sub-link" href="/contact">Contact</Link>
          </div>
        </nav>

        {/* Right Header Actions */}
        <div className="header-actions">
          {/* Region Switcher (Always available & auto-detecting) */}
          <button
            type="button"
            className="region-pill"
            onClick={toggleRegion}
            title={`Currently showing ${currentRegion === 'US' ? 'United States ($ USD)' : 'India (₹ INR)'}. Click to switch.`}
            aria-label="Switch Currency & Region"
          >
            <Globe size={13} className="globe-icon" />
            <span className={`region-opt${currentRegion === 'US' ? ' active' : ''}`}>$ USD</span>
            <span className={`region-opt${currentRegion === 'IN' ? ' active' : ''}`}>₹ INR</span>
          </button>

          {/* CTA Button */}
          <button
            type="button"
            className="call-button"
            onClick={handleCtaClick}
          >
            <Phone size={14} className="call-icon" />
            <span>Free Advisor Call</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-title">Comparison Hubs</div>
          <div className="mobile-hub-list">
            {navHubs.map(hub => (
              <button
                key={hub.id}
                type="button"
                className={`mobile-hub-btn${activeHub === hub.id ? ' active' : ''}`}
                onClick={() => handleHubClick(hub.id)}
              >
                <hub.icon size={17} />
                <span>{hub.label}</span>
              </button>
            ))}
          </div>

          <div className="mobile-drawer-divider" />

          <div className="mobile-sub-list">
            <Link className="mobile-sub-link" href="/articles" onClick={() => setMobileOpen(false)}>Articles &amp; Guides</Link>
            <Link className="mobile-sub-link" href="/about" onClick={() => setMobileOpen(false)}>About CompareGrid</Link>
            <Link className="mobile-sub-link" href="/contact" onClick={() => setMobileOpen(false)}>Contact Advisors</Link>
            <Link className="mobile-sub-link" href="/disclaimer" onClick={() => setMobileOpen(false)}>Policy Disclaimer</Link>
          </div>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              className="primary-button full-button"
              onClick={() => {
                setMobileOpen(false)
                handleCtaClick()
              }}
            >
              <Phone size={15} /> Free Advisor Call
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
