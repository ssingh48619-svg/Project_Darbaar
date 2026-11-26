import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provenance Stewardship & Condition Scorecards | Forensic Verification Protocol",
  description:
    "DARBAAR's five-pillar authentication methodology: physical inspection, archives & catalogue raisonné audit, legal title clearance, material diagnostics, and digital archival custody.",
  keywords: [
    "Art provenance verification",
    "Watch condition report",
    "Forensic art authentication",
    "Pigment spectrometry analysis",
    "Extract from archives Patek Rolex",
    "Catalogue raisonné verification",
    "Due diligence for art buyers",
  ],
  alternates: {
    canonical: "/provenance",
  },
};

export default function ProvenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
