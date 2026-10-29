'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Check, Mail, MapPin, Phone, ShieldCheck, BarChart3, CreditCard, Landmark, Monitor, Home } from 'lucide-react'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const articles = [
  {
    title: 'Citi Double Cash vs Amex Gold: 2026 Rewards & Annual Fee Breakdown',
    category: 'Credit Cards',
    read: '6 min read',
    snippet: 'Compare cashback percentages, dining credits, and APR ranges to pick the card that maximizes your lifestyle spending.',
    hub: 'banking',
  },
  {
    title: 'Fidelity vs Charles Schwab: Best Brokerage for Retirement in 2026',
    category: 'Wealth & Investing',
    read: '7 min read',
    snippet: 'An in-depth fee comparison of expense ratios, robo-advisors, and 401(k) rollover features between top US brokerages.',
    hub: 'wealth',
  },
  {
    title: 'Enterprise Workstation Guide: Dell OptiPlex vs Precision vs Mac M-Series',
    category: 'Tech & Hardware',
    read: '5 min read',
    snippet: 'Configure business-grade desktop fleets with optimal RAM, CPU, and deployment management without overspending.',
    hub: 'tech',
  },
  {
    title: 'Home Interior Cost Estimator: 2 BHK & 3 BHK Realistic Budgets',
    category: 'Home & Living',
    read: '8 min read',
    snippet: 'From modular kitchens to false ceilings, calculate realistic interior remodeling costs across Economy, Premium, and Luxury finishes.',
    hub: 'home',
  },
  {
    title: 'PayPal Business vs Stripe: Merchant Fee Comparison for Growing Stores',
    category: 'Payments',
    read: '5 min read',
    snippet: 'Understand domestic and international payment processing fees, chargeback protection, and payout timelines.',
    hub: 'banking',
  },
  {
    title: 'Endpoint Cybersecurity: McAfee Business vs Bitdefender GravityZone',
    category: 'Cybersecurity',
    read: '6 min read',
    snippet: 'Protect company workstations from ransomware and identity theft with cloud-managed business antivirus tiers.',
    hub: 'tech',
  },
]

export function PageFrame({
  title,
  eyebrow,
  description,
  children,
}: {
  title: string
  eyebrow: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="portal-shell">
      <Navbar />

      <main className="main-content">
        <section className="page-hero">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </section>
        {children}
      </main>

      <Footer showDisclaimerBanner={true} />
    </div>
  )
}

export function InteriorPage() {
  return (
    <PageFrame
      eyebrow="Home & Living"
      title="Plan your space with total cost clarity."
      description="Calculate comprehensive remodeling costs, evaluate room-by-room inclusions, and explore competitive mortgage rates."
    >
      <div className="page-grid">
        <div className="feature-card">
          <span className="step-label">INTERACTIVE CALCULATOR</span>
          <h2>Home Interior Cost Estimator</h2>
          <p>
            Choose your layout (Studio to 4 BHK/Villa), carpet area, and desired finish quality to receive an instant transparent budget.
          </p>
          <Link className="primary-button" href="/?hub=home">
            Open Interior Estimator <ArrowRight size={16} />
          </Link>
        </div>
        <div className="info-card">
          <ShieldCheck size={24} />
          <h3>No Hidden Markups</h3>
          <p>
            Benchmarked against verified regional contractor rates and material indexes across the US and India.
          </p>
        </div>
      </div>
    </PageFrame>
  )
}

export function FinancePage() {
  return (
    <PageFrame
      eyebrow="Financial Calculators"
      title="Borrow smarter. Invest wiser."
      description="Compare top credit cards, brokerage fees, mortgage rates, and retirement projections side-by-side."
    >
      <div className="page-grid">
        <div className="feature-card">
          <span className="step-label">CARD &amp; APR COMPARISON</span>
          <h2>Banking &amp; Cards Hub</h2>
          <p>
            Calculate annual rewards on Citi, Capital One, Amex, and PayPal cards, or estimate merchant payment processing fees.
          </p>
          <Link className="primary-button" href="/?hub=banking">
            Compare Cards &amp; Fees <ArrowRight size={16} />
          </Link>
        </div>
        <div className="feature-card">
          <span className="step-label">RETIREMENT &amp; WEALTH</span>
          <h2>Wealth &amp; Brokerage Tools</h2>
          <p>
            Model 10-year growth trajectories, simulate 401(k)/SIP returns, and compare expense ratios between Fidelity and Charles Schwab.
          </p>
          <Link className="primary-button" href="/?hub=wealth">
            Explore Wealth Tools <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageFrame>
  )
}

