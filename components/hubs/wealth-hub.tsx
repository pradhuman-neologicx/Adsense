'use client'

import { useState } from 'react'
import { Landmark, TrendingUp, ArrowRight, PiggyBank, BarChart3, Calculator, ChevronRight, Check } from 'lucide-react'

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

const usBrokers = [
  { name: 'Fidelity Investments', brandKey: 'fidelity', tradeFee: '$0 (Stocks/ETFs)', expenseRatio: '0.015%', advisorFee: '0.35%', minInvestment: '$0' },
  { name: 'Charles Schwab Corporation', brandKey: 'schwab', tradeFee: '$0 (Online Equities)', expenseRatio: '0.020%', advisorFee: '0.28%', minInvestment: '$0' },
  { name: 'Vanguard Group', brandKey: 'vanguard', tradeFee: '$0 (ETFs/Index)', expenseRatio: '0.030%', advisorFee: '0.30%', minInvestment: '$3,000' },
]

const inBrokers = [
  { name: 'Zerodha Broking', brandKey: 'zerodha', tradeFee: '₹0 Delivery / ₹20 Intraday', expenseRatio: '0.05%', advisorFee: 'N/A (Discount)', minInvestment: '₹0' },
  { name: 'Groww Invest', brandKey: 'groww', tradeFee: '₹0 Direct MF / ₹20 Equity', expenseRatio: '0.05%', advisorFee: 'N/A (Self-serve)', minInvestment: '₹100' },
  { name: 'ICICI Direct Prime', brandKey: 'icici', tradeFee: '₹20 per trade or 0.15%', expenseRatio: '0.10%', advisorFee: '0.50% (Full)', minInvestment: '₹0' },
]

