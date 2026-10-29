'use client'

import { useState } from 'react'
import { CreditCard, ArrowRight, Zap, TrendingUp, Building2, Lock, ChevronRight, Check } from 'lucide-react'

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

const usCards = [
  { name: 'Citi Double Cash', brandKey: 'citi', apr: '18.24% – 28.24%', rewards: '2% Flat Cash Back', fee: '$0' },
  { name: 'Capital One Venture X', brandKey: 'capital-one', apr: '21.99% – 28.99%', rewards: '2x Miles on all purchases', fee: '$395' },
  { name: 'Amex Gold Card', brandKey: 'amex', apr: '20.99% – 29.99%', rewards: '4x Dining & Groceries', fee: '$250' },
  { name: 'PayPal Cashback Mastercard', brandKey: 'paypal', apr: '20.99% – 31.99%', rewards: '3% on PayPal, 2% Other', fee: '$0' },
]

const inCards = [
  { name: 'SBI SimplyCLICK Card', brandKey: 'sbi', apr: '42.0% p.a.', rewards: '10x Reward Points on Partners', fee: '₹499' },
  { name: 'HDFC Regalia Gold', brandKey: 'hdfc', apr: '42.0% p.a.', rewards: '4 pts per ₹150 + Club Vistara', fee: '₹2,500' },
  { name: 'ICICI Amazon Pay Card', brandKey: 'icici', apr: '42.0% p.a.', rewards: '5% Cashback on Amazon Prime', fee: '₹0 (Life Free)' },
  { name: 'Axis Bank Flipkart Card', brandKey: 'axis', apr: '42.0% p.a.', rewards: '5% Flat Cashback on Flipkart', fee: '₹500' },
]

