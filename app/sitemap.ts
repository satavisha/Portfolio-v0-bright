import type { MetadataRoute } from "next"
import { getDanceEntries, getEntryHref, getWorkEntries } from "@/lib/content"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/dance", "/about"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("monthly" as const) : ("weekly" as const),
    priority: route === "" ? 1 : 0.8,
  }))

  const contentRoutes = [...getWorkEntries(), ...getDanceEntries()].map((entry) => ({
    url: `${SITE_URL}${getEntryHref(entry)}`,
    lastModified: new Date(`${entry.updatedAt}T00:00:00`),
    changeFrequency: "monthly" as const,
    priority: entry.featured ? 0.8 : 0.7,
  }))

  return [...staticRoutes, ...contentRoutes]
}
