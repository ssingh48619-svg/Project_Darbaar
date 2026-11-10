import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DarbaarProvider } from "@/features/context/DarbaarContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SpecimenModal } from "@/components/SpecimenModal";
import { InquiryModal } from "@/components/InquiryModal";
import { SearchModal } from "@/components/SearchModal";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DARBAAR | Where Heritage Meets Rarity — Global Luxury House",
  description:
    "A Global House of Fine Art, Rare Timepieces and Collectible Assets. Inspired by India's royal courts and the discretion of international private auction houses.",
  keywords: [
    "DARBAAR",
    "Fine Art",
    "Rare Watches",
    "Patek Philippe",
    "F.P. Journe",
    "Mughal Antiquities",
    "Indian Miniatures",
    "Private Advisory",
    "Luxury Marketplace",
  ],
  authors: [{ name: "DARBAAR Luxury Holdings" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <head>
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
