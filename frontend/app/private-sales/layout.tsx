import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discreet Private Treaty Sales | Off-Market Acquisitions & Placements",
  description:
    "Confidential private sales protocol for blue-chip art, trophy horological specimens, and institutional-grade collectibles conducted entirely outside the public auction domain.",
  keywords: [
    "Private treaty art sales",
    "Off-market luxury watch sourcing",
    "Discreet art acquisition",
    "High-net-worth private sale concierge",
    "Non-disclosure private treaty transactions",
    "Family office trophy assets",
    "Private auction alternatives",
  ],
  alternates: {
    canonical: "/private-sales",
  },
};

export default function PrivateSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
