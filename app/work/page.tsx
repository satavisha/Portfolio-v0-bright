import type { Metadata } from "next"
import Link from "next/link"
import { ContentCard } from "@/components/content-card"
import { getWorkEntries, type WorkFilter } from "@/lib/content"

export const metadata: Metadata = {
  title: "Work",
  description: "Product case studies and writing by Satavisha Mitra, spanning research, strategy, AI, health, and Web3.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — Satavisha Mitra",
    description: "Product case studies and writing across research, strategy, AI, health, and Web3.",
    url: "/work",
  },
}

const filters: { label: string; value: WorkFilter; href: string }[] = [
  { label: "All", value: "all", href: "/work" },
  { label: "Case Studies", value: "case-study", href: "/work?type=case-study" },
  { label: "Writing", value: "writing", href: "/work?type=writing" },
]

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const requestedType = (await searchParams).type
  const value = Array.isArray(requestedType) ? requestedType[0] : requestedType
  const selected: WorkFilter = value === "case-study" || value === "writing" ? value : "all"
  const entries = getWorkEntries(selected)

  return (
    <main className="index-page page-enter">
      <header className="index-hero">
        <div>
          <p className="kicker"><span>Selected work</span> 2023—2026</p>
          <h1>Thinking, made <em>tangible.</em></h1>
        </div>
        <p>
          Product case studies and field notes about turning ambiguous problems into useful, testable directions.
        </p>
      </header>

      <nav className="filter-nav" aria-label="Filter work by type">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={filter.href}
            aria-current={selected === filter.value ? "page" : undefined}
            scroll={false}
          >
            {filter.label}
            <span>{String(getWorkEntries(filter.value).length).padStart(2, "0")}</span>
          </Link>
        ))}
      </nav>

      <section className="work-grid" aria-live="polite" aria-label={`${filters.find((item) => item.value === selected)?.label} work`}>
        {entries.map((entry, index) => (
          <ContentCard key={entry.slug} entry={entry} index={index} priority={index < 2} />
        ))}
      </section>
    </main>
  )
}
