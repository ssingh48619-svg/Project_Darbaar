import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://project-darbaar.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/fine-art", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/timepieces", priority: 0.95, changeFrequency: "daily" as const },
    { path: "/collectibles", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/private-sales", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/marketplace", priority: 0.85, changeFrequency: "daily" as const },
    { path: "/advisory", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/provenance", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sell", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

