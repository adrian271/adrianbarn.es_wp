import type { MetadataRoute } from "next";
import { headers } from "next/headers";

// Generated per-request so we can switch behavior based on which host the
// crawler hit. `VERCEL_ENV` can't help here — the *.vercel.app mirror of the
// production deployment reports VERCEL_ENV=production too, same as the
// real custom domain. Only the incoming `host` header tells them apart.
export const dynamic = "force-dynamic";

const PUBLIC_HOSTS = new Set(["adrianbarn.es", "www.adrianbarn.es"]);

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")?.toLowerCase() ?? "";
  const isPublic = PUBLIC_HOSTS.has(host);

  // Non-public hosts (vercel.app preview/prod-mirror URLs, branch deploys,
  // anything else) — tell every bot to stay out.
  if (!isPublic) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  // Real production domain — open the doors.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://adrianbarn.es/sitemap.xml",
    host: "https://adrianbarn.es",
  };
}
