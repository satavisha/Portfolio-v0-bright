import Link from "next/link"
import { ArrowUpRight, Download, FileText } from "lucide-react"
import type { ArtifactLink } from "@/lib/content"

export function ArtifactLinks({ links }: { links: ArtifactLink[] }) {
  if (!links.length) return null

  return (
    <div className="artifact-links" aria-label="Project artifacts">
      {links.map((link) => {
        const external = link.href.startsWith("http")
        const isPdf = link.kind === "pdf"
        return (
          <Link
            key={`${link.label}-${link.href}`}
            href={link.href}
            className="artifact-link"
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            download={isPdf ? "" : undefined}
          >
            {isPdf ? <FileText aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
            <span>{link.label}</span>
            {isPdf && <Download className="artifact-link__end" aria-hidden="true" />}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </Link>
        )
      })}
    </div>
  )
}
