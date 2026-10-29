'use client'

import { useState } from 'react'
import { Shield, Cpu, Lock, Cloud, Smartphone, BarChart3, ShieldCheck, ArrowRight, ChevronRight, Check } from 'lucide-react'

interface HubProps {
  region: 'US' | 'IN'
  brand: string | null
  openLead: (hubType: string, value: number, brand?: string) => void
}

const fmt = (v: number, r: 'US' | 'IN') =>
  r === 'US'
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
    : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v)

function AdSlot({ label = 'Advertisement' }: { label?: string }) {
  return <div className="ad-slot" aria-label={label}>{label}</div>
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}) {
  return (
    <label className="range-control">
      <div>
        <span>{label}</span>
        <strong>{display}</strong>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </label>
  )
}

const tierPricingUS: Record<string, number> = { Basic: 899, Professional: 1499, Enterprise: 2799 }
const tierPricingIN: Record<string, number> = { Basic: 65000, Professional: 110000, Enterprise: 205000 }

const securityUS = [
  { name: 'McAfee Corp Business Protection', brandKey: 'mcafee', devices: 'Unlimited Workstations', annual: '$84.99/yr', cost: 85, features: 'Next-Gen AV, Firewall, Zero-Trust VPN' },
  { name: 'Bitdefender GravityZone Business', brandKey: 'bitdefender', devices: '5 – 100 Endpoints', annual: '$77.69/yr', cost: 78, features: 'EDR Analytics, Network Attack Defense' },
  { name: 'Norton Small Business Suite', brandKey: 'norton', devices: '6 – 20 Endpoints', annual: '$99.99/yr', cost: 100, features: 'Cloud Backup, Identity Restoration' },
]

const securityIN = [
  { name: 'McAfee Total Protection Business', brandKey: 'mcafee', devices: '10 Workstations', annual: '₹4,999/yr', cost: 4999, features: 'Ransomware Shield, Wi-Fi Guard, Antivirus' },
  { name: 'Quick Heal Total Security Enterprise', brandKey: 'quickheal', devices: '5 Endpoints', annual: '₹3,499/yr', cost: 3499, features: 'Behavioral Detection, USB Drive Control' },
  { name: 'K7 Total Security Business', brandKey: 'k7', devices: '5 Endpoints', annual: '₹2,499/yr', cost: 2499, features: 'Web Protection, Smart Firewall, Anti-Malware' },
]

const cloudRegionsUS = ['US East (N. Virginia)', 'US West (Oregon)', 'EU Central (Frankfurt)']
const cloudRegionsIN = ['Asia Pacific (Mumbai)', 'Asia Pacific (Hyderabad)', 'Asia Pacific (Singapore)']

