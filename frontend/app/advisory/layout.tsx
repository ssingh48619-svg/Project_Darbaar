import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Client Advisory Desk | Tangible Wealth Preservation & Collection Strategy",
  description:
    "Institutional advisory for family offices, estate trustees, and private collectors. Independent valuation, acquisition mandates, collection cataloguing, and generational wealth stewardship in tangible assets.",
  keywords: [
    "Private art advisory",
    "Family office art wealth management",
    "Tangible asset preservation",
    "Collectible asset valuation",
    "Estate liquidation advisory",
    "Watch collection curation",
    "Art market investment intelligence",
  ],
  alternates: {
    canonical: "/advisory",
  },
};

export default function AdvisoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