export default function WealthHub({ region, brand, openLead }: HubProps) {
  // If brand matches brokerage, default to tab 1 (Fee comparison)
  const defaultTab = brand?.toLowerCase().includes('fidelity') || brand?.toLowerCase().includes('schwab') || brand?.toLowerCase().includes('broker') ? 1 : 0
  const [activeTab, setActiveTab] = useState(defaultTab)

  // Retirement calculator state
  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [monthlyContrib, setMonthlyContrib] = useState(region === 'US' ? 1000 : 20000)
  const [annualReturn, setAnnualReturn] = useState(9)

  // SIP / 401(k) planner state
  const [sipAmount, setSipAmount] = useState(region === 'US' ? 1500 : 25000)
  const [sipDuration, setSipDuration] = useState(15)
  const [sipReturn, setSipReturn] = useState(11)

  const tabs = ['Retirement calculator', 'Fee comparison', region === 'US' ? '401(k) planner' : 'SIP growth planner']

  // Retirement compound math
  const yearsToRetire = Math.max(1, retireAge - currentAge)
  const totalMonths = yearsToRetire * 12
  const monthlyRate = annualReturn / 100 / 12
  const futureValue = monthlyContrib * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate)
  const corpus = Math.round(futureValue)
  const totalContributed = monthlyContrib * totalMonths
  const returnsEarned = Math.max(0, corpus - totalContributed)

  // SIP / 401(k) math
  const sipMonths = sipDuration * 12
  const sipMonthlyRate = sipReturn / 100 / 12
  const sipTotalInvested = sipAmount * sipMonths
  const sipFutureValue = sipAmount * ((Math.pow(1 + sipMonthlyRate, sipMonths) - 1) / sipMonthlyRate) * (1 + sipMonthlyRate)
  const sipCorpus = Math.round(sipFutureValue)
  const sipReturns = Math.max(0, sipCorpus - sipTotalInvested)

  const brokers = region === 'US' ? usBrokers : inBrokers

  const isBrandMatch = (brokerBrandKey: string, brokerName: string) => {
    if (!brand) return false
    const b = brand.toLowerCase()
    return brokerBrandKey.includes(b) || b.includes(brokerBrandKey) || brokerName.toLowerCase().includes(b)
  }

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="finance-hero">
        <div className="hero-copy">
          <span className="eyebrow"><Landmark size={15} /> Wealth &amp; Investments</span>
          <h1>
            Brokerage fee &amp; retirement calculator — <em>Compare Top Firms.</em>
          </h1>
          <p>
            Audit expense ratios, project 10-to-30-year 401(k) and SIP compounding, and compare low-cost brokerages including Fidelity Investments and Charles Schwab.
          </p>
          <div className="trust-row">
            <span><Check size={16} /> SEC / SEBI fee compliant data</span>
            <span><Check size={16} /> Real compound interest modeling</span>
          </div>
        </div>

        <div className="finance-stat">
          <span>Avg. lifetime fee saved</span>
          <strong>{region === 'US' ? '$12,400' : '₹2.1L'}</strong>
          <small>By minimizing fund expense ratios &amp; advisory drag</small>
        </div>
      </section>

      <AdSlot />

      {/* ── Calculator Section ── */}
      <section className="tools-section">
        <div className="section-intro">
          <span className="step-label">WEALTH &amp; RETIREMENT SUITE</span>
          <h2>Model your portfolio trajectory</h2>
          <p>Calculate realistic balances with dividend reinvestment and fee mitigation.</p>
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

        {/* ── Tab 1: Retirement Calculator ── */}
        {activeTab === 0 && (
          <div className="tool-panel">
            <div className="tool-controls">
              <RangeControl
                label="Current age"
                value={currentAge}
                min={20}
                max={60}
                step={1}
                display={`${currentAge} yrs`}
                onChange={setCurrentAge}
              />
              <RangeControl
                label="Target retirement age"
                value={retireAge}
                min={Math.max(currentAge + 1, 45)}
                max={75}
                step={1}
                display={`${retireAge} yrs`}
                onChange={setRetireAge}
              />
              <RangeControl
                label="Monthly contribution"
                value={monthlyContrib}
                min={region === 'US' ? 100 : 2000}
                max={region === 'US' ? 10000 : 150000}
                step={region === 'US' ? 100 : 2000}
                display={fmt(monthlyContrib, region)}
                onChange={setMonthlyContrib}
              />
            </div>

            <div className="tool-controls" style={{ paddingTop: 0 }}>
              <RangeControl
                label="Expected annual growth rate"
                value={annualReturn}
                min={4}
                max={15}
                step={0.5}
                display={`${annualReturn.toFixed(1)}% p.a.`}
                onChange={setAnnualReturn}
              />
            </div>

            <div className="result-panel">
              <div>
                <span>Projected retirement corpus</span>
                <strong>{fmt(corpus, region)}</strong>
                <small>Accumulated over {yearsToRetire} years until age {retireAge}</small>
              </div>

              <div className="result-bars">
                <div className="bar-label">
                  <span>Your contributions: <b>{fmt(totalContributed, region)}</b></span>
                  <span>Compound returns: <b>{fmt(returnsEarned, region)}</b></span>
                </div>
                <div className="split-bar">
                  <span style={{ width: `${Math.max(10, Math.min(90, Math.round((totalContributed / corpus) * 100)))}%` }} />
                  <span />
                </div>
                <small>Growth returns account for {Math.round((returnsEarned / corpus) * 100)}% of your estimated nest egg</small>
              </div>

              <button
                className="primary-button"
                onClick={() => openLead('Wealth & Investing', corpus, brand ?? 'Portfolio Review')}
              >
                Request certified advisor review <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Tab 2: Brokerage Fee Comparison ── */}
        {activeTab === 1 && (
          <div className="table-card">
            <div className="table-header">
              <div>
                <h3>Brokerage Platform Fee Comparison</h3>
                <p>Transparent breakdown of transaction fees, expense ratios, and advisory management costs</p>
              </div>
              <span className="live-badge"><span></span> Verified Benchmarks</span>
            </div>

            <div className="rate-table">
              <div className="table-row table-head">
                <span>Brokerage</span>
                <span>Trade Commission</span>
                <span>Avg. Index Expense</span>
                <span>Advisory Fee</span>
                <span>Investor Action</span>
              </div>

              {brokers.map((broker) => {
                const highlighted = isBrandMatch(broker.brandKey, broker.name)
                return (
                  <div
                    className="table-row"
                    key={broker.name}
                    style={highlighted ? { background: 'oklch(0.93 0.05 258)', borderLeft: '4px solid var(--brand)' } : undefined}
                  >
                    <div>
                      <strong>{broker.name}</strong>
                      {highlighted && (
                        <span style={{ marginLeft: 6, fontSize: 10, background: 'var(--brand)', color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                          Active Match
                        </span>
                      )}
                    </div>
                    <span>{broker.tradeFee}</span>
                    <span>{broker.expenseRatio}</span>
                    <span>{broker.advisorFee}</span>
                    <button
                      className="small-button"
                      onClick={() => openLead('Wealth & Investing', 0, broker.name)}
                    >
                      Compare account <ArrowRight size={13} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Tab 3: SIP / 401(k) Planner ── */}
        {activeTab === 2 && (
          <div className="tool-panel">
            <div className="tool-controls">
              <RangeControl
                label={region === 'US' ? 'Monthly 401(k) deposit' : 'Monthly SIP contribution'}
                value={sipAmount}
                min={region === 'US' ? 200 : 1000}
                max={region === 'US' ? 5000 : 100000}
                step={region === 'US' ? 100 : 1000}
                display={fmt(sipAmount, region)}
                onChange={setSipAmount}
              />
              <RangeControl
                label="Investment duration"
                value={sipDuration}
                min={3}
                max={30}
                step={1}
                display={`${sipDuration} years`}
                onChange={setSipDuration}
              />
              <RangeControl
                label="Assumed annual return"
                value={sipReturn}
                min={6}
                max={16}
                step={0.5}
                display={`${sipReturn.toFixed(1)}% p.a.`}
                onChange={setSipReturn}
              />
            </div>

            <div className="result-panel">
              <div>
                <span>Estimated maturity wealth</span>
                <strong>{fmt(sipCorpus, region)}</strong>
                <small>Invested principal: {fmt(sipTotalInvested, region)}</small>
              </div>

              <div className="result-bars">
                <div className="bar-label">
                  <span>Principal: <b>{fmt(sipTotalInvested, region)}</b></span>
                  <span>Wealth gained: <b>{fmt(sipReturns, region)}</b></span>
                </div>
                <div className="split-bar">
                  <span style={{ width: `${Math.round((sipTotalInvested / sipCorpus) * 100)}%` }} />
                  <span />
                </div>
                <small>Disciplined monthly compounding produces a {((sipCorpus / sipTotalInvested) * 100).toFixed(0)}% total return</small>
              </div>

              <button
                className="primary-button"
                onClick={() => openLead('Wealth & Investing', sipCorpus, brand ?? '401k/SIP Planner')}
              >
                Get personalized wealth blueprint <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Future Section ── */}
        <div className="future-section">
          <div>
            <span className="step-label">UPCOMING ENGINES</span>
            <h2>Automated wealth optimization</h2>
          </div>
          <div className="future-grid">
            <div className="future-card">
              <div className="future-icon"><BarChart3 /></div>
              <strong>Tax-Loss Harvesting Estimator</strong>
              <span>Simulate tax offset savings across capital gains and dividend yields</span>
              <ChevronRight size={16} />
            </div>
            <div className="future-card">
              <div className="future-icon"><Calculator /></div>
              <strong>Robo-Advisor Drag Calculator</strong>
              <span>Calculate how 0.25% vs 0.89% AUM fees impact 20-year balances</span>
              <ChevronRight size={16} />
            </div>
            <div className="future-card">
              <div className="future-icon"><PiggyBank /></div>
              <strong>Dividend Compounding Wheel</strong>
              <span>Model DRIP returns and quarterly dividend payment schedules</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </section>

      <AdSlot />
    </>
  )
}
