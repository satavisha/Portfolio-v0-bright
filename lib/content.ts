import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export type ContentType = "case-study" | "writing" | "dance"
export type WorkFilter = "all" | "case-study" | "writing"
export type ArtifactKind = "pdf" | "prototype" | "link"

export type ArtifactLink = {
  label: string
  href: string
  kind: ArtifactKind
}

export type ContentEntry = {
  type: ContentType
  slug: string
  title: string
  subtitle: string
  summary: string
  tags: string[]
  cover: string | null
  coverAlt: string | null
  createdAt: string
  updatedAt: string
  featured: boolean
  featuredOrder?: number
  artifactLinks: ArtifactLink[]
  draft: boolean
  body: string
  readingTime: number
}

const contentRoot = path.join(process.cwd(), "content")
const sectionDirectories = ["work", "dance"] as const

let cachedEntries: ContentEntry[] | undefined

function wordsIn(markdown: string) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#>*_`|\-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

function readEntry(filePath: string): ContentEntry {
  const source = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(source)

  return {
    type: data.type,
    slug: data.slug,
    title: data.title,
    subtitle: data.subtitle,
    summary: data.summary,
    tags: data.tags ?? [],
    cover: data.cover ?? null,
    coverAlt: data.coverAlt ?? null,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    featured: Boolean(data.featured),
    featuredOrder: data.featuredOrder,
    artifactLinks: data.artifactLinks ?? [],
    draft: Boolean(data.draft),
    body: content.trim(),
    readingTime: Math.max(1, Math.ceil(wordsIn(content) / 225)),
  }
}

function allEntries() {
  if (cachedEntries) return cachedEntries

  cachedEntries = sectionDirectories
    .flatMap((section) => {
      const directory = path.join(contentRoot, section)
      return fs
        .readdirSync(directory)
        .filter((file) => file.endsWith(".md"))
        .map((file) => readEntry(path.join(directory, file)))
    })
    .filter((entry) => !entry.draft)

  return cachedEntries
}

function byRecentUpdate(a: ContentEntry, b: ContentEntry) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
}

export function getWorkEntries(filter: WorkFilter = "all") {
  return allEntries()
    .filter((entry) => entry.type !== "dance")
    .filter((entry) => filter === "all" || entry.type === filter)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      if (a.featured && b.featured) {
        return (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)
      }
      return byRecentUpdate(a, b)
    })
}

export function getDanceEntries() {
  return allEntries()
    .filter((entry) => entry.type === "dance")
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return byRecentUpdate(a, b)
    })
}

export function getEntry(section: "work" | "dance", slug: string) {
  return allEntries().find(
    (entry) => entry.slug === slug && (section === "dance" ? entry.type === "dance" : entry.type !== "dance"),
  )
}

export function getStaticSlugs(section: "work" | "dance") {
  const entries = section === "work" ? getWorkEntries() : getDanceEntries()
  return entries.map(({ slug }) => ({ slug }))
}

export function getEntryHref(entry: Pick<ContentEntry, "type" | "slug">) {
  return `/${entry.type === "dance" ? "dance" : "work"}/${entry.slug}`
}

export function getEntryLabel(type: ContentType) {
  if (type === "case-study") return "Case study"
  if (type === "writing") return "Writing"
  return "Dance story"
}

export function getRelatedEntries(entry: ContentEntry, limit = 2) {
  const pool = entry.type === "dance" ? getDanceEntries() : getWorkEntries()

  return pool
    .filter((candidate) => candidate.slug !== entry.slug)
    .map((candidate) => ({
      candidate,
      score: candidate.tags.filter((tag) => entry.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || byRecentUpdate(a.candidate, b.candidate))
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}

export function getEntryNeighbours(entry: ContentEntry) {
  const pool = entry.type === "dance" ? getDanceEntries() : getWorkEntries()
  const index = pool.findIndex((candidate) => candidate.slug === entry.slug)

  return {
    previous: index > 0 ? pool[index - 1] : undefined,
    next: index >= 0 && index < pool.length - 1 ? pool[index + 1] : undefined,
  }
}
