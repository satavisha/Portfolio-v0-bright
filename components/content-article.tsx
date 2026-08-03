import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ArtifactLinks } from "@/components/artifact-links"
import { ContentCard } from "@/components/content-card"
import { MarkdownContent } from "@/components/markdown-content"
import {
  ContentEntry,
  getEntryHref,
  getEntryLabel,
  getEntryNeighbours,
  getRelatedEntries,
} from "@/lib/content"
import { SITE_URL, SOCIAL_LINKS } from "@/lib/site"

function displayDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`))
}

export function ContentArticle({ entry }: { entry: ContentEntry }) {
  const section = entry.type === "dance" ? "Dance" : "Work"
  const sectionHref = entry.type === "dance" ? "/dance" : "/work"
  const related = getRelatedEntries(entry)
  const { previous, next } = getEntryNeighbours(entry)
  const url = `${SITE_URL}${getEntryHref(entry)}`
  const structuredData = {
    "@context": "https://schema.org",
    "@type": entry.type === "writing" ? "Article" : "CreativeWork",
    headline: entry.title,
    alternativeHeadline: entry.subtitle,
    description: entry.summary,
    datePublished: entry.createdAt,
    dateModified: entry.updatedAt,
    image: entry.cover ? `${SITE_URL}${entry.cover}` : undefined,
    url,
    author: {
      "@type": "Person",
      name: "Satavisha Mitra",
      url: SITE_URL,
      sameAs: SOCIAL_LINKS.map((link) => link.href),
    },
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <article className="article-page page-enter">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={sectionHref}>{section}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{entry.title}</span>
        </nav>

        <header className={`article-hero article-hero--${entry.type}`}>
          <div className="article-hero__copy">
            <div className="article-hero__meta">
              <span>{getEntryLabel(entry.type)}</span>
              <span>{entry.readingTime} min read</span>
              <span>{displayDate(entry.updatedAt)}</span>
            </div>
            <h1>{entry.title}</h1>
            <p className="article-hero__subtitle">{entry.subtitle}</p>
            <p className="article-hero__summary">{entry.summary}</p>
            <ul className="tag-list" aria-label="Topics">
              {entry.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <ArtifactLinks links={entry.artifactLinks} />
          </div>

          <div className="article-hero__visual">
            {entry.cover ? (
              <Image
                src={entry.cover}
                alt={entry.coverAlt || ""}
                fill
                priority
                sizes="(max-width: 899px) calc(100vw - 32px), 46vw"
              />
            ) : (
              <div className="article-hero__fallback" aria-hidden="true">
                <span>{getEntryLabel(entry.type)}</span>
                <strong>{entry.title}</strong>
                <i />
              </div>
            )}
          </div>
        </header>

        <MarkdownContent body={entry.body} />
      </article>

      <nav className="article-pagination" aria-label={`${section} pagination`}>
        {previous ? (
          <Link href={getEntryHref(previous)} className="article-pagination__previous">
            <ArrowLeft aria-hidden="true" />
            <span>
              <small>Previous</small>
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={getEntryHref(next)} className="article-pagination__next">
            <span>
              <small>Next</small>
              {next.title}
            </span>
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {related.length > 0 && (
        <section className="related-section" aria-labelledby="related-title">
          <div className="section-heading section-heading--compact">
            <p>Continue exploring</p>
            <h2 id="related-title">Related {section.toLowerCase()}</h2>
          </div>
          <div className="related-grid">
            {related.map((relatedEntry, index) => (
              <ContentCard key={relatedEntry.slug} entry={relatedEntry} index={index} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
