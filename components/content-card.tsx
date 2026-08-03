import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ContentEntry, getEntryHref, getEntryLabel } from "@/lib/content"

type ContentCardProps = {
  entry: ContentEntry
  index?: number
  priority?: boolean
}

export function ContentCard({ entry, index = 0, priority = false }: ContentCardProps) {
  const writing = entry.type === "writing"

  return (
    <article className={`content-card content-card--${writing ? "writing" : "visual"}`}>
      <Link href={getEntryHref(entry)} aria-label={`Read ${entry.title}`}>
        <div className="content-card__media">
          {entry.cover ? (
            <Image
              src={entry.cover}
              alt={entry.coverAlt || ""}
              fill
              priority={priority}
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 40vw"
            />
          ) : (
            <div className="content-card__typographic" aria-hidden="true">
              <span>{writing ? "Field notes" : "Product study"}</span>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <i />
            </div>
          )}
        </div>

        <div className="content-card__body">
          <div className="content-card__eyebrow">
            <span>{getEntryLabel(entry.type)}</span>
            {entry.featured && <span>Selected</span>}
          </div>
          <h2>{entry.title}</h2>
          <p className="content-card__subtitle">{entry.subtitle}</p>
          <p className="content-card__summary">{entry.summary}</p>
          <div className="content-card__foot">
            <span>{entry.tags.slice(0, 2).join(" · ")}</span>
            <ArrowUpRight aria-hidden="true" />
          </div>
        </div>
      </Link>
    </article>
  )
}
