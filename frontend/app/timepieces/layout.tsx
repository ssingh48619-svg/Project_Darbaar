import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haute Horlogerie & Rare Vintage Timepieces | Patek Philippe, Rolex, F.P. Journe",
  description:
    "Discreet acquisition and curation of museum-grade vintage watches and complicated horology. Verified reference numbers, Extract from the Archives, original boxes, and independent horological condition scorecards.",
  keywords: [
    "Rare vintage watches India",
    "Patek Philippe Nautilus 5711",
    "Patek Philippe Perpetual Calendar",
    "Rolex Cosmograph Daytona Paul Newman",
    "F.P. Journe Chronometre Bleu",
    "Audemars Piguet Royal Oak Jumbo",
    "Vintage Cartier Crash",
    "Certified pre-owned luxury watches",
    "Horology extract from archives",
    "Mechanical watch condition scorecard",
  ],
  alternates: {
    canonical: "/timepieces",
  },
};

export default function TimepiecesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
