"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { NAVIGATION } from "@/lib/site"

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-mark" aria-label="Satavisha Mitra, home">
          <span className="site-mark__monogram">SM</span>
          <span className="site-mark__name">Satavisha Mitra</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAVIGATION.map((item) => {
            const current = isCurrent(pathname, item.href)
            return (
              <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-nav"
        data-open={menuOpen}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {NAVIGATION.map((item, index) => {
          const current = isCurrent(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current ? "page" : undefined}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
