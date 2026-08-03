import Link from "next/link"
import { SOCIAL_LINKS } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          <span aria-hidden="true">©</span> {new Date().getFullYear()} Satavisha Mitra
        </p>
        <nav aria-label="Social links">
          {SOCIAL_LINKS.map((link) => (
            <Link key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
