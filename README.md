# DARBAAR

> **Where Heritage Meets Rarity**  
> *A Global House of Fine Art, Rare Timepieces and Collectible Assets.*

DARBAAR is an ultra-premium global luxury marketplace and private advisory platform inspired by India's royal courts, Maharajas, historic palaces, and the curatorial sophistication of international auction houses (Sotheby's, Christie's, Phillips).

---

## Brand Identity & Design System

- **Primary Background:** Optic White `#FFFFFF`
- **Secondary Background:** Warm Ivory `#F7F5F0`
- **Gallery Stone:** `#EAE5DC`
- **Primary Text:** Charcoal `#111111`
- **Secondary Text:** `#686868`
- **Border Subtle:** `#E5E5EA`
- **Muted Gold:** `#A68A55` (with accents `#8C7243`, `#C4AC79`, `#F6F2EA`)
- **Deep Heritage Green:** `#263A31` (with accents `#1B2A23`, `#344D42`)
- **Typography:**
  - Headings: Cormorant Garamond & Playfair Display
  - Body: Inter & Manrope

---

## Technology Stack

- **Frontend:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend:** Node.js, Express.js, TypeScript, Mongoose
- **Database:** MongoDB / MongoDB Atlas
- **Security:** HttpOnly JWT Cookies, Role-Based Access Control, Input validation with Zod

---

## Repository Structure

```
DARBAAR/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with fonts, metadata & providers
│   │   ├── globals.css            # Luxury theme variables & scrollbars
│   │   ├── page.tsx               # Homepage
│   │   ├── fine-art/              # Fine Art catalogue
│   │   ├── timepieces/            # Rare Watches catalogue
│   │   ├── collectibles/          # Heritage Antiquities catalogue
│   │   ├── asset/[id]/            # Individual Asset Detail page
│   │   ├── private-sales/         # Private Treaty & Brokerage
│   │   ├── advisory/              # Advisory Services & Stewardship
│   │   ├── provenance/            # Provenance & Authentication standards
│   │   ├── sell/                  # Consignment & Valuations
│   │   ├── about/                 # About DARBAAR & Heritage Philosophy
│   │   ├── contact/               # Private Appointments & Salons
│   │   ├── privacy/               # Client Privacy & Discretion Policy
│   │   ├── terms/                 # Terms of Private Treaty
│   │   ├── dashboard/             # Client Vault Portal
│   │   └── admin/                 # Admin Control Desk
│   ├── components/
│   │   ├── Header.tsx             # Editorial navigation & utility bar
│   │   ├── Footer.tsx             # Curated directory & legal notices
│   │   ├── SpecimenModal.tsx      # High-res magnification & condition scorecard
│   │   ├── InquiryModal.tsx       # Confidential advisory inquiry modal
│   │   ├── SearchModal.tsx        # Real-time multi-field search modal
│   │   └── home/
│   │       ├── Hero.tsx
│   │       ├── FeaturedCategories.tsx
│   │       ├── CuratedAssetsGrid.tsx
│   │       ├── AdvisoryPillars.tsx
│   │       ├── PrivateSales.tsx
│   │       └── TrustIntegrity.tsx
│   ├── features/context/
│   │   └── DarbaarContext.tsx     # Currency exchange & modal controller
│   ├── lib/
│   │   ├── currency.ts            # Dynamic multi-currency engine (USD, GBP, EUR, CHF, AED, INR, SGD, HKD)
│   │   ├── data.ts                # Curated demonstration assets & scorecards
│   │   └── types.ts               # TypeScript domain interfaces
│   └── public/
├── backend/
│   ├── src/
│   │   ├── config/                # Database connection
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── app.ts                 # Express application configuration
│   │   └── server.ts              # Server bootstrap
│   ├── tests/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── API_DOCUMENTATION.md
├── package.json
└── README.md
```

---

## Getting Started

### 1. Frontend Development Server

```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Frontend Production Build

```bash
cd frontend
npm run build
npm run start
```

### 3. Backend Development Server

```bash
cd backend
npm install
npm run dev
```

---

## Phase 1 Implementation Highlights

1. **Brand System Established:** Strict usage of DARBAAR throughout, royal Indian heritage motifs blended with understated Swiss and British auction house minimalism.
2. **Dynamic Multi-Currency Engine:** Live rates for USD, GBP, EUR, CHF, AED, INR, SGD, and HKD with locale-aware currency formatting.
3. **Interactive Specimen Inspection Modal:** Physical condition scorecards (case, dial, movement, originality ratings), archival documentation timelines, independent specialist laboratory references.
4. **Confidential Advisory System:** Private inquiry intake modal with target salon corridor preferences (Geneva, London, New York, Singapore, Mumbai, Dubai).
5. **Real-time Catalogue Search:** Search modal with instant filtering across artists, periods, references, and categories.
6. **Regulatory Transparency:** Demonstration markers on sample records, distinct service boundaries between direct DARBAAR advisory and third-party laboratory verification.
