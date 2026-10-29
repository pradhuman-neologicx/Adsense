'use client'

import { useState } from 'react'
import { Home, ShieldCheck, Users, Calculator, TrendingUp, Percent, ArrowRight, Check, ChevronRight, BarChart3 } from 'lucide-react'

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

/* ── Data ── */
const homeTypesUS = ['Studio Loft', '1 Bedroom', '2 Bedroom', '3 Bedroom', 'Single Family']
const homeTypesIN = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Independent Villa']

const finishUS = [
  { label: 'Standard', rate: 45, note: 'Functional & durable fixtures' },
  { label: 'Premium', rate: 85, note: 'Engineered hardwood, custom cabinetry' },
  { label: 'Luxury', rate: 150, note: 'Architectural joinery & smart automation' },
]
const finishIN = [
  { label: 'Economy', rate: 1450, note: 'Smart laminates, standard fittings' },
  { label: 'Premium', rate: 2200, note: 'Acrylic, modular kitchen & designer lights' },
  { label: 'Luxury', rate: 3400, note: 'Veneer finishes, Italian marble & false ceiling' },
]

const rooms = ['Living Room', 'Modular Kitchen', 'Master Bedroom', 'Kids Bedroom', 'Designer Wardrobes', 'False Ceiling & Cove']

const ratesUS = [
  { name: 'Wells Fargo Home Mortgage', rate30: '6.75%', rate15: '5.99%', apr: '6.82% APR', fee: '$1,250 origination' },
  { name: 'JPMorgan Chase Home Lending', rate30: '6.80%', rate15: '6.05%', apr: '6.88% APR', fee: '$1,195 origination' },
  { name: 'Bank of America Mortgage', rate30: '6.70%', rate15: '5.95%', apr: '6.78% APR', fee: '$1,200 origination' },
]

const ratesIN = [
  { name: 'State Bank of India (SBI)', homeLoan: '8.50%', personal: '11.15%', fee: '₹5,000 waiver available' },
  { name: 'HDFC Bank Ltd', homeLoan: '8.75%', personal: '10.85%', fee: '₹4,999 + GST' },
  { name: 'ICICI Bank Home Loans', homeLoan: '8.75%', personal: '10.80%', fee: '₹3,000 flat' },
  { name: 'Axis Bank Mortgage', homeLoan: '8.70%', personal: '11.25%', fee: '₹2,500 promotional' },
  { name: 'Kotak Mahindra Bank', homeLoan: '8.70%', personal: '10.99%', fee: '₹3,999 zero login' },
]