export default function BankingHub({ region, brand, openLead }: HubProps) {
  // If brand is paypal or fee-related, default to Payment fees, else Rewards/APR
  const defaultTab = brand?.toLowerCase().includes('paypal') || brand?.toLowerCase().includes('fee') ? 2 : 0
  const [activeTab, setActiveTab] = useState(defaultTab)

  // Rewards calculator state
  const [annualSpending, setAnnualSpending] = useState(region === 'US' ? 30000 : 500000)
  const [diningPct, setDiningPct] = useState(25)
  const [travelPct, setTravelPct] = useState(15)

  // Payment fees state
  const [monthlyVolume, setMonthlyVolume] = useState(region === 'US' ? 50000 : 500000)
  const [avgTransaction, setAvgTransaction] = useState(region === 'US' ? 50 : 500)

  const tabs = ['Rewards calculator', 'APR comparison', 'Payment fees']

  // Rewards calculation
  const otherPct = Math.max(0, 100 - diningPct - travelPct)
  const diningSpend = annualSpending * (diningPct / 100)
  const travelSpend = annualSpending * (travelPct / 100)
  const otherSpend = annualSpending * (otherPct / 100)

  const cashbackEst = region === 'US'
    ? diningSpend * 0.04 + travelSpend * 0.03 + otherSpend * 0.02
    : (diningSpend * 0.05 + travelSpend * 0.04 + otherSpend * 0.02)
  const pointsEst = cashbackEst * (region === 'US' ? 1.25 : 1.3)
  const estimatedRewards = Math.round((cashbackEst + pointsEst) / 2)

  // Payment fee calculations
  const txCount = Math.max(1, Math.round(monthlyVolume / avgTransaction))
  const paypalFee = region === 'US'
    ? monthlyVolume * 0.029 + txCount * 0.30
    : monthlyVolume * 0.025 + txCount * 3
  const stripeFee = region === 'US'
    ? monthlyVolume * 0.029 + txCount * 0.30
    : monthlyVolume * 0.02 + txCount * 2
  const squareFee = region === 'US'
    ? monthlyVolume * 0.026 + txCount * 0.10
    : monthlyVolume * 0.019 + txCount * 1.5

  const cards = region === 'US' ? usCards : inCards

  const isBrandMatch = (cardBrandKey: string, cardName: string) => {
    if (!brand) return false
    const b = brand.toLowerCase()
    return cardBrandKey.includes(b) || b.includes(cardBrandKey) || cardName.toLowerCase().includes(b)
  }

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="finance-hero">
        <div className="hero-copy">
          <span className="eyebrow"><CreditCard size={15} /> Banking, Cards &amp; Payments</span>
          <h1>
            Compare top cashback &amp; travel cards — <em>2026 APR Calculator.</em>
          </h1>
          <p>
            Find the optimal card for your spending profile. Accurately calculate annual rewards, compare APR brackets, and audit payment processing fees across Citi, Capital One, Amex, and PayPal.
          </p>
          <div className="trust-row">
            <span><Check size={16} /> Independent comparisons</span>
            <span><Check size={16} /> Updated daily for 2026</span>
          </div>
        </div>

        <div className="finance-stat">
          <span>Top cards indexed</span>
          <strong>16+</strong>
          <small>Citigroup, Amex, Capital One, PayPal, SBI, HDFC</small>
        </div>
      </section>

      <AdSlot />

      {/* ── Calculator Section ── */}
      <section className="tools-section">
        <div className="section-intro">
          <span className="step-label">INTERACTIVE CARD ENGINE</span>
          <h2>Select your card comparison tool</h2>
          <p>Model your annual purchases to see net rewards and fee differences in real time.</p>
        </div>

        <div className="tool-tabs">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={activeTab === i ? 'active' : ''}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab 1: Rewards Calculator ── */}
        {activeTab === 0 && (
          <div className="tool-panel">
            <div className="tool-controls">
              <RangeControl
                label="Annual spending"
                value={annualSpending}
                min={region === 'US' ? 1000 : 50000}
                max={region === 'US' ? 200000 : 2000000}
                step={region === 'US' ? 1000 : 10000}
                display={fmt(annualSpending, region)}
                onChange={setAnnualSpending}
              />
              <RangeControl
                label="Dining & groceries %"
                value={diningPct}
                min={0}
                max={80}
                step={5}
                display={`${diningPct}%`}
                onChange={setDiningPct}
              />
              <RangeControl
                label="Travel & flights %"
                value={travelPct}
                min={0}
                max={80}
                step={5}
                display={`${travelPct}%`}
                onChange={setTravelPct}
              />
            </div>

            <div className="result-panel">
              <div>
                <span>Estimated annual reward value</span>
                <strong>{fmt(estimatedRewards, region)}</strong>
                <small>Based on blended points + cash multipliers</small>
              </div>

              <div className="result-bars">
                <div className="bar-label">
                  <span>Cashback: <b>{fmt(Math.round(cashbackEst), region)}</b></span>
                  <span>Bonus value: <b>{fmt(Math.round(pointsEst - cashbackEst), region)}</b></span>
                </div>
                <div className="split-bar">
                  <span style={{ width: '55%' }} />
                  <span style={{ width: '45%' }} />
                </div>
                <small>Potential net rewards after deducting average annual card fees</small>
              </div>

              <button
                className="primary-button"
                onClick={() => openLead('Banking & Cards', estimatedRewards, brand ?? 'Card Rewards')}
              >
                Get matched card offers <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Tab 2: APR & Card Rate Comparison ── */}
        {activeTab === 1 && (
          <div className="table-card">
            <div className="table-header">
              <div>
                <h3>2026 Card APR &amp; Rewards Comparison</h3>
                <p>Publicly filed interest rates, annual fees, and signature benefits</p>
              </div>
              <span className="live-badge"><span></span> Verified Rates</span>
            </div>

            <div className="rate-table">
              <div className="table-row table-head">
                <span>Card Brand</span>
                <span>Purchase APR</span>
                <span>Core Rewards</span>
                <span>Annual Fee</span>
                <span>Recommendation</span>
              </div>

              {cards.map((card) => {
                const highlighted = isBrandMatch(card.brandKey, card.name)
                return (
                  <div
                    className="table-row"
                    key={card.name}
                    style={highlighted ? { background: 'var(--brand-light)', borderLeft: '4px solid var(--brand)' } : undefined}
                  >
                    <div>
                      <strong>{card.name}</strong>
                      {highlighted && (
                        <span style={{ marginLeft: 6, fontSize: 10, background: 'var(--brand)', color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                          Target Match
                        </span>
                      )}
                    </div>
                    <span>{card.apr}</span>
                    <span>{card.rewards}</span>
                    <span>{card.fee}</span>
                    <button
                      className="small-button"
                      onClick={() => openLead('Banking & Cards', 0, card.name)}
                    >
                      Check pre-qualify <ArrowRight size={13} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Tab 3: Payment Fees ── */}
        {activeTab === 2 && (
          <div className="tool-panel">
            <div className="tool-controls">
              <RangeControl
                label="Monthly transaction volume"
                value={monthlyVolume}
                min={region === 'US' ? 1000 : 50000}
                max={region === 'US' ? 500000 : 5000000}
                step={region === 'US' ? 1000 : 10000}
                display={fmt(monthlyVolume, region)}
                onChange={setMonthlyVolume}
              />
              <RangeControl
                label="Average order value (AOV)"
                value={avgTransaction}
                min={region === 'US' ? 10 : 100}
                max={region === 'US' ? 500 : 5000}
                step={region === 'US' ? 5 : 50}
                display={fmt(avgTransaction, region)}
                onChange={setAvgTransaction}
              />
              <div>
                <span className="field-label">Est. monthly transactions</span>
                <strong style={{ fontSize: 20, display: 'block', marginTop: 12 }}>
                  {txCount.toLocaleString()} <small style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>orders</small>
                </strong>
              </div>
            </div>

            <div className="table-card" style={{ marginTop: 20, boxShadow: 'none' }}>
              <div className="table-header">
                <div>
                  <h3>Merchant Processing Fee Benchmark</h3>
                  <p>Estimated monthly expense based on standard gateway schedules</p>
                </div>
              </div>
              <div className="rate-table">
                <div className="table-row table-head">
                  <span>Gateway</span>
                  <span>Effective Schedule</span>
                  <span>Est. Monthly Fee</span>
                  <span>Effective Rate</span>
                  <span>Merchant Action</span>
                </div>
                {[
                  { name: 'PayPal Business Commerce', schedule: region === 'US' ? '2.9% + $0.30' : '2.5% + ₹3', fee: paypalFee },
                  { name: 'Stripe Payments', schedule: region === 'US' ? '2.9% + $0.30' : '2.0% + ₹2', fee: stripeFee },
                  { name: 'Square for Retail', schedule: region === 'US' ? '2.6% + $0.10' : '1.9% + ₹1.5', fee: squareFee },
                ].map((gw) => (
                  <div className="table-row" key={gw.name}>
                    <strong>{gw.name}</strong>
                    <span>{gw.schedule}</span>
                    <strong style={{ color: 'var(--brand)' }}>{fmt(Math.round(gw.fee), region)}/mo</strong>
                    <span>{((gw.fee / monthlyVolume) * 100).toFixed(2)}%</span>
                    <button
                      className="small-button"
                      onClick={() => openLead('Banking & Cards', Math.round(gw.fee), gw.name)}
                    >
                      Compare rates <ArrowRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Future Section ── */}
        <div className="future-section">
          <div>
            <span className="step-label">COMING NEXT</span>
            <h2>Additional financial decision engines</h2>
          </div>
          <div className="future-grid">
            <div className="future-card">
              <div className="future-icon"><TrendingUp /></div>
              <strong>Balance Transfer Calculator</strong>
              <span>Compare 0% intro APR windows vs 3% transfer fees</span>
              <ChevronRight size={16} />
            </div>
            <div className="future-card">
              <div className="future-icon"><Building2 /></div>
              <strong>Debt Consolidation Tool</strong>
              <span>Model single monthly payments to pay off high-interest cards</span>
              <ChevronRight size={16} />
            </div>
            <div className="future-card">
              <div className="future-icon"><Lock /></div>
              <strong>Merchant Interchange Estimator</strong>
              <span>Analyze interchange-plus savings for high-volume retailers</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </section>

      <AdSlot />
    </>
  )
}
