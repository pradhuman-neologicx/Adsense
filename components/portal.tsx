'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ChevronDown, Sparkles } from 'lucide-react'
import { Navbar, navHubs, NavHubId } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LeadModal } from '@/components/lead-modal'

type HubId = NavHubId
type Region = 'US' | 'IN'

const brandToHub: Record<string, HubId> = {
  citi: 'banking',
  'capital-one': 'banking',
  amex: 'banking',
  paypal: 'banking',
  'cards-compare': 'banking',
  cards: 'banking',
  fidelity: 'wealth',
  'charles-schwab': 'wealth',
  schwab: 'wealth',
  'brokerage-compare': 'wealth',
  wealth: 'wealth',
  dell: 'tech',
  mcafee: 'tech',
  ios: 'tech',
  amazon: 'tech',
  aws: 'tech',
  'tech-compare': 'tech',
  home: 'home',
  interior: 'home',
  mortgage: 'home',
  refinance: 'home',
}

const campaignPills = [
  { label: 'All Hubs', hub: 'banking' as const, brand: '' },
  { label: 'Citi vs Amex Cards', hub: 'banking' as const, brand: 'citi' },
  { label: 'Capital One APR', hub: 'banking' as const, brand: 'capital-one' },
  { label: 'PayPal Fees', hub: 'banking' as const, brand: 'paypal' },
  { label: 'Fidelity vs Schwab', hub: 'wealth' as const, brand: 'fidelity' },
  { label: '401(k) / SIP Wealth', hub: 'wealth' as const, brand: 'wealth' },
  { label: 'Dell Workstations', hub: 'tech' as const, brand: 'dell' },
  { label: 'McAfee Business', hub: 'tech' as const, brand: 'mcafee' },
  { label: 'AWS Cloud Pricing', hub: 'tech' as const, brand: 'amazon' },
  { label: 'Home Interior Quote', hub: 'home' as const, brand: 'interior' },
  { label: 'Mortgage & Refinance', hub: 'home' as const, brand: 'mortgage' },
]

function HubSkeleton() {
  return (
    <div className="hub-skeleton">
      <div className="skeleton-block" />
      <div className="skeleton-block short" />
    </div>
  )
}

const BankingHub = dynamic(() => import('@/components/hubs/banking-hub'), { loading: () => <HubSkeleton /> })
const WealthHub = dynamic(() => import('@/components/hubs/wealth-hub'), { loading: () => <HubSkeleton /> })
const TechHub = dynamic(() => import('@/components/hubs/tech-hub'), { loading: () => <HubSkeleton /> })
const HomeHub = dynamic(() => import('@/components/hubs/home-hub'), { loading: () => <HubSkeleton /> })

