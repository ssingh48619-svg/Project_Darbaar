import React from "react";
import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { CuratedAssetsGrid } from "@/components/home/CuratedAssetsGrid";
import { AdvisoryPillars } from "@/components/home/AdvisoryPillars";
import { PrivateSales } from "@/components/home/PrivateSales";
import { TrustIntegrity } from "@/components/home/TrustIntegrity";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeaturedCategories />
      <CuratedAssetsGrid />
      <AdvisoryPillars />
      <PrivateSales />
      <TrustIntegrity />
    </div>
  );
}
