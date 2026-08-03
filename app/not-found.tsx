import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="not-found page-enter">
      <p>404 / Page not found</p>
      <h1>This page has<br /><em>left the floor.</em></h1>
      <p>The link may be outdated, or the story may still be in rehearsal.</p>
      <Link className="primary-link" href="/"><ArrowLeft aria-hidden="true" /> Return home</Link>
    </main>
  )
}