export default function HomeHub({ region, brand, openLead }: HubProps) {
  const homeTypes = region === 'US' ? homeTypesUS : homeTypesIN
  const finishes = region === 'US' ? finishUS : finishIN

  /* ── Interior estimator state ── */
  const [homeTypeIdx, setHomeTypeIdx] = useState(1) // Default to 2BHK / 1 Bed
  const [area, setArea] = useState(region === 'US' ? 1200 : 1050)
  const [selectedRooms, setSelectedRooms] = useState<string[]>(['Living Room', 'Modular Kitchen', 'Master Bedroom'])
  const [finishIdx, setFinishIdx] = useState(1) // Premium

  /* ── Mortgage state ── */
  // If brand is mortgage or loan related, default to tab 0 or 2
  const [mortgageTab, setMortgageTab] = useState(0)
  const [loanAmount, setLoanAmount] = useState(region === 'US' ? 400000 : 4500000)
  const [interestRate, setInterestRate] = useState(region === 'US' ? 6.75 : 8.5)
  const [tenure, setTenure] = useState(20)

  /* ── Eligibility state ── */
  const [monthlyIncome, setMonthlyIncome] = useState(region === 'US' ? 8500 : 120000)
  const [existingEMI, setExistingEMI] = useState(region === 'US' ? 500 : 15000)
  const [employment, setEmployment] = useState('Salaried')

  /* ── Interior calculations ── */
  const currentRate = finishes[finishIdx].rate
  const roomFactor = selectedRooms.length / rooms.length
  const rawEstimate = Math.round(area * currentRate * Math.max(roomFactor, 0.4))
  const estimateLow = Math.round(rawEstimate * 0.75)
  const estimateHigh = Math.round(rawEstimate * 1.15)

  /* ── EMI calculations ── */
  const monthlyRate = interestRate / 12 / 100
  const n = tenure * 12
  const emi = monthlyRate > 0
    ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1))
    : Math.round(loanAmount / n)

  const totalRepayment = emi * n
  const totalInterest = Math.max(0, totalRepayment - loanAmount)
  const principalPct = totalRepayment > 0 ? Math.round((loanAmount / totalRepayment) * 100) : 50

  /* ── Eligibility calculations ── */
  const netIncome = Math.max(0, monthlyIncome - existingEMI)
  const maxEMI = netIncome * 0.50
  const maxEligibility = monthlyRate > 0
    ? Math.round((maxEMI * (Math.pow(1 + monthlyRate, n) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, n)))
    : Math.round(maxEMI * n)

  const toggleRoom = (room: string) => {
    setSelectedRooms(prev =>
      prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
    )
  }

  const mortgageTabs = ['EMI calculator', 'Borrowing eligibility', 'Lender comparison']

  const isBrandMatch = (name: string) => {
    if (!brand) return false
    const b = brand.toLowerCase()
    return name.toLowerCase().includes(b)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow"><Home size={16} /> Home Interior, Remodeling &amp; Mortgage</span>
          <h1>
            Know your home costs — <em>before you build.</em>
          </h1>
          <p>
            Get instant room-by-room remodeling estimates and compare pre-qualified home loan and refinance rates across leading lenders.
          </p>

          <div className="trust-row">
            <span><ShieldCheck size={16} /> 100% Free &amp; Independent</span>
            <span><Users size={16} /> 15,000+ quotes estimated</span>
          </div>
        </div>

        <div className="hero-note">
          <div className="note-icon"><BarChart3 size={20} /></div>
          <strong>Clarity before commitment</strong>
          <span>Plan realistic renovation budgets with zero sales pressure.</span>
        </div>
      </section>

      <AdSlot />

      {/* ── Section 1: Interior Cost Estimator ── */}
      <section className="estimator-layout">
        {/* LEFT: Calculator Card */}
        <div className="calculator-card">
          <div className="card-heading">
            <div>
              <span className="step-label">STEP 1 OF 3</span>
              <h2>Customize your home specifications</h2>
            </div>
            <span className="progress-pill">Instant Estimate</span>
          </div>

          {/* Field 1: Home layout */}
          <div className="field-block">
            <label className="field-label">Home layout &amp; floor plan</label>
            <div className="choice-grid">
              {homeTypes.map((t, i) => (
                <button
                  key={t}
                  className={`choice-button${homeTypeIdx === i ? ' selected' : ''}`}
                  onClick={() => setHomeTypeIdx(i)}
                >
                  {t} {homeTypeIdx === i && <Check size={13} />}
                </button>
              ))}
            </div>
          </div>

          {/* Field 2: Carpet Area */}
          <div className="field-block">
            <div className="range-label">
              <label className="field-label">Carpet area</label>
              <strong>{area.toLocaleString()} <small>sq. ft.</small></strong>
            </div>
            <input
              className="range-input"
              type="range"
              min={region === 'US' ? 400 : 450}
              max={region === 'US' ? 5000 : 4000}
              step={50}
              value={area}
              onChange={e => setArea(Number(e.target.value))}
            />
            <div className="range-hints">
              <span>{region === 'US' ? '400 sq. ft.' : '450 sq. ft.'}</span>
              <span>{region === 'US' ? '5,000 sq. ft.' : '4,000 sq. ft.'}</span>
            </div>
          </div>

          {/* Field 3: Rooms checklist */}
          <div className="field-block">
            <label className="field-label">Spaces &amp; scope included in estimate</label>
            <div className="check-grid">
              {rooms.map(room => (
                <label key={room} className="check-option">
                  <input
                    type="checkbox"
                    checked={selectedRooms.includes(room)}
                    onChange={() => toggleRoom(room)}
                  />
                  <span className="custom-check">
                    {selectedRooms.includes(room) && <Check size={13} />}
                  </span>
                  <span>{room}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Field 4: Quality finish */}
          <div className="field-block">
            <label className="field-label">Material &amp; finish tier</label>
            <div className="quality-grid">
              {finishes.map((f, i) => (
                <button
                  key={f.label}
                  className={`quality-button${finishIdx === i ? ' selected' : ''}`}
                  onClick={() => setFinishIdx(i)}
                >
                  <span className={`quality-dot ${f.label.toLowerCase()}`} />
                  <span>
                    <strong>{f.label} ({fmt(f.rate, region)}/sq.ft)</strong>
                    <small>{f.note}</small>
                  </span>
                  {finishIdx === i && <Check size={15} style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </div>
          </div>

          <button
            className="primary-button full-button"
            onClick={() => openLead('Home & Mortgage', rawEstimate, `${homeTypes[homeTypeIdx]} Interior`)}
          >
            Unlock room-by-room quote &amp; PDF breakdown <ArrowRight size={17} />
          </button>
        </div>

        {/* RIGHT: Estimate Sidebar */}
        <aside className="estimate-card">
          <div className="estimate-top">
            <span>Estimated Budget Range</span>
            <span className="live-dot">● Live Benchmark</span>
          </div>

          <div className="estimate-amount">
            {fmt(estimateLow, region)} <span>–</span> {fmt(estimateHigh, region)}
          </div>
          <p>
            for a {homeTypes[homeTypeIdx]} · {area.toLocaleString()} sq. ft. space
          </p>

          <div className="estimate-divider" />

          <div className="estimate-list">
            <div>
              <span>Rooms selected</span>
              <strong>{selectedRooms.length} of {rooms.length} spaces</strong>
            </div>
            <div>
              <span>Material grade</span>
              <strong>{finishes[finishIdx].label} Finish</strong>
            </div>
            <div>
              <span>Confidence model</span>
              <strong>Regional contractor index</strong>
            </div>
          </div>

          <div className="unlock-box">
            <ShieldCheck size={18} />
            <span>Submit to receive detailed itemized PDF bill of materials and connect with vetted local contractors.</span>
          </div>
        </aside>
      </section>

      <AdSlot />

      {/* ── Section 2: Mortgage & Financing Suite ── */}
      <section className="tools-section">
        <div className="section-intro">
          <span className="step-label">MORTGAGE &amp; FINANCE TOOLKIT</span>
          <h2>Calculate your home loan &amp; refinance options</h2>
          <p>Model monthly EMIs, debt-to-income eligibility, and compare current mortgage rates.</p>
        </div>

        <div className="tool-tabs">
          {mortgageTabs.map((t, i) => (
            <button
              key={t}
              className={mortgageTab === i ? 'active' : ''}
              onClick={() => setMortgageTab(i)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Tab 1: EMI Calculator ── */}
        {mortgageTab === 0 && (
          <div className="tool-panel">
            <div className="tool-controls">
              <RangeControl
                label="Home loan amount"
                value={loanAmount}
                min={region === 'US' ? 50000 : 500000}
                max={region === 'US' ? 2000000 : 50000000}
                step={region === 'US' ? 25000 : 250000}
                display={fmt(loanAmount, region)}
                onChange={setLoanAmount}
              />
              <RangeControl
                label="Interest rate"
                value={interestRate}
                min={3}
                max={15}
                step={0.1}
                display={`${interestRate.toFixed(2)}% p.a.`}
                onChange={setInterestRate}
              />
              <RangeControl
                label="Loan tenure"
                value={tenure}
                min={5}
                max={30}
                step={1}
                display={`${tenure} years`}
                onChange={setTenure}
              />
            </div>

            <div className="result-panel">
              <div>
                <span>Monthly EMI repayment</span>
                <strong>{fmt(emi, region)}<small style={{ fontSize: 13 }}>/mo</small></strong>
                <small>Total repayment: {fmt(totalRepayment, region)}</small>
              </div>

              <div className="result-bars">
                <div className="bar-label">
                  <span>Principal: <b>{fmt(loanAmount, region)}</b></span>
                  <span>Interest: <b>{fmt(totalInterest, region)}</b></span>
                </div>
                <div className="split-bar">
                  <span style={{ width: `${principalPct}%` }} />
                  <span />
                </div>
                <small>Principal forms {principalPct}% · Interest forms {100 - principalPct}% over {tenure} years</small>
              </div>

              <button
                className="primary-button"
                onClick={() => openLead('Home & Mortgage', loanAmount, 'Mortgage Rate')}
              >
                Get pre-approved rate <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Tab 2: Eligibility Check ── */}
        {mortgageTab === 1 && (
          <div className="tool-panel">
            <div className="eligibility-grid">
              <label>
                Monthly household income
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={e => setMonthlyIncome(Number(e.target.value))}
                />
              </label>

              <label>
                Existing monthly loan EMIs / Debt
                <input
                  type="number"
                  value={existingEMI}
                  onChange={e => setExistingEMI(Number(e.target.value))}
                />
              </label>

              <label>
                Employment profile
                <select
                  value={employment}
                  onChange={e => setEmployment(e.target.value)}
                >
                  <option value="Salaried">Salaried (Corporate / W2)</option>
                  <option value="Self-employed">Self-Employed / Business Owner (1099)</option>
                  <option value="Professional">Doctor / Architect / CA</option>
                </select>
              </label>
            </div>

            <div className="eligibility-result">
              <span>Estimated maximum borrowing capacity</span>
              <strong>{fmt(maxEligibility, region)}</strong>
              <small>
                Calculated on a prudent 50% FOIR / DTI guideline at current {interestRate}% over {tenure} years. Your credit score will determine the final underwriting tier.
              </small>
              <button
                className="primary-button"
                onClick={() => openLead('Home & Mortgage', maxEligibility, 'Loan Eligibility')}
              >
                Check official eligibility with loan specialist <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── Tab 3: Compare Rates ── */}
        {mortgageTab === 2 && (
          <div className="table-card">
            <div className="table-header">
              <div>
                <h3>Compare Mortgage &amp; Home Loan Rates</h3>
                <p>Indicative APRs, processing fee schedules, and special terms</p>
              </div>
              <span className="live-badge"><span></span> Verified Lenders</span>
            </div>

            <div className="rate-table">
              {region === 'US' ? (
                <>
                  <div className="table-row table-head">
                    <span>Lender</span>
                    <span>30-Year Fixed</span>
                    <span>15-Year Fixed</span>
                    <span>Effective APR</span>
                    <span>Quote Action</span>
                  </div>
                  {ratesUS.map((row) => {
                    const highlighted = isBrandMatch(row.name)
                    return (
                      <div
                        key={row.name}
                        className="table-row"
                        style={highlighted ? { background: 'var(--brand-light)', borderLeft: '4px solid var(--brand)' } : undefined}
                      >
                        <div>
                          <strong>{row.name}</strong>
                          {highlighted && (
                            <span style={{ marginLeft: 6, fontSize: 10, background: 'var(--brand)', color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                              Match
                            </span>
                          )}
                        </div>
                        <span>{row.rate30}</span>
                        <span>{row.rate15}</span>
                        <span>{row.apr}</span>
                        <button
                          className="small-button"
                          onClick={() => openLead('Home & Mortgage', loanAmount, row.name)}
                        >
                          Check rate <ArrowRight size={13} />
                        </button>
                      </div>
                    )
                  })}
                </>
              ) : (
                <>
                  <div className="table-row table-head">
                    <span>Bank / Financial Institution</span>
                    <span>Home Loan ROI</span>
                    <span>Personal / Renovation</span>
                    <span>Processing Fee</span>
                    <span>Quote Action</span>
                  </div>
                  {ratesIN.map((row) => {
                    const highlighted = isBrandMatch(row.name)
                    return (
                      <div
                        key={row.name}
                        className="table-row"
                        style={highlighted ? { background: 'var(--brand-light)', borderLeft: '4px solid var(--brand)' } : undefined}
                      >
                        <div>
                          <strong>{row.name}</strong>
                          {highlighted && (
                            <span style={{ marginLeft: 6, fontSize: 10, background: 'var(--brand)', color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                              Match
                            </span>
                          )}
                        </div>
                        <span>{row.homeLoan}</span>
                        <span>{row.personal}</span>
                        <span>{row.fee}</span>
                        <button
                          className="small-button"
                          onClick={() => openLead('Home & Mortgage', loanAmount, row.name)}
                        >
                          Check eligibility <ArrowRight size={13} />
                        </button>
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Future Section ── */}
        <div className="future-section">
          <div>
            <span className="step-label">COMING NEXT</span>
            <h2>More property &amp; finance calculators</h2>
          </div>
          <div className="future-grid">
            <div className="future-card">
              <div className="future-icon"><Calculator /></div>
              <strong>Fixed Deposit / CD Ladder</strong>
              <span>Forecast compound interest with monthly and quarterly payouts</span>
              <ChevronRight size={16} />
            </div>
            <div className="future-card">
              <div className="future-icon"><TrendingUp /></div>
              <strong>Mortgage Refinance Breakeven</strong>
              <span>Determine exact months to recover closing costs when lowering rates</span>
              <ChevronRight size={16} />
            </div>
            <div className="future-card">
              <div className="future-icon"><Percent /></div>
              <strong>Rental Yield &amp; Cap Rate Estimator</strong>
              <span>Model net rental cashflow against property mortgage payments</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </section>

      <AdSlot />
    </>
  )
}
