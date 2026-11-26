import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fine Art & Imperial Miniatures | Royal Court Ateliers & Modernist Masters",
  description:
    "Curated collection of Mewar, Kangra, and Basohli Indian court paintings, modern Indian masterworks (M.F. Husain, S.H. Raza, F.N. Souza), and post-war European modernist sculptures. All specimens verified with pigment spectrometry and court treasury seal documentation.",
  keywords: [
    "Indian miniature paintings",
    "Mewar court paintings",
    "Kangra Pahari school",
    "Basohli Gita Govinda",
    "M.F. Husain original paintings",
    "Raja Ravi Varma lithographs",
    "S.H. Raza Bindu paintings",
    "Modern Indian art advisory",
    "Fine art provenance verification",
    "Catalogue raisonné verified art",
  ],
  alternates: {
    canonical: "/fine-art",
  },
};

export default function FineArtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
