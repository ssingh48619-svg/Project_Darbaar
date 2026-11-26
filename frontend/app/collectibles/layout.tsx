import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palace Heritage Collectibles & Rare Antiquities | Royal Court Artefacts",
  description:
    "Explore authenticated royal court treasures, Mughal gem-set daggers, sovereign ceremonial curiosities, and rare numismatics preserved across princely dynasties.",
  keywords: [
    "Royal heritage collectibles",
    "Mughal antiquities",
    "Princely state artefacts",
    "Gem-set jade daggers",
    "Imperial court curiosities",
    "Rare antique coins India",
    "Historical provenance artifacts",
    "Museum quality antiquities",
  ],
  alternates: {
    canonical: "/collectibles",
  },
};

export default function CollectiblesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

