import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ContentArticle } from "@/components/content-article"
import { getEntry, getEntryHref, getStaticSlugs } from "@/lib/content"

export const dynamicParams = false

export function generateStaticParams() {
  return getStaticSlugs("work")
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = getEntry("work", slug)
  if (!entry) return {}

  const url = getEntryHref(entry)
  const images = entry.cover ? [{ url: entry.cover, alt: entry.coverAlt || entry.title }] : undefined

  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: url },
    openGraph: {
      type: entry.type === "writing" ? "article" : "website",
      title: `${entry.title} — Satavisha Mitra`,
      description: entry.summary,
      url,
      images,
      ...(entry.type === "writing"
        ? { publishedTime: entry.createdAt, modifiedTime: entry.updatedAt, authors: ["Satavisha Mitra"] }
        : {}),
    },
    twitter: { card: "summary_large_image", title: entry.title, description: entry.summary, images },
  }
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = getEntry("work", slug)
  if (!entry) notFound()
  return <ContentArticle entry={entry} />
}