function PortalInner() {
  const searchParams = useSearchParams()
  const hubParam = searchParams.get('hub') as HubId | null
  const brandParam = searchParams.get('brand') || searchParams.get('keyword')

  // Resolve initial hub based on URL params
  const resolveInitialHub = (): HubId => {
    if (hubParam && navHubs.some(h => h.id === hubParam)) return hubParam
    if (brandParam) {
      const lower = brandParam.toLowerCase()
      for (const [key, mappedHub] of Object.entries(brandToHub)) {
        if (lower.includes(key)) return mappedHub
      }
    }
    return 'banking'
  }

  const [region, setRegion] = useState<Region>('IN')
  const [activeHub, setActiveHub] = useState<HubId>(resolveInitialHub)
  const [activeBrand, setActiveBrand] = useState<string | null>(brandParam)
  const [modal, setModal] = useState<{ hubType: string; value: number; brand?: string; keyword?: string } | null>(null)

  // Sync state if URL search parameters change dynamically
  useEffect(() => {
    if (hubParam && navHubs.some(h => h.id === hubParam)) {
      setActiveHub(hubParam)
    } else if (brandParam) {
      const lower = brandParam.toLowerCase()
      for (const [key, mappedHub] of Object.entries(brandToHub)) {
        if (lower.includes(key)) {
          setActiveHub(mappedHub)
          break
        }
      }
    }
    if (brandParam) setActiveBrand(brandParam)
  }, [hubParam, brandParam])

  function openLead(hubType: string, value: number, brand?: string) {
    setModal({
      hubType,
      value,
      brand: brand || activeBrand || undefined,
      keyword: activeBrand || brandParam || undefined,
    })
  }

  function handlePillClick(pillHub: HubId, pillBrand: string) {
    setActiveHub(pillHub)
    setActiveBrand(pillBrand || null)
  }

  return (
    <div className="portal-shell">
      {/* ── Reusable Polished Navbar ── */}
      <Navbar
        region={region}
        setRegion={setRegion}
        activeHub={activeHub}
        onSelectHub={hubId => {
          setActiveHub(hubId)
          setActiveBrand(null)
        }}
        onOpenLead={openLead}
      />

      {/* ── Dynamic AdSense Safe Campaign Filter Pill Bar ── */}
      <div className="campaign-bar-wrapper">
        <div className="campaign-bar-inner">
          <span className="campaign-bar-label">
            <Sparkles size={13} /> Trending Comparisons:
          </span>
          <div className="campaign-pills">
            {campaignPills.map(pill => {
              const isActive =
                (pill.brand === '' && !activeBrand && activeHub === pill.hub) ||
                (pill.brand !== '' && activeBrand?.toLowerCase().includes(pill.brand))
              return (
                <button
                  key={pill.label}
                  type="button"
                  className={`campaign-pill${isActive ? ' active' : ''}`}
                  onClick={() => handlePillClick(pill.hub, pill.brand)}
                >
                  {pill.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Main Interactive Content ── */}
      <main className="main-content">
        <HubContent hub={activeHub} region={region} brand={activeBrand} openLead={openLead} />

        {/* ── Hub Specific FAQs ── */}
        <section className="faq-section">
          <div>
            <span className="step-label">EDITORIAL INTEGRITY</span>
            <h2>Frequently asked questions</h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginTop: 10 }}>
              Independent research guidelines and calculation methodologies.
            </p>
          </div>
          <div className="faq-list">
            {getFAQs(activeHub).map((faq, i) => (
              <details key={faq.q} open={i === 0}>
                <summary>
                  {faq.q}
                  <ChevronDown size={17} />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* ── Reusable Footer with Rule 3 Trademark Disclaimer ── */}
      <Footer showDisclaimerBanner={true} />

      {/* ── Lead Capture Modal ── */}
      {modal && (
        <LeadModal
          {...modal}
          region={region}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}

function HubContent({
  hub,
  region,
  brand,
  openLead,
}: {
  hub: HubId
  region: Region
  brand: string | null
  openLead: (hubType: string, value: number, brand?: string) => void
}) {
  switch (hub) {
    case 'banking':
      return <BankingHub region={region} brand={brand} openLead={openLead} />
    case 'wealth':
      return <WealthHub region={region} brand={brand} openLead={openLead} />
    case 'tech':
      return <TechHub region={region} brand={brand} openLead={openLead} />
    case 'home':
      return <HomeHub region={region} brand={brand} openLead={openLead} />
  }
}

function getFAQs(hub: HubId) {
  const shared = {
    q: 'Is CompareGrid affiliated with Citi, Dell, Fidelity, or McAfee?',
    a: 'No. CompareGrid is an entirely independent consumer comparison and fee calculation portal. We do not represent, hold affiliation with, or provide official technical support or customer service for any listed brand. All product names, logos, and trademarks are property of their respective owners.',
  }
  const map: Record<HubId, { q: string; a: string }[]> = {
    banking: [
      {
        q: 'How are the credit card rewards & APR figures calculated?',
        a: 'Our models use publicly published issuer schedules for purchase APR ranges, annual fees, and category multipliers (such as 4% dining on Amex Gold or 2% flat on Citi Double Cash). Actual approval and credit limits depend on your credit profile upon applying directly with the bank.',
      },
      {
        q: 'Are payment gateway fee estimates inclusive of international cards?',
        a: 'The estimates shown represent standard domestic processing schedules (e.g. 2.9% + $0.30 for PayPal/Stripe in the US; 2.0% – 2.5% in India). Cross-border currency conversion fees and interchange-plus adjustments may apply to international orders.',
      },
      shared,
      {
        q: 'How does CompareGrid monetize credit card recommendations?',
        a: 'We may receive referral compensation from financial affiliate networks (such as Impact or CJ Affiliate) when readers pre-qualify or submit approved applications. This never influences the mathematical accuracy of our fee calculators.',
      },
    ],
    wealth: [
      {
        q: 'How do you calculate 401(k) and SIP compound returns?',
        a: 'We use standard monthly compound interest formulas assuming monthly contributions and continuous dividend reinvestment at your chosen expected return rate. Calculations illustrate mathematical potential and are not guaranteed future returns.',
      },
      {
        q: 'What is the fee difference between Fidelity and Charles Schwab?',
        a: 'Both brokerages offer $0 commission trading on US equities and ETFs. The distinction lies in proprietary fund expense ratios (e.g. Fidelity ZERO funds vs Schwab index funds) and managed portfolio tiers (Schwab Intelligent Portfolios vs Fidelity Go).',
      },
      shared,
      {
        q: 'Can I get a personalized portfolio review from an advisor?',
        a: 'Yes. By submitting your target corpus in our lead form, we match you with a vetted, certified financial planner (CFP/RIA) licensed in your jurisdiction.',
      },
    ],
    tech: [
      {
        q: 'Are Dell hardware prices based on consumer or B2B enterprise tiers?',
        a: 'Our configurator uses Dell Technologies business workstation baselines (OptiPlex, Precision, Latitude) and includes commercial 3-year ProSupport next-business-day onsite warranties rather than retail consumer warranties.',
      },
      {
        q: 'Do you provide official technical support or virus removal?',
        a: 'ABSOLUTELY NOT. CompareGrid is strictly a software and hardware price comparison portal. We never provide tech support helplines, remote desktop assistance, or password resets. Please visit official vendor portals for direct support.',
      },
      shared,
      {
        q: 'How does the AWS cloud pricing calculator estimate storage and compute?',
        a: 'We benchmark on-demand EC2 Linux instances ($0.05/hr reference) and standard S3 storage ($0.023/GB/mo) in US East and India regions. We do not account for reserved instance discounts or savings plans in this baseline tool.',
      },
    ],
    home: [
      {
        q: 'How accurate is the room-by-room interior cost estimate?',
        a: 'Our estimations are calibrated against current material indexes (acrylics, veneer, laminates) and regional labor costs. For a 2 BHK or 3 BHK, estimates typically fall within a 15% tolerance of final contractor quotations.',
      },
      {
        q: 'Are the displayed mortgage interest rates fixed or floating?',
        a: 'For US lenders (Wells Fargo, Chase, BofA), rates reflect 30-year and 15-year fixed conventional benchmarks. For Indian lenders (SBI, HDFC, ICICI), rates reflect current floating Repo-Linked Lending Rates (RLLR).',
      },
      shared,
      {
        q: 'How do I obtain the itemized bill of materials PDF?',
        a: 'Submit your home size and room selection through the estimator form. You will receive an instant itemized breakdown and can request up to 3 vetted local contractor bids.',
      },
    ],
  }
  return map[hub]
}

export default function Portal() {
  return (
    <Suspense
      fallback={
        <div className="portal-shell">
          <div className="hub-skeleton">
            <div className="skeleton-block" />
          </div>
        </div>
      }
    >
      <PortalInner />
    </Suspense>
  )
}
