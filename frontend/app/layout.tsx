import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DarbaarProvider } from "@/features/context/DarbaarContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SpecimenModal } from "@/components/SpecimenModal";
import { InquiryModal } from "@/components/InquiryModal";
import { SearchModal } from "@/components/SearchModal";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://project-darbaar.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#263A31",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "DARBAAR | Where Heritage Meets Rarity — Global Luxury House of Fine Art & Rare Timepieces",
    template: "%s | DARBAAR Sovereign Luxury House",
  },
  description:
    "Sovereign house curating rare vintage timepieces, classical & modern Indian fine art, Mughal antiquities, and heirloom collectible assets. Private treaty sales, archival provenance stewardship, and museum-grade condition scorecards for discerning collectors.",
  applicationName: "DARBAAR",
  authors: [{ name: "DARBAAR Curatorial Directorate & Sovereign Advisory" }],
  generator: "Next.js",
  keywords: [
    // Haute Horlogerie & Vintage Watches
    "Haute Horlogerie",
    "Rare Vintage Watches",
    "Patek Philippe Private Sale",
    "Rolex Cosmograph Daytona Paul Newman",
    "Audemars Piguet Royal Oak Jumbo",
    "F.P. Journe Chronometre Bleu",
    "Vintage Cartier Crash",
    "Vacheron Constantin Historiques",
    "Archival Extract of the Archives",
    "Independent Horology Condition Scorecard",

    // Fine Art & Antiquities
    "Classical Indian Miniature Paintings",
    "Mewar Court Ateliers",
    "Kangra Pahari School",
    "Basohli Ragamala Series",
    "M.F. Husain Original Paintings",
    "Raja Ravi Varma Certified Lithographs",
    "S.H. Raza Masterpieces",
    "F.N. Souza Catalogue Raisonné",
    "Mughal Antiquities & Jewels",
    "Post-War European Bronze Sculptures",

    // Niche Services & Private Sales
    "Discreet Private Treaty Sales",
    "Heirloom Asset Brokerage",
    "High-Net-Worth Tangible Wealth Preservation",
    "Family Office Collectible Advisory",
    "Art Provenance Verification",
    "Museum Conservation Standards",
    "Luxury Auction Concierge Mumbai Geneva London Dubai",
    "Palace Heritage Collectibles",
  ],
  referrer: "origin-when-cross-origin",
  creator: "DARBAAR Curatorial Directorate",
  publisher: "DARBAAR Luxury Holdings",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "DARBAAR | Where Heritage Meets Rarity — Global Luxury House",
    description:
      "A Global House of Fine Art, Rare Timepieces and Collectible Assets. Inspired by India's royal courts and the discretion of international private auction houses.",
    url: BASE_URL,
    siteName: "DARBAAR Sovereign Luxury House",
    images: [
      {
        url: "/darbaar-crest.svg",
        width: 1200,
        height: 630,
        alt: "DARBAAR Royal Crest & Insignia — Where Heritage Meets Rarity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DARBAAR | Where Heritage Meets Rarity — Global Luxury House",
    description:
      "Discreet private acquisitions, museum-standard condition assessments, and archival provenance stewardship for exceptional fine art, rare horology, and heirloom assets.",
    images: ["/darbaar-crest.svg"],
    creator: "@DarbaarLuxury",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "Luxury Assets & Fine Art Brokerage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LuxuryBrand",
    name: "DARBAAR",
    alternateName: ["House of Darbaar", "DARBAAR Luxury", "DARBAAR Sovereign Advisory"],
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description:
      "Global sovereign house specializing in rare vintage timepieces, classical and modern Indian fine art, Mughal antiquities, and private wealth asset advisory.",
    slogan: "Where Heritage Meets Rarity",
    foundingDate: "2024",
    founders: [{ "@type": "Person", name: "DARBAAR Curatorial Directorate" }],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: ["IN", "GB", "CH", "AE", "US", "SG"],
    knowsAbout: [
      "Haute Horlogerie & Vintage Watches",
      "Patek Philippe & Rolex Archival Models",
      "Indian Miniature Paintings (Mewar, Kangra, Basohli)",
      "Modern Indian Masterpieces (M.F. Husain, S.H. Raza)",
      "Provenance Stewardship & Verification",
      "Museum-Grade Condition Scorecards",
      "Discreet Private Treaty Brokerage",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Curatorial Concierge & Advisory",
      email: "darbaar3001@gmail.com",
      availableLanguage: ["English", "Hindi"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DARBAAR",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/marketplace?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        {/* Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('darbaar_theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#111111] font-sans selection:bg-[#263A31] selection:text-[#F7F5F0]">
        <DarbaarProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <SpecimenModal />
          <InquiryModal />
          <SearchModal />
        </DarbaarProvider>
      </body>
    </html>
  );
}
