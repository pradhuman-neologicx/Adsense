# CompareGrid — Safe Multi-Vertical Lead Gen & Brand Keyword Portal (US + India)

An independent consumer comparison, financial calculator, and enterprise quotation portal inspired by **NerdWallet**, **Bankrate**, and **CNET**. Built according to the **Safe Multi-Vertical Lead Gen & Brand Keyword Blueprint** for high-commercial-intent Google Ads campaigns across the United States ($ USD) and India (₹ INR).

---

## 📌 Table of Contents
1. [Overview & Business Model](#-overview--business-model)
2. [Tech Stack](#-tech-stack)
3. [Core Capabilities & Features](#-core-capabilities--features)
4. [The 4 Mega-Hubs](#-the-4-mega-hubs)
5. [Google Ads & Policy Compliance (5 Golden Rules)](#-google-ads--policy-compliance-5-golden-rules)
6. [Dynamic URL & Campaign Keyword Architecture](#-dynamic-url--campaign-keyword-architecture)
7. [Lead Generation & Google Sheets Pipeline](#-lead-generation--google-sheets-pipeline)
8. [Project Structure](#-project-structure)
9. [Getting Started (Local Development)](#-getting-started-local-development)
10. [Deployment & Environment Variables](#-deployment--environment-variables)

---

## 🎯 Overview & Business Model

CompareGrid bridges high-intent commercial search traffic with verified service providers, brokers, and affiliate programs through transparent calculators.

### Monetization Channels
1. **Financial & CPL Lead Generation**:
   - Wealth management advisor callbacks ($40–$120/lead via SmartAsset / WiserAdvisor).
   - Pre-qualified credit card and debt consolidation leads ($25–$100/lead).
   - Residential remodeling contractor bids ($20–$80/lead in US, ₹300–₹800 in India).
   - B2B IT hardware and cybersecurity MSP referrals ($15–$50/lead).
2. **Google AdSense (High CPC Categories)**:
   - Banking & Card APR queries: $3–$18 CPC (US).
   - Wealth & 401(k) queries: $5–$25+ CPC (US).
   - Enterprise Antivirus & Cloud: $2–$10 CPC.

---

## 💻 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Server Components + Client Islands)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-checking)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: Modern CSS variables with OKLCH color palettes, custom responsive layouts, and Tailwind CSS v4 support
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [@vercel/analytics](https://vercel.com/analytics)
- **Deployment Target**: Vercel / Node.js standalone

---

## 🌟 Core Capabilities & Features

### 1. Dual-Currency Global Switcher ($ USD / ₹ INR)
A sticky toggle in the navigation allows users to switch between the United States and Indian markets. All calculators immediately update:
- **Currencies**: `Intl.NumberFormat` formatting (`$1,500` vs `₹1,20,000`).
- **Brand baselines**: US cards (Citi, Amex, Capital One) vs Indian cards (SBI, HDFC, ICICI, Axis).
- **Financing benchmarks**: 30-year fixed mortgages vs Indian floating Repo-Linked Lending Rates (RLLR).
- **Remodeling indexes**: Sq. ft. cost schedules ($45–$150/sq.ft vs ₹1,450–₹3,400/sq.ft).

### 2. Segmented Navigation Bar (`<Navbar />`)
- Brand identity with icon badge and bold typography.
- Segmented control pills for the 4 primary hubs: **Banking**, **Wealth**, **Tech**, **Mortgage**.
- Subtle secondary links for **Articles**, **About**, and **Contact**.
- Single-line, wrap-protected **"Free Advisor Call"** CTA.
- Responsive slide-down mobile drawer with dual-column hub selection cards.

### 3. Full-Screen Modal Overlay (`<LeadModal />`)
- Rendered on a top-layer backdrop (`z-index: 99999`) with `backdrop-filter: blur(8px)` covering the entire viewport and sticky header.
- Background scroll locking while open.
- Keyboard support (`Escape` key to close) and click-outside backdrop dismissal.
- Country-aware phone validation (`+1` 10-digit / `+91` 10-digit) and mandatory TCPA consent checkbox.

### 4. Unified Footer & Disclaimer (`<Footer />`)
- Centralized footer used across all routes.
- Houses the mandatory independent trademark disclaimer banner.

---

## 🏛️ The 4 Mega-Hubs

### 1. 🏦 Banking Hub (`components/hubs/banking-hub.tsx`)
- **Rewards Calculator**: Models annual lifestyle spending, dining %, and travel % to estimate net annual cashback and bonus points value.
- **APR & Rate Comparison Table**: Side-by-side comparison of Citi Double Cash, Capital One Venture X, Amex Gold, PayPal Mastercard, SBI SimplyCLICK, and HDFC Regalia.
- **Payment Gateway Fee Estimator**: Models monthly transaction volume and Average Order Value (AOV) to calculate transaction costs across PayPal, Stripe, and Square.

### 2. 📈 Wealth & Investing Hub (`components/hubs/wealth-hub.tsx`)
- **Retirement Growth Calculator**: Calculates compound returns based on current age, retirement age, monthly contribution, and assumed growth rate. Visualizes contribution vs interest split.
- **Brokerage Fee Comparison**: Benchmarks trade commissions, index expense ratios, and advisory management fees across Fidelity Investments, Charles Schwab, Vanguard, Zerodha, and Groww.
- **401(k) & SIP Growth Planner**: Models disciplined monthly deposits over 3 to 30 years.

### 3. 💻 Tech & Security Hub (`components/hubs/tech-hub.tsx`)
- **Enterprise Workstation Configurator**: Configures hardware fleets (1–250 units) across Basic, Professional, and Enterprise workstation specifications based on Dell Technologies enterprise pricing + 3-year ProSupport warranty.
- **Cybersecurity Licensing Comparison**: Compares commercial endpoint protection plans across McAfee Corp, Bitdefender GravityZone, Norton Small Business, and Quick Heal.
- **Cloud Infrastructure Estimator**: Benchmarks on-demand compute hours and cloud storage (S3/EBS) based on AWS reference tiers across US and India regions.

### 4. 🏠 Mortgage & Home Hub (`components/hubs/home-hub.tsx`)
- **Room-by-Room Interior Cost Estimator**: Calculates layout estimates (Studio to 4 BHK/Villa) with custom carpet areas (400–5,000 sq.ft), inclusions checklist (kitchen, wardrobes, false ceiling), and material finishes (Economy, Premium, Luxury).
- **Mortgage EMI Calculator**: Dynamic monthly EMI repayment calculation with principal vs interest ratio bars.
- **Borrowing Eligibility Tool**: Conservative 50% FOIR / DTI calculation based on household income and existing EMIs.
- **Lender Rate Table**: Benchmarks 30-year fixed / 15-year fixed US mortgages (Wells Fargo, Chase, BofA) and Indian floating rates (SBI, HDFC, ICICI, Kotak).

---

## 🛡️ Google Ads & Policy Compliance (5 Golden Rules)

To run Google Ads bidding on high-value brand keywords without account suspensions or trademark violations, the portal strictly enforces:

| Rule | Policy Guideline | CompareGrid Implementation |
| :--- | :--- | :--- |
| **Rule 1: Never Pose as Tech Support** | Google permanently bans third-party technical support / remote repair ads. | Site is strictly positioned as an *Independent Comparison & Fee Calculator Portal*. All helpline/support phrasing is prohibited. |
| **Rule 2: No Trademarked Ad Headlines** | Brand names in Google Ad headlines trigger trademark flags. | Headlines use generic, high-converting copy: *"Compare Top Cashback Cards — 2026 APR Calculator"*, *"Brokerage Fee & Retirement Calculator"*. |
| **Rule 3: Prominent Trademark Disclaimer** | Prominent independent disclaimer required on every landing page. | Displayed directly above the footer: *"Disclaimer: We are an independent financial, technology, and home comparison platform. We are not affiliated with, endorsed by, or official support for Citigroup Inc., Capital One, American Express, PayPal, Fidelity Investments, Charles Schwab, McAfee Corp., Dell Technologies, Apple (iOS), or Amazon. All trademarks belong to their respective owners."* |
| **Rule 4: Zero Destination Mismatch** | Ad keywords must match the landing page calculator exactly. | Dynamic URL query parameters (`?brand=citi`, `?hub=wealth`) automatically open the matching hub, adjust calculator defaults, and highlight matching table rows. |
| **Rule 5: AdSense 40px Safe Margin** | Prevents invalid accidental clicks on monetization units. | Every `AdSlot` is labeled *"ADVERTISEMENT"* with at least 40px–56px margin from interactive sliders and submit buttons. |

---

## 🔗 Dynamic URL & Campaign Keyword Architecture

The portal includes an automatic parameter resolver and a **Trending Comparisons Filter Bar**:

| Campaign Target | URL Parameter Route | Target Hub | Default Highlight / Action |
| :--- | :--- | :--- | :--- |
| **Citigroup / Amex** | `/?hub=banking&brand=citi` | Banking | Citi & Amex cards highlighted with *"Target Match"* badge |
| **Capital One** | `/?hub=banking&brand=capital-one` | Banking | Capital One Venture X highlighted |
| **PayPal Fees** | `/?hub=banking&brand=paypal` | Banking | Automatically switches to Tab 3 (Payment Fees) |
| **Fidelity / Schwab** | `/?hub=wealth&brand=fidelity` | Wealth | Automatically opens Fee Comparison tab with Fidelity highlighted |
| **401(k) / SIP** | `/?hub=wealth&brand=wealth` | Wealth | Loads 401(k) / SIP Compounding Planner |
| **Dell Workstations** | `/?hub=tech&brand=dell` | Tech | Loads Dell Hardware Fleet Configurator |
| **McAfee Antivirus** | `/?hub=tech&brand=mcafee` | Tech | Automatically opens Cybersecurity Plans with McAfee highlighted |
| **AWS Cloud Pricing** | `/?hub=tech&brand=amazon` | Tech | Automatically opens Cloud Cost Estimator |
| **Home Interior** | `/?hub=home&brand=interior` | Mortgage | Loads Room-by-Room Interior Estimator |
| **Mortgage Refinance** | `/?hub=home&brand=mortgage` | Mortgage | Opens Mortgage EMI & Lender Rate Comparison |

---

## 📥 Lead Generation & Google Sheets Pipeline

When a user submits their information via the modal, the request is posted to `/api/submit-lead`.

### Data Schema (10 Headers)
```text
Date | Country | CategoryHub | TargetKeyword | FullName | Phone | Email | City | PostalCode | EstimatedValue
```

### Google Apps Script Webhook
To sync leads in real-time to a private Google Sheet:
1. Create a Google Sheet and name row 1 headers matching the schema above.
2. Go to **Extensions > Apps Script** and paste:

```javascript
function doPost(e) { 
  try { 
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
    var data = JSON.parse(e.postData.contents); 
     
    sheet.appendRow([ 
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), 
      data.Country || "US", 
      data.CategoryHub || "General", 
      data.TargetKeyword || "Direct", 
      data.FullName || "", 
      data.Phone || "", 
      data.Email || "", 
      data.City || "", 
      data.PostalCode || "", 
      data.EstimatedValue || 0 
    ]); 
     
    return ContentService.createTextOutput(JSON.stringify({ status: "success" })) 
      .setMimeType(ContentService.MimeType.JSON); 
  } catch (error) { 
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() })) 
      .setMimeType(ContentService.MimeType.JSON); 
  } 
}
```
3. Click **Deploy > New Deployment** -> Select **Web App** -> Set access to **Anyone**.
4. Copy the deployment URL into your `.env.local` as `GOOGLE_SHEET_WEBHOOK_URL`.

---

## 📁 Project Structure

```text
interior-and-finance-portal/
├── app/
│   ├── api/
│   │   └── submit-lead/
│   │       └── route.ts          # Backend API proxy to Google Sheets webhook
│   ├── about/page.tsx            # About CompareGrid mission & methodology
│   ├── articles/page.tsx         # Consumer & enterprise guides across 4 verticals
│   ├── banking-loans/page.tsx    # Direct route to banking & loan tools
│   ├── contact/page.tsx          # Advisor contact & inquiry desk
│   ├── disclaimer/page.tsx       # Full policy & trademark disclosure
│   ├── interior-cost-estimator/  # Direct route to interior estimator
│   ├── privacy-policy/page.tsx   # Privacy, GDPR & data handling terms
│   ├── terms/page.tsx            # Terms of use
│   ├── globals.css               # Core styling, OKLCH theme variables, responsive queries
│   ├── layout.tsx                # Root HTML layout with SEO metadata & smooth scrolling
│   └── page.tsx                  # Homepage entrypoint rendering <Portal />
├── components/
│   ├── hubs/
│   │   ├── banking-hub.tsx       # Credit Card APR/Rewards & PayPal fee calculator
│   │   ├── wealth-hub.tsx        # Brokerage fee comparison & 401(k)/SIP calculator
│   │   ├── tech-hub.tsx          # Dell hardware fleet, McAfee & AWS cloud estimator
│   │   └── home-hub.tsx          # Interior cost estimator & Mortgage EMI tool
│   ├── navbar.tsx                # Reusable global header, segmented hub pills & region switcher
│   ├── footer.tsx                # Reusable global footer with Rule 3 trademark disclaimer
│   ├── lead-modal.tsx            # Full-screen lead capture modal with blur overlay & TCPA consent
│   ├── portal.tsx                # Main portal state orchestrator & campaign keyword engine
│   ├── site-pages.tsx            # Shared page frame & content templates for sub-routes
│   └── legal-page.tsx            # Legal layout template
├── public/                       # Static logos, favicons, and icons
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd interior-and-finance-portal

# Install dependencies
npm install

# Run the local development server (with Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portal.

---

## 🌐 Deployment & Environment Variables

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Optional: Google Apps Script Webhook URL for real-time lead capture
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/AKfycb.../exec"
```

### Vercel Deployment
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project into [Vercel](https://vercel.com).
3. Add `GOOGLE_SHEET_WEBHOOK_URL` in the Vercel project settings under **Environment Variables**.
4. Deploy! Next.js App Router will generate static and dynamic routes automatically.

---

## ⚖️ License & Disclaimer

CompareGrid is an independent consumer comparison portal and is not affiliated with, endorsed by, or official technical support for any mentioned brand or trademark. All product names, logos, and brands are property of their respective owners.

