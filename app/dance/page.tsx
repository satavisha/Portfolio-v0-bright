import type { Metadata } from "next"
import { ContentCard } from "@/components/content-card"
import { getDanceEntries } from "@/lib/content"

export const metadata: Metadata = {
  title: "Dance",
  description: "Performances, movement practice, and community-building stories from Satavisha Mitra’s Tribal Fusion journey.",
  alternates: { canonical: "/dance" },
  openGraph: {
    title: "Dance — Satavisha Mitra",
    description: "Performances, movement practice, and community-building stories from Satavisha Mitra.",
    url: "/dance",
    images: ["/content/dance/olga-meos-tribal-kazakhstan-2025/olga-meos-performance.jpg"],
  },
}

export default function DancePage() {
  const entries = getDanceEntries()

  return (
    <main className="index-page dance-index page-enter">
      <header className="index-hero index-hero--dance">
        <div>
          <p className="kicker"><span>Creative practice</span> Movement · Community</p>
          <h1>Stories held in <em>movement.</em></h1>
        </div>
        <p>
          Tribal Fusion Belly Dance is where I learn through the body — performing, teaching, travelling, and imagining better ways for the community to connect.
        </p>
      </header>

      <section className="dance-grid" aria-label="Dance stories">
        {entries.map((entry, index) => (
          <ContentCard key={entry.slug} entry={entry} index={index} priority={index < 2} />
        ))}
      </section>
    </main>
  )
}
