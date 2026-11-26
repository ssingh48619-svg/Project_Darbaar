import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Consignment & Deaccessioning | Consign Fine Art & Rare Timepieces",
  description:
    "Consign your exceptional fine art, rare horology, and precious collectibles to DARBAAR. Enjoy confidential private placements, global collector access, zero public record exposure, and competitive consignment terms.",
  keywords: [
    "Sell luxury watches India",
    "Consign fine art",
    "Sell Patek Philippe privately",
    "Sell Rolex Daytona",
    "Consign Indian modern art",
    "Private art broker",
    "Deaccessioning collection advisory",
    "Confidential luxury consignment",
  ],
  alternates: {
    canonical: "/sell",
  },
};

export default function SellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