export default function TechHub({ region, brand, openLead }: HubProps) {
  // If brand is mcafee or security, default to tab 1 (Security plans)
  // If brand is amazon or aws, default to tab 2 (Cloud estimator)
  // Else default to tab 0 (Hardware configurator - Dell)
  const defaultTab = brand?.toLowerCase().includes('mcafee') || brand?.toLowerCase().includes('security')
    ? 1
    : brand?.toLowerCase().includes('amazon') || brand?.toLowerCase().includes('aws')
    ? 2
    : 0

  const [activeTab, setActiveTab] = useState(defaultTab)

  /* ── Hardware state (Dell baseline) ── */
  const [workstations, setWorkstations] = useState(15)
  const [tier, setTier] = useState<'Basic' | 'Professional' | 'Enterprise'>('Professional')

  /* ── Cloud state (AWS baseline) ── */
  const [computeHours, setComputeHours] = useState(730)
  const [storageTB, setStorageTB] = useState(5)
  const [cloudRegionIdx, setCloudRegionIdx] = useState(0)

  const tabs = ['Hardware configurator', 'Cybersecurity plans', 'Cloud cost estimator']
  const tiers: ('Basic' | 'Professional' | 'Enterprise')[] = ['Basic', 'Professional', 'Enterprise']

  /* ── Calculations ── */
  const unitPrice = region === 'US' ? tierPricingUS[tier] : tierPricingIN[tier]
  const hardwareTotal = workstations * unitPrice
  const setupCost = Math.round(hardwareTotal * 0.15)
  const hwGrandTotal = hardwareTotal + setupCost
  const hwPct = Math.round((hardwareTotal / hwGrandTotal) * 100)

  // Cloud pricing (AWS tiers)
  const computeRate = region === 'US' ? 0.05 : 3.5
  const storageRate = region === 'US' ? 23 : 1600
  const computeCost = Math.round(computeHours * computeRate)
  const storageCost = Math.round(storageTB * storageRate)
  const monthlyCloud = computeCost + storageCost
  const annualCloud = monthlyCloud * 12

  const securityData = region === 'US' ? securityUS : securityIN
  const regions = region === 'US' ? cloudRegionsUS : cloudRegionsIN

  const isBrandMatch = (cardBrandKey: string, cardName: string) => {
    if (!brand) return false
    const b = brand.toLowerCase()
    return cardBrandKey.includes(b) || b.includes(cardBrandKey) || cardName.toLowerCase().includes(b)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="finance-hero">
        <div className="hero-copy">
          <span className="eyebrow"><Shield size={16} /> Tech, Hardware &amp; Cybersecurity</span>
          <h1>
            Compare business antivirus &amp; hardware plans — <em>Instant Quote.</em>
          </h1>
          <p>
            Configure enterprise workstations (Dell baseline), compare endpoint security licensing (McAfee, Bitdefender), and model AWS cloud compute budgets in seconds.
          </p>
          <div className="trust-row">
            <span><Check size={16} /> Volume discount projections</span>
            <span><Check size={16} /> 100% independent vendor comparisons</span>
          </div>
        </div>

        <div className="finance-stat">
          <span>Avg. IT savings found</span>
          <strong>{region === 'US' ? '$8,200' : '₹4.5L'}</strong>
          <small>Through bulk enterprise licensing &amp; configuration matching</small>
        </div>
      </section>

      <AdSlot />

      {/* ── Calculator Section ── */}
      <section className="tools-section">
        <div className="section-intro">
          <span className="step-label">ENTERPRISE TECH SUITE</span>
          <h2>Configure your organization&apos;s infrastructure</h2>
          <p>Transparent cost models for workstations, security endpoints, and cloud compute.</p>
        </div>

        <div className="tool-tabs">
          {tabs.map((t, i) => (
            <button
              key={t}
              className={activeTab === i ? 'active' : ''}
              onClick={() => setActiveTab(i)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Tab 1: Hardware Configurator ── */}
        {activeTab === 0 && (
          <div className="tool-panel">
            <div className="tool-controls">
              <RangeControl
                label="Number of workstations"
                value={workstations}
                min={1}
                max={250}
                step={1}
                display={`${workstations} units`}
                onChange={setWorkstations}
              />

              <div>
                <span className="field-label">Hardware Tier (Dell Specs)</span>
                <div className="choice-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  {tiers.map(t => (
                    <button
                      key={t}
                      className={`choice-button${tier === t ? ' selected' : ''}`}
                      onClick={() => setTier(t)}
                    >
                      {t} {tier === t && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="field-label">Unit Specification</span>
                <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                  {tier === 'Basic' && 'Intel Core i5 / 16GB RAM / 512GB SSD · Office Productivity'}
                  {tier === 'Professional' && 'Intel Core i7 / 32GB RAM / 1TB NVMe / Dedicated GPU · Engineering'}
                  {tier === 'Enterprise' && 'Intel Xeon / 64GB ECC / Dual NVMe / RTX Pro · Workstation Class'}
                </p>
              </div>
            </div>

            <div className="result-panel">
              <div>
                <span>Total hardware estimate</span>
                <strong>{fmt(hwGrandTotal, region)}</strong>
                <small>Dell Technologies workstation fleet estimate</small>
              </div>

              <div className="result-bars">
                <div className="bar-label">
                  <span>Hardware ({workstations}x): <b>{fmt(hardwareTotal, region)}</b></span>
                  <span>Setup &amp; Support: <b>{fmt(setupCost, region)}</b></span>
                </div>
                <div className="split-bar">
                  <span style={{ width: `${hwPct}%` }} />
                  <span style={{ width: `${100 - hwPct}%` }} />
                </div>
                <small>Includes estimated 3-year ProSupport Next Business Day Onsite Warranty</small>
              </div>

              <button
                className="primary-button"
                onClick={() => openLead('Tech, Hardware & Security', hwGrandTotal, brand ?? 'Dell Hardware Fleet')}
              >
                Get bulk B2B hardware quote <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Tab 2: Security Plans ── */}
        {activeTab === 1 && (
          <div className="table-card">
            <div className="table-header">
              <div>
                <h3>Business Endpoint Cybersecurity Comparison</h3>
                <p>Commercial licensing tiers for ransomware prevention, endpoint defense, and central management</p>
              </div>
              <span className="live-badge"><span></span> 2026 Commercial Plans</span>
            </div>

            <div className="rate-table">
              <div className="table-row table-head">
                <span>Security Provider</span>
                <span>Protected Devices</span>
                <span>Annual License</span>
                <span>Key Protection Features</span>
                <span>Quote Action</span>
              </div>

              {securityData.map((plan) => {
                const highlighted = isBrandMatch(plan.brandKey, plan.name)
                return (
                  <div
                    className="table-row"
                    key={plan.name}
                    style={highlighted ? { background: 'var(--brand-light)', borderLeft: '4px solid var(--brand)' } : undefined}
                  >
                    <div>
                      <strong>{plan.name}</strong>
                      {highlighted && (
                        <span style={{ marginLeft: 6, fontSize: 10, background: 'var(--brand)', color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                          Campaign Match
                        </span>
                      )}
                    </div>
                    <span>{plan.devices}</span>
                    <strong style={{ color: 'var(--brand)' }}>{plan.annual}</strong>
                    <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{plan.features}</span>
                    <button
                      className="small-button"
                      onClick={() => openLead('Tech, Hardware & Security', plan.cost, plan.name)}
                    >
                      Get license quote <ArrowRight size={13} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Tab 3: Cloud Estimator ── */}
        {activeTab === 2 && (
          <div className="tool-panel">
            <div className="tool-controls">
              <RangeControl
                label="Monthly compute hours (EC2 equivalent)"
                value={computeHours}
                min={100}
                max={5000}
                step={50}
                display={`${computeHours.toLocaleString()} hrs`}
                onChange={setComputeHours}
              />
              <RangeControl
                label="Cloud storage (S3 / EBS)"
                value={storageTB}
                min={0.5}
                max={50}
                step={0.5}
                display={`${storageTB} TB`}
                onChange={setStorageTB}
              />
              <div>
                <span className="field-label">Target Cloud Region</span>
                <select
                  value={cloudRegionIdx}
                  onChange={e => setCloudRegionIdx(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px', borderRadius: '9px', border: '1px solid var(--border)', background: 'var(--background)' }}
                >
                  {regions.map((r, i) => (
                    <option key={r} value={i}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="result-panel">
              <div>
                <span>Monthly cloud spend estimate</span>
                <strong>{fmt(monthlyCloud, region)}<small style={{ fontSize: 13 }}>/mo</small></strong>
                <small>Annual run-rate: {fmt(annualCloud, region)}</small>
              </div>

              <div className="result-bars">
                <div className="bar-label">
                  <span>Compute: <b>{fmt(computeCost, region)}</b></span>
                  <span>Storage: <b>{fmt(storageCost, region)}</b></span>
                </div>
                <div className="split-bar">
                  <span style={{ width: `${Math.round((computeCost / monthlyCloud) * 100)}%` }} />
                  <span />
                </div>
                <small>AWS / Amazon Cloud on-demand reference pricing (Excludes data egress waivers)</small>
              </div>

              <button
                className="primary-button"
                onClick={() => openLead('Tech, Hardware & Security', annualCloud, brand ?? 'AWS Cloud Infrastructure')}
              >
                Get optimized cloud architecture quote <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Future Section ── */}
        <div className="future-section">
          <div>
            <span className="step-label">COMING NEXT</span>
            <h2>More enterprise technology tools</h2>
          </div>
          <div className="future-grid">
            <div className="future-card">
              <div className="future-icon"><Smartphone /></div>
              <strong>iOS &amp; Apple MDM Cost Calculator</strong>
              <span>Model Jamf / Intune mobile device management license budgets</span>
              <ChevronRight size={16} />
            </div>
            <div className="future-card">
              <div className="future-icon"><Cloud /></div>
              <strong>SaaS License Waste Detector</strong>
              <span>Calculate potential savings by reclaiming inactive seats</span>
              <ChevronRight size={16} />
            </div>
            <div className="future-card">
              <div className="future-icon"><Lock /></div>
              <strong>SOC 2 Compliance Cost Forecaster</strong>
              <span>Estimate audit, pentesting, and automated compliance tools</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </section>

      <AdSlot />
    </>
  )
}