export function AboutPage() {
  return (
    <PageFrame
      eyebrow="Independent Comparison"
      title="Empowering decisions through transparent data."
      description="CompareGrid is an independent consumer comparison and interactive financial & tech calculator platform."
    >
      <div className="page-grid">
        <div className="content-card">
          <h2>Our Core Mission</h2>
          <p>
            Much like NerdWallet, Bankrate, and CNET, CompareGrid was created to demystify commercial pricing, financial fees, and service costs. We bring objective calculators and side-by-side benchmarks directly to consumers and business decision-makers.
          </p>
          <div className="trust-list">
            <div><Check size={17} /> 100% Independent editorial perspective</div>
            <div><Check size={17} /> Multi-currency support for United States ($ USD) and India (₹ INR)</div>
            <div><Check size={17} /> Transparent math with zero bias towards any single brand</div>
            <div><Check size={17} /> Strict data privacy and encrypted quote requests</div>
          </div>
        </div>

        <div className="content-card">
          <h2>4 Dedicated Comparison Hubs</h2>
          <div className="link-stack">
            <Link href="/?hub=banking">
              <span><CreditCard size={15} style={{ display: 'inline', marginRight: 6 }} /> Banking, Cards &amp; Payments</span>
              <ArrowRight size={15} />
            </Link>
            <Link href="/?hub=wealth">
              <span><Landmark size={15} style={{ display: 'inline', marginRight: 6 }} /> Wealth, Investments &amp; 401(k)</span>
              <ArrowRight size={15} />
            </Link>
            <Link href="/?hub=tech">
              <span><Monitor size={15} style={{ display: 'inline', marginRight: 6 }} /> Tech Hardware, Cloud &amp; Security</span>
              <ArrowRight size={15} />
            </Link>
            <Link href="/?hub=home">
              <span><Home size={15} style={{ display: 'inline', marginRight: 6 }} /> Home Remodeling &amp; Mortgage</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </PageFrame>
  )
}

export function ContactPage() {
  return (
    <PageFrame
      eyebrow="Advisor & Support Desk"
      title="Get in touch with an independent specialist."
      description="Have questions about our calculations or need a custom enterprise quote? We are here to assist."
    >
      <div className="contact-grid">
        <div className="content-card">
          <h2>Direct Inquiries</h2>
          <div className="contact-row">
            <Phone size={18} />
            <span>
              <strong>US:</strong> +1 (800) 555-0199<br />
              <strong>India:</strong> +91 90000 00000<br />
              <small>Monday – Friday, 9:00 AM – 6:00 PM</small>
            </span>
          </div>
          <div className="contact-row">
            <Mail size={18} />
            <span>
              hello@comparegrid.com<br />
              <small>Average response time: within 4 business hours</small>
            </span>
          </div>
          <div className="contact-row">
            <MapPin size={18} />
            <span>
              New York, NY (US Operations)<br />
              Mumbai, MH (India Operations)
            </span>
          </div>
        </div>

        <div className="content-card">
          <h2>Fast-Track Your Comparison</h2>
          <p>
            Choose a calculator to get instant numbers, then request an advisor callback directly from your results.
          </p>
          <div className="link-stack">
            <Link href="/?hub=banking">Calculate Credit Card Rewards <ArrowRight size={15} /></Link>
            <Link href="/?hub=wealth">Compare 401(k) / SIP Wealth Returns <ArrowRight size={15} /></Link>
            <Link href="/?hub=tech">Get Enterprise Hardware Pricing <ArrowRight size={15} /></Link>
            <Link href="/?hub=home">Calculate Interior &amp; Mortgage Costs <ArrowRight size={15} /></Link>
          </div>
        </div>
      </div>
    </PageFrame>
  )
}

export function ArticlesPage() {
  return (
    <PageFrame
      eyebrow="Research & Analysis"
      title="Data-backed consumer & enterprise guides."
      description="Independent analyses, fee audits, and planning methodologies across all four verticals."
    >
      <div className="article-grid">
        {articles.map(article => (
          <article className="article-card" key={article.title}>
            <div className="article-art">
              <BookOpen size={24} />
            </div>
            <span className="step-label">{article.category}</span>
            <h2>{article.title}</h2>
            <p>{article.snippet}</p>
            <Link href={`/?hub=${article.hub}`}>
              Open {article.category} Tool <ArrowRight size={15} />
            </Link>
          </article>
        ))}
      </div>
    </PageFrame>
  )
}
