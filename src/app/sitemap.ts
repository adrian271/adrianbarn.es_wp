import type { MetadataRoute } from "next";

// Single-route site for now. Hardcoded canonical host so this is stable even
// when served from the .vercel.app mirror — that mirror is `Disallow: /` in
// robots.ts, so its sitemap is never fetched in practice. When real routes
// are added (per-case-study pages, blog), append entries here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://adrianbarn.es",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
